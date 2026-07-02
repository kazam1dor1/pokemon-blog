// app/articles/[id]/page.tsx

import { articles } from "../../data/articles"; // 🌟 分離したデータを読み込む
import Link from "next/link";

export default async function ArticleDetail({ params }: { params: { id: string } }) {

  // 1. URLからIDを受け取る
  const { id } = await params;

  // 2. 配列の中から、URLのIDと同じ記事を探し出す！
  const article = articles.find((a) => a.id === id);
  if (!article) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 font-bold mb-4">指定された記事が見つかりませんでした。</p>
        <Link href="/" className="text-blue-600 hover:underline">ホームに戻る</Link>
      </div>
    );
  }

  // 3. 見つかった記事を表示する！
  return (
    <article className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
      <Link href="/" className="text-sm text-blue-600 hover:underline block mb-4">
        ← 記事一覧に戻る
      </Link>
      
      <div className="text-sm text-slate-500 mb-2">{article.date}</div>
      <h1 className="text-3xl font-bold text-slate-900 mb-6">{article.title}</h1>
      
      {/* 🌟 記事の本文をここで表示！ */}
      <div className="text-slate-700 leading-relaxed border-t border-slate-100 pt-6 whitespace-pre-wrap">
        <p>{article.content}</p>
      </div>
    </article>
  );
}