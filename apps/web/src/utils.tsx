"use client";
import { useEffect } from "react";

export function UpdateMetadata({ title }: { title: string }) {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return null;
}
