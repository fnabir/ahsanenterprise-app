"use client";

import { useState } from "react";
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../..";
import { MdDeleteOutline } from "react-icons/md";

export default function DialogDelete({
  title,
  description,
  trigger,
  children,
  onDelete,
  open,
  setOpen,
}: {
  title?: string;
  description?: string;
  trigger: React.ReactNode;
  children: React.ReactNode;
  onDelete?: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
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
        <DialogFooter className="mt-4">
          <DialogClose>
            <div className="px-2 py-1 text-sm rounded-lg text-muted hover:text-foreground border bg-muted-subtle hover:border-muted">
              Cancel
            </div>
          </DialogClose>
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
