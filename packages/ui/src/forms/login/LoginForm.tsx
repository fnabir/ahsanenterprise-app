"use client";

import { FormInput } from "../../form-field/FormInput";
import { Button, Message } from "../..";
import Link from "next/link";
import { useLoginForm } from "./useLoginForm";

export function LoginForm({ onSuccess }: { onSuccess?: () => void }) {
  const {
    control,
    handleSubmit,
    onSubmit,
    loading,
    isSubmitting,
    buttonLabel,
    authError,
  } = useLoginForm(onSuccess);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="h-fit">
      <FormInput
        name="email"
        control={control}
        label="Email"
        placeholder="user@asianliftbd.com"
        disabled={loading}
        className="mb-2"
        required
      />

      <FormInput
        name="password"
        control={control}
        label="Password"
        placeholder="••••••••"
        type="password"
        disabled={loading}
      />

      <Button
        type="submit"
        loading={loading || isSubmitting}
        label={buttonLabel}
        aria-label="Login Button"
        disabled={loading || isSubmitting}
        className="w-full text-base! mt-6"
        variant={
          ["Login", "Logging in…", "Access granted"].includes(buttonLabel)
            ? "primary"
            : "danger"
        }
      />

      <Link href="/forget-password" className="text-sm text-primary">
        Forgot Password?
      </Link>

      {authError && (
        <Message
          type="error"
          variant="soft"
          message={authError}
          className="mt-4"
        />
      )}
    </form>
  );
}
