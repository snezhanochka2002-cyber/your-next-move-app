import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import StickyButton from "@/components/StickyButton";
import QuickCalculator from "@/components/QuickCalculator";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Truck,
  Package,
  Home,
  Shield,
  Clock,
  Users,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Гарантия",
      description: "Страхование имущества и гарантия качества",
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Точность",
      description: "Соблюдение сроков и четкое планирование",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Опыт",
      description: "Команда профессионалов с опытом 10+ лет",
    },
    {
      icon: <Package className="h-8 w-8" />,
      title: "Упаковка",
      description: "Качественные материалы и бережная упаковка",
    },
  ];

  const services = [
    {
      icon: <Home className="h-6 w-6" />,
      title: "Квартирные переезды",
      price: "от 3000 ₽",
    },
    {
      icon: <Truck className="h-6 w-6" />,
      title: "Офисные переезды",
      price: "от 8000 ₽",
    },
    {
      icon: <Package className="h-6 w-6" />,
      title: "Упаковка вещей",
      price: "от 1500 ₽",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-12 md:py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Переезд без{" "}
                <span className="text-primary">стресса и хлопот</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Профессиональные услуги по переезду квартир, офисов и загородных
                домов. Быстро, надежно и по честной цене.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="text-lg">
                  <Link to="/calculator" className="flex items-center gap-2">
                    Рассчитать стоимость <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/contacts">Связаться с нами</Link>
                </Button>
              </div>
              <div className="flex items-center gap-6 pt-4">
                <div>
                  <p className="text-3xl font-bold text-primary">500+</p>
                  <p className="text-sm text-muted-foreground">Переездов</p>
                </div>
                <div className="h-12 w-px bg-border" />
                <div>
                  <p className="text-3xl font-bold text-primary">4.9</p>
                  <p className="text-sm text-muted-foreground">Рейтинг</p>
                </div>
                <div className="h-12 w-px bg-border" />
                <div>
                  <p className="text-3xl font-bold text-primary">24/7</p>
                  <p className="text-sm text-muted-foreground">Поддержка</p>
                </div>
              </div>
            </div>

            <div>
              <QuickCalculator />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Почему выбирают нас
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border-2 hover:border-primary transition-colors">
                <CardContent className="p-6 space-y-3">
                  <div className="text-primary">{feature.icon}</div>
                  <h3 className="font-semibold text-lg">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Наши услуги</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Предлагаем полный спектр услуг по переезду для частных лиц и
              компаний
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="text-primary">{service.icon}</div>
                    <h3 className="font-semibold">{service.title}</h3>
                  </div>
                  <p className="text-2xl font-bold text-primary">
                    {service.price}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center">
            <Button asChild size="lg" variant="outline">
              <Link to="/services">Все услуги</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Как мы работаем
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "1", title: "Заявка", text: "Оставьте заявку онлайн или по телефону" },
              { step: "2", title: "Расчет", text: "Получите точный расчет стоимости" },
              { step: "3", title: "Переезд", text: "Бережно упаковываем и перевозим" },
              { step: "4", title: "Готово", text: "Распаковка и расстановка на новом месте" },
            ].map((item, index) => (
              <div key={index} className="text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto">
                  {item.step}
                </div>
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-br from-primary/20 via-primary/10 to-transparent border-primary/20">
            <CardContent className="p-8 md:p-12 text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                Готовы к переезду?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Получите бесплатную консультацию и точный расчет стоимости
                прямо сейчас
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link to="/calculator">Рассчитать стоимость</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/contacts">Позвонить нам</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <StickyButton />
    </div>
  );
};

export default Index;
