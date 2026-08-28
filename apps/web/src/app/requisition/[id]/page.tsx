import { getFullRequisitionNo } from "@repo/core";
import BreadcrumbSetter from "@/components/breadcrumb-setter";
import { notFound } from "next/navigation";
import RequisitionDetailsSection from "@/components/pages/requisitions/requisition-details/details-section";

export default async function RequisitionDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [year, requisitionNo] = id.split("-");

  if (
    !year ||
    !requisitionNo ||
    Number.isNaN(Number(year)) ||
    Number.isNaN(Number(requisitionNo))
  ) {
    notFound();
  }

  let fullRequisitionNo = "";

  try {
    fullRequisitionNo = getFullRequisitionNo(requisitionNo, year);
  } catch {
    notFound();
  }

  const BREADCRUMB_ITEMS = [
    { label: "Requisitions", href: `/requisition?year=${year}` },
    { label: fullRequisitionNo },
  ];

  return (
    <>
      <BreadcrumbSetter items={BREADCRUMB_ITEMS} />
      <RequisitionDetailsSection year={year} requisitionNo={requisitionNo} />
    </>
  );
}
