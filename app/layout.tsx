import type { Metadata } from "next";
import "./globals.css";
import ReactQueryProvider from "@/providers/react-query-provider";
import Navbar from "@/components/layout/navbar";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "MarketHub",
  description: "A modern fullstack marketplace built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ReactQueryProvider>
          <Navbar />
          {children}
        </ReactQueryProvider>

        <Toaster />
      </body>
    </html>
  );
}
