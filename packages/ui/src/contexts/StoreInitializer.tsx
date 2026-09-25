"use client";

import { useEffect } from "react";
import {
  useFileStore,
  useRequisitionStore,
  useImporterStore,
} from "@repo/core";
import { useAuth } from "./AuthContext";

export function StoreInitializer() {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading || !user) return;
    useFileStore.getState().init();
    useRequisitionStore.getState().init();
    useImporterStore.getState().init();
  }, [user, loading]);

  return null;
}
