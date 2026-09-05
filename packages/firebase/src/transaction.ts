import { update } from "firebase/database";
import { fromISODate } from "@repo/core";
import { toast } from "@repo/ui";
import type { FirebaseError } from "firebase/app";
import { generateDatabaseKey, getDatabaseReference } from "./helpers";
import type { TransactionData } from "@repo/types";

export async function updateTransaction(
  id: string,
  type: "staff" | "importer",
  transactionType: "bill" | "payment",
  data: TransactionData,
  transactionId?: string,
) {
  const key =
    transactionId ?? fromISODate("yyMMdd", data.date) + generateDatabaseKey();
  const transactionRef = getDatabaseReference(
    `transaction/${type}/${id}/${transactionType}/${key}`,
  );
  try {
    await update(transactionRef, {
      ...data,
      date: fromISODate("dd.MM.yy", data.date),
    });
    toast.success(`Transaction ${key ? "updated" : "added"} successfully.`);
  } catch (error) {
    toast.error(
      `Failed to ${key ? "update" : "add"} the transaction.`,
      (error as FirebaseError).message,
    );
  }
}
