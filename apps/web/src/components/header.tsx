"use client";

import { MdLogout } from "react-icons/md";
import { signOut } from "@repo/firebase";
import { Button } from "@repo/ui";
import Breadcrumb from "./breadcrumb";
import ThemeToggle from "./theme-toggle";
import { useBreadcrumb } from "@/contexts/BreadcrumbContext";
import { useAuth } from "@/contexts/AuthContext";
import { useIsMobile } from "@repo/core";

export default function Header() {
  const { items } = useBreadcrumb();
  const { user } = useAuth();
  const isMobile = useIsMobile();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="w-full flex flex-row items-center justify-between py-2 px-2 lg:px-4">
      {user ? <Breadcrumb items={items} /> : <div />}
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
