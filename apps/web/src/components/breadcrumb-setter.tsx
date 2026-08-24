"use client";

import { useEffect } from "react";
import {
  useBreadcrumb,
  type BreadcrumbItem,
} from "@/contexts/BreadcrumbContext";

export default function BreadcrumbSetter({
  items,
}: {
  items: BreadcrumbItem[];
}) {
  const { setItems } = useBreadcrumb();

  useEffect(() => {
    setItems(items);

    return () => {
      setItems([]);
    };
  }, [items, setItems]);

  return null;
}
