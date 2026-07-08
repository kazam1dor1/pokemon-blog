// app/components/EditForm.tsx
"use client"; // 🌟 入力を受け付けるのでブラウザ側！

import { useState } from "react";
import { supabase } from "../utils/supabase";
import { useRouter } from "next/navigation";

// 🌟 親（ページ）から、元の記事データ（article）を受け取る！
export default function EditForm({ article }: { article: any }) {
  const router = useRouter();
  
  // 記憶ボックスの初期値に、空っぽ("")ではなく「元の記事のデータ」を入れておく！
  const [title, setTitle] = useState(article.title);
  const [date, setDate] = useState(article.date);
  const [description, setDescription] = useState(article.description);
  const [content, setContent] = useState(article.content);

  // 「更新する」ボタンが押された時の処理
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    // 🌟 insert（新規追加）ではなく、update（更新）を使う！
    const { error } = await supabase
      .from("articles")
      .update({ 
        title: title, 
        date: date, 
        description: description, 
        content: content 
      })
      .eq("id", article.id); // 「このIDの記事だけを上書きしてね」という指定

    if (error) {
      alert("更新に失敗しました: " + error.message);
      return;
    }

    alert("記事を更新しました！");
    router.push(`/articles/${article.id}`); // 編集が終わったら詳細ページに戻る
    router.refresh();
  };

  return (
    <form onSubmit={handleUpdate} className="space-y-4">
      {/* タイトル入力 */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">タイトル</label>
        <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border border-slate-300 rounded-md p-2" />
      </div>

      {/* 日付入力 */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">日付</label>
        <input type="text" required value={date} onChange={(e) => setDate(e.target.value)} className="w-full border border-slate-300 rounded-md p-2" />
      </div>

      {/* 概要入力 */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">概要</label>
        <textarea required value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border border-slate-300 rounded-md p-2" />
      </div>

      {/* 本文入力 */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">本文</label>
        <textarea required rows={5} value={content} onChange={(e) => setContent(e.target.value)} className="w-full border border-slate-300 rounded-md p-2" />
      </div>

      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 w-full font-bold mt-4 shadow-sm">
        更新する
      </button>
    </form>
  );
}