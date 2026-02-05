"use client";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:ring-2 ring-orange-600 transition-all cursor-pointer"
    >
      {theme === "dark" ? (
        <Sun size={20} className="text-orange-600" />
      ) : (
        <Moon size={20} className="text-zinc-600" />
      )}
    </button>
  );
}