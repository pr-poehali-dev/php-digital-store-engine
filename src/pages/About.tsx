import Layout from '@/components/Layout';
import Icon from '@/components/ui/icon';

const stats = [
  { value: '16 000+', label: 'Довольных клиентов' },
  { value: '5 000+', label: 'Цифровых товаров' },
  { value: '50+', label: 'Стран мира' },
  { value: '4.9', label: 'Средний рейтинг' },
];

const values = [
  { icon: 'Rocket', title: 'Скорость', text: 'Доставка товара за секунды после оплаты — без ожидания и очередей.' },
  { icon: 'ShieldCheck', title: 'Надёжность', text: 'Только официальные лицензии и проверенные материалы от авторов.' },
  { icon: 'Heart', title: 'Забота', text: 'Поддержка 24/7 и честный возврат, если что-то пошло не так.' },
  { icon: 'TrendingUp', title: 'Развитие', text: 'Каждую неделю добавляем новые курсы, ключи и инструменты.' },
];

const About = () => {
  return (
    <Layout>
      <section className="gradient-mesh">
        <div className="container py-16 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Мы делаем <span className="gradient-text">цифровой мир</span> доступнее
          </h1>
          <p className="text-lg text-muted-foreground">
            DigitalShop — это маркетплейс цифровых товаров, где каждый найдёт курсы для роста,
            ключи для работы, файлы для творчества и подписки для удобства. Наша миссия — сделать
            знания и инструменты доступными в один клик.
          </p>
        </div>
      </section>

      <section className="container py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="bg-card border border-border rounded-2xl p-6 text-center animate-fade-in-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">{s.value}</div>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container py-12">
        <h2 className="text-3xl font-bold text-center mb-10">Наши ценности</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <div
              key={v.title}
              className="bg-card border border-border rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all animate-fade-in-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center text-white mb-4">
                <Icon name={v.icon} size={24} />
              </div>
              <h3 className="font-bold mb-2">{v.title}</h3>
              <p className="text-sm text-muted-foreground">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container py-12">
        <div className="rounded-3xl bg-secondary/40 border border-border p-10 md:p-14 text-center">
          <span className="text-5xl mb-4 block">🚀</span>
          <h2 className="text-2xl md:text-3xl font-bold mb-4 max-w-2xl mx-auto">
            С 2021 года помогаем людям учиться, работать и творить эффективнее
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Команда DigitalShop состоит из энтузиастов технологий, которые верят: правильный
            инструмент в нужный момент способен изменить всё.
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default About;
