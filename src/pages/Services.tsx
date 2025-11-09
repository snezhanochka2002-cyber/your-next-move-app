import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import StickyButton from "@/components/StickyButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Home,
  Building2,
  TreePine,
  Package,
  Warehouse,
  Sofa,
  CheckCircle,
} from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: <Home className="h-12 w-12" />,
      title: "Квартирные переезды",
      price: "от 3000 ₽",
      description:
        "Переезд квартир любой площади. Упаковка, погрузка, транспортировка и разгрузка вещей.",
      features: [
        "Бережная упаковка хрупких предметов",
        "Демонтаж и сборка мебели",
        "Грузчики и транспорт",
        "Страхование имущества",
      ],
    },
    {
      icon: <Building2 className="h-12 w-12" />,
      title: "Офисные переезды",
      price: "от 8000 ₽",
      description:
        "Переезд офиса с минимальным простоем. Перевозка техники, мебели и документов.",
      features: [
        "Работа в выходные и ночью",
        "Упаковка оргтехники",
        "Перевозка серверов",
        "Быстрая сборка на новом месте",
      ],
    },
    {
      icon: <TreePine className="h-12 w-12" />,
      title: "Загородные переезды",
      price: "от 12000 ₽",
      description:
        "Переезд в загородный дом или дачу. Перевозка габаритной мебели и садовой техники.",
      features: [
        "Большегрузный транспорт",
        "Перевозка крупногабаритных вещей",
        "Длительные маршруты",
        "Разгрузка и занос",
      ],
    },
    {
      icon: <Package className="h-12 w-12" />,
      title: "Упаковка вещей",
      price: "от 1500 ₽",
      description:
        "Профессиональная упаковка вещей любой сложности. Используем качественные материалы.",
      features: [
        "Упаковочные материалы включены",
        "Маркировка коробок",
        "Упаковка хрупких предметов",
        "Разборка и сборка мебели",
      ],
    },
    {
      icon: <Warehouse className="h-12 w-12" />,
      title: "Хранение вещей",
      price: "от 500 ₽/сутки",
      description:
        "Временное хранение вещей на охраняемом складе. Любые сроки хранения.",
      features: [
        "Охраняемый склад",
        "Контроль температуры и влажности",
        "Страхование имущества",
        "Гибкие сроки хранения",
      ],
    },
    {
      icon: <Sofa className="h-12 w-12" />,
      title: "Перевозка мебели",
      price: "от 2000 ₽",
      description:
        "Перевозка отдельных предметов мебели. Бережная транспортировка и занос.",
      features: [
        "Демонтаж и сборка",
        "Защитная упаковка",
        "Подъем на этаж",
        "Страхование груза",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-primary/10 to-transparent">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Наши услуги</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Полный спектр услуг по переезду для частных лиц и компаний.
            Профессионально, быстро и надежно.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Card
                key={index}
                className="hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <CardContent className="p-6 space-y-4">
                  <div className="text-primary">{service.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                    <p className="text-2xl font-bold text-primary mb-3">
                      {service.price}
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">
                      {service.description}
                    </p>
                  </div>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button asChild className="w-full">
                    <Link to="/calculator">Заказать услугу</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Дополнительные услуги
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "Утилизация старой мебели",
              "Клининг после переезда",
              "Сборка и разборка мебели",
              "Подъем на этаж",
              "Грузчики без транспорта",
              "Перевозка пианино",
              "Перевозка сейфов",
              "Упаковочные материалы",
            ].map((service, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <p className="text-sm font-medium">{service}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-br from-primary/20 via-primary/10 to-transparent border-primary/20">
            <CardContent className="p-8 md:p-12 text-center space-y-6">
              <h2 className="text-3xl font-bold">
                Не нашли нужную услугу?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Свяжитесь с нами, и мы подберем индивидуальное решение для вашего
                переезда
              </p>
              <Button asChild size="lg">
                <Link to="/contacts">Связаться с нами</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <StickyButton />
    </div>
  );
};

export default Services;
