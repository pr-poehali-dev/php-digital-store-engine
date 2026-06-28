import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { createPayment, ApiProduct } from '@/lib/api';
import { toast } from 'sonner';

interface Props {
  product: ApiProduct | null;
  open: boolean;
  onClose: () => void;
}

const BuyModal = ({ product, open, onClose }: Props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleBuy = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;
    setLoading(true);
    try {
      const { payment_url } = await createPayment({
        product_id: product.id,
        email,
        name,
      });
      window.location.href = payment_url;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Попробуйте ещё раз';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="rounded-3xl max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Оформление заказа</DialogTitle>
        </DialogHeader>

        <div className={`flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-br ${product.gradient}`}>
          <span className="text-4xl">{product.emoji}</span>
          <div className="text-white">
            <p className="font-bold text-base">{product.title}</p>
            <p className="text-2xl font-bold">{product.price.toLocaleString('ru-RU')} ₽</p>
          </div>
        </div>

        <form onSubmit={handleBuy} className="space-y-4 pt-2">
          <div>
            <label className="text-sm font-medium mb-1.5 block">Ваше имя</label>
            <Input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Иван Иванов"
              className="h-11 rounded-xl"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Email для доставки товара</label>
            <Input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ivan@example.com"
              className="h-11 rounded-xl"
            />
          </div>

          <div className="p-3 rounded-xl bg-secondary/60 text-sm text-muted-foreground flex gap-2">
            <Icon name="Info" size={16} className="shrink-0 mt-0.5 text-primary" />
            После оплаты товар будет доставлен на указанный email мгновенно.
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-xl gradient-primary border-0 text-base"
          >
            {loading ? (
              <><Icon name="Loader2" size={20} className="mr-2 animate-spin" /> Переход к оплате...</>
            ) : (
              <><Icon name="CreditCard" size={20} className="mr-2" /> Оплатить {product.price.toLocaleString('ru-RU')} ₽</>
            )}
          </Button>

          <p className="text-center text-xs text-muted-foreground flex items-center justify-center gap-2">
            <Icon name="Lock" size={13} /> Защищённая оплата через ЮКассу
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BuyModal;
