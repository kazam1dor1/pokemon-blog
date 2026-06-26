// app/page.tsx
import Link from "next/link";

import { articles } from "./data/articles";

export default function Home() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-6">最新の記事一覧</h1>
      
      {/* 🌟 ここから記事カードの並び替え */}
      <div className="grid gap-4">
        
        {/* 配列のデータを使って、カードを自動で量産する魔法のループ */}
        {articles.map((article) => (
          <Link 
            key={article.id} 
            href={`/articles/${article.id}`} 
            className="block p-6 bg-white border border-slate-200 rounded-lg shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
          >
            <div className="text-sm text-slate-500 mb-2">{article.date}</div>
            <h2 className="text-xl font-bold text-blue-600 mb-2">{article.title}</h2>
            <p className="text-slate-600">{article.description}</p>
          </Link>
        ))}

      </div>
    </div>
  );
}