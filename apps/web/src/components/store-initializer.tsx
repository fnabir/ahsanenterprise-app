"use client";

import { useEffect } from "react";
import { useFileStore, useRequisitionStore } from "@repo/core";
import { useAuth } from "@/contexts/AuthContext";

export default function StoreInitializer() {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading || !user) return;
    useFileStore.getState().init();
    useRequisitionStore.getState().init();
  }, [user, loading]);

  return null;
}
