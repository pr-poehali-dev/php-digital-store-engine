export type ProductType = 'course' | 'key' | 'file' | 'subscription';

export interface Product {
  id: number;
  title: string;
  type: ProductType;
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
  sales: number;
  emoji: string;
  gradient: string;
  badge?: string;
  description: string;
}

export const typeLabels: Record<ProductType, string> = {
  course: 'Курсы',
  key: 'Ключи',
  file: 'Файлы',
  subscription: 'Подписки',
};

export const typeIcons: Record<ProductType, string> = {
  course: 'GraduationCap',
  key: 'KeyRound',
  file: 'FileDown',
  subscription: 'Repeat',
};

export const products: Product[] = [
  {
    id: 1,
    title: 'React с нуля до Pro',
    type: 'course',
    category: 'Программирование',
    price: 4990,
    oldPrice: 9990,
    rating: 4.9,
    sales: 1240,
    emoji: '⚛️',
    gradient: 'from-violet-500 to-fuchsia-500',
    badge: 'Хит',
    description: 'Полный видеокурс по React: хуки, роутинг, состояние и реальные проекты.',
  },
  {
    id: 2,
    title: 'Windows 11 Pro',
    type: 'key',
    category: 'Операционные системы',
    price: 1490,
    oldPrice: 3990,
    rating: 4.8,
    sales: 5320,
    emoji: '🪟',
    gradient: 'from-sky-500 to-blue-600',
    badge: '-63%',
    description: 'Лицензионный ключ активации Windows 11 Pro. Моментальная доставка.',
  },
  {
    id: 3,
    title: 'Пресеты Lightroom «Cinema»',
    type: 'file',
    category: 'Дизайн',
    price: 990,
    rating: 4.7,
    sales: 870,
    emoji: '🎨',
    gradient: 'from-orange-400 to-pink-500',
    description: 'Набор из 50 кинематографичных пресетов для обработки фото.',
  },
  {
    id: 4,
    title: 'Premium подписка PRO',
    type: 'subscription',
    category: 'Премиум доступ',
    price: 599,
    rating: 5.0,
    sales: 3100,
    emoji: '💎',
    gradient: 'from-purple-500 to-indigo-600',
    badge: 'Популярное',
    description: 'Безлимитный доступ ко всем материалам и обновлениям каждый месяц.',
  },
  {
    id: 5,
    title: 'UI/UX Дизайн в Figma',
    type: 'course',
    category: 'Дизайн',
    price: 3990,
    oldPrice: 7490,
    rating: 4.9,
    sales: 980,
    emoji: '🖌️',
    gradient: 'from-pink-500 to-rose-500',
    description: 'Научитесь создавать современные интерфейсы и прототипы с нуля.',
  },
  {
    id: 6,
    title: 'Office 2021 Pro Plus',
    type: 'key',
    category: 'Офис',
    price: 1990,
    oldPrice: 5990,
    rating: 4.8,
    sales: 2450,
    emoji: '📊',
    gradient: 'from-red-500 to-orange-500',
    badge: '-67%',
    description: 'Word, Excel, PowerPoint и другие — пожизненная лицензия.',
  },
  {
    id: 7,
    title: 'Шаблоны Notion «Продуктивность»',
    type: 'file',
    category: 'Продуктивность',
    price: 690,
    rating: 4.6,
    sales: 1530,
    emoji: '📒',
    gradient: 'from-emerald-400 to-teal-500',
    description: 'Готовые шаблоны для планирования задач, целей и привычек.',
  },
  {
    id: 8,
    title: 'AI Tools подписка',
    type: 'subscription',
    category: 'Искусственный интеллект',
    price: 1290,
    rating: 4.9,
    sales: 2200,
    emoji: '🤖',
    gradient: 'from-cyan-400 to-blue-500',
    badge: 'Новинка',
    description: 'Доступ к нейросетям для текста, изображений и кода в одном месте.',
  },
];

export interface Plan {
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  badge?: string;
}

export const plans: Plan[] = [
  {
    name: 'Старт',
    price: 0,
    period: 'навсегда',
    description: 'Для знакомства с платформой',
    features: ['Доступ к 5 бесплатным товарам', 'Базовая поддержка', '1 устройство', 'Обновления раз в месяц'],
  },
  {
    name: 'PRO',
    price: 599,
    period: 'в месяц',
    description: 'Лучший выбор для большинства',
    features: ['Безлимитный доступ ко всем товарам', 'Приоритетная поддержка 24/7', 'До 5 устройств', 'Ранний доступ к новинкам', 'Эксклюзивные материалы'],
    highlighted: true,
    badge: 'Популярный',
  },
  {
    name: 'Бизнес',
    price: 1990,
    period: 'в месяц',
    description: 'Для команд и компаний',
    features: ['Всё из PRO', 'До 25 пользователей', 'Командная аналитика', 'Персональный менеджер', 'API и интеграции', 'Кастомные лицензии'],
    badge: 'Команда',
  },
];

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  emoji: string;
  gradient: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Как выбрать онлайн-курс и не потратить деньги впустую',
    excerpt: 'Разбираем критерии хорошего курса: программа, преподаватели, обратная связь и сертификаты.',
    category: 'Обучение',
    date: '24 июня 2026',
    readTime: '5 мин',
    emoji: '🎓',
    gradient: 'from-violet-500 to-purple-600',
  },
  {
    id: 2,
    title: 'Цифровые лицензии: что нужно знать перед покупкой',
    excerpt: 'Чем отличается OEM от Retail, как активировать ключ и что делать при проблемах.',
    category: 'Лицензии',
    date: '18 июня 2026',
    readTime: '7 мин',
    emoji: '🔑',
    gradient: 'from-sky-500 to-blue-600',
  },
  {
    id: 3,
    title: 'Топ-10 нейросетей для работы в 2026 году',
    excerpt: 'Обзор лучших AI-инструментов для дизайнеров, копирайтеров и разработчиков.',
    category: 'Технологии',
    date: '10 июня 2026',
    readTime: '8 мин',
    emoji: '🤖',
    gradient: 'from-cyan-400 to-teal-500',
  },
];

export interface FaqItem {
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    question: 'Как происходит доставка цифровых товаров?',
    answer: 'После оплаты товар моментально появляется в вашем личном кабинете в разделе «Мои покупки». Ключи и файлы доступны для скачивания сразу, курсы открываются автоматически.',
  },
  {
    question: 'Какие способы оплаты вы принимаете?',
    answer: 'Мы принимаем банковские карты Visa, Mastercard, МИР, а также электронные кошельки и СБП. Все платежи проходят через защищённое соединение.',
  },
  {
    question: 'Можно ли вернуть деньги за покупку?',
    answer: 'Да, в течение 14 дней после покупки вы можете оформить возврат, если товар не подошёл и не был использован (для ключей — если ключ не активирован).',
  },
  {
    question: 'Как работает подписка?',
    answer: 'Подписка даёт безлимитный доступ ко всем материалам выбранного тарифа. Списание происходит автоматически раз в месяц, отменить можно в любой момент в личном кабинете.',
  },
  {
    question: 'Как активировать лицензионный ключ?',
    answer: 'В каждом товаре есть подробная инструкция по активации. Если возникнут трудности — наша поддержка поможет 24/7 в чате или по почте.',
  },
  {
    question: 'Безопасно ли покупать у вас?',
    answer: 'Абсолютно. Мы используем шифрование данных, защищённые платёжные системы и не храним данные ваших карт. Все товары — официальные и лицензионные.',
  },
];
