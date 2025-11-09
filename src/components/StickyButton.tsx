import { Calculator } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const StickyButton = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-4 bg-gradient-to-t from-background via-background to-transparent md:hidden">
      <Button asChild size="lg" className="w-full shadow-lg">
        <Link to="/calculator" className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Рассчитать переезд
        </Link>
      </Button>
    </div>
  );
};

export default StickyButton;
