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

export const FILE_DB_KEY_PREFIX = "f_";
export const REQUISITION_DB_KEY_PREFIX = "r_";
