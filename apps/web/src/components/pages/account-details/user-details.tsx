"use client";

import { useUpdateProfile } from "react-firebase-hooks/auth";
import { auth } from "@repo/firebase";
import { updateUserInfo } from "@repo/firebase";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserDetailsSchema, UserDetailsFormValues } from "@repo/validators";
import { Button, FormInput, Input, toast, useAuth } from "@repo/ui";
import { useEffect } from "react";

export default function UserDetailsSection() {
  const { user, userData } = useAuth();
  const [updateProfile] = useUpdateProfile(auth);
  const uid = user?.uid;
  const userDisplayName = user?.displayName ?? "";
  const userRole = userData?.role
    ? userData?.role.charAt(0).toUpperCase() + userData?.role?.slice(1)
    : "";

  const defaultValues: UserDetailsFormValues = {
    name: userData?.name ?? "",
    phone: userData?.phone ?? "",
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<UserDetailsFormValues>({
    resolver: zodResolver(UserDetailsSchema),
    mode: "onChange",
    defaultValues,
  });

  useEffect(() => {
    if (!userData) return;

    reset(defaultValues);
  }, [userData, reset]);

  const onSubmit = async (formData: UserDetailsFormValues) => {
    if (!uid) {
      toast.error("User ID not found.", "Please refresh the page.");
      return;
    }

    await updateUserInfo(uid, formData);
  };

  useEffect(() => {
    if (!userDisplayName || !userData?.name) return;
    if (userDisplayName === userData?.name) return;

    const updateUserDisplayName = async () => {
      try {
        await updateProfile({ displayName: userData?.name });
      } catch (err) {
        toast.error(
          "Failed to update user display name.",
          "Please reload the page.",
        );
      }
    };

    updateUserDisplayName();
  }, [userDisplayName, userData?.name]);

  return (
    <div className="flex flex-col justify-center items-center w-full gap-3 py-4">
      <h2 className="text-lg font-bold">User Details</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md w-full">
        <FormInput
          name="name"
          control={control}
          label="Name"
          disabled={isSubmitting}
        />
        <FormInput
          name="phone"
          control={control}
          label="Phone"
          disabled={isSubmitting}
        />
        <Input value={user?.email!} label="Email" disabled />
        <Input value={userData?.title} label="Title" disabled />
        <Input value={userRole} label="Role" disabled />

        <Button
          type="submit"
          label="Update"
          variant="primary"
          disabled={isSubmitting}
          className="w-full my-4"
        />
      </form>
    </div>
  );
}
