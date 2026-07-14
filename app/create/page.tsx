// app/create/page.tsx
"use client";

import { useState } from "react";
import { supabase } from "../utils/supabase";
import { useRouter } from "next/navigation";
import RequireAuth from "../components/RequireAuth";

export default function CreatePage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let finalImageUrl = ""; // 最終的にデータベースに保存する画像のURL

      // 1. 画像が選択されている場合、Supabase Storageにアップロード
      if (imageFile) {
        // ファイル名が被らないように「現在時刻＋ランダム文字列＋元の拡張子」にする
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `articles/${fileName}`;

        // 'images' バケットにアップロード
        const { error: uploadError } = await supabase.storage
          .from('images')
          .upload(filePath, imageFile);

        if (uploadError) {
          throw new Error("画像のアップロードに失敗しました: " + uploadError.message);
        }

        // アップロード成功後、公開用のURLを取得
        const { data } = supabase.storage
          .from('images')
          .getPublicUrl(filePath);
        
        finalImageUrl = data.publicUrl;
      }

      // 2. データベース（articlesテーブル）に記事のデータを保存
      // ※ もし画像保存用の列名が 'image_url' でない場合は書き換えてください
      const { error: insertError } = await supabase.from("articles").insert([
        {
          title: title,
          description: description,
          image_url: finalImageUrl !== "" ? finalImageUrl : null, // 画像がない場合はnullを入れる
        },
      ]);

      if (insertError) {
        throw new Error("記事の保存に失敗しました: " + insertError.message);
      }

      // 3. 成功したらトップページに戻る
      router.push("/");
      router.refresh();
      
    } catch (error: any) {
      alert("エラーが発生しました: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <RequireAuth>
      <div className="max-w-2xl mx-auto mt-10 px-4 mb-20">
        <h1 className="text-3xl font-bold mb-8 text-slate-800">新規お知らせ作成</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-sm border border-slate-100">
          
          {/* タイトル入力欄 */}
          <div>
            <label htmlFor="title" className="block text-sm font-bold text-slate-700 mb-2">
              タイトル <span className="text-red-500">*</span>
            </label>
            <input
              id="title"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-slate-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="例：新入生歓迎会のお知らせ"
            />
          </div>

          {/* 画像アップロード欄 */}
          <div>
            <label htmlFor="image" className="block text-sm font-bold text-slate-700 mb-2">
              見出し画像（任意）
            </label>
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  setImageFile(e.target.files[0]);
                } else {
                  setImageFile(null);
                }
              }}
              // ファイル選択ボタンを少しおしゃれにするCSS
              className="w-full text-slate-600 border border-slate-300 rounded-md p-2 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition cursor-pointer"
            />
            {imageFile && (
              <p className="text-sm text-green-600 mt-2 font-medium">
                選択中: {imageFile.name}
              </p>
            )}
          </div>

          {/* 内容（説明）入力欄 */}
          <div>
            <label htmlFor="description" className="block text-sm font-bold text-slate-700 mb-2">
              本文 <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              required
              rows={8}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-slate-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="お知らせの詳細を記入してください..."
            />
          </div>

          {/* 送信ボタン */}
          <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => router.push("/")}
              className="px-6 py-3 rounded-md font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition"
            >
              キャンセル
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 disabled:bg-slate-400 font-bold shadow-sm transition"
            >
              {loading ? "保存中..." : "お知らせを公開する"}
            </button>
          </div>
        </form>
      </div>
    </RequireAuth>
  );
}