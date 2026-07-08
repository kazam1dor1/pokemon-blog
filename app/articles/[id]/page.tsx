// app/articles/[id]/page.tsx

import { supabase } from "@/app/utils/supabase"; // 🌟 受話器をインポート
import { notFound } from "next/navigation";
import DeleteButton from "@/app/components/DeleteButton";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ArticleDetail({ params }: Props) {
  // 1. URLからIDを受け取る
  const { id } = await params;

  // 2. データベースから、IDと同じ記事を探し出す！
  const { data: article, error } = await supabase
  .from('articles')
  .select('*')
  .eq('id', id)
  .single();

  if (error || !article) {
    console.error("記事の取得に失敗しました:", error);
    return notFound();
  }

  // 3. 見つかった記事を表示する！
  return (
    <article className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-sm">
      {/* 日付 と 削除ボタン*/}
      <div className="flex justify-between items-center mb-2">
        <div className="text-sm text-slate-400">{article.date}</div>
        <DeleteButton id={article.id} /> {/* 🌟 ここにボタンをはめ込み、IDを渡す！ */}
      </div>

      {/* タイトル */}
      <h1 className="text-3xl font-bold text-slate-800 mb-4">
        {article.title}
      </h1>
      
      {/* 境界線 */}
      <hr className="border-slate-100 mb-6" />
      
      {/* 本文（改行をそのまま画面に反映させる設定） */}
      <div className="text-slate-600 leading-relaxed whitespace-pre-wrap">
        {article.content}
      </div>
    </article>
  );
}