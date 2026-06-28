import Layout from '@/components/Layout';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';
import { faqItems } from '@/data/products';

const Faq = () => {
  return (
    <Layout>
      <section className="gradient-mesh">
        <div className="container py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Частые <span className="gradient-text">вопросы</span>
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Собрали ответы на популярные вопросы о покупках, оплате и доставке
          </p>
        </div>
      </section>

      <section className="container py-10 max-w-3xl">
        <Accordion type="single" collapsible className="space-y-4">
          {faqItems.map((item, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="bg-card border border-border rounded-2xl px-6 animate-fade-in-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <AccordionTrigger className="text-left font-semibold hover:no-underline py-5">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-5">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-12 rounded-3xl gradient-primary p-10 text-center text-white">
          <span className="text-4xl mb-3 block">💬</span>
          <h2 className="text-2xl font-bold mb-3">Не нашли ответ?</h2>
          <p className="opacity-90 mb-6">Наша поддержка с радостью поможет вам 24/7</p>
          <Link to="/contacts">
            <Button className="rounded-xl bg-white text-primary hover:bg-white/90 h-12 px-8">
              Связаться с поддержкой
              <Icon name="ArrowRight" size={18} className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Faq;
