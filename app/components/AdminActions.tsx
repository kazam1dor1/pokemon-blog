// app/components/AdminActions.tsx
"use client"; // 🌟 ここが重要！ブラウザ側で動かす指示

import { useEffect, useState } from "react";
import { supabase } from "@/app/utils/supabase";
import Link from "next/link";
import DeleteButton from "./DeleteButton";

export default function AdminActions({ id }: { id: number }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 画面が表示された時に、ブラウザが持っているログイン情報を確認する
    const checkLoginStatus = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setIsLoggedIn(true);
      }
    };
    checkLoginStatus();
  }, []);

  // ログインしていなければ何も表示しない（空っぽを返す）
  if (!isLoggedIn) return null;

  // ログインしている時だけボタンを表示する
  return (
    <div className="flex gap-2">
      <Link
        href={`/edit/${id}`}
        className="bg-blue-200 text-slate-700 px-4 py-2 rounded-md hover:bg-slate-300 font-bold text-sm shadow-sm"
      >
        編集する
      </Link>
      <DeleteButton id={id} />
    </div>
  );
}