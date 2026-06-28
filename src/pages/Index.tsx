import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { products, typeLabels, typeIcons, ProductType } from '@/data/products';

const heroImage = 'https://cdn.poehali.dev/projects/a5eff662-bf14-4dbf-b8c7-c49c82d0b5e8/files/83cebf3a-3e8f-4ca9-8764-7d8d7562140d.jpg';

const features = [
  { icon: 'Zap', title: 'Моментальная доставка', text: 'Товар в кабинете сразу после оплаты — без ожидания.' },
  { icon: 'ShieldCheck', title: 'Только лицензии', text: 'Все ключи и материалы официальные и проверенные.' },
  { icon: 'CreditCard', title: 'Безопасная оплата', text: 'Карты, СБП и кошельки через защищённое соединение.' },
  { icon: 'Headphones', title: 'Поддержка 24/7', text: 'Поможем с активацией и ответим на любой вопрос.' },
];

const categories: { type: ProductType; emoji: string }[] = [
  { type: 'course', emoji: '🎓' },
  { type: 'key', emoji: '🔑' },
  { type: 'file', emoji: '📁' },
  { type: 'subscription', emoji: '💎' },
];

const Index = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden gradient-mesh">
        <div className="container py-20 md:py-28 grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-border mb-6 text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Более 16 000 довольных клиентов
            </div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Магазин <span className="gradient-text">цифровых</span> товаров нового поколения
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-lg">
              Курсы, лицензионные ключи, файлы и подписки. Покупай за минуту — получай моментально.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/catalog">
                <Button size="lg" className="rounded-xl gradient-primary border-0 hover:opacity-90 text-base h-12 px-8">
                  Открыть каталог
                  <Icon name="ArrowRight" size={20} className="ml-2" />
                </Button>
              </Link>
              <Link to="/subscriptions">
                <Button size="lg" variant="outline" className="rounded-xl text-base h-12 px-8">
                  Тарифы подписки
                </Button>
              </Link>
            </div>
            <div className="flex gap-8 mt-10">
              {[
                { value: '5000+', label: 'товаров' },
                { value: '16K+', label: 'клиентов' },
                { value: '4.9', label: 'рейтинг' },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-2xl md:text-3xl font-bold gradient-text">{s.value}</div>
                  <div className="text-sm text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative animate-scale-in">
            <div className="absolute -inset-4 gradient-primary rounded-3xl blur-3xl opacity-20 animate-pulse-glow" />
            <img
              src={heroImage}
              alt="Цифровой магазин"
              className="relative rounded-3xl shadow-2xl animate-float w-full"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat, i) => (
            <Link
              key={cat.type}
              to="/catalog"
              className="group bg-card border border-border rounded-2xl p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all animate-fade-in-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{cat.emoji}</div>
              <h3 className="font-bold mb-1">{typeLabels[cat.type]}</h3>
              <span className="text-sm text-primary flex items-center justify-center gap-1">
                Смотреть <Icon name="ChevronRight" size={14} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular products */}
      <section className="container py-10">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Популярные товары</h2>
            <p className="text-muted-foreground">Выбор тысяч покупателей</p>
          </div>
          <Link to="/catalog" className="hidden md:block">
            <Button variant="outline" className="rounded-xl">
              Весь каталог <Icon name="ArrowRight" size={18} className="ml-2" />
            </Button>
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="container py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="bg-card border border-border rounded-2xl p-6 hover:shadow-xl transition-all animate-fade-in-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center text-white mb-4">
                <Icon name={f.icon} size={24} />
              </div>
              <h3 className="font-bold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container py-10">
        <div className="relative overflow-hidden rounded-3xl gradient-primary animate-gradient p-10 md:p-16 text-center text-white">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Готовы начать?</h2>
            <p className="text-lg opacity-90 mb-8">
              Оформите PRO-подписку и получите безлимитный доступ ко всем товарам платформы.
            </p>
            <Link to="/subscriptions">
              <Button size="lg" className="rounded-xl bg-white text-primary hover:bg-white/90 text-base h-12 px-8">
                Выбрать тариф
                <Icon name="Sparkles" size={20} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
