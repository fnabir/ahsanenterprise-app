"use client";

import { Card, useAuth } from "@repo/ui";
import Link from "next/link";

export default function ImporterInfoButton() {
  const { isAdmin } = useAuth();

  if (!isAdmin) return null;

  return (
    <Link href="/importer-info">
      <Card clickable>Importer Info</Card>
    </Link>
  );
}
