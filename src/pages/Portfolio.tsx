import Navigation from "@/components/Navigation";
import StickyButton from "@/components/StickyButton";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Portfolio = () => {
  const projects = [
    {
      title: "Переезд 3-комнатной квартиры",
      location: "Москва, Арбат → Новая Москва",
      duration: "6 часов",
      description:
        "Переезд семьи из 4 человек. Полная упаковка, демонтаж кухни, перевозка и сборка на новом месте.",
      details: [
        "Площадь: 85 м²",
        "Объём: 18 м³",
        "Грузчики: 4 человека",
        "Транспорт: Газель Next",
      ],
      image: "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800",
    },
    {
      title: "Офисный переезд",
      location: "БЦ Центр → БЦ Парк Мира",
      duration: "2 дня",
      description:
        "Переезд офиса на 30 сотрудников. Упаковка техники, документов, перевозка мебели. Работа в выходные.",
      details: [
        "Площадь: 200 м²",
        "Рабочих мест: 30",
        "Грузчики: 8 человек",
        "Транспорт: 2 фургона",
      ],
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
    },
    {
      title: "Переезд загородного дома",
      location: "Рублёвка → Подмосковье",
      duration: "12 часов",
      description:
        "Переезд большого дома с антикварной мебелью. Бережная упаковка, специальный транспорт.",
      details: [
        "Площадь: 250 м²",
        "Объём: 45 м³",
        "Грузчики: 6 человек",
        "Транспорт: 10-тонник",
      ],
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
    },
    {
      title: "Квартирный переезд с упаковкой",
      location: "Измайлово → Кунцево",
      duration: "8 часов",
      description:
        "Переезд 2-комнатной квартиры. Полная упаковка всех вещей, демонтаж шкафов-купе.",
      details: [
        "Площадь: 55 м²",
        "Объём: 12 м³",
        "Грузчики: 3 человека",
        "Транспорт: Газель",
      ],
      image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800",
    },
    {
      title: "Переезд студии",
      location: "Тверская → Новослободская",
      duration: "4 часа",
      description:
        "Быстрый переезд студии 30 м². Компактная упаковка, быстрая транспортировка.",
      details: [
        "Площадь: 30 м²",
        "Объём: 6 м³",
        "Грузчики: 2 человека",
        "Транспорт: Газель",
      ],
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
    },
    {
      title: "Переезд ресторана",
      location: "Центр → Новая локация",
      duration: "3 дня",
      description:
        "Переезд ресторана с кухонным оборудованием. Специализированная упаковка техники.",
      details: [
        "Площадь: 150 м²",
        "Оборудование: профессиональное",
        "Грузчики: 10 человек",
        "Транспорт: 3 фургона",
      ],
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navigation />

      <section className="py-12 md:py-16 bg-gradient-to-b from-primary/10 to-transparent">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Примеры работ</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Более 500 успешно выполненных переездов. Посмотрите наши реальные
            кейсы.
          </p>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-xl transition-all"
              >
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-4 right-4 bg-primary">
                    {project.duration}
                  </Badge>
                </div>
                <CardContent className="p-6 space-y-3">
                  <h3 className="text-xl font-bold">{project.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    📍 {project.location}
                  </p>
                  <p className="text-sm">{project.description}</p>
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    {project.details.map((detail, idx) => (
                      <div
                        key={idx}
                        className="text-xs bg-secondary/50 rounded px-3 py-2"
                      >
                        {detail}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <StickyButton />
    </div>
  );
};

export default Portfolio;
