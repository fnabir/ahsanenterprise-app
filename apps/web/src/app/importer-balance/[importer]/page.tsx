import BreadcrumbSetter from "@/components/breadcrumb-setter";
import TransactionImporterSection from "@/components/pages/transaction/transaction-importer-section";

export default async function ImporterTransactionPage({
  params,
}: {
  params: Promise<{ importer: string }>;
}) {
  let { importer } = await params;
  importer = decodeURIComponent(importer);

  const BREADCRUMB_ITEMS = [
    { label: "Importer Balance", href: "/importer-balance" },
    { label: importer },
  ];

  return (
    <>
      <BreadcrumbSetter items={BREADCRUMB_ITEMS} />
      <TransactionImporterSection id={importer} />
    </>
  );
}
