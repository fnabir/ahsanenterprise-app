"use client";

import { create } from "zustand";
import { onValue, off } from "firebase/database";
import { onIdTokenChanged } from "firebase/auth";
import { getDatabaseReference, auth } from "@repo/firebase";
import type { FileRoot } from "@repo/types";
import type { FirebaseError } from "firebase/app";

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
    let attached = false;

    const attach = () => {
      if (attached) return;
      attached = true;
      onValue(
        ref,
        (snapshot) =>
          set({ file: snapshot.val(), loading: false, error: null }),
        (error) => {
          attached = false;
          const err = error as FirebaseError;
          if (err.code !== "PERMISSION_DENIED") {
            set({ file: null, loading: false, error: err.message });
          }
        },
      );
    };

    onIdTokenChanged(auth, (user) => {
      off(ref);
      attached = false;
      if (user) attach();
    });

    attach();
  },
}));
