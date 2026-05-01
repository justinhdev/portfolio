import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Justin Hancock | Software Developer",
  description:
    "A compact portfolio of full-stack software projects by Justin Hancock.",
  metadataBase: new URL("https://justinhdev.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Justin Hancock | Software Developer",
    description:
      "A compact portfolio of full-stack software projects by Justin Hancock.",
    url: "/",
    siteName: "justinhdev",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Justin Hancock | Software Developer",
    description:
      "A compact portfolio of full-stack software projects by Justin Hancock.",
  },
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
