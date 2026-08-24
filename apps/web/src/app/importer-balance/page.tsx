import { Metadata } from "next";
import BreadcrumbSetter from "@/components/breadcrumb-setter";
import BalanceSection from "@/components/pages/balance-section";

const BREADCRUMB_ITEMS = [{ label: "Importer Balance" }];

export const metadata: Metadata = {
  title: "Importer Balance",
};

export default function ImporterBalancePage() {
  return (
    <>
      <BreadcrumbSetter items={BREADCRUMB_ITEMS} />
      <BalanceSection id="importer" />
    </>
  );
}
