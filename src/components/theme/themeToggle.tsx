import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Switch } from "../ui/switch";

const ThemeToggle = () => {
  const { setTheme, theme } = useTheme();

  return (
    <div className="flex items-center space-x-2">
      <Sun className="h-4 w-4" aria-hidden="true" />
      <Switch
        checked={theme === "dark"}
        onCheckedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
        aria-label="Toggle theme"
      />
      <Moon className="h-4 w-4" aria-hidden="true" />
    </div>
  );
};

export default ThemeToggle;
