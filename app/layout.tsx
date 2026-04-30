import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Justin H. Developer",
  description: "A compact portfolio of software projects by Justin H.",
  metadataBase: new URL("https://justinhdev.com"),
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
