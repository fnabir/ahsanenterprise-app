import { Motion } from "../../motion/Motion.native";

export function Modal({
  open,
  children,
}: {
  open: boolean;
  children: React.ReactNode;
}) {
  if (!open) return null;

  return (
    <Motion.View
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 bg-black/40 items-center justify-center"
    >
      <Motion.View
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 15 }}
        className="bg-white p-6 rounded-xl"
      >
        {children}
      </Motion.View>
    </Motion.View>
  );
}
