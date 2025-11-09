import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Package,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  FileText,
} from "lucide-react";

const Dashboard = () => {
  // Demo data - в production это будет приходить с сервера
  const [orders] = useState([
    {
      id: "ORD-001",
      date: "2024-11-15",
      from: "Москва, ул. Арбат, д. 10",
      to: "Москва, ул. Ленина, д. 25",
      status: "completed",
      price: 8500,
      paid: true,
    },
    {
      id: "ORD-002",
      date: "2024-11-20",
      from: "Москва, пр-т Мира, д. 45",
      to: "Подмосковье, г. Химки",
      status: "in_progress",
      price: 15000,
      paid: true,
    },
    {
      id: "ORD-003",
      date: "2024-11-25",
      from: "Москва, ул. Тверская, д. 5",
      to: "Москва, ул. Новая, д. 12",
      status: "pending",
      price: 12000,
      paid: false,
    },
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-green-500">
            <CheckCircle className="h-3 w-3 mr-1" />
            Завершен
          </Badge>
        );
      case "in_progress":
        return (
          <Badge className="bg-blue-500">
            <Clock className="h-3 w-3 mr-1" />
            В работе
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="outline">
            <AlertCircle className="h-3 w-3 mr-1" />
            Ожидает
          </Badge>
        );
      case "cancelled":
        return (
          <Badge variant="destructive">
            <XCircle className="h-3 w-3 mr-1" />
            Отменен
          </Badge>
        );
      default:
        return null;
    }
  };

  const stats = [
    {
      title: "Всего заказов",
      value: orders.length,
      icon: <Package className="h-5 w-5" />,
    },
    {
      title: "В работе",
      value: orders.filter((o) => o.status === "in_progress").length,
      icon: <Clock className="h-5 w-5" />,
    },
    {
      title: "Завершено",
      value: orders.filter((o) => o.status === "completed").length,
      icon: <CheckCircle className="h-5 w-5" />,
    },
    {
      title: "Общая сумма",
      value: `${orders.reduce((sum, o) => sum + o.price, 0).toLocaleString("ru-RU")} ₽`,
      icon: <FileText className="h-5 w-5" />,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Личный кабинет
            </h1>
            <p className="text-muted-foreground">
              Управляйте своими заказами и отслеживайте статусы
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                      {stat.icon}
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-sm text-muted-foreground">
                        {stat.title}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Orders List */}
          <Card>
            <CardHeader>
              <CardTitle>Мои заказы</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {orders.length === 0 ? (
                <div className="text-center py-12">
                  <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">
                    У вас пока нет заказов
                  </p>
                  <Button>Создать заказ</Button>
                </div>
              ) : (
                orders.map((order) => (
                  <Card key={order.id} className="overflow-hidden">
                    <CardContent className="p-4 md:p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-3 flex-wrap">
                            <h3 className="font-semibold text-lg">
                              Заказ {order.id}
                            </h3>
                            {getStatusBadge(order.status)}
                            {order.paid && (
                              <Badge variant="outline" className="bg-green-50">
                                Оплачен
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            📅 {new Date(order.date).toLocaleDateString("ru-RU")}
                          </p>
                          <div className="text-sm space-y-1">
                            <p>
                              <span className="text-muted-foreground">
                                Откуда:
                              </span>{" "}
                              {order.from}
                            </p>
                            <p>
                              <span className="text-muted-foreground">
                                Куда:
                              </span>{" "}
                              {order.to}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 md:items-end">
                          <p className="text-2xl font-bold text-primary">
                            {order.price.toLocaleString("ru-RU")} ₽
                          </p>
                          {!order.paid && (
                            <Button size="sm" className="w-full md:w-auto">
                              Оплатить
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full md:w-auto"
                          >
                            Подробнее
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </CardContent>
          </Card>

          {/* Info Card */}
          <Card className="mt-8 bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-2">Нужна помощь?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Свяжитесь с нашей поддержкой для получения консультации по
                вашим заказам
              </p>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm">
                  Позвонить
                </Button>
                <Button variant="outline" size="sm">
                  Написать в Telegram
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
