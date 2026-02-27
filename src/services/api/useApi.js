import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || '/api';
const CATEGORIES_CACHE_KEY = 'categories_cache_v1';

const readCachedCategories = () => {
  try {
    const raw = localStorage.getItem(CATEGORIES_CACHE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export function useCategories() {
  const [categories, setCategories] = useState(() => readCachedCategories());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/categories`, {
        cache: 'no-cache'
      });

      if (response.status === 304) {
        const cached = readCachedCategories();
        setCategories(cached);
        setError(null);
        return;
      }

      if (!response.ok) throw new Error('Failed to fetch categories');
      const data = await response.json();
      setCategories(data);
      localStorage.setItem(CATEGORIES_CACHE_KEY, JSON.stringify(data));
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching categories:', err);
    } finally {
      setLoading(false);
    }
  };

  return { categories, loading, error, refetch: fetchCategories };
}

export function useBooksByCategory(slug) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (slug) {
      fetchBooks();
    }
  }, [slug]);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/categories/${slug}/books`);
      if (!response.ok) throw new Error('Failed to fetch books');
      const data = await response.json();
      setBooks(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching books:', err);
    } finally {
      setLoading(false);
    }
  };

  return { books, loading, error, refetch: fetchBooks };
}

export function useSystemLevels() {
  const [levels, setLevels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLevels();
  }, []);

  const fetchLevels = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/system-levels`);
      if (!response.ok) throw new Error('Failed to fetch system levels');
      const data = await response.json();
      setLevels(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching system levels:', err);
    } finally {
      setLoading(false);
    }
  };

  return { levels, loading, error, refetch: fetchLevels };
}
