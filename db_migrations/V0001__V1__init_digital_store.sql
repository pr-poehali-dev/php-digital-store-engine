-- Пользователи
CREATE TABLE IF NOT EXISTS t_p83966818_php_digital_store_en.users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    password_hash VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Категории
CREATE TABLE IF NOT EXISTS t_p83966818_php_digital_store_en.categories (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL
);

INSERT INTO t_p83966818_php_digital_store_en.categories (slug, name) VALUES
    ('course', 'Курсы'),
    ('key', 'Ключи'),
    ('file', 'Файлы'),
    ('subscription', 'Подписки');

-- Товары
CREATE TABLE IF NOT EXISTS t_p83966818_php_digital_store_en.products (
    id SERIAL PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    description TEXT,
    type VARCHAR(50) NOT NULL REFERENCES t_p83966818_php_digital_store_en.categories(slug),
    category VARCHAR(255),
    price INTEGER NOT NULL,
    old_price INTEGER,
    emoji VARCHAR(20),
    gradient VARCHAR(100),
    badge VARCHAR(50),
    rating NUMERIC(2,1) DEFAULT 5.0,
    sales_count INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    delivery_content TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Наполняем товарами
INSERT INTO t_p83966818_php_digital_store_en.products (title, description, type, category, price, old_price, emoji, gradient, badge, rating, sales_count, delivery_content) VALUES
    ('React с нуля до Pro', 'Полный видеокурс по React: хуки, роутинг, состояние и реальные проекты.', 'course', 'Программирование', 4990, 9990, '⚛️', 'from-violet-500 to-fuchsia-500', 'Хит', 4.9, 1240, 'Доступ к курсу: https://course.example.com/react-pro — войдите с вашим email'),
    ('Windows 11 Pro', 'Лицензионный ключ активации Windows 11 Pro. Моментальная доставка.', 'key', 'Операционные системы', 1490, 3990, '🪟', 'from-sky-500 to-blue-600', '-63%', 4.8, 5320, 'Ваш ключ: XXXXX-AAAAA-BBBBB-CCCCC-DDDDD — инструкция по активации: support.microsoft.com'),
    ('Пресеты Lightroom Cinema', 'Набор из 50 кинематографичных пресетов для обработки фото.', 'file', 'Дизайн', 990, NULL, '🎨', 'from-orange-400 to-pink-500', NULL, 4.7, 870, 'Ссылка для скачивания: https://files.example.com/lightroom-cinema.zip (действует 7 дней)'),
    ('Premium подписка PRO', 'Безлимитный доступ ко всем материалам и обновлениям каждый месяц.', 'subscription', 'Премиум доступ', 599, NULL, '💎', 'from-purple-500 to-indigo-600', 'Популярное', 5.0, 3100, 'Подписка активирована в вашем личном кабинете автоматически'),
    ('UI/UX Дизайн в Figma', 'Научитесь создавать современные интерфейсы и прототипы с нуля.', 'course', 'Дизайн', 3990, 7490, '🖌️', 'from-pink-500 to-rose-500', NULL, 4.9, 980, 'Доступ к курсу: https://course.example.com/figma-ux — войдите с вашим email'),
    ('Office 2021 Pro Plus', 'Word, Excel, PowerPoint и другие — пожизненная лицензия.', 'key', 'Офис', 1990, 5990, '📊', 'from-red-500 to-orange-500', '-67%', 4.8, 2450, 'Ваш ключ: YYYYY-MMMMM-NNNNN-OOOOO-PPPPP — активируйте через офис.microsoft.com'),
    ('Шаблоны Notion Продуктивность', 'Готовые шаблоны для планирования задач, целей и привычек.', 'file', 'Продуктивность', 690, NULL, '📒', 'from-emerald-400 to-teal-500', NULL, 4.6, 1530, 'Шаблон Notion: https://www.notion.so/template/example — скопируйте в свой аккаунт'),
    ('AI Tools подписка', 'Доступ к нейросетям для текста, изображений и кода в одном месте.', 'subscription', 'Искусственный интеллект', 1290, NULL, '🤖', 'from-cyan-400 to-blue-500', 'Новинка', 4.9, 2200, 'Подписка на AI Tools активирована. Войдите на aitools.example.com с вашим email');

-- Заказы
CREATE TABLE IF NOT EXISTS t_p83966818_php_digital_store_en.orders (
    id SERIAL PRIMARY KEY,
    user_email VARCHAR(255) NOT NULL,
    user_name VARCHAR(255),
    product_id INTEGER NOT NULL REFERENCES t_p83966818_php_digital_store_en.products(id),
    amount INTEGER NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    payment_id VARCHAR(255),
    yookassa_payment_id VARCHAR(255),
    delivery_sent BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    paid_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_orders_email ON t_p83966818_php_digital_store_en.orders(user_email);
CREATE INDEX IF NOT EXISTS idx_orders_yookassa ON t_p83966818_php_digital_store_en.orders(yookassa_payment_id);
