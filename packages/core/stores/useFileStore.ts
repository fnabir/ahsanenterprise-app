"use client";

import { create } from "zustand";
import { onValue } from "firebase/database";
import { getDatabaseReference } from "@repo/firebase";
import type { FileRoot } from "@repo/types";

interface FileStoreState {
  file: FileRoot | null;
  loading: boolean;
  initialized: boolean;
  error: string | null;
  init: () => void;
}

export const useFileStore = create<FileStoreState>((set, get) => ({
  file: null,
  loading: true,
  initialized: false,
  error: null,

  init: () => {
    if (get().initialized) return;

    set({ initialized: true, loading: true, error: null });
    const ref = getDatabaseReference("file");

    onValue(
      ref,
      (snapshot) => {
        const value = snapshot.val();

        set({
          file: value,
          loading: false,
          error: null,
        });
      },
      (error) => {
        set({
          file: null,
          loading: false,
          error: error.message,
        });
      },
    );
  },
}));
