import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import { SiteFooter } from "@/common/components/layout/site-footer";
import { StoreHeader } from "@/common/components/layout/store-header";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const bebas = Bebas_Neue({
  variable: "--font-heading",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FLYNWEAR",
  description:
    "Oversized streetwear — Wear Your Freedom. Minimal dark luxury essentials from Kathmandu.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${bebas.variable} dark h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <StoreHeader />
        <div className="flex-1">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
