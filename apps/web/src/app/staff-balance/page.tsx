import { Metadata } from "next";
import BreadcrumbSetter from "@/components/breadcrumb-setter";
import BalanceSection from "@/components/pages/balance-section";

const BREADCRUMB_ITEMS = [{ label: "Staff Balance" }];

export const metadata: Metadata = {
  title: "Staff Balance",
};

export default function StaffBalancePage() {
  return (
    <>
      <BreadcrumbSetter items={BREADCRUMB_ITEMS} />
      <BalanceSection id="staff" />
    </>
  );
}
