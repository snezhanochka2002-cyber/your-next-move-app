import Navigation from "@/components/Navigation";
import StickyButton from "@/components/StickyButton";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const Reviews = () => {
  const reviews = [
    {
      name: "Анна Петрова",
      rating: 5,
      date: "15 октября 2024",
      text: "Отличная команда! Переезжали из 2-комнатной квартиры на 9 этаже без лифта. Ребята работали быстро и аккуратно, вся мебель была бережно упакована. Ни одной царапины! Особенно порадовала пунктуальность - приехали минута в минуту. Цена соответствует качеству. Рекомендую!",
      service: "Квартирный переезд",
    },
    {
      name: "Дмитрий Соколов",
      rating: 5,
      date: "3 октября 2024",
      text: "Переезжали офис на 30 человек. Работали в выходные, чтобы не мешать рабочему процессу. Всё прошло идеально - ни одного сбоя, вся техника работает. Менеджер контролировал весь процесс, всегда был на связи. Профессионалы своего дела!",
      service: "Офисный переезд",
    },
    {
      name: "Елена Смирнова",
      rating: 5,
      date: "28 сентября 2024",
      text: "Спасибо огромное за помощь с переездом! У нас был очень хрупкий антиквариат и я очень переживала. Но ребята упаковали всё настолько качественно, что даже бабушкин сервиз доехал целым. Отдельное спасибо за терпение - мы несколько раз меняли планы.",
      service: "Переезд с упаковкой",
    },
    {
      name: "Михаил Кузнецов",
      rating: 5,
      date: "20 сентября 2024",
      text: "Переезжал в загородный дом, расстояние 80 км. Боялся, что будут проблемы, но всё прошло гладко. Цена фиксированная, без доплат. Грузчики вежливые, работали до конца - помогли расставить мебель. Буду рекомендовать друзьям!",
      service: "Загородный переезд",
    },
    {
      name: "Ольга Васильева",
      rating: 5,
      date: "12 сентября 2024",
      text: "Впервые пользовалась услугами грузчиков и очень довольна! Переезд студии прошёл быстро - всего 4 часа. Ребята привезли упаковочные материалы, всё аккуратно запаковали. Цена адекватная, никаких скрытых платежей не было. Спасибо!",
      service: "Квартирный переезд",
    },
    {
      name: "Александр Новиков",
      rating: 5,
      date: "5 сентября 2024",
      text: "Отличный сервис! Заказывал переезд 3-комнатной квартиры. Особенно понравилось, что можно было рассчитать стоимость онлайн. Калькулятор показал точную цену, без накруток. Грузчики профессионалы - быстро разобрали и собрали всю мебель. Рекомендую!",
      service: "Квартирный переезд",
    },
    {
      name: "Мария Федорова",
      rating: 5,
      date: "28 августа 2024",
      text: "Переезжали всей семьей, два маленьких ребенка. Очень переживали, как всё пройдёт. Но команда работала настолько слаженно, что мы даже не заметили, как всё закончилось. Детские вещи упаковали отдельно, всё подписали. Большое спасибо за заботу!",
      service: "Квартирный переезд",
    },
    {
      name: "Игорь Морозов",
      rating: 5,
      date: "15 августа 2024",
      text: "Переезд ресторана - дело непростое. Много техники, тяжелое оборудование. Ребята справились на отлично! Всё оборудование работает, ничего не повреждено. Работали быстро, но аккуратно. Открылись в срок благодаря этой команде!",
      service: "Коммерческий переезд",
    },
  ];

  const averageRating = (
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
  ).toFixed(1);

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navigation />

      <section className="py-12 md:py-16 bg-gradient-to-b from-primary/10 to-transparent">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Отзывы клиентов</h1>
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-6 w-6 fill-primary text-primary"
                />
              ))}
            </div>
            <span className="text-2xl font-bold">{averageRating}</span>
            <span className="text-muted-foreground">
              ({reviews.length} отзывов)
            </span>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Нам доверяют сотни клиентов. Читайте реальные отзывы о нашей работе.
          </p>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6">
            {reviews.map((review, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {review.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold">{review.name}</h3>
                        <div className="flex">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="h-4 w-4 fill-primary text-primary"
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {review.date}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed">{review.text}</p>
                  <div className="pt-2">
                    <span className="inline-block text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">
                      {review.service}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-br from-primary/20 via-primary/10 to-transparent border-primary/20">
            <CardContent className="p-8 text-center space-y-4">
              <h2 className="text-2xl font-bold">
                Присоединяйтесь к довольным клиентам!
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Закажите переезд прямо сейчас и убедитесь в качестве наших услуг
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <StickyButton />
    </div>
  );
};

export default Reviews;
