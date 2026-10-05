export interface DialogDeleteProps extends React.PropsWithChildren {
  title?: string;
  description?: string;
  onDelete?: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}
