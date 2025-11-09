import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Calculator as CalcIcon, CheckCircle } from "lucide-react";

// ВАЖНО: Замените эти значения на ваши реальные данные
// Рекомендуется использовать Edge Functions для безопасной отправки
const TELEGRAM_BOT_TOKEN = "REPLACE_WITH_BOT_TOKEN";
const TELEGRAM_CHAT_ID = "REPLACE_WITH_CHAT_ID";

const Calculator = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculator fields
  const [apartmentType, setApartmentType] = useState("");
  const [floor, setFloor] = useState("");
  const [elevator, setElevator] = useState("");
  const [furnitureAmount, setFurnitureAmount] = useState("");
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);

  // Order form fields
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [fromAddress, setFromAddress] = useState("");
  const [toAddress, setToAddress] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [comment, setComment] = useState("");

  const calculatePrice = () => {
    let basePrice = 3000;

    if (apartmentType === "1room") basePrice += 0;
    else if (apartmentType === "2room") basePrice += 2000;
    else if (apartmentType === "3room") basePrice += 4000;
    else if (apartmentType === "4room") basePrice += 6000;
    else if (apartmentType === "office") basePrice += 8000;
    else if (apartmentType === "house") basePrice += 10000;

    if (elevator === "no") {
      const floorNum = parseInt(floor);
      if (floorNum > 2) {
        basePrice += (floorNum - 2) * 500;
      }
    }

    if (furnitureAmount === "small") basePrice += 1000;
    else if (furnitureAmount === "medium") basePrice += 3000;
    else if (furnitureAmount === "large") basePrice += 5000;

    setEstimatedPrice(basePrice);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!name || !phone || !fromAddress || !toAddress || !date || !time) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, заполните все обязательные поля",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    const furnitureText =
      furnitureAmount === "small"
        ? "Малый"
        : furnitureAmount === "medium"
        ? "Средний"
        : "Большой";

    const message = `🚚 Новая заявка на переезд

👤 Имя: ${name}
📞 Телефон: ${phone}

📍 Откуда: ${fromAddress}
📍 Куда: ${toAddress}

📅 Дата: ${date}
🕐 Время: ${time}

🏠 Тип жилья: ${apartmentType}
🏢 Этаж: ${floor}
🛗 Лифт: ${elevator === "yes" ? "Есть" : "Нет"}
📦 Объём: ${furnitureText}

💰 Примерная стоимость: ${estimatedPrice ? estimatedPrice.toLocaleString("ru-RU") : "не рассчитана"} ₽

💬 Комментарий: ${comment || "—"}`;

    try {
      // ВАЖНО: В production используйте Edge Function для безопасной отправки
      // Это временное решение для тестирования
      const response = await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: message,
            parse_mode: "HTML",
          }),
        }
      );

      if (response.ok) {
        toast({
          title: "Заявка отправлена!",
          description: "Мы свяжемся с вами в ближайшее время",
        });

        // Reset form
        setName("");
        setPhone("");
        setFromAddress("");
        setToAddress("");
        setDate("");
        setTime("");
        setComment("");
        setApartmentType("");
        setFloor("");
        setElevator("");
        setFurnitureAmount("");
        setEstimatedPrice(null);
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending to Telegram:", error);
      toast({
        title: "Ошибка отправки",
        description:
          "Не удалось отправить заявку. Пожалуйста, позвоните нам по телефону.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isCalculatorValid = apartmentType && floor && elevator && furnitureAmount;

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navigation />

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <CalcIcon className="h-8 w-8 text-primary" />
              <h1 className="text-3xl md:text-4xl font-bold">
                Калькулятор стоимости
              </h1>
            </div>
            <p className="text-muted-foreground">
              Рассчитайте примерную стоимость переезда и оформите заявку
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Calculator Section */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <h2 className="text-xl font-semibold mb-4">
                  Параметры переезда
                </h2>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="apartmentType">Тип жилья *</Label>
                    <Select value={apartmentType} onValueChange={setApartmentType}>
                      <SelectTrigger id="apartmentType">
                        <SelectValue placeholder="Выберите тип" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1room">1-комнатная квартира</SelectItem>
                        <SelectItem value="2room">2-комнатная квартира</SelectItem>
                        <SelectItem value="3room">3-комнатная квартира</SelectItem>
                        <SelectItem value="4room">4+ комнатная квартира</SelectItem>
                        <SelectItem value="office">Офис</SelectItem>
                        <SelectItem value="house">Загородный дом</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="floor">Этаж *</Label>
                    <Select value={floor} onValueChange={setFloor}>
                      <SelectTrigger id="floor">
                        <SelectValue placeholder="Выберите этаж" />
                      </SelectTrigger>
                      <SelectContent>
                        {[...Array(20)].map((_, i) => (
                          <SelectItem key={i + 1} value={String(i + 1)}>
                            {i + 1} этаж
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="elevator">Лифт *</Label>
                    <Select value={elevator} onValueChange={setElevator}>
                      <SelectTrigger id="elevator">
                        <SelectValue placeholder="Наличие лифта" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Есть</SelectItem>
                        <SelectItem value="no">Нет</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="furniture">Количество мебели *</Label>
                    <Select value={furnitureAmount} onValueChange={setFurnitureAmount}>
                      <SelectTrigger id="furniture">
                        <SelectValue placeholder="Оцените объём" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Малый (до 10 м³)</SelectItem>
                        <SelectItem value="medium">Средний (10-20 м³)</SelectItem>
                        <SelectItem value="large">Большой (20+ м³)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button
                  type="button"
                  onClick={calculatePrice}
                  disabled={!isCalculatorValid}
                  className="w-full"
                >
                  Рассчитать стоимость
                </Button>

                {estimatedPrice && (
                  <div className="mt-4 p-6 bg-primary/10 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground mb-2">
                      Примерная стоимость переезда
                    </p>
                    <p className="text-4xl font-bold text-primary">
                      от {estimatedPrice.toLocaleString("ru-RU")} ₽
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Точная стоимость будет рассчитана после осмотра
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Contact Form Section */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <h2 className="text-xl font-semibold mb-4">
                  Оформить заявку
                </h2>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Имя *</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ваше имя"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Телефон *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+7 (___) ___-__-__"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="from">Откуда *</Label>
                    <Input
                      id="from"
                      value={fromAddress}
                      onChange={(e) => setFromAddress(e.target.value)}
                      placeholder="Адрес отправления"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="to">Куда *</Label>
                    <Input
                      id="to"
                      value={toAddress}
                      onChange={(e) => setToAddress(e.target.value)}
                      placeholder="Адрес назначения"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date">Дата переезда *</Label>
                    <Input
                      id="date"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time">Время *</Label>
                    <Input
                      id="time"
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="comment">Комментарий</Label>
                  <Textarea
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Дополнительная информация о переезде"
                    rows={4}
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Отправка..." : "Отправить заявку"}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  Нажимая кнопку, вы соглашаетесь с политикой
                  конфиденциальности
                </p>
              </CardContent>
            </Card>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Calculator;
