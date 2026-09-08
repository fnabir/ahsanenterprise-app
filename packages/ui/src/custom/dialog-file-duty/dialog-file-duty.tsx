"use client";

import { useEffect, useMemo, useState, type ReactElement } from "react";
import {
  FileDutySchema,
  FileDutyFormInput,
  FileDutyFormOutput,
} from "@repo/validators";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  FormInput,
  Label,
} from "../..";
import { FileData } from "@repo/types";
import { getFullFileNo } from "@repo/core";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateFile } from "@repo/firebase";

export function DialogFileDuty({
  children,
  year,
  fileNo,
  data,
}: {
  children: ReactElement;
  year: string;
  fileNo: string;
  data?: FileData;
}) {
  const [open, setOpen] = useState(false);
  const assesableValue = useMemo(
    () => data?.assessableValue ?? 0,
    [data?.assessableValue],
  );

  const defaultValues = useMemo(() => {
    return {
      assessmentRef:
        data?.assessmentRef != null ? String(data.assessmentRef) : "",
      dutyRef: data?.dutyRef != null ? String(data.dutyRef) : "",
      CD: {
        percentage:
          data?.duty?.CD?.percentage != null
            ? String(data.duty.CD.percentage)
            : "",
        value: data?.duty?.CD?.value != null ? String(data.duty.CD.value) : "",
      },
      RD: {
        percentage:
          data?.duty?.RD?.percentage != null
            ? String(data.duty.RD.percentage)
            : "",
        value: data?.duty?.RD?.value != null ? String(data.duty.RD.value) : "",
      },
      SD: {
        percentage:
          data?.duty?.SD?.percentage != null
            ? String(data.duty.SD.percentage)
            : "",
        value: data?.duty?.SD?.value != null ? String(data.duty.SD.value) : "",
      },
      VAT: {
        percentage:
          data?.duty?.VAT?.percentage != null
            ? String(data.duty.VAT.percentage)
            : "",
        value:
          data?.duty?.VAT?.value != null ? String(data.duty.VAT.value) : "",
      },
      AIT: {
        percentage:
          data?.duty?.AIT?.percentage != null
            ? String(data.duty.AIT.percentage)
            : "",
        value:
          data?.duty?.AIT?.value != null ? String(data.duty.AIT.value) : "",
      },
      AT: {
        percentage:
          data?.duty?.AT?.percentage != null
            ? String(data.duty.AT.percentage)
            : "",
        value: data?.duty?.AT?.value != null ? String(data.duty.AT.value) : "",
      },
      DF: {
        value: data?.duty?.DF?.value != null ? String(data.duty.DF.value) : "",
      },
      total: data?.total?.duty != null ? String(data.total.duty) : "",
      dutyPaid: data?.dutyPaid ?? "",
    };
  }, [data]);

  const {
    control,
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FileDutyFormInput, any, FileDutyFormOutput>({
    resolver: zodResolver(FileDutySchema),
    defaultValues,
  });

  const cdPercentage = watch("CD.percentage");
  const rdPercentage = watch("RD.percentage");
  const sdPercentage = watch("SD.percentage");
  const vatPercentage = watch("VAT.percentage");
  const aitPercentage = watch("AIT.percentage");
  const atPercentage = watch("AT.percentage");
  const cdValue = watch("CD.value") || 0;
  const rdValue = watch("RD.value") || 0;
  const sdValue = watch("SD.value") || 0;

  useEffect(() => {
    if (!cdPercentage || Number(cdPercentage) <= 0) {
      setValue("CD.value", "0", { shouldValidate: true });
      return;
    }

    const calculated = (Number(cdPercentage) / 100) * assesableValue;
    setValue("CD.value", String(calculated.toFixed(2)), {
      shouldValidate: true,
    });
  }, [cdPercentage, assesableValue]);

  useEffect(() => {
    if (!rdPercentage || Number(rdPercentage) <= 0) {
      setValue("RD.value", "0", { shouldValidate: true });
      return;
    }

    const calculated = (Number(rdPercentage) / 100) * assesableValue;
    setValue("RD.value", String(calculated.toFixed(2)), {
      shouldValidate: true,
    });
  }, [rdPercentage, assesableValue]);

  useEffect(() => {
    if (!sdPercentage || Number(sdPercentage) <= 0) {
      setValue("SD.value", "0", { shouldValidate: true });
      return;
    }

    const calculated =
      (Number(sdPercentage) / 100) *
      (assesableValue + Number(cdValue) + Number(rdValue));
    setValue("SD.value", String(calculated.toFixed(2)), {
      shouldValidate: true,
    });
  }, [sdPercentage, assesableValue, cdValue, rdValue]);

  useEffect(() => {
    if (!vatPercentage || Number(vatPercentage) <= 0) {
      setValue("VAT.value", "0", { shouldValidate: true });
      return;
    }

    const calculated =
      (Number(vatPercentage) / 100) *
      (assesableValue + Number(cdValue) + Number(rdValue));
    setValue("VAT.value", String(calculated.toFixed(2)), {
      shouldValidate: true,
    });
  }, [vatPercentage, assesableValue, cdValue, rdValue]);

  useEffect(() => {
    if (!aitPercentage || Number(aitPercentage) <= 0) {
      setValue("AIT.value", "0", { shouldValidate: true });
      return;
    }

    const calculated = (Number(aitPercentage) / 100) * assesableValue;
    setValue("AIT.value", String(calculated.toFixed(2)), {
      shouldValidate: true,
    });
  }, [aitPercentage, assesableValue]);

  useEffect(() => {
    if (!atPercentage || Number(atPercentage) <= 0) {
      setValue("AT.value", "0", { shouldValidate: true });
      return;
    }

    const calculated =
      (Number(atPercentage) / 100) *
      (assesableValue + Number(cdValue) + Number(rdValue) + Number(sdValue));
    setValue("AT.value", String(calculated.toFixed(2)), {
      shouldValidate: true,
    });
  }, [atPercentage, assesableValue, cdValue, rdValue, sdValue]);

  const onSubmit = async (FormData: FileDutyFormOutput) => {
    const values = [
      FormData.CD?.value,
      FormData.RD?.value,
      FormData.SD?.value,
      FormData.VAT?.value,
      FormData.AIT?.value,
      FormData.AT?.value,
      FormData.DF?.value,
    ];

    const total =
      FormData.total ??
      values
        .map((v) => Number(v) || 0)
        .reduce((acc, val) => acc + (val || 0), 0);

    const result = {
      assessmentRef: FormData.assessmentRef,
      dutyRef: FormData.dutyRef,
      duty: {
        CD: {
          percentage: FormData.CD?.percentage,
          value: FormData.CD?.value,
        },
        RD: {
          percentage: FormData.RD?.percentage,
          value: FormData.RD?.value,
        },
        SD: {
          percentage: FormData.SD?.percentage,
          value: FormData.SD?.value,
        },
        VAT: {
          percentage: FormData.VAT?.percentage,
          value: FormData.VAT?.value,
        },
        AIT: {
          percentage: FormData.AIT?.percentage,
          value: FormData.AIT?.value,
        },
        AT: {
          percentage: FormData.AT?.percentage,
          value: FormData.AT?.value,
        },
        DF: {
          value: FormData.DF?.value,
        },
      },
      total: {
        duty: total,
      },
      dutyPaid: FormData.dutyPaid,
    };

    await updateFile(fileNo, year, result);
    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      reset(defaultValues);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={children} />
      <DialogContent className="border-primary">
        <DialogHeader>
          <DialogTitle>{getFullFileNo(fileNo, year)}</DialogTitle>
          <DialogDescription>
            Update the details for this file.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="h-fit flex flex-col gap-2"
        >
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <FormInput
                name="assessmentRef"
                control={control}
                label="Assessment Reference"
                placeholder="Assessment reference"
                disabled={isSubmitting}
                startAdornment="A-"
                type="number"
              />
              <FormInput
                name="dutyRef"
                control={control}
                label="Duty Reference"
                placeholder="Duty reference"
                disabled={isSubmitting}
                startAdornment="R-"
                type="number"
              />
            </div>
            <div className="flex gap-2">
              <Label text="CD" className="self-end py-1.75 text-[15px]!" />
              <FormInput
                name="CD.percentage"
                control={control}
                label="Percentage"
                placeholder="Percentage"
                endAdornment="%"
                disabled={isSubmitting}
                type="number"
                allowDecimal
              />
              <FormInput
                name="CD.value"
                control={control}
                label="Value"
                placeholder="Value"
                startAdornment="৳"
                disabled={isSubmitting}
                type="number"
                allowDecimal
              />
            </div>
            <div className="flex gap-2">
              <Label text="RD" className="self-end py-1.75 text-[15px]!" />
              <FormInput
                name="RD.percentage"
                control={control}
                label="Percentage"
                placeholder="Percentage"
                endAdornment="%"
                disabled={isSubmitting}
                type="number"
                allowDecimal
              />
              <FormInput
                name="RD.value"
                control={control}
                label="Value"
                placeholder="Value"
                startAdornment="৳"
                disabled={isSubmitting}
                type="number"
                allowDecimal
              />
            </div>
            <div className="flex gap-2">
              <Label text="SD" className="self-end py-1.75 text-[15px]!" />
              <FormInput
                name="SD.percentage"
                control={control}
                label="Percentage"
                placeholder="Percentage"
                endAdornment="%"
                disabled={isSubmitting}
                type="number"
                allowDecimal
              />
              <FormInput
                name="SD.value"
                control={control}
                label="Value"
                placeholder="Value"
                startAdornment="৳"
                disabled={isSubmitting}
                type="number"
                allowDecimal
              />
            </div>
            <div className="flex gap-2">
              <Label text="VAT" className="self-end py-1.75 text-[15px]!" />
              <FormInput
                name="VAT.percentage"
                control={control}
                label="Percentage"
                placeholder="Percentage"
                endAdornment="%"
                disabled={isSubmitting}
                type="number"
                allowDecimal
              />
              <FormInput
                name="VAT.value"
                control={control}
                label="Value"
                placeholder="Value"
                startAdornment="৳"
                disabled={isSubmitting}
                type="number"
                allowDecimal
              />
            </div>
            <div className="flex gap-2">
              <Label text="AIT" className="self-end py-1.75 text-[15px]!" />
              <FormInput
                name="AIT.percentage"
                control={control}
                label="Percentage"
                placeholder="Percentage"
                endAdornment="%"
                disabled={isSubmitting}
                type="number"
                allowDecimal
              />
              <FormInput
                name="AIT.value"
                control={control}
                label="Value"
                placeholder="Value"
                startAdornment="৳"
                disabled={isSubmitting}
                type="number"
                allowDecimal
              />
            </div>
            <div className="flex gap-2">
              <Label text="AT" className="self-end py-1.75 text-[15px]!" />
              <FormInput
                name="AT.percentage"
                control={control}
                label="Percentage"
                placeholder="Percentage"
                endAdornment="%"
                disabled={isSubmitting}
                type="number"
                allowDecimal
              />
              <FormInput
                name="AT.value"
                control={control}
                label="Value"
                placeholder="Value"
                startAdornment="৳"
                disabled={isSubmitting}
                type="number"
                allowDecimal
              />
            </div>
            <div className="flex gap-2">
              <Label text="DF/VAT" className="self-end py-1.75 text-[15px]!" />
              <FormInput
                name="DF.value"
                control={control}
                label="Value"
                placeholder="Value"
                startAdornment="৳"
                disabled={isSubmitting}
                type="number"
                allowDecimal
              />
            </div>
            <FormInput
              name="total"
              control={control}
              label="Total Duty"
              placeholder="Total Duty"
              disabled={isSubmitting}
              type="number"
              allowDecimal
              helperText="Leave empty to calculate the duty total automatically"
            />
            <FormInput
              name="dutyPaid"
              control={control}
              label="Note"
              placeholder="Note"
              disabled={isSubmitting}
              helperText="Empty note will mark the duty as unpaid and will add to the balance"
            />
          </div>
        </form>
        <DialogFooter>
          <Button
            variant="primary"
            label={data ? "Update" : "Add"}
            onClick={handleSubmit(onSubmit)}
            className="max-w-22 w-full"
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
