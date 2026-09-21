"use client";

import { useEffect, useMemo, useState } from "react";
import {
  fromFileDbKey,
  getFullFileNo,
  toFileDbKey,
  useFilesByYear,
} from "@repo/core";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../../core/dialog";
import { RequisitionData, RequisitionExpense } from "@repo/types";
import {
  RequisitionInfoFormInput,
  RequisitionInfoFormSchema,
  RequisitionInfoFormOutput,
} from "@repo/validators";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getFullRequisitionNo, toRequisitionDbKey } from "@repo/core";
import { FormInput } from "../../form-field/FormInput";
import { Button } from "../../core/button";
import { getDatabaseReferenceExists, requisitionInfo } from "@repo/firebase";
import { FormSelect, toast } from "../..";
import { FaPlus, FaTimes } from "react-icons/fa";

export function DialogRequisitionInfo({
  children,
  year,
  ref,
  data,
}: {
  children: React.ReactElement;
  year: number;
  ref?: string;
  data?: RequisitionData | null;
}) {
  const [open, setOpen] = useState(false);

  const defaultValues = useMemo(
    () => ({
      ref: ref ?? "",
      files: data?.files ? Object.keys(data.files) : [],
      letter: data?.letter ?? "",
      arrival: data?.arrival ?? "",
      delivery: data?.delivery ?? "",
    }),
    [ref, data],
  );

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting },
  } = useForm<RequisitionInfoFormInput, any, RequisitionInfoFormOutput>({
    resolver: zodResolver(RequisitionInfoFormSchema),
    defaultValues: defaultValues,
  });

  const availableFiles = useFilesByYear(year);
  const availableFileNos = useMemo(() => {
    return new Set(
      Object.keys(availableFiles)
        .map((key) => Number(fromFileDbKey(key)))
        .filter((n) => Number.isInteger(n) && n > 0),
    );
  }, [availableFiles]);
  const availableFilesList = Array.from(availableFileNos).map((fileNo) => ({
    label: getFullFileNo(fileNo, year),
    value: toFileDbKey(fileNo),
  }));

  const selectedFiles = watch("files");
  const currentSelectedFiles =
    selectedFiles.length === 0 ? [""] : selectedFiles;

  const getAvailableOptions = (index: number) => {
    const used = currentSelectedFiles.filter((_, i) => i !== index);
    return availableFilesList.filter((opt) => !used.includes(opt.value));
  };

  const addFile = () => {
    if (currentSelectedFiles.length >= 4) return;

    const next = [...currentSelectedFiles, ""];
    reset({ ...watch(), files: next });
  };

  const removeFileAt = (index: number) => {
    const next = currentSelectedFiles.filter((_, i) => i !== index);

    if (next.length === 0) {
      next.push("");
    }

    reset({ ...watch(), files: next });
  };

  const onSubmit = async (FormData: RequisitionInfoFormOutput) => {
    const { ref: requisitionNo, ...details } = FormData;
    const dbRef = `requisition/${year}/${toRequisitionDbKey(requisitionNo)}`;
    if (!ref && !data && (await getDatabaseReferenceExists(dbRef))) {
      toast.error("Reference already exists!");
      return;
    }

    const oldFiles = data?.files ?? {};
    const newFiles = FormData.files;

    const files: Record<string, RequisitionExpense> = {};
    for (const file of newFiles) {
      files[file] = oldFiles[file] ?? { port: 0 };
    }

    const payload = {
      ...details,
      files,
    };

    await requisitionInfo(dbRef, payload);
    setOpen(false);
  };

  useEffect(() => {
    if (!open) reset(defaultValues);
  }, [open, reset, defaultValues]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={children} />
      <DialogContent className="border-primary">
        <DialogHeader>
          <DialogTitle>
            {ref ? getFullRequisitionNo(ref, year) : "Add New P/O Requisition"}
          </DialogTitle>
          <DialogDescription>
            {ref && data
              ? "Update the information for this requisition. Removing or replacing a file will clear the requisition expenses recorded for that file."
              : "Fill in the details for the new requisition."}
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="h-fit flex flex-col gap-2"
        >
          {!ref && (
            <FormInput
              name="ref"
              control={control}
              label="Requisition No"
              disabled={isSubmitting}
              startAdornment={
                <span className="text-sm text-muted">AE/POR/</span>
              }
              endAdornment={<span className="text-sm text-muted">/{year}</span>}
              required
            />
          )}
          {currentSelectedFiles.map((_, index) => (
            <div key={index} className="flex items-start gap-2">
              <FormSelect
                name={`files.${index}`}
                control={control}
                label={`File ${index + 1}`}
                options={getAvailableOptions(index)}
                disabled={isSubmitting}
                required
              />

              <div className="flex gap-1 pt-7">
                {currentSelectedFiles.length < 4 && (
                  <button
                    type="button"
                    onClick={addFile}
                    disabled={isSubmitting}
                    className="text-muted hover:text-primary"
                    aria-label="Insert expense above this row"
                  >
                    <FaPlus size={14} className="rotate-180" />
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => removeFileAt(index)}
                  disabled={isSubmitting}
                  className="text-muted hover:text-danger"
                  aria-label="Discard this expense"
                >
                  <FaTimes size={16} />
                </button>
              </div>
            </div>
          ))}
          <div className="flex gap-2">
            <FormInput
              name="letter"
              control={control}
              label="Letter Date"
              type="date"
              disabled={isSubmitting}
              required
            />
            <FormInput
              name="arrival"
              control={control}
              label="Arrival Date"
              type="date"
              disabled={isSubmitting}
              required
            />
            <FormInput
              name="delivery"
              control={control}
              label="Delivery Date"
              type="date"
              disabled={isSubmitting}
              required
            />
          </div>
        </form>

        <DialogFooter>
          <Button
            variant="primary"
            label={ref && data ? "Update" : "Add"}
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            className="w-full max-w-22"
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
