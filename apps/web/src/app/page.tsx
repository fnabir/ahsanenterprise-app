import BalanceSection from "@/components/pages/home/balance-section";
import ChangelogSection from "@/components/pages/home/changelog-section";
import FilesSection from "@/components/pages/home/files-section";
import StatusOverviewSection from "@/components/pages/home/status-overview-section";
import { Card } from "@repo/ui";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grow min-h-0 overflow-y-auto flex flex-col lg:flex-row divide-x-2 gap-2 px-2 lg:px-4">
      <div className="grow flex flex-col gap-4 pr-2 lg:pr-4 divide-y-2 pt-1.5 lg:pt-3 pb-2 lg:pb-4">
        <BalanceSection />
        <FilesSection />
      </div>

      <hr />
      <div className="w-full lg:w-1/5 shrink-0 flex flex-col gap-4 pt-1.5 lg:pt-3 pb-2 lg:pb-4">
        <ChangelogSection />
        <StatusOverviewSection />
        <Link href="/importer-info">
          <Card clickable>Importer Info</Card>
        </Link>
      </div>
    </div>
  );
}
