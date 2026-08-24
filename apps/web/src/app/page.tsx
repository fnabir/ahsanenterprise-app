import BalanceSection from "@/components/pages/home/balance-section";
import ChangelogSection from "@/components/pages/home/changelog-section";
import FilesSection from "@/components/pages/home/files-section";
import StatusOverviewSection from "@/components/pages/home/status-overview-section";

export default function Home() {
  return (
    <div className="grow min-h-0 overflow-y-auto flex flex-col lg:flex-row divide-x-2 gap-2 px-2 lg:px-4">
      <div className="grow flex flex-col gap-4 pr-2 lg:pr-4 divide-y-2 pb-2 lg:pb-4">
        <BalanceSection />
        <FilesSection />
      </div>

      <hr />
      <div className="w-full lg:w-1/5 shrink-0 flex flex-col gap-4 pb-2 lg:pb-4">
        <ChangelogSection />
        <StatusOverviewSection />
      </div>
    </div>
  );
}
