"use client";

import Link from "next/link";
import { CardVersion } from "@repo/ui";
import { useAuth } from "@/contexts/AuthContext";

export default function ChangelogSection() {
  const { isAdmin } = useAuth();
  return (
    <Link href="/changelog" className="w-full">
      <CardVersion isAdmin={isAdmin} clickable />
    </Link>
  );
}
