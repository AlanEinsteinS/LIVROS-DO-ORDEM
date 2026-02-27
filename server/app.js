import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import Redis from 'ioredis';
import { RateLimiterMemory, RateLimiterRedis } from 'rate-limiter-flexible';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const app = express();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_PUBLISHABLE_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseAdminEmails = new Set(
  (process.env.SUPABASE_ADMIN_EMAILS || '')
    .split(',')
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean)
);
const redisUrl = process.env.REDIS_URL;

if (!supabaseUrl || !supabaseAnonKey || !supabaseServiceRoleKey) {
  throw new Error('SUPABASE_URL, SUPABASE_ANON_KEY and SUPABASE_SERVICE_ROLE_KEY are required');
}

const supabasePublic = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

const mapBookRow = (row) => ({
  id: row.id,
  title: row.title,
  icon: row.icon,
  url: row.url,
  categoryId: row.category_id,
  order: row.order,
  locked: row.locked,
  createdAt: row.created_at,
  updatedAt: row.updated_at
});

const mapCategoryRow = (row) => ({
  id: row.id,
  name: row.name,
  slug: row.slug,
  description: row.description,
  icon: row.icon,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
  books: []
});

const categoriesCacheControl = 'public, max-age=30, stale-while-revalidate=120';

const buildStrongEtag = (payload) => {
  const hash = crypto.createHash('sha256').update(payload).digest('base64url');
  return `"${hash}"`;
};

const hasMatchingEtag = (ifNoneMatchHeader, etag) => {
  if (!ifNoneMatchHeader) return false;
  const values = ifNoneMatchHeader.split(',').map((value) => value.trim());
  return values.includes('*') || values.includes(etag) || values.includes(`W/${etag}`);
};

const parseBoundedInt = (value, fallback, min, max) => {
  const parsed = Number.parseInt(value, 10);
  if (Number.isNaN(parsed)) return fallback;
  return Math.min(max, Math.max(min, parsed));
};

const isBcryptHash = (value) => typeof value === 'string' && value.startsWith('$2');

const constantTimeEquals = (a, b) => {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  const aBuffer = Buffer.from(a, 'utf8');
  const bBuffer = Buffer.from(b, 'utf8');
  if (aBuffer.length !== bBuffer.length) return false;
  return crypto.timingSafeEqual(aBuffer, bBuffer);
};

const LOGIN_WINDOW_MS = 15 * 60 * 1000;
const LOGIN_BLOCK_MS = 15 * 60 * 1000;
const MAX_LOGIN_ATTEMPTS_PER_IP = 20;
const MAX_LOGIN_ATTEMPTS_PER_USERNAME_IP = 5;
const loginWindowSeconds = Math.ceil(LOGIN_WINDOW_MS / 1000);
const loginBlockSeconds = Math.ceil(LOGIN_BLOCK_MS / 1000);

const getClientIp = (req) => {
  const forwardedFor = req.headers['x-forwarded-for'];
  if (typeof forwardedFor === 'string' && forwardedFor.length > 0) {
    return forwardedFor.split(',')[0].trim();
  }
  return req.ip || 'unknown';
};

let redisClient = null;
if (redisUrl) {
  redisClient = new Redis(redisUrl, {
    enableReadyCheck: true,
    maxRetriesPerRequest: 2,
    lazyConnect: false
  });
  redisClient.on('error', (error) => {
    console.error('Redis connection error:', error.message);
  });
}

const buildLimiter = (options) => {
  if (redisClient) {
    return new RateLimiterRedis({
      storeClient: redisClient,
      keyPrefix: options.keyPrefix,
      points: options.points,
      duration: options.duration,
      blockDuration: options.blockDuration,
      insuranceLimiter: new RateLimiterMemory({
        keyPrefix: `${options.keyPrefix}_insurance`,
        points: options.points,
        duration: options.duration,
        blockDuration: options.blockDuration
      })
    });
  }

  return new RateLimiterMemory({
    keyPrefix: options.keyPrefix,
    points: options.points,
    duration: options.duration,
    blockDuration: options.blockDuration
  });
};

const loginIpLimiter = buildLimiter({
  keyPrefix: 'login_ip',
  points: MAX_LOGIN_ATTEMPTS_PER_IP,
  duration: loginWindowSeconds,
  blockDuration: loginBlockSeconds
});

const loginUsernameIpLimiter = buildLimiter({
  keyPrefix: 'login_user_ip',
  points: MAX_LOGIN_ATTEMPTS_PER_USERNAME_IP,
  duration: loginWindowSeconds,
  blockDuration: loginBlockSeconds
});

const getRetryAfterFromLimiter = (result) => {
  if (!result) return 0;
  return Math.ceil((result.msBeforeNext || 0) / 1000);
};

const getRateLimitKeys = (req, identifier) => {
  const ip = getClientIp(req);
  const userKey = `${identifier.toLowerCase()}|${ip}`;
  return { ip, userKey };
};

const checkLoginRateLimit = async ({ ip, userKey }) => {
  const [ipState, userState] = await Promise.all([
    loginIpLimiter.get(ip),
    loginUsernameIpLimiter.get(userKey)
  ]);

  const ipBlocked = ipState && ipState.consumedPoints > MAX_LOGIN_ATTEMPTS_PER_IP;
  const userBlocked = userState && userState.consumedPoints > MAX_LOGIN_ATTEMPTS_PER_USERNAME_IP;

  if (!ipBlocked && !userBlocked) {
    return { blocked: false, retryAfter: 0 };
  }

  return {
    blocked: true,
    retryAfter: Math.max(getRetryAfterFromLimiter(ipState), getRetryAfterFromLimiter(userState))
  };
};

const registerLoginFailure = async ({ ip, userKey }) => {
  try {
    await Promise.all([
      loginIpLimiter.consume(ip),
      loginUsernameIpLimiter.consume(userKey)
    ]);
    return { blocked: false, retryAfter: 0 };
  } catch (error) {
    return {
      blocked: true,
      retryAfter: getRetryAfterFromLimiter(error)
    };
  }
};

const clearLoginFailures = async ({ ip, userKey }) => {
  await Promise.allSettled([
    loginIpLimiter.delete(ip),
    loginUsernameIpLimiter.delete(userKey)
  ]);
};

const isAdminUser = (user) => {
  if (!user) return false;
  const email = typeof user.email === 'string' ? user.email.toLowerCase() : '';
  return (
    user.app_metadata?.role === 'admin' ||
    user.user_metadata?.role === 'admin' ||
    (email.length > 0 && supabaseAdminEmails.has(email))
  );
};

const authenticateAdmin = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  try {
    const { data, error } = await supabasePublic.auth.getUser(token);

    if (error || !data?.user) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    if (!isAdminUser(data.user)) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    req.user = {
      id: data.user.id,
      email: data.user.email
    };

    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'https://livros-do-ordem-fcrv.vercel.app'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.disable('x-powered-by');
app.use(helmet());
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: false, limit: '100kb' }));

// On some serverless routers the "/api" prefix can be stripped before Express.
// Normalize to keep the existing route definitions stable.
app.use((req, res, next) => {
  if (!req.url.startsWith('/api/')) {
    req.url = `/api${req.url.startsWith('/') ? req.url : `/${req.url}`}`;
  }
  next();
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API is running' });
});

app.get('/api/categories', async (req, res) => {
  try {
    const limit = parseBoundedInt(req.query.limit, 50, 1, 200);
    const offset = parseBoundedInt(req.query.offset, 0, 0, 100000);
    const booksLimit = parseBoundedInt(req.query.booksLimit, 500, 1, 1000);
    const from = offset;
    const to = offset + limit - 1;

    const { data: categoryRows, error: categoriesError } = await supabasePublic
      .from('categories')
      .select(`
        id,
        name,
        slug,
        description,
        icon,
        created_at,
        updated_at,
        books (
          id,
          title,
          icon,
          url,
          category_id,
          "order",
          locked,
          created_at,
          updated_at
        )
      `)
      .order('created_at', { ascending: true })
      .order('order', { foreignTable: 'books', ascending: true })
      .range(from, to)
      .limit(booksLimit, { foreignTable: 'books' });

    if (categoriesError) throw categoriesError;

    const categories = (categoryRows || []).map((row) => ({
      ...mapCategoryRow(row),
      books: Array.isArray(row.books) ? row.books.map(mapBookRow) : []
    }));

    const payload = JSON.stringify(categories);
    const etag = buildStrongEtag(payload);
    const ifNoneMatch = req.headers['if-none-match'];

    res.setHeader('Cache-Control', categoriesCacheControl);
    res.setHeader('ETag', etag);

    if (hasMatchingEtag(ifNoneMatch, etag)) {
      return res.status(304).end();
    }

    res.type('application/json').send(payload);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

app.get('/api/categories/:slug/books', async (req, res) => {
  try {
    const { slug } = req.params;
    const { data: categoryRow, error: categoryError } = await supabasePublic
      .from('categories')
      .select('id')
      .eq('slug', slug)
      .maybeSingle();

    if (categoryError) throw categoryError;

    if (!categoryRow) {
      return res.status(404).json({ error: 'Category not found' });
    }

    const { data: bookRows, error: booksError } = await supabasePublic
      .from('books')
      .select('*')
      .eq('category_id', categoryRow.id)
      .order('order', { ascending: true });

    if (booksError) throw booksError;

    res.json(bookRows.map(mapBookRow));
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ error: 'Failed to fetch books' });
  }
});

app.get('/api/system-levels', async (req, res) => {
  // System levels are mocked on frontend (src/data/systemLevels.js)
  res.json([]);
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || typeof email !== 'string' || !password || typeof password !== 'string') {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const rateLimitKeys = getRateLimitKeys(req, normalizedEmail);
    const rateLimit = await checkLoginRateLimit(rateLimitKeys);
    if (rateLimit.blocked) {
      res.setHeader('Retry-After', String(rateLimit.retryAfter));
      return res.status(429).json({ error: 'Too many failed login attempts. Try again later.' });
    }

    const { data, error } = await supabasePublic.auth.signInWithPassword({
      email: normalizedEmail,
      password
    });

    if (error || !data?.user || !data?.session) {
      const failure = await registerLoginFailure(rateLimitKeys);
      if (failure.blocked) {
        res.setHeader('Retry-After', String(failure.retryAfter));
        return res.status(429).json({ error: 'Too many failed login attempts. Try again later.' });
      }
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    if (!isAdminUser(data.user)) {
      return res.status(403).json({ error: 'This account is not allowed in admin area' });
    }

    await clearLoginFailures(rateLimitKeys);

    res.json({
      success: true,
      token: data.session.access_token,
      refreshToken: data.session.refresh_token,
      user: {
        id: data.user.id,
        email: data.user.email
      }
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

app.post('/api/books/:id/unlock', async (req, res) => {
  try {
    const { id } = req.params;
    const { key } = req.body;

    if (!key || typeof key !== 'string') {
      return res.status(400).json({ error: 'Access key is required' });
    }

    const { data: bookRow, error } = await supabaseAdmin
      .from('books')
      .select('locked, access_key')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;

    if (!bookRow) {
      return res.status(404).json({ error: 'Book not found' });
    }

    if (!bookRow.locked) {
      return res.json({ unlocked: true });
    }

    const storedKey = bookRow.access_key;
    if (!storedKey) {
      return res.status(403).json({ unlocked: false, error: 'Invalid access key' });
    }

    const valid = isBcryptHash(storedKey)
      ? await bcrypt.compare(key, storedKey)
      : constantTimeEquals(key, storedKey);

    if (!valid) {
      return res.status(403).json({ unlocked: false, error: 'Invalid access key' });
    }

    return res.json({ unlocked: true });
  } catch (error) {
    console.error('Error unlocking book:', error);
    return res.status(500).json({ error: 'Failed to validate access key' });
  }
});

app.post('/api/books', authenticateAdmin, async (req, res) => {
  try {
    const { title, icon, url, categoryId, order, locked, accessKey } = req.body;
    const isLocked = Boolean(locked);

    if (isLocked && (!accessKey || typeof accessKey !== 'string')) {
      return res.status(400).json({ error: 'Access key is required for locked books' });
    }

    const hashedAccessKey = isLocked ? await bcrypt.hash(accessKey, 10) : null;

    const { data: bookRow, error } = await supabaseAdmin
      .from('books')
      .insert({
        title,
        icon,
        url,
        category_id: categoryId,
        order: order || 0,
        locked: isLocked,
        access_key: hashedAccessKey
      })
      .select('*')
      .single();

    if (error) throw error;

    res.status(201).json(mapBookRow(bookRow));
  } catch (error) {
    console.error('Error creating book:', error);
    res.status(500).json({ error: 'Failed to create book' });
  }
});

app.put('/api/books/:id', authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, icon, url, order, locked, accessKey } = req.body;
    const isLocked = Boolean(locked);
    const updatePayload = {
      title,
      icon,
      url,
      order,
      locked: isLocked
    };

    if (!isLocked) {
      updatePayload.access_key = null;
    } else if (typeof accessKey === 'string' && accessKey.trim().length > 0) {
      updatePayload.access_key = await bcrypt.hash(accessKey, 10);
    }

    const { data: bookRow, error } = await supabaseAdmin
      .from('books')
      .update(updatePayload)
      .eq('id', id)
      .select('*')
      .maybeSingle();

    if (error) throw error;

    if (!bookRow) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.json(mapBookRow(bookRow));
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).json({ error: 'Failed to update book' });
  }
});

app.delete('/api/books/:id', authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabaseAdmin
      .from('books')
      .delete()
      .eq('id', id);

    if (error) throw error;

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ error: 'Failed to delete book' });
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

export default app;
