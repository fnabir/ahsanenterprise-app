"use client";

import { AnimatePresence, Motion } from "../../animation/motion";
import { useState } from "react";
import { FaCheck, FaRegCopy } from "react-icons/fa6";

export function CopyText({
  label,
  text,
}: {
  label?: string;
  text?: string | null;
}) {
  const [copied, setCopied] = useState(false);

  if (!text || text === "0") return null;

  const onCopyText = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div
      className={`flex items-center text-[13px] py-1 border ${copied ? "border-success" : "hover:border-primary"}  rounded px-2 font-mono bg-background text-muted group cursor-pointer transition-all`}
      onClick={onCopyText}
    >
      <div className="w-16">{label}</div>
      <div className="grow text-foreground">{text}</div>
      <Motion.div
        key={copied ? "tick" : "copy"}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.2 }}
      >
        {copied ? (
          <FaCheck className="text-success" />
        ) : (
          <FaRegCopy className="group-hover:text-foreground transition-colors" />
        )}
      </Motion.div>
      <AnimatePresence initial={false}>
        {copied && (
          <Motion.div
            key="copied-wrapper"
            className="overflow-hidden flex items-center"
            initial={{ width: 0 }}
            animate={{ width: "auto" }}
            exit={{ width: 0 }}
            transition={{ duration: 0.25 }}
          >
            <Motion.span
              className="text-success font-semibold ml-1"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.25 }}
            >
              Copied
            </Motion.span>
          </Motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
