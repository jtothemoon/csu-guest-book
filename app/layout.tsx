import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "방명록",
  description: "특강 시연용 방명록",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
