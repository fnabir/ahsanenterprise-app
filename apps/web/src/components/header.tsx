"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { signOut } from "@repo/firebase";
import { Button } from "@repo/ui";
import Breadcrumb from "./breadcrumb";
import ThemeToggle from "./theme-toggle";
import { useBreadcrumb } from "@/contexts/BreadcrumbContext";
import { useAuth } from "@/contexts/AuthContext";
import { useIsMobile } from "@repo/core";
const LINKS = [
  { href: "/", label: "Home" },
  { href: "/files", label: "Files" },
  { href: "/requisition", label: "Requisition" },
];

export default function Header() {
  const { items } = useBreadcrumb();
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const pathname = usePathname();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="w-full flex flex-row items-center justify-between py-2 px-2 lg:px-4">
      {user ? <Breadcrumb items={items} /> : <div />}

      {user && !isMobile && (
        <ul className="flex flex-row items-center gap-2 text-sm">
          {LINKS.map((link) => (
            <li key={link.href}>
              {pathname === link.href ? (
                <span className="text-primary bg-primary-subtle px-4 py-1 rounded-full">
                  {link.label}
                </span>
              ) : (
                <Link
                  href={link.href}
                  className="text-muted hover:text-foreground transition-colors px-2"
                >
                  {link.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      )}
      <div className="flex flex-row items-center gap-2">
        {user && (
          <Button
            onClick={handleSignOut}
            ariaLabel="Logout Button"
            label={isMobile ? undefined : "Logout"}
            variant="danger"
            Icon={<MdLogout />}
            className={isMobile ? "p-1!" : ""}
          />
        )}
        <ThemeToggle />
      </div>
    </header>
  );
}
