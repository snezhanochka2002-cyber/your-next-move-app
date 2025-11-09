import Navigation from "@/components/Navigation";
import StickyButton from "@/components/StickyButton";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";

const Contacts = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <Navigation />

      <section className="py-12 md:py-16 bg-gradient-to-b from-primary/10 to-transparent">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Контакты</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Свяжитесь с нами удобным способом. Работаем 24/7 для вашего удобства.
          </p>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Contact Cards */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Телефон</h3>
                    <p className="text-sm text-muted-foreground">
                      Звоните в любое время
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <a
                    href="tel:+74951234567"
                    className="block text-lg font-semibold hover:text-primary transition-colors"
                  >
                    +7 (495) 123-45-67
                  </a>
                  <a
                    href="tel:+79161234567"
                    className="block text-lg font-semibold hover:text-primary transition-colors"
                  >
                    +7 (916) 123-45-67
                  </a>
                </div>
                <Button asChild variant="outline" className="w-full">
                  <a href="tel:+74951234567">Позвонить</a>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <MessageCircle className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Telegram</h3>
                    <p className="text-sm text-muted-foreground">
                      Быстрый ответ в мессенджере
                    </p>
                  </div>
                </div>
                <p className="text-lg font-semibold">@legkiy_pereezd</p>
                <Button asChild variant="outline" className="w-full">
                  <a
                    href="https://t.me/legkiy_pereezd"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Написать в Telegram
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-sm text-muted-foreground">
                      Напишите нам письмо
                    </p>
                  </div>
                </div>
                <p className="text-lg font-semibold">info@legkiy-pereezd.ru</p>
                <Button asChild variant="outline" className="w-full">
                  <a href="mailto:info@legkiy-pereezd.ru">Отправить email</a>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Режим работы</h3>
                    <p className="text-sm text-muted-foreground">
                      Мы работаем для вас
                    </p>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="font-semibold text-primary">
                    Круглосуточно, без выходных
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Офис: пн-пт 9:00-21:00
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Переезды: 24/7
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Office Address */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Наш офис</h3>
                  <p className="text-muted-foreground mb-2">
                    г. Москва, ул. Примерная, д. 1, офис 101
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Приём клиентов: пн-пт 9:00-21:00, сб-вс 10:00-18:00
                  </p>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="aspect-video rounded-lg overflow-hidden bg-secondary/30 flex items-center justify-center">
                <div className="text-center p-8">
                  <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">
                    Здесь будет карта с местоположением офиса
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    (интеграция Google Maps или Яндекс.Карты)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Social Media & Messengers */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-4 text-center">
                Мы в соцсетях
              </h3>
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="outline" size="lg">
                  ВКонтакте
                </Button>
                <Button variant="outline" size="lg">
                  WhatsApp
                </Button>
                <Button variant="outline" size="lg">
                  Viber
                </Button>
                <Button variant="outline" size="lg">
                  Instagram*
                </Button>
              </div>
              <p className="text-xs text-center text-muted-foreground mt-4">
                * Meta признана экстремистской организацией в РФ
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <StickyButton />
    </div>
  );
};

export default Contacts;
