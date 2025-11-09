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
  const [floorFrom, setFloorFrom] = useState("");
  const [floorTo, setFloorTo] = useState("");
  const [elevatorFrom, setElevatorFrom] = useState("");
  const [elevatorTo, setElevatorTo] = useState("");
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
    let basePrice = 2500;

    // Furniture amount
    if (furnitureAmount === "small") basePrice += 1500;
    else if (furnitureAmount === "medium") basePrice += 3500;
    else if (furnitureAmount === "large") basePrice += 6000;

    // Floor from (откуда)
    if (floorFrom === "3plus" && elevatorFrom === "no") {
      basePrice += 400 * 2; // За 2 дополнительных этажа минимум (4-й и выше)
    }

    // Floor to (куда)
    if (floorTo === "3plus" && elevatorTo === "no") {
      basePrice += 400 * 2; // За 2 дополнительных этажа минимум (4-й и выше)
    }

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

    const floorFromText = floorFrom === "3plus" ? "3 и выше" : `${floorFrom} этаж`;
    const floorToText = floorTo === "3plus" ? "3 и выше" : `${floorTo} этаж`;

    const message = `🚚 Новая заявка на переезд

👤 Имя: ${name}
📞 Телефон: ${phone}

📍 Откуда: ${fromAddress}
📍 Куда: ${toAddress}

📅 Дата: ${date}
🕐 Время: ${time}

🏢 Этаж откуда: ${floorFromText}${floorFrom === "3plus" ? ` (лифт: ${elevatorFrom === "yes" ? "есть" : "нет"})` : ""}
🏢 Этаж куда: ${floorToText}${floorTo === "3plus" ? ` (лифт: ${elevatorTo === "yes" ? "есть" : "нет"})` : ""}
📦 Объём мебели: ${furnitureText}

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
        setFloorFrom("");
        setFloorTo("");
        setElevatorFrom("");
        setElevatorTo("");
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

  const isCalculatorValid = floorFrom && floorTo && furnitureAmount &&
    (floorFrom !== "3plus" || elevatorFrom) &&
    (floorTo !== "3plus" || elevatorTo);

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
                    <Label htmlFor="floorFrom">Этаж откуда *</Label>
                    <Select value={floorFrom} onValueChange={(value) => {
                      setFloorFrom(value);
                      if (value !== "3plus") setElevatorFrom("");
                    }}>
                      <SelectTrigger id="floorFrom">
                        <SelectValue placeholder="Выберите этаж" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 этаж</SelectItem>
                        <SelectItem value="2">2 этаж</SelectItem>
                        <SelectItem value="3plus">3 и выше</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {floorFrom === "3plus" && (
                    <div className="space-y-2">
                      <Label htmlFor="elevatorFrom">Лифт (откуда) *</Label>
                      <Select value={elevatorFrom} onValueChange={setElevatorFrom}>
                        <SelectTrigger id="elevatorFrom">
                          <SelectValue placeholder="Наличие лифта" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Есть</SelectItem>
                          <SelectItem value="no">Нет</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="floorTo">Этаж куда *</Label>
                    <Select value={floorTo} onValueChange={(value) => {
                      setFloorTo(value);
                      if (value !== "3plus") setElevatorTo("");
                    }}>
                      <SelectTrigger id="floorTo">
                        <SelectValue placeholder="Выберите этаж" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 этаж</SelectItem>
                        <SelectItem value="2">2 этаж</SelectItem>
                        <SelectItem value="3plus">3 и выше</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {floorTo === "3plus" && (
                    <div className="space-y-2">
                      <Label htmlFor="elevatorTo">Лифт (куда) *</Label>
                      <Select value={elevatorTo} onValueChange={setElevatorTo}>
                        <SelectTrigger id="elevatorTo">
                          <SelectValue placeholder="Наличие лифта" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Есть</SelectItem>
                          <SelectItem value="no">Нет</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="furniture">Объем мебели *</Label>
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
