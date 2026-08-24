import Link from "next/link";
import { CardVersion } from "@repo/ui";

export default function ChangelogSection() {
  return (
    <Link href="/changelog" className="w-full">
      <CardVersion clickable />
    </Link>
  );
}
