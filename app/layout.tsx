import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { cn } from "@/lib/utils";
import Dashboard from "@/components/Dashboard";
import "@shopify/polaris/build/esm/styles.css";

export const metadata: Metadata = {
  title: "Shopify",
  description: "Shopify NEXT App",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={
          cn("min-h-screen bg-background font-sans antialiased") +
          " " +
          inter.className
        }
      >
        {
          <>
              <Toaster />
              <Dashboard>{children}</Dashboard>
          </>
        }
      </body>
    </html>
  );
}
