import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import RootClientLayout from "./RootClientLayout";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Klickshot",
  description: "A modern video-sharing platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <RootClientLayout>{children}</RootClientLayout>
      </body>
    </html>
  );
}
