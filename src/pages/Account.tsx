import { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

type Tab = 'purchases' | 'subscription' | 'licenses' | 'settings';

const purchases = [
  { id: 1, title: 'React с нуля до Pro', type: 'Курс', emoji: '⚛️', date: '20 июня 2026', status: 'Доступен', gradient: 'from-violet-500 to-fuchsia-500' },
  { id: 2, title: 'Windows 11 Pro', type: 'Ключ', emoji: '🪟', date: '15 июня 2026', status: 'Активирован', gradient: 'from-sky-500 to-blue-600' },
  { id: 3, title: 'Пресеты Lightroom «Cinema»', type: 'Файл', emoji: '🎨', date: '10 июня 2026', status: 'Скачан', gradient: 'from-orange-400 to-pink-500' },
];

const licenses = [
  { id: 1, product: 'Windows 11 Pro', key: 'XXXXX-A4B2C-D8E9F-G1H2J-3K4L5', status: 'Активирован', expires: 'Бессрочно' },
  { id: 2, product: 'Office 2021 Pro Plus', key: 'YYYYY-M6N7P-Q8R9S-T1U2V-3W4X5', status: 'Не активирован', expires: 'Бессрочно' },
  { id: 3, product: 'AI Tools подписка', key: 'ZZZZZ-1A2B3-C4D5E-F6G7H-8I9J0', status: 'Активна', expires: '24 июля 2026' },
];

const Account = () => {
  const [tab, setTab] = useState<Tab>('purchases');

  const tabs: { key: Tab; label: string; icon: string }[] = [
    { key: 'purchases', label: 'Мои покупки', icon: 'Package' },
    { key: 'subscription', label: 'Подписка', icon: 'Repeat' },
    { key: 'licenses', label: 'Лицензии', icon: 'KeyRound' },
    { key: 'settings', label: 'Настройки', icon: 'Settings' },
  ];

  const copyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    toast.success('Ключ скопирован в буфер обмена');
  };

  return (
    <Layout>
      <section className="gradient-mesh">
        <div className="container py-12">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center text-white text-3xl font-bold animate-pulse-glow">
              А
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Привет, Александр! 👋</h1>
              <p className="text-muted-foreground">alex@example.com · PRO подписка</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-10">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-card border border-border rounded-2xl p-3 sticky top-24">
              {tabs.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all mb-1 ${
                    tab === t.key
                      ? 'gradient-primary text-white'
                      : 'text-muted-foreground hover:bg-secondary'
                  }`}
                >
                  <Icon name={t.icon} size={18} />
                  {t.label}
                </button>
              ))}
            </div>
          </aside>

          {/* Content */}
          <div className="lg:col-span-3">
            {tab === 'purchases' && (
              <div className="space-y-4 animate-fade-in-up">
                <h2 className="text-xl font-bold mb-4">Мои покупки</h2>
                {purchases.map((p) => (
                  <div key={p.id} className="bg-card border border-border rounded-2xl p-4 flex items-center gap-4 hover:shadow-lg transition-all">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${p.gradient} flex items-center justify-center text-2xl shrink-0`}>
                      {p.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold truncate">{p.title}</h3>
                      <p className="text-sm text-muted-foreground">{p.type} · куплено {p.date}</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-green-500/15 text-green-600 text-xs font-medium whitespace-nowrap">
                      {p.status}
                    </span>
                    <Button size="sm" className="rounded-xl gradient-primary border-0 hidden sm:flex">
                      <Icon name="Download" size={16} className="mr-1" /> Открыть
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {tab === 'subscription' && (
              <div className="animate-fade-in-up">
                <h2 className="text-xl font-bold mb-4">Управление подпиской</h2>
                <div className="rounded-2xl gradient-primary p-8 text-white mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-white/80 text-sm">Текущий тариф</p>
                      <h3 className="text-3xl font-bold">PRO</h3>
                    </div>
                    <span className="text-5xl">💎</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-white/90 mb-6">
                    <Icon name="Calendar" size={16} />
                    Следующее списание 599 ₽ — 24 июля 2026
                  </div>
                  <div className="flex gap-3">
                    <Button className="rounded-xl bg-white text-primary hover:bg-white/90">Сменить тариф</Button>
                    <Button
                      variant="outline"
                      className="rounded-xl border-white/40 text-white hover:bg-white/10"
                      onClick={() => toast('Подписка будет активна до конца оплаченного периода')}
                    >
                      Отменить
                    </Button>
                  </div>
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    { label: 'Активна дней', value: '124', icon: 'Clock' },
                    { label: 'Использовано товаров', value: '38', icon: 'Package' },
                    { label: 'Сэкономлено', value: '24 600 ₽', icon: 'PiggyBank' },
                  ].map((s) => (
                    <div key={s.label} className="bg-card border border-border rounded-2xl p-5">
                      <Icon name={s.icon} size={22} className="text-primary mb-2" />
                      <div className="text-2xl font-bold gradient-text">{s.value}</div>
                      <p className="text-sm text-muted-foreground">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === 'licenses' && (
              <div className="animate-fade-in-up">
                <h2 className="text-xl font-bold mb-4">Лицензии и ключи</h2>
                <div className="space-y-4">
                  {licenses.map((l) => (
                    <div key={l.id} className="bg-card border border-border rounded-2xl p-5">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-bold">{l.product}</h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            l.status === 'Не активирован'
                              ? 'bg-amber-500/15 text-amber-600'
                              : 'bg-green-500/15 text-green-600'
                          }`}
                        >
                          {l.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 bg-secondary rounded-xl p-3 mb-3">
                        <Icon name="KeyRound" size={16} className="text-muted-foreground" />
                        <code className="text-sm flex-1 font-mono truncate">{l.key}</code>
                        <Button size="icon" variant="ghost" className="rounded-lg shrink-0" onClick={() => copyKey(l.key)}>
                          <Icon name="Copy" size={16} />
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <Icon name="Infinity" size={14} /> Срок действия: {l.expires}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === 'settings' && (
              <div className="animate-fade-in-up">
                <h2 className="text-xl font-bold mb-4">Настройки профиля</h2>
                <div className="bg-card border border-border rounded-2xl p-6 space-y-5 max-w-lg">
                  {[
                    { label: 'Имя', value: 'Александр', type: 'text' },
                    { label: 'Email', value: 'alex@example.com', type: 'email' },
                    { label: 'Телефон', value: '+7 999 123-45-67', type: 'tel' },
                  ].map((f) => (
                    <div key={f.label}>
                      <label className="text-sm font-medium mb-1.5 block">{f.label}</label>
                      <input
                        defaultValue={f.value}
                        type={f.type}
                        className="w-full h-11 px-4 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                  ))}
                  <Button className="rounded-xl gradient-primary border-0" onClick={() => toast.success('Изменения сохранены')}>
                    Сохранить изменения
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Account;
