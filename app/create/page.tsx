// app/create/page.tsx
"use client";

import { useState } from "react";
import { supabase } from "../utils/supabase";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import RequireAuth from "../components/RequireAuth";

// 🌟 Markdownエディタの読み込み（CSSも一緒に読み込むことでプレビューが正常に表示される）
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export default function CreateArticle() {
  const router = useRouter();
  
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [isUploading, setIsUploading] = useState(false); // 🌟 画像アップロード中の状態

  // 🌟 画像をアップロードしてMarkdownに挿入する処理
  // 🌟 複数枚の画像をまとめてアップロードできるように変更
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    try {
      let newImageMarkdowns = "";

      // 🌟 選んだすべての画像を1枚ずつループで処理する
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `articles/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('images')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage.from('images').getPublicUrl(filePath);
        
        // 追加するテキストを繋げていく
        newImageMarkdowns += `\n![画像 ${i + 1}](${data.publicUrl})\n`;
      }

      // まとめて本文に追加
      setContent((prev) => prev + newImageMarkdowns);

    } catch (error: any) {
      alert("画像のアップロードに失敗しました: " + error.message);
    } finally {
      setIsUploading(false);
      e.target.value = ''; 
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.from("articles").insert([
      { title, date, description, content }
    ]);

    if (error) {
      alert("エラーが発生しました: " + error.message);
      return;
    }

    alert("記事を投稿しました！");
    router.push("/");
    router.refresh();
  };

  return (
    <RequireAuth>
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-sm mt-8 mb-16">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">新しい記事を書く</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">タイトル</label>
            <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border border-slate-300 rounded-md p-2" />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">日付</label>
            <input type="date" required value={date} onChange={(e) => setDate(e.target.value)} className="w-full border border-slate-300 rounded-md p-2" />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">概要（一覧に表示）</label>
            <textarea required value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border border-slate-300 rounded-md p-2" />
          </div>

          {/* 🌟 本文入力と画像アップロードボタン */}
          <div>
            <div className="flex justify-between items-end mb-2">
              <label className="block text-sm font-medium text-slate-700">本文</label>
              
              <div className="relative">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  disabled={isUploading}
                />
                <button
                  type="button"
                  className={`text-sm px-3 py-1.5 rounded bg-slate-100 text-slate-700 font-medium border border-slate-300 hover:bg-slate-200 transition ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isUploading ? 'アップロード中...' : '📷 画像を挿入'}
                </button>
              </div>
            </div>

            {/* 🌟 プレビュー機能付きのMarkdownエディタ */}
            <div data-color-mode="light">
              <MDEditor 
                value={content} 
                onChange={(val) => setContent(val || "")} 
                height={500} 
                preview="live"
              />
            </div>
          </div>

          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 w-full font-bold mt-4 py-3">
            投稿する
          </button>
        </form>
      </div>
    </RequireAuth>
  );
}