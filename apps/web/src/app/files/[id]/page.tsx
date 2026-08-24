import { getFullFileNo } from "@repo/core";
import BreadcrumbSetter from "@/components/breadcrumb-setter";
import { notFound } from "next/navigation";
import FileDetailsSection from "@/components/pages/files/file-details/details-section";

export default async function FileDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [year, fileNo] = id.split("-");

  if (
    !year ||
    !fileNo ||
    Number.isNaN(Number(year)) ||
    Number.isNaN(Number(fileNo))
  ) {
    notFound();
  }

  let fullFileNo = "";

  try {
    fullFileNo = getFullFileNo(fileNo, year);
  } catch {
    notFound();
  }

  const BREADCRUMB_ITEMS = [
    { label: "Files", href: `/files?year=${year}` },
    { label: fullFileNo },
  ];

  return (
    <>
      <BreadcrumbSetter items={BREADCRUMB_ITEMS} />
      <FileDetailsSection year={year} fileNo={fileNo} />
    </>
  );
}
