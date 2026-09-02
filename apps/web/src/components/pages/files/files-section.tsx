"use client";

import Loading from "@/components/loading";
import {
  getCurrentYear,
  useFileLoading,
  useFilesByYear,
  useFileError,
  useYear,
} from "@repo/core";
import {
  Button,
  CardFile,
  DialogFileInfo,
  Label,
  Select,
  Skeleton,
} from "@repo/ui";
import { AnimatePresence, motion } from "framer-motion";
import { FaPlus } from "react-icons/fa";

const currentYear = getCurrentYear();
const getYearsRange = (start = 2021, end = currentYear) =>
  Array.from({ length: end - start + 1 }, (_, i) => ({
    value: start + i,
  })).reverse();
const validYears = getYearsRange().map((y) => y.value);

export default function FilesSection() {
  const { year, changeYear } = useYear(validYears);
  const loading = useFileLoading();
  const error = useFileError();
  const files = useFilesByYear(String(year));
  const isEmpty = !loading && Object.keys(files).length === 0;

  if (loading) return <Loading />;

  if (error)
    return (
      <div className="grow flex flex-col items-center justify-center">
        <div className="font-semibold">Error</div>
        <div className="text-muted">{error}</div>
      </div>
    );

  return (
    <div className="flex flex-col h-full divide-y-2">
      <div className="flex py-2 px-2 lg:px-4 gap-2 items-center">
        <Label text="Year" className="text-base!" />
        <Select
          value={year}
          onChange={changeYear}
          options={getYearsRange()}
          className="max-w-28"
        />
        <DialogFileInfo year={year}>
          <Button
            label="Add File"
            variant="subtle"
            Icon={<FaPlus />}
            className="w-fit"
          />
        </DialogFileInfo>
      </div>
      <div className="flex-1 overflow-y-auto pt-1.5 lg:pt-3 pb-2 lg:pb-4 px-2 lg:px-4">
        <AnimatePresence mode="wait">
          {isEmpty ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 lg:grid-cols-5 gap-3"
            >
              <p className="col-span-full text-center text-muted">
                No files found for the year of {year}.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key={year}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 lg:grid-cols-5 gap-3"
            >
              {Object.entries(files)
                .reverse()
                .map(([fileNo, data]) => (
                  <CardFile
                    key={fileNo}
                    year={year}
                    fileNo={fileNo}
                    data={data}
                  />
                ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
