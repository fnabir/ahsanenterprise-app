"use client";

import { useAuth } from "@/contexts/AuthContext";
import type { FirebaseError } from "firebase/app";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  passwordChangeSchema,
  PasswordChangeFormValues,
} from "@repo/validators";
import { Button, FormInput, toast } from "@repo/ui";
import {
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
} from "firebase/auth";

export default function ChangePasswordSection() {
  const { user } = useAuth();

  const defaultValues: PasswordChangeFormValues = {
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<PasswordChangeFormValues>({
    resolver: zodResolver(passwordChangeSchema),
    mode: "onChange",
    defaultValues,
  });

  const onSubmit = async (formData: PasswordChangeFormValues) => {
    if (!user) {
      toast.error("Error", "No user found.");
      return;
    }

    const credential = EmailAuthProvider.credential(
      user.email as string,
      formData.currentPassword,
    );

    try {
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, formData.newPassword);
      toast.success("Updated", "Password updated successfully.");

      reset();
    } catch (error) {
      const e = error as FirebaseError;
      toast.error(
        "Error",
        e.code === "auth/wrong-password"
          ? "Wrong current password."
          : e?.message || "An error occurred.",
      );
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full gap-3 py-4">
      <h2 className="text-lg font-bold">Change Password</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md w-full">
        <FormInput
          name="currentPassword"
          control={control}
          label="Current Password"
          disabled={isSubmitting}
        />
        <FormInput
          name="newPassword"
          control={control}
          label="New Password"
          disabled={isSubmitting}
        />
        <FormInput
          name="confirmNewPassword"
          control={control}
          label="Confirm New Password"
          disabled={isSubmitting}
        />

        <Button
          type="submit"
          label="Update Password"
          variant="primary"
          disabled={isSubmitting}
          loading={isSubmitting}
          className="w-full my-4"
        />
      </form>
    </div>
  );
}
