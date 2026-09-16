"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { signOut } from "@repo/firebase";
import {
  Button,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@repo/ui";
import Breadcrumb from "./breadcrumb";
import ThemeToggle from "./theme-toggle";
import { useBreadcrumb } from "@/contexts/BreadcrumbContext";
import { useAuth } from "@/contexts/AuthContext";
import { useIsMobile } from "@repo/core";
import { MdAccountCircle, MdLogout } from "react-icons/md";

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
                <span className="text-primary bg-primary-subtle px-4 py-1 rounded-full cursor-default">
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
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                isMobile ? (
                  <Button
                    className="p-1!"
                    variant="subtle"
                    Icon={<MdAccountCircle />}
                  />
                ) : (
                  <Button
                    className="py-1! px-2!"
                    variant="subtle"
                    label={user.displayName ?? "User"}
                  />
                )
              }
            />
            <DropdownMenuContent className="w-38">
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Link
                    className={"flex space-x-2 items-center"}
                    href={"/account-details"}
                  >
                    <MdAccountCircle />
                    <span>Account Details</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  variant="destructive"
                  className="cursor-pointer"
                  onClick={handleSignOut}
                >
                  <MdLogout />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        <ThemeToggle />
      </div>
    </header>
  );
}
