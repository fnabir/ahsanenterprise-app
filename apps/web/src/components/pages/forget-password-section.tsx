"use client";

import {
  PasswordForgetFormValues,
  passwordForgetSchema,
} from "@repo/validators";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, FormInput, Message } from "@repo/ui";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { auth } from "@repo/firebase";
import { useEffect, useState } from "react";

export default function ForgetPasswordSection() {
  const [sendError, setSendError] = useState<string | undefined>(undefined);
  const [sendSuccess, setSendSuccess] = useState<boolean>(false);
  const [sendPasswordResetEmail, loading, error] =
    useSendPasswordResetEmail(auth);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<PasswordForgetFormValues>({
    resolver: zodResolver(passwordForgetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: PasswordForgetFormValues) => {
    try {
      const result = await sendPasswordResetEmail(data.email);
      if (result) {
        setSendSuccess(true);
      } else {
        setSendError("Failed to send reset email.");
      }
    } catch (err) {
      setSendError(
        `Error sending reset email: ${err instanceof Error ? err.message : String(err)}`,
      );
    }
  };

  useEffect(() => {
    if (!error) return;
    setSendSuccess(false);
    switch (error.message) {
      case "Firebase: Error (auth/user-not-found).":
        setSendError("Email not registered with us!");
        break;
      default:
        setSendError(`Error sending reset email: ${error.message}`);
        break;
    }
  }, [error]);

  return (
    <div className="w-full flex flex-col gap-3 items-center">
      {sendError && <Message type="error" variant="soft" message={sendError} />}

      {!sendError && sendSuccess && (
        <Message
          type="success"
          variant="soft"
          message="Check your email to reset password."
        />
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <FormInput
          name="email"
          control={control}
          label="Email"
          type="email"
          placeholder="Enter your email"
          disabled={isSubmitting}
        />
        <Button
          type="submit"
          label="Reset Password"
          className="w-full mt-4"
          loading={isSubmitting || loading}
          disabled={isSubmitting}
        />
      </form>
    </div>
  );
}
