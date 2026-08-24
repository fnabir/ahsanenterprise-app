import type { Metadata } from "next";
import { CardVersion } from "@repo/ui";
import { changelog } from "@repo/core";
import packageJson from "../../../../../package.json";
import BreadcrumbSetter from "@/components/breadcrumb-setter";
import { useAuth } from "@/contexts/AuthContext";

const BREADCRUMB_ITEMS = [{ label: "Changelog" }];

export const metadata: Metadata = {
  title: "Changelog",
};

export default function ChangelogPage() {
  const { isAdmin } = useAuth();

  return (
    <>
      <BreadcrumbSetter items={BREADCRUMB_ITEMS} />
      <div className="overflow-y-auto grid grid-cols-4 gap-4 px-2 lg:px-4 py-2 lg:py-4">
        {Object.keys(changelog).map((version, index) => {
          return (
            <CardVersion
              key={index}
              isAdmin={isAdmin}
              version={version}
              showCurrentVersion={version === packageJson.version}
            />
          );
        })}
      </div>
    </>
  );
}
