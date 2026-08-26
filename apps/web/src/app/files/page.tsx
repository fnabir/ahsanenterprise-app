import BreadcrumbSetter from "@/components/breadcrumb-setter";
import FilesSection from "@/components/pages/files/files-section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Files",
};

const BREADCRUMB_ITEMS = [{ label: "Files" }];

export default function FilesPage() {
  return (
    <div className="h-full flex flex-col">
      <BreadcrumbSetter items={BREADCRUMB_ITEMS} />
      <div className="flex-1 overflow-y-auto pt-1.5 lg:pt-3 pb-2 lg:pb-4 px-2 lg:px-4">
        <FilesSection />
      </div>
    </div>
  );
}
