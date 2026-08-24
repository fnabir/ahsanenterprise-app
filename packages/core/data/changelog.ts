type ChangelogItem = {
  date?: string;
  details: string[];
};

export const changelog: Record<string, ChangelogItem> = {
  "1.5.0": {
    details: [
      "[UPDATE] Show all the years of Files available.",
      "[UPDATE] Improved performance of the dashboard.",
    ],
  },
  "1.4.1": {
    date: "2026-07-28",
    details: ["[ADMIN][UPDATE] Add an extra line for address in files."],
  },
  "1.4.0": {
    date: "2026-04-05",
    details: [
      "[ADMIN][UPDATE] Update the header font in job file print layout.",
      "[ADMIN][FIX] Change File No would not swap the file details and expense.",
      "[ADMIN][FIX] Total duty would show more than 2 decimal points.",
    ],
  },
  "1.3.0": {
    date: "2025-12-30",
    details: [
      "[ADMIN][FEATURE] Add P/O Requisition Page.",
      "[ADMIN][FIX] Fixed alignment issues in the expense and balance of file print layout.",
      "[FIX] Resolved a logic error to ensure accurate duty totals when values are set to zero.",
    ],
  },
  "1.2.2": {
    date: "2025-12-07",
    details: [
      "[ADMIN][UPDATE] Add option to insert and delete expense row.",
      "[ADMIN][UPDATE] Change currency symbol for print.",
    ],
  },
  "1.2.1": {
    date: "2025-12-04",
    details: [
      "[UPDATE] Change file duty input dialog to update value automatically based on percentage.",
      "[ADMIN][FIX] Delete file was available to non-admin users.",
      "[FIX] Adding new file not accepting file no input after first time.",
    ],
  },
  "1.2.0": {
    date: "2025-11-30",
    details: [
      "[FEATURE] Swap file no option.",
      "[ADMIN][FEATURE] Delete file option.",
      "[UPDATE] File can be added back up to 2021.",
      "[UPDATE] Duty and Port input field will take up to 10 entries.",
      "[FIX] New file without status not showed until all the filters are disabled.",
    ],
  },
  "1.1.0": {
    date: "2025-10-29",
    details: ["[FEATURE] Note option for files."],
  },
};
