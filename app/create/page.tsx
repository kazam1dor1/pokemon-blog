// app/create/page.tsx
"use client"; // 🌟 ユーザーの入力（ボタンクリックや文字入力）を受け付けるための魔法の言葉

import { useState } from "react";
import { supabase } from "../utils/supabase";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export default function CreateArticle() {
  const router = useRouter();
  
  // ユーザーが入力した文字を一時的に保存しておくための箱（State）
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");

  // 「投稿する」ボタンが押された時の処理
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // 🌟 送信時に画面が勝手にリロードされるのを防ぐ

    // Supabaseの articles テーブルに、入力されたデータを追加（insert）する
    const { error } = await supabase.from("articles").insert([
      { 
        title: title, 
        date: date, 
        description: description, 
        content: content 
      }
    ]);

    // エラーが起きたら警告を出す
    if (error) {
      alert("エラーが発生しました: " + error.message);
      return;
    }

    // 無事に投稿できたら、トップページに強制移動する
    alert("記事を投稿しました！");
    router.push("/");
    router.refresh(); // トップページの最新データを再読み込み
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-sm mt-8">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">新しい記事を書く</h1>
      
      {/* 投稿フォーム */}
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* タイトル入力 */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">タイトル</label>
          <input 
            type="text" 
            required 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            className="w-full border border-slate-300 rounded-md p-2" 
          />
        </div>

        {/* 日付入力 */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">日付</label>
          <input 
            type="text" 
            placeholder="例: 2026.07.08" 
            required 
            value={date} 
            onChange={(e) => setDate(e.target.value)} 
            className="w-full border border-slate-300 rounded-md p-2" 
          />
        </div>

        {/* 概要入力 */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">概要（一覧に表示）</label>
          <textarea 
            required 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            className="w-full border border-slate-300 rounded-md p-2" 
          />
        </div>

        {/* 本文入力 */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">本文</label>
          <MDEditor 
            value={content} 
            onChange={(val) => setContent(val || "")} 
            height={400} 
          />
        </div>

        {/* 送信ボタン */}
        <button 
          type="submit" 
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 w-full font-bold mt-4"
        >
          投稿する
        </button>
      </form>
    </div>
  );
}