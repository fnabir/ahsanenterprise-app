import { ref, get, push, DatabaseReference } from "firebase/database";
import { database } from "./core";

export function getDatabaseReference(path?: string): DatabaseReference {
  return ref(database, path ?? "/");
}

export function generateDatabaseKey(path: string): string {
  return push(getDatabaseReference(path)).key;
}

export async function getDatabaseReferenceExists(
  path: string,
): Promise<boolean> {
  const snapshot = await get(getDatabaseReference(path));
  return snapshot.exists();
}
