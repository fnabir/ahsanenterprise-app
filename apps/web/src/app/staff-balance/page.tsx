import { Metadata } from "next";
import BreadcrumbSetter from "@/components/breadcrumb-setter";

const BREADCRUMB_ITEMS = [{ label: "Staff Balance" }];

export const metadata: Metadata = {
  title: "Staff Balance",
};

export default function StaffBalancePage() {
  return (
    <>
      <BreadcrumbSetter items={BREADCRUMB_ITEMS} />
      <div className="overflow-y-auto grid grid-cols-4 gap-4 px-2 lg:px-4 py-2 lg:py-4"></div>
    </>
  );
}
