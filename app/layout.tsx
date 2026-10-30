import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "ReturnProof concept (prototype, not affiliated with Meesho)",
  description: "A lightweight product concept prototype with synthetic data.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  // suppressHydrationWarning only affects attributes on this <html> element, not its content. Browser
  // extensions that add data-* attributes to <html> would otherwise log a hydration mismatch.
  return (
    <html lang="en-IN" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
