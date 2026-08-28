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
      <div className="flex-1 overflow-y-auto pt-1.5 lg:pt-3 pb-2 lg:pb-4 px-2 lg:px-4">
        <RequisitionSection />
      </div>
    </div>
  );
}
