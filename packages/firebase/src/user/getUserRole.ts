import { get } from "firebase/database";
import { getDatabaseReference } from "../helpers";

export async function getUserRole(uid: string): Promise<string | null> {
  const userRef = getDatabaseReference(`info/user/${uid}/role`);
  const snap = await get(userRef);

  if (!snap.exists()) return null;

  return snap.val() ?? null;
}
