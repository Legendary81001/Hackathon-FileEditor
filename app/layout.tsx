import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Synora Collaborative Editor",
  description: "A shared space for ideas in progress.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}