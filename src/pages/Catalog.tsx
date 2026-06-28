import { useState, useEffect, useMemo } from 'react';
import Layout from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import BuyModal from '@/components/BuyModal';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { fetchProducts, ApiProduct } from '@/lib/api';

const filters = [
  { key: 'all', label: 'Все товары' },
  { key: 'course', label: 'Курсы', icon: 'GraduationCap' },
  { key: 'key', label: 'Ключи', icon: 'KeyRound' },
  { key: 'file', label: 'Файлы', icon: 'FileDown' },
  { key: 'subscription', label: 'Подписки', icon: 'Repeat' },
];

const Catalog = () => {
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState('all');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<'popular' | 'cheap' | 'expensive'>('popular');
  const [buyProduct, setBuyProduct] = useState<ApiProduct | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchProducts()
      .then(setProducts)
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    let list = active === 'all' ? products : products.filter((p) => p.type === active);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((p) => p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    }
    if (sort === 'cheap') list = [...list].sort((a, b) => a.price - b.price);
    if (sort === 'expensive') list = [...list].sort((a, b) => b.price - a.price);
    if (sort === 'popular') list = [...list].sort((a, b) => b.sales_count - a.sales_count);
    return list;
  }, [products, active, search, sort]);

  return (
    <Layout>
      <section className="gradient-mesh">
        <div className="container py-14 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Каталог <span className="gradient-text">товаров</span>
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Курсы, ключи, файлы и подписки — всё в одном месте
          </p>
        </div>
      </section>

      <section className="container py-10">
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Icon name="Search" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Поиск товаров..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-11 h-12 rounded-xl"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {([
              { key: 'popular', label: 'Популярные' },
              { key: 'cheap', label: 'Дешевле' },
              { key: 'expensive', label: 'Дороже' },
            ] as const).map((s) => (
              <button
                key={s.key}
                onClick={() => setSort(s.key)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium border transition-all h-12 ${
                  sort === s.key
                    ? 'gradient-primary text-white border-transparent shadow-lg'
                    : 'bg-card border-border text-muted-foreground hover:text-foreground'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActive(f.key)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 transition-all ${
                active === f.key
                  ? 'gradient-primary text-white shadow-lg'
                  : 'bg-card border border-border text-muted-foreground hover:text-foreground'
              }`}
            >
              {f.icon && <Icon name={f.icon} size={16} />}
              {f.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl overflow-hidden animate-pulse">
                <div className="h-40 bg-secondary" />
                <div className="p-5 space-y-3">
                  <div className="h-3 bg-secondary rounded w-1/3" />
                  <div className="h-4 bg-secondary rounded w-3/4" />
                  <div className="h-3 bg-secondary rounded w-full" />
                  <div className="h-3 bg-secondary rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} onBuy={setBuyProduct} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold mb-2">Ничего не найдено</h3>
            <p className="text-muted-foreground">Попробуйте изменить запрос или фильтры</p>
          </div>
        )}
      </section>

      <BuyModal
        product={buyProduct}
        open={!!buyProduct}
        onClose={() => setBuyProduct(null)}
      />
    </Layout>
  );
};

export default Catalog;
