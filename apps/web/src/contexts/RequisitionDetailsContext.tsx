import { RequisitionDetailsProviderType } from "@/providers/RequisitionDetailsProvider";
import { createContext, useContext } from "react";

export interface RequisitionDetailsContextType {
  year: string;
  requisitionNo: string;
}

export const RequisitionDetailsContext =
  createContext<RequisitionDetailsContextType | null>(null);

export const useRequisitionDetailsContext = () => {
  const ctx = useContext(RequisitionDetailsContext);
  if (!ctx)
    throw new Error(
      "useRequisitionDetailsContext must be used inside provider",
    );
  return ctx as RequisitionDetailsProviderType;
};
