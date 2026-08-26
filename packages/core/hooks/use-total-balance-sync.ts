"use client";

import { useEffect } from "react";
import { useObjectVal } from "react-firebase-hooks/database";
import { getDatabaseReference } from "@repo/firebase";
import { set } from "firebase/database";

export function TotalBalanceSync({
  path,
  total = 0,
}: {
  path: string;
  total?: number;
}) {
  const ref = getDatabaseReference(`${path}/value`);

  const [storedTotal, loading, error] = useObjectVal<number>(ref);

  useEffect(() => {
    if (loading) return;
    if (error) return;

    if (storedTotal !== total) {
      const timeout = setTimeout(() => {
        set(ref, total);
      }, 300);

      return () => clearTimeout(timeout);
    }
  }, [storedTotal, loading, error, total, ref]);

  return null;
}
