"use client";

import { Card } from "@repo/ui";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

export default function ImporterInfoButton() {
  const { isAdmin } = useAuth();

  if (!isAdmin) return null;

  return (
    <Link href="/importer-info">
      <Card clickable>Importer Info</Card>
    </Link>
  );
}
