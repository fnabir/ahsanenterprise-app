import { Metadata } from "next";
import Link from "next/link";
import { Button, Card } from "@repo/ui";
import Image from "next/image";
import Logo from "../../../public/logo.png";
import ForgetPasswordSection from "@/components/pages/forget-password-section";

export const metadata: Metadata = {
  title: "Forget Password",
};

export default function ForgetPasswordPage() {
  return (
    <div className="h-full flex flex-col justify-center items-center mx-auto max-w-md w-full">
      <Card className="flex flex-col justify-center items-center w-full gap-4">
        <Image
          src={Logo}
          alt="Ahsan Enterprise Logo"
          width={50}
          height={50}
          priority
        />
        <h1 className="text-2xl font-bold">AHSAN ENTERPRISE</h1>
        <div className="text-center">
          <div className="text-xl font-semibold">Forget Password</div>
          <div className="text-sm text-muted">
            Enter your email to get the link to reset your password
          </div>
        </div>
        <ForgetPasswordSection />
        <Link href="/login" className="w-full mb-4">
          <Button label="Back to Login" className="w-full" />
        </Link>
      </Card>
    </div>
  );
}
