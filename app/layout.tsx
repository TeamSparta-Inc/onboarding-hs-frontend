import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import GNB from "@/app/common/components/GNB";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="w-full h-full bg-white">
        <GNB />
        <div>{children}</div>
      </body>
    </html>
  );
}
