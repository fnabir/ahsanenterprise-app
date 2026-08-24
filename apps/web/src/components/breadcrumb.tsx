import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";

interface BreadCrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumb({
  items = [],
}: {
  items?: BreadCrumbItem[];
}) {
  const allItems = [{ label: "Home", href: "/" }, ...items];
  return (
    <nav className="flex flex-row items-center gap-2 text-sm lg:text-base select-none">
      {allItems.map((item, index) => (
        <div
          key={index}
          className="flex flex-row items-center gap-2 text-muted text-[15px]"
        >
          {item.href && items.length > 0 ? (
            <Link
              href={item.href}
              className="hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground">{item.label}</span>
          )}
          {index < allItems.length - 1 && <FaChevronRight />}
        </div>
      ))}
    </nav>
  );
}
