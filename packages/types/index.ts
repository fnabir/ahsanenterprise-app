export interface BalanceTotal {
  name?: string;
  value: number;
  date?: string;
}

export type FileExpense = {
  details: string;
  value: number;
};

export type FileData = {
  importer?: string;
  itemCount?: number;
  itemName?: string;
  itemPackage?: string;
  lc?: string;
  vessel?: string;
  rotNo?: string;
  bl?: string;
  cnfValue?: number;
  assessableValue?: number;
  be?: number;
  beDate?: string;
  assessmentDate?: string;
  dutyPaymentDate?: string;
  deliveryDate?: string;
  dutyPaid?: string;
  paid?: number;
  remarks?: string;
  note?: string;
  status?: string;
  assessmentRef?: number;
  dutyRef?: number;
  duty?: Record<string, { percentage: number; value: number }>;
  port?: Record<string, { details: string; value: number }>;
  custom?: Record<string, { details: string; value: number }>;
  delivery?: Record<string, { details: string; value: number }>;
  other?: Record<string, { details: string; value: number }>;
  total?: {
    miscellaneous?: number;
    commission?: number;
    duty?: number;
    port?: number;
    custom?: number;
    delivery?: number;
    other?: number;
  };
};

export type FileTotals = {
  duty: number;
  port: number;
  custom: number;
  delivery: number;
  other: number;
  miscellaneous: number;
  commission: number;
  grandTotal: number;
  paid: number;
  balance: number;
};

export type Files = Record<string, FileData>;
export type FileYear = Record<string, Files>;
export type FileRoot = Record<string, FileYear>;

export type RequisitionFile = {
  assessment?: number;
  examine?: number;
  labour?: number;
  noc?: number;
  port?: number;
  section?: number;
  truck?: number;
};

export type RequisitionData = {
  arrival: string;
  delivery: string;
  letterDate: number;
  files: Record<string, RequisitionFile>;
};

export type RequisitionYear = Record<string, RequisitionData>;
export type RequisitionRoot = Record<string, RequisitionYear>;

export type GroupedFileItem = {
  year: string;
  fileNo: string;
  data: FileData;
};

export type ImporterInfo = {
  address1?: string;
  address2?: string;
  address3?: string;
  commission?: number;
  minCommission?: number;
  miscExpense?: number;
};

export type TransactionData = {
  date: string;
  title: string;
  details?: string;
  value: number;
};
