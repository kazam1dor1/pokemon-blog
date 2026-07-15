// app/page.tsx
import { supabase } from "./utils/supabase";
import Link from "next/link";
import DeleteButton from "./components/DeleteButton";
import AdminOnly from "./components/AdminOnly";

// 🌟 最新の情報を常に取得するおまじない
export const revalidate = 0;

export default async function Home() {
  // 🌟 記事を取得（トップページなので最新の3件だけ表示するように limit(3) を追加）
  const { data: articles, error } = await supabase
    .from("articles")
    .select("*")
    .order("date", { ascending: false })
    .limit(3);

  if (error) {
    return <div className="text-red-500 text-center mt-10">エラーが発生しました: {error.message}</div>;
  }

  return (
    <div className="space-y-20 pb-16">
      
      {/* 🟢 1. ヒーローセクション（看板） */}
      <section className="text-black text-center p-5 mt-4 mx-4 md:mx-0">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight drop-shadow-md">
          <span className="block">九州工業大学</span>
          <span className="block">ポケモンサークル</span>
        </h1>
        
        {/* 🌟 ここを改良！ロゴの背景にだけ角丸の「白いプレート」を敷く */}
        <div className="flex justify-center mb-6">
            <img 
              src="/logo-text.jpg"
              alt="ポケキットロゴ" 
              className="h-32 md:h-48 object-contain" 
            />
        </div>

    <div className="flex flex-col sm:flex-row justify-center gap-4">
      <Link href="/about" className="bg-sky-500 text-white font-bold py-3 px-8 rounded-full hover:bg-sky-600 transition shadow-md inline-block">
        活動内容を見る
      </Link>
    </div>
  </section>

      {/* 🟢 3. 最新のお知らせ・活動記録（今まで作っていたブログ機能） */}
      <section className="max-w-4xl mx-auto px-4 -mt-4">
      <div className="flex justify-between items-end mb-8 border-b-2 border-slate-100 pb-4">
        <h2 className="text-3xl font-bold text-slate-800">最新のお知らせ</h2>
          <div className="flex gap-3">
            <AdminOnly>
              <Link href="/create" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 font-bold text-sm shadow-sm transition">
                ＋ 新規作成
              </Link>
            </AdminOnly>
          </div>
      </div>
        
        <div className="space-y-6">
          {articles?.map((article) => (
            <div key={article.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
              <div className="flex justify-between items-center mb-3">
                <div className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  {article.date}
                </div>
                <AdminOnly>
                  <div className="flex gap-2">
                    <Link href={`/edit/${article.id}`} className="bg-slate-100 text-slate-600 px-3 py-1.5 rounded-md hover:bg-slate-200 font-bold text-xs transition">
                      編集
                    </Link>
                    <DeleteButton id={article.id} />
                  </div>
                </AdminOnly>
                
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">
                <Link href={`/articles/${article.id}`} className="hover:text-blue-600 transition">
                  {article.title}
                </Link>
              </h3>
              <p className="text-slate-600">{article.description}</p>
            </div>
          ))}
          
          {articles?.length === 0 && (
            <p className="text-center text-slate-500 py-10">まだお知らせはありません。</p>
          )}
        </div>

        <div className="mt-10 text-center mb-20">
        <Link 
          href="/articles" 
          className="inline-block bg-slate-100 text-blue-600 font-bold py-3 px-8 rounded-full border border-blue-200 hover:bg-blue-50 transition shadow-sm"
        >
          すべてのお知らせを見る →
        </Link>
      </div>

      </section>
      
    </div>
  );
}