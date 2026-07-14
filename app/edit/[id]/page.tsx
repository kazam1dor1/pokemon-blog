// app/edit/[id]/page.tsx
"use client";

import { useState, useEffect } from "react";
// ※ ファイルの階層に合わせて ../ や ../../ は適宜調整してください
import { supabase } from "../../utils/supabase"; 
import { useRouter, useParams } from "next/navigation";
import dynamic from "next/dynamic";
import RequireAuth from "../../components/RequireAuth";

// Markdownエディタとプレビュー用のCSS
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export default function EditArticle() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string; // URLから記事のIDを取得
  
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // データ読み込み中の判定

  // 1. ページを開いた時に、既存の記事データを取得する処理
  useEffect(() => {
    const fetchArticle = async () => {
      if (!id) return;
      
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        alert("記事データの取得に失敗しました: " + error.message);
        router.push("/");
        return;
      }

      if (data) {
        setTitle(data.title);
        setDate(data.date);
        setDescription(data.description);
        setContent(data.content);
      }
      setIsLoading(false);
    };

    fetchArticle();
  }, [id, router]);

  // 2. 画像を複数アップロードしてMarkdownに挿入する処理
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    try {
      let newImageMarkdowns = "";

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
        newImageMarkdowns += `\n![画像 ${i + 1}](${data.publicUrl})\n`;
      }

      setContent((prev) => prev + newImageMarkdowns);

    } catch (error: any) {
      alert("画像のアップロードに失敗しました: " + error.message);
    } finally {
      setIsUploading(false);
      e.target.value = ''; 
    }
  };

  // 3. 「更新する」ボタンが押された時の処理
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase
      .from("articles")
      .update({ title, date, description, content })
      .eq("id", id); // どの記事を更新するか指定

    if (error) {
      alert("エラーが発生しました: " + error.message);
      return;
    }

    alert("記事を更新しました！");
    router.push("/");
    router.refresh();
  };

  // データを読み込んでいる間の表示
  if (isLoading) {
    return <div className="text-center mt-20 text-slate-600 font-bold">データを読み込み中...</div>;
  }

  return (
    <RequireAuth>
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-sm mt-8 mb-16">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">記事を編集する</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">タイトル</label>
            <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border border-slate-300 rounded-md p-2" />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">日付</label>
            <input type="text" placeholder="例: 2026.07.08" required value={date} onChange={(e) => setDate(e.target.value)} className="w-full border border-slate-300 rounded-md p-2" />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">概要（一覧に表示）</label>
            <textarea required value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border border-slate-300 rounded-md p-2" />
          </div>

          {/* 本文入力と画像追加ボタン */}
          <div>
            <div className="flex justify-between items-end mb-2">
              <label className="block text-sm font-medium text-slate-700">本文</label>
              
              <div className="relative">
                <input
                  type="file"
                  multiple // 複数選択可能
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

            {/* Markdownエディタ */}
            <div data-color-mode="light">
              <MDEditor 
                value={content} 
                onChange={(val) => setContent(val || "")} 
                height={500} 
                preview="live"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => router.push("/")}
              className="px-6 py-3 rounded-md font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition"
            >
              キャンセル
            </button>
            <button 
              type="submit" 
              className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 font-bold transition"
            >
              更新する
            </button>
          </div>
        </form>
      </div>
    </RequireAuth>
  );
}