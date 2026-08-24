import { Metadata } from "next";
import Image from "next/image";
import Logo from "@/logo.svg";
import { LoginForm } from "@repo/ui";

export const metadata: Metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-background">
      <div className="w-full lg:max-w-md items-center justify-between py-8 px-8 bg-card text-center lg:rounded-2xl border-0 lg:border">
        <Image
          src={Logo}
          alt="Ahsan Enterprise Logo"
          width={50}
          height={50}
          className="mx-auto mb-4"
        />
        <h1 className="text-2xl font-bold">AHSAN ENTERPRISE</h1>
        <div className="text-center my-8">
          <div className="text-3xl font-semibold mb-2">Welcome Back</div>
          <div className="text-muted">Login to your account to continue</div>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}
