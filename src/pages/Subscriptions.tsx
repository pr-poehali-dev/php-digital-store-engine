import { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { plans } from '@/data/products';

const Subscriptions = () => {
  const [yearly, setYearly] = useState(false);

  const compareRows = [
    { feature: 'Доступ к товарам', start: '5 бесплатных', pro: 'Безлимит', business: 'Безлимит' },
    { feature: 'Количество устройств', start: '1', pro: '5', business: '25' },
    { feature: 'Поддержка', start: 'Базовая', pro: '24/7 приоритет', business: 'Персональный менеджер' },
    { feature: 'Ранний доступ к новинкам', start: false, pro: true, business: true },
    { feature: 'API и интеграции', start: false, pro: false, business: true },
    { feature: 'Командная аналитика', start: false, pro: false, business: true },
  ];

  return (
    <Layout>
      <section className="gradient-mesh">
        <div className="container py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Выберите <span className="gradient-text">тариф</span>
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Гибкие подписки для частных пользователей и команд. Отмена в любой момент.
          </p>

          <div className="inline-flex items-center gap-3 p-1.5 rounded-xl bg-card border border-border">
            <button
              onClick={() => setYearly(false)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${!yearly ? 'gradient-primary text-white' : 'text-muted-foreground'}`}
            >
              Помесячно
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${yearly ? 'gradient-primary text-white' : 'text-muted-foreground'}`}
            >
              Годовая
              <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-600">−20%</span>
            </button>
          </div>
        </div>
      </section>

      <section className="container py-10">
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => {
            const price = yearly ? Math.round(plan.price * 12 * 0.8) : plan.price;
            const period = plan.price === 0 ? plan.period : yearly ? 'в год' : 'в месяц';
            return (
              <div
                key={plan.name}
                className={`relative rounded-3xl p-8 animate-fade-in-up transition-all ${
                  plan.highlighted
                    ? 'gradient-primary text-white shadow-2xl scale-105 z-10'
                    : 'bg-card border border-border'
                }`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {plan.badge && (
                  <span
                    className={`absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold ${
                      plan.highlighted ? 'bg-white text-primary' : 'gradient-primary text-white'
                    }`}
                  >
                    {plan.badge}
                  </span>
                )}
                <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                <p className={`text-sm mb-6 ${plan.highlighted ? 'text-white/80' : 'text-muted-foreground'}`}>
                  {plan.description}
                </p>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{price.toLocaleString('ru-RU')} ₽</span>
                  <span className={`text-sm ${plan.highlighted ? 'text-white/80' : 'text-muted-foreground'}`}> {period}</span>
                </div>
                <Button
                  className={`w-full rounded-xl mb-6 h-12 ${
                    plan.highlighted
                      ? 'bg-white text-primary hover:bg-white/90'
                      : 'gradient-primary border-0 text-white hover:opacity-90'
                  }`}
                >
                  {plan.price === 0 ? 'Начать бесплатно' : 'Оформить подписку'}
                </Button>
                <ul className="space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Icon
                        name="Check"
                        size={18}
                        className={`mt-0.5 shrink-0 ${plan.highlighted ? 'text-white' : 'text-primary'}`}
                      />
                      <span className={plan.highlighted ? '' : 'text-muted-foreground'}>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* Comparison */}
      <section className="container py-16">
        <h2 className="text-3xl font-bold text-center mb-10">Сравнение тарифов</h2>
        <div className="overflow-x-auto rounded-2xl border border-border">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="bg-secondary/50">
                <th className="text-left p-5 font-semibold">Возможности</th>
                <th className="p-5 font-semibold">Старт</th>
                <th className="p-5 font-semibold gradient-text">PRO</th>
                <th className="p-5 font-semibold">Бизнес</th>
              </tr>
            </thead>
            <tbody>
              {compareRows.map((row, i) => (
                <tr key={row.feature} className={i % 2 ? 'bg-secondary/20' : ''}>
                  <td className="p-5 text-sm font-medium">{row.feature}</td>
                  {(['start', 'pro', 'business'] as const).map((col) => (
                    <td key={col} className="p-5 text-center text-sm">
                      {typeof row[col] === 'boolean' ? (
                        row[col] ? (
                          <Icon name="Check" size={18} className="text-primary mx-auto" />
                        ) : (
                          <Icon name="Minus" size={18} className="text-muted-foreground/40 mx-auto" />
                        )
                      ) : (
                        <span className="text-muted-foreground">{row[col]}</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </Layout>
  );
};

export default Subscriptions;
