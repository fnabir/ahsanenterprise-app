import {
  RequisitionDetailsContextType,
  RequisitionDetailsContext,
} from "@/contexts/RequisitionDetailsContext";
import {
  fromFileDbKey,
  getFullRequisitionNo,
  useFileLoading,
  useFilesByYear,
  useRequisitionDetails,
  useRequisitionLoading,
} from "@repo/core";
import { Files, RequisitionDetails, RequisitionData } from "@repo/types";

export interface RequisitionDetailsProviderType {
  loading: boolean;
  year: string;
  requisitionNo: string;
  requisitionRef: string;
  data: RequisitionData | null;
  fileCount: number;
  expenses: RequisitionDetails[];
  lcsString?: string;
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

  const fileCount = Object.keys(data?.files ?? {}).length;

  const expenses: RequisitionDetails[] =
    fileCount > 0
      ? Object.entries(data?.files ?? {}).map(([fileNo, fileExpense]) => {
          const file = files[fromFileDbKey(fileNo)];

          return {
            fileNo,
            itemName: file?.itemName ?? requisitionRef,
            lc: file?.lc,
            duty: file?.total?.duty ?? 0,
            ...fileExpense,
          };
        })
      : [];

  const lcs = Object.values(expenses).map((file) => file.lc);
  const lcsString = lcs && lcs.length > 0 ? lcs.join(", ") : "-";

  const letter = data?.letter
    ? new Date(data.letter).toLocaleDateString("en-GB")
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
    const keys: (keyof RequisitionDetails)[] = [
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
    data: data,
    fileCount,
    expenses,
    lcsString,
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
