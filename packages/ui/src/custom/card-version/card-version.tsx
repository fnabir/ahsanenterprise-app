import { Badge, Card } from "../../core";
import { changelog } from "@repo/core";
import packageJson from "../../../../../package.json";
import { FaAnglesRight } from "react-icons/fa6";

const currentVersion = packageJson.version;

export function CardVersion({
  version = currentVersion,
  isAdmin,
  showCurrentVersion = false,
  clickable = false,
}: {
  version?: string;
  isAdmin: boolean;
  showCurrentVersion?: boolean;
  clickable?: boolean;
}) {
  const log = changelog[version] ?? null;
  const date = log?.date;

  const filteredDetails =
    log?.details.filter((detail) => {
      return detail.startsWith("[ADMIN]") ? isAdmin : true;
    }) ?? [];

  function renderDetail(detail: string, index: number) {
    const cleanDetail = detail.replace("[ADMIN]", "").trim();

    const tagMatch = cleanDetail.match(/^\[(.*?)\]/);
    const tag = tagMatch ? tagMatch[1] : null;

    const message = tagMatch
      ? cleanDetail.replace(tagMatch[0], "").trim()
      : cleanDetail;

    return (
      <div
        key={index}
        className="w-full flex flex-row text-sm lg:text-[14px] py-0.5 gap-2"
      >
        {tag && (
          <div
            className={`font-semibold ${
              tag === "FEATURE"
                ? "text-success"
                : tag === "UPDATE"
                  ? "text-info"
                  : tag === "FIX"
                    ? "text-danger"
                    : "text-foreground"
            }`}
          >
            <FaAnglesRight className="inline-block -translate-y-px" size={12} />
          </div>
        )}

        <div>{message}</div>
      </div>
    );
  }

  return (
    <Card className="flex flex-col items-center px-4!" clickable={clickable}>
      <div className="text-sm lg:text-base font-semibold">AHSAN ENTERPRISE</div>
      <div className="flex gap-2 items-center">
        <div className="text-2xl lg:text-3xl font-mono text-primary">
          {version}
        </div>
        {showCurrentVersion && <Badge variant="success">Current</Badge>}
      </div>
      {date && (
        <div className="text-muted text-center text-sm lg:text-base">
          {new Date(date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </div>
      )}
      <div className="w-full h-px bg-muted my-3" />
      {filteredDetails.length > 0 ? (
        filteredDetails.map((detail, index) => renderDetail(detail, index))
      ) : (
        <div className="py-1">No changelog available for this version.</div>
      )}
    </Card>
  );
}
