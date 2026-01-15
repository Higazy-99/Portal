import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { DataProvider } from "@/context/DataContext";
import { Toaster } from "sonner";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "النظام الأكاديمي",
  description: "جامعة القاهرة - كلية الدراسات العليا للبحوث الإحصائية",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block" />
      </head>

      <body className={`${cairo.variable} font-display bg-background-light dark:bg-background-dark text-slate-800 dark:text-slate-200 antialiased`}>
        <DataProvider>
          {children}
          <Toaster position="top-center" richColors />
        </DataProvider>
      </body>
    </html>
  );
}
