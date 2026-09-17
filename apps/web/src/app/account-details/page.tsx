import BreadcrumbSetter from "@/components/breadcrumb-setter";
import { Metadata } from "next";
import UserDetailsSection from "@/components/pages/account-details/user-details";
import ChangePasswordSection from "@/components/pages/account-details/change-password";

export const metadata: Metadata = {
  title: "Account Details",
};

const BREADCRUMB_ITEMS = [{ label: "Account Details" }];

export default function AccountDetailsPage() {
  return (
    <div className="h-full flex flex-col divide-y-2">
      <BreadcrumbSetter items={BREADCRUMB_ITEMS} />
      <UserDetailsSection />
      <ChangePasswordSection />
    </div>
  );
}
