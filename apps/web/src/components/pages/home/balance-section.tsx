"use client";

import { useAuth } from "@/contexts/AuthContext";
import TotalBalanceSection from "./total-balance-section";
import StaffBalanceSection from "@/components/pages/home/staff-balance-section";

export default function BalanceSection() {
  const { user, isAdmin } = useAuth();

  return isAdmin ? (
    <TotalBalanceSection />
  ) : (
    <StaffBalanceSection uid={user?.uid ?? ""} />
  );
}
