import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NomiWrite — Luyện viết tiếng Anh, dạy thật không sửa hộ",
  description:
    "Nền tảng luyện viết tiếng Anh cá nhân hóa: AI chấm bài, phân loại lỗi ngữ pháp, gợi ý từ vựng, sinh quiz từ chính bài viết của bạn. Dành cho người luyện IELTS, email, văn bản học thuật.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
