import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';

const Footer = () => {
  return (
    <footer className="relative mt-24 border-t border-border/50 bg-secondary/30">
      <div className="container py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center text-white font-bold text-xl">
                D
              </div>
              <span className="text-xl font-bold gradient-text">DigitalShop</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Цифровой магазин курсов, ключей, файлов и подписок. Моментальная доставка 24/7.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Магазин</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/catalog" className="hover:text-primary transition-colors">Каталог</Link></li>
              <li><Link to="/subscriptions" className="hover:text-primary transition-colors">Подписки</Link></li>
              <li><Link to="/blog" className="hover:text-primary transition-colors">Блог</Link></li>
              <li><Link to="/account" className="hover:text-primary transition-colors">Личный кабинет</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Компания</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-primary transition-colors">О нас</Link></li>
              <li><Link to="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link to="/contacts" className="hover:text-primary transition-colors">Контакты</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Мы на связи</h4>
            <div className="flex gap-3">
              {['Send', 'MessageCircle', 'Mail', 'Phone'].map((icon) => (
                <a
                  key={icon}
                  href="#"
                  className="w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-white hover:gradient-primary hover:border-transparent transition-all"
                >
                  <Icon name={icon} size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2026 DigitalShop. Все права защищены.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors">Политика конфиденциальности</a>
            <a href="#" className="hover:text-primary transition-colors">Оферта</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
