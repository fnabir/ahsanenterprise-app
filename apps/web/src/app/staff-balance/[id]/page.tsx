import BreadcrumbSetter from "@/components/breadcrumb-setter";
import TransactionStaffSection from "@/components/pages/transaction/transaction-staff-section";
import { getDatabaseReference } from "@repo/firebase";
import { useObject } from "react-firebase-hooks/database";

export default async function StaffTransactionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <>
      <TransactionStaffSection id={id} />
    </>
  );
}
