export const ACTIVE_FILE_STATUSES = [
  "New",
  "Assessment",
  "Duty Payment",
  "Delivery",
  "Bill",
];

export const FILE_STATUSES = [...ACTIVE_FILE_STATUSES, "Done"];

export const FILE_DUTY_ORDER = [
  "CD",
  "RD",
  "SD",
  "VAT",
  "AIT",
  "AT",
  "DF",
  "ZZZ",
];

export const FILE_STATUS_OPTIONS = FILE_STATUSES.map((status) => ({
  label: status,
  value: status,
}));

export const TRANSACTION_PAYMENT_OPTIONS = [
  { value: "Cash", label: "Cash" },
  { value: "Cheque", label: "Cheque" },
  { value: "Account Transfer", label: "Account Transfer" },
  { value: "Bank Transfer", label: "Bank Transfer" },
  { value: "CellFin", label: "CellFin (Phone)" },
  { value: "CellFin (Account)", label: "CellFin (Account)" },
  { value: "bKash", label: "bKash" },
];

export const FILE_DB_KEY_PREFIX = "f_";
export const REQUISITION_DB_KEY_PREFIX = "r_";
export const EXPENSE_KEY_PREFIX = "e_";

export const REQUISITION_EXPENSE_FIELDS = [
  { label: "Item Name", key: "itemName" },
  { label: "L/C No", key: "lc" },
  { label: "Duty", key: "duty", isCurrency: true },
  { label: "Port Charge", key: "port", isCurrency: true },
  { label: "NOC", key: "noc", isCurrency: true },
  { label: "Examine for Lab Test", key: "examine", isCurrency: true },
  { label: "Section Change", key: "section", isCurrency: true },
  { label: "Labour", key: "labour", isCurrency: true },
  { label: "Truck", key: "truck", isCurrency: true },
  { label: "Assessment / Delivery", key: "assessment", isCurrency: true },
];
