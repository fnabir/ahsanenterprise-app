import { useMemo } from "react";
import { useList } from "react-firebase-hooks/database";
import { DatabaseReference } from "firebase/database";

export function useUniqueList(ref: DatabaseReference) {
  const [data, loading, error] = useList(ref);

  const uniqueData = useMemo(() => {
    if (!data) return [];

    const seen = new Set<string>();

    return data.filter((snap) => {
      const key = snap.key;
      if (!key) return false;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [data]);

  return [uniqueData, loading, error] as const;
}
