// app/components/AdminOnly.tsx
"use client"; // 🌟 ブラウザ側のログイン情報を読み取るために必須！

import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";

export default function AdminOnly({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 現在のログイン状態（セッション）を確認する
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsLoggedIn(!!session); // セッションがあれば true になる
      setLoading(false);
    };
    checkAuth();
  }, []);

  // 読み込み中、またはログインしていない時は「何も表示しない（null）」
  if (loading || !isLoggedIn) return null;

  // ログインしている時だけ、囲んだ中身（children）を表示する！
  return <>{children}</>;
}