import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormValues } from "@repo/validators";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, getUserRole } from "@repo/firebase";
import { useEffect, useRef, useState } from "react";

export function useLoginForm(onSuccess?: () => void) {
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
    defaultValues: { email: "", password: "" },
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
  }, [isDirty]);

  function setTemporaryLabel(text: string) {
    setButtonLabel(text);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setButtonLabel("Login"), 3000);
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

  return {
    control,
    handleSubmit,
    onSubmit,
    loading,
    isSubmitting,
    buttonLabel,
    authError,
  };
}
