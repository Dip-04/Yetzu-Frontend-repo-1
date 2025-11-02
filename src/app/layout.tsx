"use client"

import { Inter } from "next/font/google";
import "@/styles/globals.css";
import ToastProvider from "@/providers/ToastProvider";
import { SessionProvider } from "@/providers/SessionProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const metadata = {
  title: {
    default: "YETZU ED TECH | Asterisks.Inc",
    template: "%s | Yetzu"
  },
  description: "Yetzu — Simplify your workflow with ease.",
  icons: {
    icon: "/logo.svg", // Path from /public folder
  },
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <QueryClientProvider client={queryClient}>
          <SessionProvider>
            {children}
            <ToastProvider />
          </SessionProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
