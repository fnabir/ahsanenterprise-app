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
      <FilesSection />
    </div>
  );
}
