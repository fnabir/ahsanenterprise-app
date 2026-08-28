import BreadcrumbSetter from "@/components/breadcrumb-setter";
import RequisitionSection from "@/components/pages/requisitions/requisition-section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Requisition",
};

const BREADCRUMB_ITEMS = [{ label: "Requisition" }];

export default function PoRequisitionPage() {
  return (
    <div className="h-full flex flex-col">
      <BreadcrumbSetter items={BREADCRUMB_ITEMS} />

      <RequisitionSection />
    </div>
  );
}
