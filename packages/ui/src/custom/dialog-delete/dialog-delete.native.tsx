import type { DialogDeleteProps } from "./types";
import { Dialog, DialogFooter } from "../../core/dialog/dialog.native";
import { Text } from "react-native";
import { Button } from "../../core/button/button.native";

const DialogDelete = ({
  title,
  description,
  children,
  onDelete,
  open,
  setOpen,
}: DialogDeleteProps) => {
  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
      title={title}
      className="border-danger!"
    >
      {description && (
        <Text className="text-foreground text-lg">{description}</Text>
      )}
      {children}
      <DialogFooter onOpenChange={setOpen} showCloseButton>
        <Button onClick={onDelete} variant="danger" label="Delete" />
      </DialogFooter>
    </Dialog>
  );
};

export { DialogDelete };
