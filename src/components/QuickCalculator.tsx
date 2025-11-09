import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "./ui/card";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ArrowRight } from "lucide-react";

const QuickCalculator = () => {
  const [floorFrom, setFloorFrom] = useState("");
  const [floorTo, setFloorTo] = useState("");
  const [elevatorFrom, setElevatorFrom] = useState("");
  const [elevatorTo, setElevatorTo] = useState("");
  const [furnitureAmount, setFurnitureAmount] = useState("");
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);

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

  const isFormValid = floorFrom && floorTo && furnitureAmount &&
    (floorFrom !== "3plus" || elevatorFrom) &&
    (floorTo !== "3plus" || elevatorTo);

  return (
    <Card className="shadow-lg">
      <CardContent className="p-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="floorFrom">Этаж откуда</Label>
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
            <Label htmlFor="elevatorFrom">Лифт (откуда)</Label>
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
          <Label htmlFor="floorTo">Этаж куда</Label>
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
            <Label htmlFor="elevatorTo">Лифт (куда)</Label>
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

        <div className="space-y-2">
          <Label htmlFor="furniture">Объем мебели</Label>
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

        <Button
          onClick={calculatePrice}
          disabled={!isFormValid}
          className="w-full"
          size="lg"
        >
          Рассчитать стоимость
        </Button>

        {estimatedPrice && (
          <div className="mt-4 p-4 bg-primary/10 rounded-lg space-y-3">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Примерная стоимость
              </p>
              <p className="text-3xl font-bold text-primary">
                от {estimatedPrice.toLocaleString("ru-RU")} ₽
              </p>
            </div>
            <Button asChild variant="outline" className="w-full">
              <Link to="/calculator" className="flex items-center gap-2">
                Оформить заявку <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QuickCalculator;
