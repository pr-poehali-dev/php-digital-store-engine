import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const navLinks = [
  { name: 'Главная', path: '/' },
  { name: 'Каталог', path: '/catalog' },
  { name: 'Подписки', path: '/subscriptions' },
  { name: 'Блог', path: '/blog' },
  { name: 'О нас', path: '/about' },
  { name: 'FAQ', path: '/faq' },
  { name: 'Контакты', path: '/contacts' },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 glass border-b border-border/50">
      <div className="container flex items-center justify-between h-16 md:h-18 py-3">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center text-white font-bold text-xl group-hover:scale-110 transition-transform">
            D
          </div>
          <span className="text-xl font-bold gradient-text hidden sm:block">DigitalShop</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === link.path
                  ? 'text-primary bg-secondary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="rounded-xl">
            <Icon name="ShoppingCart" size={20} />
          </Button>
          <Link to="/account" className="hidden sm:block">
            <Button className="rounded-xl gradient-primary border-0 hover:opacity-90">
              <Icon name="User" size={18} className="mr-1" />
              Кабинет
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden rounded-xl"
            onClick={() => setOpen(!open)}
          >
            <Icon name={open ? 'X' : 'Menu'} size={22} />
          </Button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden glass border-t border-border/50 animate-fade-in-up">
          <nav className="container flex flex-col py-4 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setOpen(false)}
                className={`px-4 py-3 rounded-lg text-sm font-medium ${
                  location.pathname === link.path
                    ? 'text-primary bg-secondary'
                    : 'text-muted-foreground'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/account" onClick={() => setOpen(false)} className="mt-2">
              <Button className="w-full rounded-xl gradient-primary border-0">
                <Icon name="User" size={18} className="mr-1" />
                Личный кабинет
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
