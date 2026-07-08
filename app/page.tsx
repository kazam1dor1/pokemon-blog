// app/page.tsx
import ArticleCard from "./components/ArticleCard";
import { supabase } from "./utils/supabase"; // 🌟 さっき作った受話器をインポート

// 🌟 関数に「async（非同期）」をつけて、データの到着を待てるようにする
export default async function Home() {
  
  // 🌟 Supabaseの「articles」テーブルから、すべてのデータ（*）を取得する！
  const { data: articles, error } = await supabase.from('articles').select('*');

  // もしエラーが起きた場合の処理
  if (error) {
    console.error("データの取得に失敗しました:", error);
    return <div>データの読み込みに失敗しました。</div>;
  }

  // コンソールに出力して確認(デバッグ用)
  console.log(articles);

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-6">最新の記事一覧</h1>
      
      <div className="grid gap-4">
        {/* 取得した本物のデータをカードに流し込む */}
        {articles?.map((article, index) => (
          <ArticleCard
            key={article.id ? article.id.toString() : `temp-${index}`}
            id={article.id ? article.id.toString() : `temp-${index}`} // 🌟 SupabaseのID(数字)を文字に変換
            title={article.title || "タイトルなし"}
            date={article.date || "日付なし"}
            description={article.description || "説明なし"}
          />
        ))}
      </div>
    </div>
  );
}