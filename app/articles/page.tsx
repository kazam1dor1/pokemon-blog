// app/articles/page.tsx
import Link from "next/link";
import { supabase } from "../utils/supabase";

export const revalidate = 0;

export default async function ArticlesList() {
  // 🌟 ここは件数制限（limit）をかけず、全件を日付順で取得する
  const { data: articles, error } = await supabase
    .from("articles")
    .select("*")
    .order("date", { ascending: false });

  if (error) {
    return <div className="text-center mt-10">エラーが発生しました</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4 mb-20">
      <h1 className="text-3xl font-bold text-slate-800 mb-8">お知らせ一覧</h1>
      
      <div className="space-y-4">
        {articles?.map((article) => (
          <Link href={`/articles/${article.id}`} key={article.id} className="block bg-white p-5 rounded-lg shadow-sm border border-slate-100 hover:border-blue-300 hover:shadow-md transition">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <span className="text-sm font-bold text-slate-500 whitespace-nowrap">{article.date}</span>
              <span className="text-lg font-bold text-slate-800">{article.title}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}