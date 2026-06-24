import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link"; 


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
        
        <header className="bg-blue-600 text-white p-4 shadow-md">
          <div className="flex gap-6 max-w-4xl mx-auto">
            <Link href="/" className="font-bold hover:text-blue-200 transition">
              ホーム
            </Link>
            <Link href="/about" className="font-bold hover:text-blue-200 transition">
              サークル紹介
            </Link>
          </div>
        </header>

        <main className="max-w-4xl mx-auto p-4 mt-4">
          {children}
        </main>

      </body>
    </html>
  );
}