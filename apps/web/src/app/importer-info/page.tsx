import { Metadata } from "next";
import BreadcrumbSetter from "@/components/breadcrumb-setter";
import InfoImporterSection from "@/components/pages/info-importer-section";

const BREADCRUMB_ITEMS = [{ label: "Importer Info" }];

export const metadata: Metadata = {
  title: "Importer",
};

export default function ImporterInfoPage() {
  return (
    <div className="h-full flex flex-col divide-y-2">
      <BreadcrumbSetter items={BREADCRUMB_ITEMS} />
      <div className="flex-1 overflow-y-auto px-2 lg:px-4 py-2 lg:py-4">
        <InfoImporterSection />
      </div>
    </div>
  );
}
