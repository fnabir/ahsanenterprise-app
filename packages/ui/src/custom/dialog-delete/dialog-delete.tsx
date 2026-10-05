"use client";

import type { ReactElement, ReactNode } from "react";
import { Button } from "../../core/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../core/dialog";
import { MdDeleteOutline } from "react-icons/md";
import type { DialogDeleteProps } from "./types";

export function DialogDelete({
  title,
  description,
  trigger,
  children,
  onDelete,
  open,
  setOpen,
}: DialogDeleteProps & {
  trigger: ReactElement;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={trigger} />
      <DialogContent className="border-danger">
        {title && (
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
        )}
        {children}
        <DialogFooter>
          <Button
            variant="custom"
            label="Delete"
            Icon={<MdDeleteOutline size={16} />}
            className="text-danger border bg-danger-subtle hover:border-danger"
            onClick={onDelete}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
