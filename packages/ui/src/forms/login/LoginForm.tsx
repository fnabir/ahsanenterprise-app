"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormValues } from "@repo/validators";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, getUserRole } from "@repo/firebase";
import { FormInput } from "../../form-field/FormInput";
import { Button, Message } from "../..";
import { useEffect, useRef, useState } from "react";

export function LoginForm({ onSuccess }: { onSuccess?: () => void }) {
  const [buttonLabel, setButtonLabel] = useState("Login");

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isDirty },
    reset,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [signInWithEmailAndPassword, , loading, error] =
    useSignInWithEmailAndPassword(auth);

  function setTemporaryLabel(text: string) {
    setButtonLabel(text);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      setButtonLabel("Login");
    }, 3000);
  }

  useEffect(() => {
    if (isDirty) {
      setButtonLabel("Login");
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    }
  }, [isDirty]);

  const onSubmit = async (data: LoginFormValues) => {
    reset(data);
    const result = await signInWithEmailAndPassword(data.email, data.password);

    if (!result?.user) {
      setTemporaryLabel("Login failed");
      return;
    }

    setButtonLabel("Checking access permission…");

    const uid = result.user.uid;
    const role = await getUserRole(uid);

    if (role !== "admin" && role !== "manager") {
      setTemporaryLabel("Access denied");
      await auth.signOut();
      return;
    }

    setButtonLabel("Access granted");

    setTimeout(() => {
      onSuccess?.();
    }, 600);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 h-68">
      <FormInput<LoginFormValues>
        name="email"
        control={control}
        label="Email"
        placeholder="user@asianliftbd.com"
        disabled={loading}
        required
      />

      <FormInput<LoginFormValues>
        name="password"
        control={control}
        label="Password"
        placeholder="••••••••"
        type="password"
        secureTextEntry
        disabled={loading}
      />

      <Button
        type="submit"
        loading={loading || isSubmitting}
        label={buttonLabel}
        aria-label="Login Button"
        disabled={loading || isSubmitting}
        className="w-full"
        variant={
          buttonLabel == "Login" || buttonLabel == "Logging in…"
            ? "accent"
            : buttonLabel == "Access granted"
              ? "success"
              : "error"
        }
      />

      {error && (
        <Message type="error" variant="outline" message={error.message} />
      )}
    </form>
  );
}
