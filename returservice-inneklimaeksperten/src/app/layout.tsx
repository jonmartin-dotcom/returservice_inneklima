import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Inneklimaeksperten – Returservice",
  description: "Registrer en retur av varer kjøpt hos Inneklimaeksperten.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="no">
      <body>{children}</body>
    </html>
  );
}
