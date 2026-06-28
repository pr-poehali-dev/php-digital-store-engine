import { ApiProduct } from '@/lib/api';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const typeLabels: Record<string, string> = {
  course: 'Курсы',
  key: 'Ключи',
  file: 'Файлы',
  subscription: 'Подписки',
};

const typeIcons: Record<string, string> = {
  course: 'GraduationCap',
  key: 'KeyRound',
  file: 'FileDown',
  subscription: 'Repeat',
};

interface Props {
  product: ApiProduct;
  index?: number;
  onBuy?: (product: ApiProduct) => void;
}

const ProductCard = ({ product, index = 0, onBuy }: Props) => {
  return (
    <div
      className="group relative bg-card rounded-2xl border border-border overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 animate-fade-in-up"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className={`relative h-40 bg-gradient-to-br ${product.gradient} flex items-center justify-center overflow-hidden`}>
        <span className="text-6xl group-hover:scale-125 transition-transform duration-500">{product.emoji}</span>
        {product.badge && (
          <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 text-xs font-bold text-foreground backdrop-blur">
            {product.badge}
          </span>
        )}
        <span className="absolute top-3 right-3 px-3 py-1 rounded-full glass text-xs font-medium text-white flex items-center gap-1">
          <Icon name={typeIcons[product.type] ?? 'Package'} size={12} />
          {typeLabels[product.type] ?? product.type}
        </span>
      </div>

      <div className="p-5">
        <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
        <h3 className="font-bold text-base mb-2 line-clamp-1">{product.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 min-h-[2.5rem]">{product.description}</p>

        <div className="flex items-center gap-3 mb-4 text-sm">
          <span className="flex items-center gap-1 text-amber-500 font-medium">
            <Icon name="Star" size={14} className="fill-amber-500" />
            {product.rating}
          </span>
          <span className="text-muted-foreground flex items-center gap-1">
            <Icon name="ShoppingBag" size={14} />
            {product.sales_count}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-xl font-bold gradient-text">{product.price.toLocaleString('ru-RU')} ₽</span>
            {product.old_price && (
              <span className="ml-2 text-sm text-muted-foreground line-through">
                {product.old_price.toLocaleString('ru-RU')} ₽
              </span>
            )}
          </div>
          <Button
            size="icon"
            className="rounded-xl gradient-primary border-0 hover:opacity-90"
            onClick={() => onBuy?.(product)}
          >
            <Icon name="ShoppingCart" size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
