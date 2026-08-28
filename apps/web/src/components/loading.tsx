import Image from "next/image";
import Logo from "@/logo.svg";

export default function Loading() {
  return (
    <div className="grow flex items-center justify-center">
      <div className="relative flex items-center justify-center">
        <div className="absolute animate-spin rounded-full size-16 border-b-2 border-primary" />
        <Image
          src={Logo}
          alt="Ahsan Enterprise Logo"
          width={50}
          height={50}
          className="relative"
        />
      </div>
    </div>
  );
}
