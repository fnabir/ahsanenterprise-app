"use client";

import { useEffect } from "react";
import { useFileStore } from "@repo/core";
import { useAuth } from "@/contexts/AuthContext";

export default function FileStoreInitializer() {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;
    if (!user) return;

    useFileStore.getState().init();
  }, [user, loading]);

  return null;
}
