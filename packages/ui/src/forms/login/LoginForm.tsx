"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormValues } from "@repo/validators";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, getUserRole } from "@repo/firebase";
import { FormInput } from "../../form-field/FormInput";
import { Button, Message } from "../..";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export function LoginForm({ onSuccess }: { onSuccess?: () => void }) {
  const [buttonLabel, setButtonLabel] = useState("Login");
  const [authError, setAuthError] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isDirty },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [signInWithEmailAndPassword, , loading, error] =
    useSignInWithEmailAndPassword(auth);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (isDirty && buttonLabel !== "Login") {
      setButtonLabel("Login");
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDirty]);

  function setTemporaryLabel(text: string) {
    setButtonLabel(text);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      setButtonLabel("Login");
    }, 3000);
  }

  const onSubmit = async (data: LoginFormValues) => {
    setAuthError(null);
    const result = await signInWithEmailAndPassword(data.email, data.password);

    if (!result?.user) {
      setTemporaryLabel("Login failed");
      return;
    }

    setButtonLabel("Checking access permission…");

    try {
      const role = await getUserRole(result.user.uid);
      if (role !== "admin" && role !== "manager") {
        setTemporaryLabel("Access denied");
        await auth.signOut();
        return;
      }
      setButtonLabel("Access granted");
      setTimeout(() => onSuccess?.(), 600);
    } catch {
      setAuthError("Failed to verify access. Please try again.");
      setTemporaryLabel("Login failed");
      await auth.signOut();
    }

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

  useEffect(() => {
    if (!error) return;
    switch (error.code) {
      case "auth/invalid-email":
        setAuthError("Invalid email address!");
        break;
      case "auth/wrong-password":
        setAuthError("Wrong password!");
        break;
      case "auth/network-request-failed":
        setAuthError("Network connection issue!");
        break;
      case "auth/user-disabled":
        setAuthError("User access disabled!");
        break;
      default:
        setAuthError("Invalid email/password!");
        break;
    }
  }, [error]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="h-fit">
      <FormInput<LoginFormValues>
        name="email"
        control={control}
        label="Email"
        placeholder="user@asianliftbd.com"
        disabled={loading}
        className="mb-2"
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
        className="w-full text-base! mt-6"
        variant={
          ["Login", "Logging in…", "Access granted"].includes(buttonLabel)
            ? "primary"
            : "danger"
        }
      />

      <Link href="/forgot-password" className="text-sm text-primary">
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
