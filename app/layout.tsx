import type { Metadata, Viewport } from "next";
import ServiceWorkerRegister from "./sw-register";
import "./globals.css";

export const metadata: Metadata = {
  title: "운동 루틴",
  description: "보통사람 운동채널 - 푸쉬업 100개 & AB슬라이드 복근 루틴",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "운동 루틴",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#f97316",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        {children}
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
