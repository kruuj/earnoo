export type Language = "en" | "ru";

export type PortfolioCopy = {
  nav: {
    ariaLabel: string;
    logoLabel: string;
    home: string;
    work: string;
    about: string;
    contact: string;
    languageLabel: string;
    switchToEnglish: string;
    switchToRussian: string;
  };
  hero: {
    collection: string;
    roles: readonly string[];
    rolePrefix: string;
    roleSuffix: string;
    description: string;
    resume: string;
    reachOut: string;
    scroll: string;
  };
  work: {
    eyebrow: string;
    title: string;
    italic: string;
    description: string;
    action: string;
    view: string;
    viewAriaPrefix: string;
    projects: ReadonlyArray<{
      category: string;
      alt: string;
    }>;
  };
  about: {
    eyebrow: string;
    title: string;
    italic: string;
    description: string;
    action: string;
    portraitAlt: string;
    role: string;
    focus: string;
    motivation: string;
    quote: string;
    partnersLabel: string;
    partnerNames: readonly string[];
    careerTitle: string;
    career: ReadonlyArray<{
      company: string;
      role: string;
      period: string;
    }>;
    educationTitle: string;
    certificate: string;
    toolsTitle: string;
    toolDetails: readonly string[];
  };
  explorations: {
    eyebrow: string;
    title: string;
    italic: string;
    description: string;
    openPrefix: string;
    openSuffix: string;
    alts: readonly string[];
  };
  stats: readonly string[];
  footer: {
    marquee: string;
    eyebrow: string;
    title: string;
    italic: string;
    availability: string;
  };
  lightbox: {
    close: string;
  };
  loading: {
    label: string;
    heading: string;
    words: readonly string[];
  };
};

export const portfolioCopy = {
  en: {
    nav: {
      ariaLabel: "Primary navigation",
      logoLabel: "Erkinbekov Arnoo, home",
      home: "Home",
      work: "Work",
      about: "About Me",
      contact: "Contact Me",
      languageLabel: "Language",
      switchToEnglish: "Switch language to English",
      switchToRussian: "Switch language to Russian",
    },
    hero: {
      collection: "Collection '26",
      roles: ["Creative", "Designer", "UX Enthusiast"],
      rolePrefix: "A",
      roleSuffix: "lives in Kyrgyzstan.",
      description:
        "Designing seamless digital interactions by focusing on the unique nuances that bring systems to life.",
      resume: "CV / Resume",
      reachOut: "Reach out...",
      scroll: "Scroll",
    },
    work: {
      eyebrow: "Selected Work",
      title: "Featured",
      italic: "projects",
      description: "A selection of projects I've worked on, from concept to launch.",
      action: "View all work",
      view: "View",
      viewAriaPrefix: "View project",
      projects: [
        {
          category: "UX Research · Product Design · Mobile App · Desktop",
          alt: "FINCA Bank mobile and desktop product project preview",
        },
        {
          category: "Landing Page · Web · Branding",
          alt: "Bishkek Petroleum landing page project preview",
        },
        {
          category: "Mobile App · UX/UI Design",
          alt: "TOP Football mobile application project preview",
        },
        {
          category: "Landing Page · Web · Branding",
          alt: "APAP University landing page project preview",
        },
      ],
    },
    about: {
      eyebrow: "About Me",
      title: "Who",
      italic: "am I?",
      description:
        "Product designer with a background in communication design, building products and the systems that help them scale.",
      action: "Let's talk",
      portraitAlt: "Abstract iridescent fabric artwork",
      role: "UX Researcher & Product Designer",
      focus: "Focused on context, aesthetics and clarity.",
      motivation: "Powered by a deep love for design, movement and thoughtful systems.",
      quote: "I also had the opportunity to work with major Kyrgyz businesses and companies.",
      partnersLabel: "Selected client collaborations",
      partnerNames: ["Bishkek Petroleum", "Bay Tash Group", "Selected Kyrgyz partner"],
      careerTitle: "Recent career",
      career: [
        {
          company: "FINCA Bank",
          role: "UX Researcher & Middle Product Designer",
          period: "2026 — current",
        },
        {
          company: "Project-Based Work",
          role: "Independent Designer, Branding & Product Design",
          period: "2025",
        },
        {
          company: "Oracle Digital",
          role: "UX/UI Designer",
          period: "2024",
        },
      ],
      educationTitle: "Education",
      certificate: "Google UX Design Certificate",
      toolsTitle: "Tools I like to use",
      toolDetails: [
        "general design tool",
        "visual generations",
        "research & ideation",
        "product motion",
        "coding + agentic work",
        "project management",
      ],
    },
    explorations: {
      eyebrow: "Explorations",
      title: "Visual",
      italic: "playground",
      description:
        "Uncommissioned studies, happy accidents, and ideas made simply to see where they lead.",
      openPrefix: "Open",
      openSuffix: "in lightbox",
      alts: [
        "Credit Finca visual exploration",
        "TOP Football visual exploration",
        "APAP Academy visual exploration",
        "Bishkek Petroleum visual exploration",
        "Yldam Express visual exploration",
        "Bay Tash Group visual exploration",
      ],
    },
    stats: ["Years Experience", "Projects Done", "Satisfied Clients"],
    footer: {
      marquee: "Building the future",
      eyebrow: "Have something in mind?",
      title: "Let's make it",
      italic: "real.",
      availability: "Available for projects",
    },
    lightbox: {
      close: "Close lightbox",
    },
    loading: {
      label: "Loading portfolio",
      heading: "Portfolio",
      words: ["Design", "Create", "Inspire"],
    },
  },
  ru: {
    nav: {
      ariaLabel: "Основная навигация",
      logoLabel: "Эркинбеков Арноо, главная",
      home: "Главная",
      work: "Проекты",
      about: "Обо мне",
      contact: "Связаться",
      languageLabel: "Язык",
      switchToEnglish: "Переключить язык на английский",
      switchToRussian: "Переключить язык на русский",
    },
    hero: {
      collection: "Коллекция '26",
      roles: ["Креативный решала", "Продуктовый дизайнер", "UX-энтузиаст"],
      rolePrefix: " ",
      roleSuffix: "из Кыргызстана.",
      description:
        "Создаю понятный и цельный цифровой пользовательский опыт, уделяя внимание деталям, которые облегчают взаимодействие.",
      resume: "CV / Резюме",
      reachOut: "Связаться",
      scroll: "Листайте",
    },
    work: {
      eyebrow: "Избранные работы",
      title: "Лучшие",
      italic: "проекты",
      description: "Подборка проектов, над которыми я работал: от идеи до запуска.",
      action: "Все проекты",
      view: "Смотреть",
      viewAriaPrefix: "Открыть проект",
      projects: [
        {
          category: "UX-исследование · Продуктовый дизайн · Мобильное приложение · Десктоп",
          alt: "Превью мобильного и веб-продукта FINCA Bank",
        },
        {
          category: "Лендинг · Веб · Брендинг",
          alt: "Превью лендинга Bishkek Petroleum",
        },
        {
          category: "Мобильное приложение · UX/UI-дизайн",
          alt: "Превью мобильного приложения TOP Football",
        },
        {
          category: "Лендинг · Веб · Брендинг",
          alt: "Превью лендинга APAP University",
        },
      ],
    },
    about: {
      eyebrow: "Обо мне",
      title: "Кто",
      italic: "я?",
      description:
        "Продуктовый дизайнер с опытом работы в исследованиях. Работаю над продуктами и системами, которые помогают бизнесу расти.",
      action: "Обсудить проект",
      portraitAlt: "Абстрактная переливающаяся композиция",
      role: "UX-исследователь и продуктовый дизайнер",
      focus: "Сосредоточен на контексте, эстетике и ясности.",
      motivation: "Любовь к дизайну, движению и продуманным решениям помогают мне двигаться вперёд.",
      quote: "Мне также довелось поработать с некоторыми крупными компаниями в КР.",
      partnersLabel: "Избранные клиенты",
      partnerNames: ["Bishkek Petroleum", "Bay Tash Group", "Кыргызстанский партнёр"],
      careerTitle: "Опыт работы",
      career: [
        {
          company: "FINCA Bank",
          role: "UX-исследователь и продуктовый дизайнер уровня Middle",
          period: "2026 — настоящее время",
        },
        {
          company: "Проектная работа",
          role: "Проектный дизайнер, брендинг и продуктовый дизайн",
          period: "2025",
        },
        {
          company: "Oracle Digital",
          role: "UX/UI-дизайнер",
          period: "2024",
        },
      ],
      educationTitle: "Образование",
      certificate: "Сертификат Google UX Design",
      toolsTitle: "Инструменты, которые я использую",
      toolDetails: [
        "основной инструмент дизайна",
        "генерация визуальных материалов",
        "исследования и поиск идей",
        "моушн-дизайн",
        "разработка и работа с ИИ-агентами",
        "управление проектами",
      ],
    },
    explorations: {
      eyebrow: "Эксперименты",
      title: "Визуальная",
      italic: "лаборатория",
      description:
        "Некоммерческие исследования, удачные случайности и идеи, созданные из любопытства.",
      openPrefix: "Открыть",
      openSuffix: "в полноэкранном просмотре",
      alts: [
        "Визуальный эксперимент Credit Finca",
        "Визуальный эксперимент TOP Football",
        "Визуальный эксперимент APAP Academy",
        "Визуальный эксперимент Bishkek Petroleum",
        "Визуальный эксперимент Yldam Express",
        "Визуальный эксперимент Bay Tash Group",
      ],
    },
    stats: ["Лет опыта", "Завершённых проектов", "Довольных клиентов"],
    footer: {
      marquee: "Удобство, простота,будущее",
      eyebrow: "Заинтересованы?",
      title: "Давайте",
      italic: "поговорим!",
      availability: "Открыт к предложениям",
    },
    lightbox: {
      close: "Закрыть изображение",
    },
    loading: {
      label: "Загрузка портфолио",
      heading: "Портфолио",
      words: ["Design", "Create", "Inspire"],
    },
  },
} satisfies Record<Language, PortfolioCopy>;
