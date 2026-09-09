"use client";

import { useEffect, useState } from "react";
import { useIsMobile } from "@repo/core";
import { useTheme } from "next-themes";

import { Button } from "@repo/ui";
import { FaMoon, FaSun } from "react-icons/fa6";

const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const toggleTheme = () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  };

  return (
    <Button
      onClick={toggleTheme}
      variant="outline"
      Icon={
        resolvedTheme === "light" ? (
          <FaMoon className="text-yellow-500" />
        ) : (
          <FaSun className="text-yellow-500" />
        )
      }
      label={
        isMobile ? undefined : resolvedTheme === "light" ? "Dark" : "Light"
      }
      className={isMobile ? "p-1!" : "min-w-24 h-7"}
    />
  );
};

ThemeToggle.displayName = "ThemeToggle";

export default ThemeToggle;
