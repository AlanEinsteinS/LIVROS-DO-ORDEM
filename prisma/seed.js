import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL
});

async function main() {
  console.log('🌱 Começando seed do banco de dados...');

  // Limpar dados existentes
  await prisma.book.deleteMany();
  await prisma.category.deleteMany();
  await prisma.systemLevel.deleteMany();
  await prisma.user.deleteMany();

  // Criar categorias
  const officialCategory = await prisma.category.create({
    data: {
      name: 'Livros Oficiais',
      slug: 'official',
      description: 'Livros oficiais do sistema Ordem Paranormal RPG/Ordem Remier RPG.',
      icon: 'fa-bookmark'
    }
  });

  const homebrewCategory = await prisma.category.create({
    data: {
      name: 'Homebrews / Não Oficiais',
      slug: 'homebrew',
      description: 'Expansões e conteúdos criados pela comunidade.',
      icon: 'fa-magic'
    }
  });

  const passageCategory = await prisma.category.create({
    data: {
      name: 'A Passagem',
      slug: 'passage',
      description: 'Todas as edições que possuímos do catarse A PASSAGEM.',
      icon: 'fa-bone'
    }
  });

  // Criar livros oficiais
  const officialBooks = [
    {
      title: 'MANUAL DO PORTILHO',
      icon: 'fa-book',
      url: 'https://drive.google.com/file/d/1er3eVIGK2btomMUju1Izif5jvW5arYzn/view?usp=drive_link',
      categoryId: officialCategory.id,
      order: 1
    },
    {
      title: 'ORDEM PARANORMAL V1.1',
      icon: 'fa-skull',
      url: 'https://drive.google.com/file/d/1Roq06lSvkjdOHyLDUsMWhhMcZFzuZQDJ/view?usp=sharing',
      categoryId: officialCategory.id,
      order: 2
    },
    {
      title: 'SOBREVIVENDO AO HORROR V1.2',
      icon: 'fa-ghost',
      url: 'https://drive.google.com/file/d/1MWTJVyBGpRE4DxuPcZqf8rZKK-WC3mDR/view?usp=sharing',
      categoryId: officialCategory.id,
      order: 3
    },
    {
      title: 'Expandindo a Fenda V0.60',
      icon: 'fa-virus',
      url: 'https://drive.google.com/file/d/1PWTy1C9X73sb6nhuPxCxLkFH-8stmB2X/view?usp=sharing',
      categoryId: officialCategory.id,
      order: 4
    }
  ];

  for (const book of officialBooks) {
    await prisma.book.create({ data: book });
  }

  // Criar homebrews
  const homebrewBooks = [
    {
      title: 'PROTOCOLOS DE ENERGIA',
      icon: 'fa-bolt',
      url: 'https://drive.google.com/file/d/1lXAbOsIZgtEWTWGTi4hnrKeXIwKfnOoZ/view?usp=drive_link',
      categoryId: homebrewCategory.id,
      order: 1
    },
    {
      title: 'ORDO CHAOS h4Ha',
      icon: 'fa-biohazard',
      url: 'https://drive.google.com/file/d/1vijpsrS64oNKc0hwS-jEN3uQhAXM0j_Q/view?usp=drive_link',
      categoryId: homebrewCategory.id,
      order: 2
    },
    {
      title: 'MISTERIOS DO OUTRO LADO',
      icon: 'fa-eye',
      url: 'https://drive.google.com/file/d/1Dz6Mv5qvt_G9FRRDQCSbyoq2UnA8064K/view?usp=drive_link',
      categoryId: homebrewCategory.id,
      order: 3
    },
    {
      title: "KIMI'S HOMEBOOK",
      icon: 'fa-book-open',
      url: 'https://drive.google.com/file/d/1_N7kD1Yw8k0kReGm6-igKzcUjr2tIH7P/view?usp=drive_link',
      categoryId: homebrewCategory.id,
      order: 4
    },
    {
      title: "HB'S DO EDUARD",
      icon: 'fa-hat-wizard',
      url: 'https://drive.google.com/file/d/1IftsSO40ZBS82rd2GBRPo8-uI8B2MBZq/view?usp=drive_link',
      categoryId: homebrewCategory.id,
      order: 5
    },
    {
      title: 'A PORRA DO REDSKIN!',
      icon: 'fa-fire',
      url: 'https://drive.google.com/file/d/1Mqh0L1AqcEwfN7qCkCUyQLF6i_qdsmCl/view?usp=drive_link',
      categoryId: homebrewCategory.id,
      order: 6
    },
    {
      title: "HB'S DO MAINVIC",
      icon: 'fa-scroll',
      url: 'https://drive.google.com/file/d/101-RL2qK-TEbt123gdESb_iKDQqAXHOV/view?usp=drive_link',
      categoryId: homebrewCategory.id,
      order: 7
    },
    {
      title: "HB'S DA MEGA",
      icon: 'fa-gem',
      url: 'https://drive.google.com/file/d/1A5p5-ZHpYbjh8817a904xHWA8lwJIPj6/view?usp=drive_link',
      categoryId: homebrewCategory.id,
      order: 8
    },
    {
      title: 'EXPANSÃO DO MEDO',
      icon: 'fa-spider',
      url: 'https://drive.google.com/file/d/10N9cWjZfIFEmwiaatE7eol0Y_h5VVnD3/view?usp=drive_link',
      categoryId: homebrewCategory.id,
      order: 9
    },
    {
      title: 'EDIÇÃO EXPANSIVA OP',
      icon: 'fa-expand',
      url: 'https://drive.google.com/file/d/1Ml5M2YK4zmwRQ6jqiq4KiNXUWWLbXrm_/view?usp=drive_link',
      categoryId: homebrewCategory.id,
      order: 10
    },
    {
      title: "HB'S DA AGATHA",
      icon: 'fa-wand-magic-sparkles',
      url: 'https://drive.google.com/file/d/165zHqAoWmsNWFJ_wVJHcPTwSYx4nAWbR/view?usp=drive_link',
      categoryId: homebrewCategory.id,
      order: 11
    },
    {
      title: 'A CONT. DO OUTRO LADO',
      icon: 'fa-door-open',
      url: 'https://drive.google.com/file/d/1_xIDhsPZ5iZMY38Q4Wjyfuy-rf6IgniT/view?usp=drive_link',
      categoryId: homebrewCategory.id,
      order: 12
    },
    {
      title: 'CATALOGO MACABRO HB',
      icon: 'fa-book-skull',
      url: 'https://docs.google.com/document/d/12brs8IHPVm9YHsj4N7vB9WdUi-Sr3MWK/edit',
      categoryId: homebrewCategory.id,
      order: 13
    },
    {
      title: 'Suplemento Idade das Trevas',
      icon: 'fa-mask',
      url: 'https://drive.google.com/file/d/1aYcXbq-a4hj55vwMQvIY5rpGflzOkge9/view?usp=drive_link',
      categoryId: homebrewCategory.id,
      order: 14
    },
    {
      title: 'Grimorio Paranormal Rituais',
      icon: 'fa-scroll',
      url: 'https://drive.google.com/drive/folders/1LojkQdOFxyUS8e5A4luT-VPW2smCbXSz?usp=sharing',
      categoryId: homebrewCategory.id,
      order: 15
    },
    {
      title: 'Grimorio Paranormal Itens',
      icon: 'fa-eye',
      url: 'https://drive.google.com/drive/folders/1ziQ1QbG_W7NpLloWeypOC69c9jZVpGCI?usp=sharing',
      categoryId: homebrewCategory.id,
      order: 16
    },
    {
      title: "Grimorio Paranormal DLC'S",
      icon: 'fa-star',
      url: 'https://drive.google.com/drive/folders/1Z07qMe191BYQrxJTscBUlQSQyQbe8pQ7?usp=sharing',
      categoryId: homebrewCategory.id,
      order: 17
    }
  ];

  for (const book of homebrewBooks) {
    await prisma.book.create({ data: book });
  }

  // Criar edições da Passagem
  const passageEditions = [
    {
      title: 'Edição 004',
      icon: 'fa-file-pdf',
      url: 'https://drive.google.com/drive/folders/1T9p8XJU4eiaUjbHVOewd1fHiOpBtvAS5?usp=sharing',
      categoryId: passageCategory.id,
      order: 4
    },
    {
      title: 'Edição 005',
      icon: 'fa-file-pdf',
      url: 'https://drive.google.com/drive/folders/1-_9_amA3EgkwhLrU8IEEnt2pwSHC06_M?usp=sharing',
      categoryId: passageCategory.id,
      order: 5
    },
    {
      title: 'Edição 006',
      icon: 'fa-file-pdf',
      url: 'https://drive.google.com/drive/folders/1jMJvKIPWPOFdFUS3Ap96JUTOFZ5xCxpu?usp=sharing',
      categoryId: passageCategory.id,
      order: 6
    },
    {
      title: 'Edição 007',
      icon: 'fa-file-pdf',
      url: 'https://drive.google.com/drive/folders/1vfpQyxpcRZs3A3YPSvhMu9KqIB95YTtN?usp=sharing',
      categoryId: passageCategory.id,
      order: 7
    },
    {
      title: 'Edição 008',
      icon: 'fa-file-pdf',
      url: 'https://drive.google.com/drive/folders/1ZD5Y4Gq3q0h3dX3hT7s8uTedUfUIAsjD?usp=sharing',
      categoryId: passageCategory.id,
      order: 8
    },
    {
      title: 'Edição 009',
      icon: 'fa-file-pdf',
      url: 'https://drive.google.com/drive/folders/1oBUGBu0OTzWbolQkuqjEDrE5mc8-FmQt?usp=sharing',
      categoryId: passageCategory.id,
      order: 9
    },
    {
      title: 'Edição 010',
      icon: 'fa-file-pdf',
      url: 'https://drive.google.com/drive/folders/1oBUGBu0OTzWbolQkuqjEDrE5mc8-FmQt?usp=sharing',
      categoryId: passageCategory.id,
      order: 10
    },
    {
      title: 'Edição 011',
      icon: 'fa-file-pdf',
      url: 'https://drive.google.com/drive/folders/1WIPOvmfOZKJhkQ_XwFnFZYZ16ClD5ntJ?usp=sharing',
      categoryId: passageCategory.id,
      order: 11
    },
    {
      title: 'Edição 012',
      icon: 'fa-file-pdf',
      url: 'https://drive.google.com/drive/folders/1oYcX4HC8DnfPntHPovwtaNHIxSC5ciJl?usp=sharing',
      categoryId: passageCategory.id,
      order: 12
    }
  ];

  for (const edition of passageEditions) {
    await prisma.book.create({ data: edition });
  }

  // Criar níveis do sistema
  const systemLevelsData = [
    "1° Est. de Combate | Hab. de Classe | Poder Geral",
    "Poder de Classe",
    "1° Poder da Trilha | Poder de Combate",
    "Poder de Classe | Ponto de Atributo",
    "Poder Geral e Paranormal | Upzinho na Hab. de Classe",
    "Poder de Classe e Combate",
    "Grau de Treinamento",
    "Poder de Classe e Paranormal",
    "2° Poder da Trilha",
    "Versatilidade | Poder Geral, Classe | Afinidade/Clausura | 1 Pt. Atributo",
    "Upzinho da Habilidade de Classe | Poder Paranormal",
    "Poder de Classe e Combate",
    "3° Poder da Trilha",
    "Poder de Classe e Paranormal",
    "Grau de Treinamento | Poder Geral, Classe | 2° Est.",
    "4° Poder de Trilha ou 1 Buffzin | Poder de Classe",
    "Upzinho da Habilidade de Classe | Poder Paranormal",
    "Poder de Classe",
    "Ponto de Atributo",
    "5°/4° Poder de Trilha | Poder de Classe, Geral, Combate e Paranormal"
  ];

  for (let i = 0; i < systemLevelsData.length; i++) {
    const level = i + 1;
    const percentage = level === 20 ? 99 : level * 5;

    await prisma.systemLevel.create({
      data: {
        level,
        percentage,
        description: systemLevelsData[i]
      }
    });
  }

  // Criar usuário admin
  const hashedPassword = await bcrypt.hash('alan2458', 10);
  await prisma.user.create({
    data: {
      username: 'admin',
      password: hashedPassword
    }
  });

  console.log('✅ Seed concluído com sucesso!');
  console.log(`📚 Criadas ${officialBooks.length} livros oficiais`);
  console.log(`🔮 Criadas ${homebrewBooks.length} homebrews`);
  console.log(`📖 Criadas ${passageEditions.length} edições da Passagem`);
  console.log(`📊 Criados 20 níveis do sistema`);
  console.log(`👤 Criado usuário admin (username: admin)`);
}

main()
  .catch((e) => {
    console.error('❌ Erro durante seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
