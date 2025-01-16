"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "../components/theme-provider";
import { motion, AnimatePresence } from "framer-motion";

const inter = Inter({ subsets: ["latin"] });

export default function RootClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AnimatePresence mode="wait">
            <motion.div exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              {children}
            </motion.div>
          </AnimatePresence>
        </ThemeProvider>
      </body>
    </html>
  );
}
