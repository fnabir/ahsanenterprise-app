import {
  RequisitionDetailsContextType,
  RequisitionDetailsContext,
} from "@/contexts/RequisitionDetailsContext";
import {
  getFullRequisitionNo,
  useFileLoading,
  useFilesByYear,
  useRequisitionDetails,
  useRequisitionLoading,
} from "@repo/core";
import { Files, RequisitionExpense } from "@repo/types";

export interface RequisitionDetailsProviderType {
  loading: boolean;
  year: string;
  requisitionNo: string;
  requisitionRef: string;
  expenses: RequisitionExpense[];
  lcs: (string | undefined | null)[];
  date: {
    letter: string | null;
    arrival: string | null;
    delivery: string | null;
  };
  subtotalPerFile: number[];
  total: number;
}

export const RequisitionDetailsProvider = ({
  year,
  requisitionNo,
  children,
}: RequisitionDetailsContextType & { children: React.ReactNode }) => {
  const requisitionLoading = useRequisitionLoading();
  const fileLoading = useFileLoading();
  const loading = requisitionLoading || fileLoading;

  const requisitionRef = getFullRequisitionNo(requisitionNo, year);
  const data = useRequisitionDetails(year, requisitionNo);
  const files: Files = useFilesByYear(year);

  const expenses: RequisitionExpense[] = Object.entries(data?.files ?? {}).map(
    ([fileNo, fileExpense]) => ({
      fileNo,
      itemName: files[fileNo] ? files[fileNo]?.itemName : "N/A",
      lc: files[fileNo]?.lc,
      duty: files[fileNo]?.total?.duty ?? 0,
      ...fileExpense,
    }),
  );

  const lcs = Object.values(expenses).map((file) => file.lc);

  const letter = data?.letterDate
    ? new Date(data.letterDate).toLocaleDateString("en-GB")
    : null;
  const arrival = data?.arrival
    ? new Date(data.arrival).toLocaleDateString("en-GB")
    : null;
  const delivery = data?.delivery
    ? new Date(data.delivery).toLocaleDateString("en-GB")
    : null;

  const date = {
    letter,
    arrival,
    delivery,
  };

  const subtotalPerFile = expenses.map((expense) => {
    const keys: (keyof RequisitionExpense)[] = [
      "duty",
      "port",
      "noc",
      "examine",
      "section",
      "labour",
      "truck",
      "assessment",
    ];

    return keys.reduce((sum, key) => {
      const value = expense[key];
      return sum + (typeof value === "number" ? value : 0);
    }, 0);
  });

  const total = subtotalPerFile.reduce((sum, subtotal) => sum + subtotal, 0);

  const processed: RequisitionDetailsProviderType = {
    loading,
    year,
    requisitionNo,
    requisitionRef,
    expenses,
    lcs,
    date,
    subtotalPerFile,
    total,
  };

  return (
    <RequisitionDetailsContext.Provider value={processed}>
      {children}
    </RequisitionDetailsContext.Provider>
  );
};
