import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';
import { fetchOrders, ApiOrder } from '@/lib/api';

type Tab = 'purchases' | 'subscription' | 'settings';

const typeLabels: Record<string, string> = {
  course: 'Курс', key: 'Ключ', file: 'Файл', subscription: 'Подписка',
};

const Account = () => {
  const [tab, setTab] = useState<Tab>('purchases');
  const [email, setEmail] = useState(() => localStorage.getItem('ds_email') || '');
  const [emailInput, setEmailInput] = useState('');
  const [orders, setOrders] = useState<ApiOrder[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  const tabs: { key: Tab; label: string; icon: string }[] = [
    { key: 'purchases', label: 'Мои покупки', icon: 'Package' },
    { key: 'subscription', label: 'Подписка', icon: 'Repeat' },
    { key: 'settings', label: 'Настройки', icon: 'Settings' },
  ];

  useEffect(() => {
    if (!email) return;
    setLoadingOrders(true);
    fetchOrders(email)
      .then(setOrders)
      .finally(() => setLoadingOrders(false));
  }, [email]);

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = emailInput.trim().toLowerCase();
    if (!trimmed) return;
    localStorage.setItem('ds_email', trimmed);
    setEmail(trimmed);
    setEmailInput('');
  };

  const handleLogout = () => {
    localStorage.removeItem('ds_email');
    setEmail('');
    setOrders([]);
  };

  const copyText = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Скопировано в буфер обмена');
  };

  if (!email) {
    return (
      <Layout>
        <section className="gradient-mesh min-h-[60vh] flex items-center justify-center">
          <div className="bg-card border border-border rounded-3xl p-10 w-full max-w-md text-center animate-scale-in">
            <div className="text-5xl mb-4">👋</div>
            <h1 className="text-2xl font-bold mb-2">Войти в кабинет</h1>
            <p className="text-muted-foreground mb-6">
              Введите email, который использовали при покупке, чтобы увидеть свои заказы.
            </p>
            <form onSubmit={handleEmailLogin} className="space-y-3">
              <Input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="ваш@email.com"
                className="h-12 rounded-xl text-center"
              />
              <Button type="submit" className="w-full h-12 rounded-xl gradient-primary border-0">
                <Icon name="LogIn" size={18} className="mr-2" />
                Войти
              </Button>
            </form>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="gradient-mesh">
        <div className="container py-12">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center text-white text-2xl font-bold animate-pulse-glow">
                {email[0].toUpperCase()}
              </div>
              <div>
                <h1 className="text-2xl font-bold">Личный кабинет</h1>
                <p className="text-muted-foreground">{email}</p>
              </div>
            </div>
            <Button variant="outline" className="rounded-xl" onClick={handleLogout}>
              <Icon name="LogOut" size={16} className="mr-2" />
              Выйти
            </Button>
          </div>
        </div>
      </section>

      <section className="container py-10">
        <div className="grid lg:grid-cols-4 gap-6">
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

          <div className="lg:col-span-3">
            {tab === 'purchases' && (
              <div className="animate-fade-in-up">
                <h2 className="text-xl font-bold mb-4">Мои покупки</h2>
                {loadingOrders ? (
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="bg-card border border-border rounded-2xl p-4 flex gap-4 animate-pulse">
                        <div className="w-16 h-16 rounded-xl bg-secondary shrink-0" />
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-secondary rounded w-1/2" />
                          <div className="h-3 bg-secondary rounded w-1/3" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : orders.length === 0 ? (
                  <div className="text-center py-16 bg-card border border-border rounded-2xl">
                    <div className="text-5xl mb-4">📦</div>
                    <h3 className="text-lg font-bold mb-2">Покупок пока нет</h3>
                    <p className="text-muted-foreground mb-4">Ваши покупки появятся здесь после оплаты</p>
                    <Button className="rounded-xl gradient-primary border-0" onClick={() => window.location.href = '/catalog'}>
                      Перейти в каталог
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((o) => (
                      <div key={o.id} className="bg-card border border-border rounded-2xl p-4">
                        <div className="flex items-center gap-4 mb-3">
                          <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${o.gradient} flex items-center justify-center text-2xl shrink-0`}>
                            {o.emoji}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold truncate">{o.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {typeLabels[o.type] ?? o.type} · {o.amount.toLocaleString('ru-RU')} ₽ · {o.paid_at ? new Date(o.paid_at).toLocaleDateString('ru-RU') : ''}
                            </p>
                          </div>
                          <span className="px-3 py-1 rounded-full bg-green-500/15 text-green-600 text-xs font-medium whitespace-nowrap">
                            Оплачено
                          </span>
                        </div>
                        {o.delivery_content && (
                          <div className="bg-secondary/60 rounded-xl p-3 flex items-start gap-2">
                            <Icon name="KeyRound" size={16} className="text-primary shrink-0 mt-0.5" />
                            <p className="text-sm flex-1 break-all">{o.delivery_content}</p>
                            <button onClick={() => copyText(o.delivery_content)} className="shrink-0">
                              <Icon name="Copy" size={16} className="text-muted-foreground hover:text-primary" />
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {tab === 'subscription' && (
              <div className="animate-fade-in-up">
                <h2 className="text-xl font-bold mb-4">Управление подпиской</h2>
                <div className="rounded-2xl gradient-primary p-8 text-white mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-white/80 text-sm">Текущий тариф</p>
                      <h3 className="text-3xl font-bold">Старт</h3>
                    </div>
                    <span className="text-5xl">🆓</span>
                  </div>
                  <p className="text-white/80 mb-6 text-sm">Перейдите на PRO для безлимитного доступа</p>
                  <Button
                    className="rounded-xl bg-white text-primary hover:bg-white/90"
                    onClick={() => window.location.href = '/subscriptions'}
                  >
                    Выбрать тариф PRO
                  </Button>
                </div>
              </div>
            )}

            {tab === 'settings' && (
              <div className="animate-fade-in-up">
                <h2 className="text-xl font-bold mb-4">Настройки</h2>
                <div className="bg-card border border-border rounded-2xl p-6 max-w-lg">
                  <div className="mb-5">
                    <label className="text-sm font-medium mb-1.5 block">Email</label>
                    <Input value={email} readOnly className="h-11 rounded-xl bg-secondary" />
                  </div>
                  <Button
                    variant="outline"
                    className="rounded-xl text-destructive border-destructive/30 hover:bg-destructive/10"
                    onClick={handleLogout}
                  >
                    <Icon name="LogOut" size={16} className="mr-2" />
                    Выйти из кабинета
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
