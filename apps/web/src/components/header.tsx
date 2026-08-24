"use client";

import Breadcrumb from "./breadcrumb";
import ThemeToggle from "./theme-toggle";
import { useBreadcrumb } from "@/contexts/BreadcrumbContext";

export default function Header() {
  const { items } = useBreadcrumb();

  return (
    <header className="w-full flex flex-row items-center justify-between py-2 px-2 lg:px-4">
      <Breadcrumb items={items} />
      <div className="flex flex-row items-center gap-2">
        <ThemeToggle />
      </div>
    </header>
  );
}
