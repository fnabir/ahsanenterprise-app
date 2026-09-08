import { ref, get, push, DatabaseReference } from "firebase/database";
import { database } from "./core";

export function getDatabaseReference(path?: string): DatabaseReference {
  return ref(database, path ?? "/");
}

export function generateDatabaseKey(): string {
  return push(ref(database)).key;
}

export async function getDatabaseReferenceExists(
  path: string,
): Promise<boolean> {
  const snapshot = await get(getDatabaseReference(path));
  return snapshot.exists();
}

export function sanitizeData(obj: Record<string, any>) {
  const result: Record<string, any> = {};

  for (const key in obj) {
    const value = obj[key];

    if (
      value === undefined ||
      value === 0 ||
      (typeof value === "string" && value.trim() === "")
    ) {
      result[key] = null;
      continue;
    }

    if (value && typeof value === "object" && !Array.isArray(value)) {
      const nested = sanitizeData(value);
      result[key] = nested;
      continue;
    }

    result[key] = value;
  }

  return result;
}
