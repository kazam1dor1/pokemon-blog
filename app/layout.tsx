import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link"; 
import Header from "./components/Header";


export const metadata: Metadata = {
  title: "ポケキット公式ブログ",
  description: "九州工業大学ポケモンサークル公式ブログです",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="bg-slate-50 text-slate-800">
        <Header />
        <main className="max-w-4xl mx-auto p-4 mt-4">
          {children}
        </main>

      </body>
    </html>
  );
}