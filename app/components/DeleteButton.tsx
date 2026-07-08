// app/components/DeleteButton.tsx
"use client"; // 🌟 クリック操作を受け付けるためにブラウザ側で動かす

import { supabase } from "../utils/supabase";
import { useRouter } from "next/navigation";

// 親（詳細ページ）から「削除する記事のID」を受け取る
export default function DeleteButton({ id }: { id: number }) {
  const router = useRouter();

  const handleDelete = async () => {
    // 🌟 間違えて押した時のために確認メッセージを出す
    if (!window.confirm("本当にこの記事を削除しますか？")) {
      return; // キャンセルされたら何もしない
    }

    // Supabaseの articles テーブルから、このIDのデータを削除（delete）する
    const { error } = await supabase.from("articles").delete().eq("id", id);

    if (error) {
      alert("削除に失敗しました: " + error.message);
      return;
    }

    alert("記事を削除しました。");
    router.push("/"); // トップページにワープ
    router.refresh(); // 最新のデータを再読み込み
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 font-bold text-sm shadow-sm"
    >
      削除する
    </button>
  );
}