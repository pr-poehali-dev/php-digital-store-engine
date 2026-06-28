import { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

const contactInfo = [
  { icon: 'Mail', title: 'Email', value: 'support@digitalshop.ru', sub: 'Ответим в течение часа' },
  { icon: 'Phone', title: 'Телефон', value: '+7 800 123-45-67', sub: 'Бесплатно по России' },
  { icon: 'MessageCircle', title: 'Telegram', value: '@digitalshop_support', sub: 'Чат поддержки 24/7' },
  { icon: 'MapPin', title: 'Офис', value: 'Москва, ул. Цифровая, 1', sub: 'Пн–Пт 10:00–19:00' },
];

const Contacts = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Сообщение отправлено! Мы скоро ответим.');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <Layout>
      <section className="gradient-mesh">
        <div className="container py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Свяжитесь <span className="gradient-text">с нами</span>
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Есть вопрос или предложение? Мы всегда на связи и рады помочь.
          </p>
        </div>
      </section>

      <section className="container py-10">
        <div className="grid lg:grid-cols-2 gap-10">
          <div className="grid sm:grid-cols-2 gap-4">
            {contactInfo.map((c, i) => (
              <div
                key={c.title}
                className="bg-card border border-border rounded-2xl p-6 hover:shadow-xl transition-all animate-fade-in-up"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center text-white mb-4">
                  <Icon name={c.icon} size={22} />
                </div>
                <h3 className="font-bold mb-1">{c.title}</h3>
                <p className="text-sm font-medium">{c.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{c.sub}</p>
              </div>
            ))}
          </div>

          <div className="bg-card border border-border rounded-2xl p-8">
            <h2 className="text-xl font-bold mb-6">Напишите нам</h2>
            <form onSubmit={submit} className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Ваше имя</label>
                <Input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Александр"
                  className="h-11 rounded-xl"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Email</label>
                <Input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="alex@example.com"
                  className="h-11 rounded-xl"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Сообщение</label>
                <Textarea
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Расскажите, чем мы можем помочь..."
                  rows={5}
                  className="rounded-xl resize-none"
                />
              </div>
              <Button type="submit" className="w-full rounded-xl gradient-primary border-0 h-12">
                Отправить сообщение
                <Icon name="Send" size={18} className="ml-2" />
              </Button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contacts;
