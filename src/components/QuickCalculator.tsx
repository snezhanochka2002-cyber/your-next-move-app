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
  const [apartmentType, setApartmentType] = useState("");
  const [floor, setFloor] = useState("");
  const [elevator, setElevator] = useState("");
  const [furnitureAmount, setFurnitureAmount] = useState("");
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);

  const calculatePrice = () => {
    let basePrice = 3000;

    // Apartment type multiplier
    if (apartmentType === "1room") basePrice += 0;
    else if (apartmentType === "2room") basePrice += 2000;
    else if (apartmentType === "3room") basePrice += 4000;
    else if (apartmentType === "4room") basePrice += 6000;
    else if (apartmentType === "office") basePrice += 8000;
    else if (apartmentType === "house") basePrice += 10000;

    // Floor multiplier (no elevator)
    if (elevator === "no") {
      const floorNum = parseInt(floor);
      if (floorNum > 2) {
        basePrice += (floorNum - 2) * 500;
      }
    }

    // Furniture amount
    if (furnitureAmount === "small") basePrice += 1000;
    else if (furnitureAmount === "medium") basePrice += 3000;
    else if (furnitureAmount === "large") basePrice += 5000;

    setEstimatedPrice(basePrice);
  };

  const isFormValid =
    apartmentType && floor && elevator && furnitureAmount;

  return (
    <Card className="shadow-lg">
      <CardContent className="p-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="apartmentType">Тип жилья</Label>
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
          <Label htmlFor="floor">Этаж</Label>
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
          <Label htmlFor="elevator">Лифт</Label>
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
          <Label htmlFor="furniture">Количество мебели</Label>
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
