import { Badge } from "../../core";

export function BadgeFileStatus({
  status,
  isAdmin,
}: {
  status?: string;
  isAdmin?: boolean;
}) {
  if (!status) return null;

  const style = (() => {
    switch (status) {
      case "Assessment":
        return "info";
      case "Duty Payment":
        return "warning";
      case "Delivery":
        return "accent";
      case "Bill":
        return "secondary";
      case "Done":
        return "success";
      default:
        return "muted";
    }
  })();

  const badgeClassByStyle = {
    info: "text-info! bg-info-subtle! border-info!",
    warning: "text-warning! bg-warning-subtle! border-warning!",
    accent: "text-accent! bg-accent-subtle! border-accent!",
    secondary: "text-secondary! bg-secondary-subtle! border-secondary!",
    success: "text-success! bg-success-subtle! border-success!",
    muted: "text-muted! bg-muted-subtle! border-muted!",
  } as const;

  const dotClassByStyle = {
    info: "bg-info",
    warning: "bg-warning",
    accent: "bg-accent",
    secondary: "bg-secondary",
    success: "bg-success",
    muted: "bg-muted",
  } as const;

  return (
    <Badge className={`border py-0! ${badgeClassByStyle[style]}`}>
      <div className={`size-1.5 rounded-full ${dotClassByStyle[style]}`} />
      {!isAdmin && status === "Bill" ? "Done" : status}
    </Badge>
  );
}
