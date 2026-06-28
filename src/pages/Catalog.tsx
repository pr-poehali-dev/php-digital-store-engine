import { useState, useMemo } from 'react';
import Layout from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { products, typeLabels, typeIcons, ProductType } from '@/data/products';

type Filter = ProductType | 'all';

const filters: { key: Filter; label: string; icon?: string }[] = [
  { key: 'all', label: 'Все товары' },
  { key: 'course', label: typeLabels.course, icon: typeIcons.course },
  { key: 'key', label: typeLabels.key, icon: typeIcons.key },
  { key: 'file', label: typeLabels.file, icon: typeIcons.file },
  { key: 'subscription', label: typeLabels.subscription, icon: typeIcons.subscription },
];

const Catalog = () => {
  const [active, setActive] = useState<Filter>('all');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<'popular' | 'cheap' | 'expensive'>('popular');

  const filtered = useMemo(() => {
    let list = products.filter((p) => active === 'all' || p.type === active);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((p) => p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    }
    if (sort === 'cheap') list = [...list].sort((a, b) => a.price - b.price);
    if (sort === 'expensive') list = [...list].sort((a, b) => b.price - a.price);
    if (sort === 'popular') list = [...list].sort((a, b) => b.sales - a.sales);
    return list;
  }, [active, search, sort]);

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
          <div className="flex gap-2">
            {[
              { key: 'popular', label: 'Популярные' },
              { key: 'cheap', label: 'Сначала дешёвые' },
              { key: 'expensive', label: 'Сначала дорогие' },
            ].map((s) => (
              <Button
                key={s.key}
                variant={sort === s.key ? 'default' : 'outline'}
                onClick={() => setSort(s.key as typeof sort)}
                className={`rounded-xl h-12 ${sort === s.key ? 'gradient-primary border-0' : ''}`}
              >
                {s.label}
              </Button>
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

        {filtered.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
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
    </Layout>
  );
};

export default Catalog;
