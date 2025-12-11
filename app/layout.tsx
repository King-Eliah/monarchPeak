import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MonarchPeak - Luxury Real Estate in Ghana",
  description: "Ghana's premier luxury real estate agency specializing in exclusive properties in Accra's most prestigious neighborhoods.",
  icons: {
    icon: '/logo.png',
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
