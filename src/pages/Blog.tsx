import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { blogPosts } from '@/data/products';

const categories = ['Все', 'Обучение', 'Лицензии', 'Технологии', 'Дизайн'];

const Blog = () => {
  const featured = blogPosts[0];
  const rest = blogPosts.slice(1);

  return (
    <Layout>
      <section className="gradient-mesh">
        <div className="container py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Наш <span className="gradient-text">блог</span>
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Полезные статьи о цифровых товарах, обучении и технологиях
          </p>
        </div>
      </section>

      <section className="container py-10">
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((c, i) => (
            <button
              key={c}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                i === 0 ? 'gradient-primary text-white shadow-lg' : 'bg-card border border-border text-muted-foreground hover:text-foreground'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Featured */}
        <div className="grid lg:grid-cols-2 gap-6 mb-12">
          <div className={`relative rounded-3xl bg-gradient-to-br ${featured.gradient} p-10 flex flex-col justify-end min-h-[320px] text-white overflow-hidden`}>
            <span className="absolute top-6 right-6 text-7xl opacity-30">{featured.emoji}</span>
            <span className="inline-block w-fit px-3 py-1 rounded-full glass text-xs font-medium mb-4">
              {featured.category}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">{featured.title}</h2>
            <p className="opacity-90 mb-4">{featured.excerpt}</p>
            <div className="flex items-center gap-4 text-sm opacity-80">
              <span className="flex items-center gap-1"><Icon name="Calendar" size={14} /> {featured.date}</span>
              <span className="flex items-center gap-1"><Icon name="Clock" size={14} /> {featured.readTime}</span>
            </div>
          </div>

          <div className="bg-card border border-border rounded-3xl p-8 flex flex-col justify-center">
            <h3 className="text-xl font-bold mb-3">Подпишитесь на рассылку</h3>
            <p className="text-muted-foreground mb-6">
              Получайте свежие статьи, скидки и анонсы новинок прямо на почту. Без спама.
            </p>
            <div className="flex gap-2">
              <Input placeholder="Ваш email" className="h-12 rounded-xl" />
              <Button className="rounded-xl gradient-primary border-0 h-12 px-6">
                Подписаться
              </Button>
            </div>
          </div>
        </div>

        {/* Posts grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((post, i) => (
            <article
              key={post.id}
              className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer animate-fade-in-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className={`h-44 bg-gradient-to-br ${post.gradient} flex items-center justify-center`}>
                <span className="text-6xl">{post.emoji}</span>
              </div>
              <div className="p-6">
                <span className="text-xs font-medium text-primary">{post.category}</span>
                <h3 className="font-bold text-lg mt-2 mb-2 line-clamp-2">{post.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Icon name="Calendar" size={13} /> {post.date}</span>
                  <span className="flex items-center gap-1"><Icon name="Clock" size={13} /> {post.readTime}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
