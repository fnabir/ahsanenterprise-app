import type { Metadata } from "next";
import { Public_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { AuthProvider } from "@/contexts/AuthContext";
import { BreadcrumbProvider } from "@/contexts/BreadcrumbContext";
import FileStoreInitializer from "@/components/file-store-initializer";
import Header from "@/components/header";

const publicSans = Public_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Ahsan Enterprise",
    template: "%s | Ahsan Enterprise",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${publicSans.variable} ${ibmPlexMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full">
        <ThemeProvider>
          <AuthProvider>
            <BreadcrumbProvider>
              <FileStoreInitializer />
              <div className="h-svh flex flex-col divide-y-2 gap-2 overflow-hidden">
                <Header />
                <div className="flex-1 min-h-0 flex flex-col">{children}</div>
              </div>
            </BreadcrumbProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
