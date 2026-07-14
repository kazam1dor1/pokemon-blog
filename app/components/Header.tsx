// app/components/Header.tsx
"use client"; // 状態（ログインしているかどうか）を管理するために必要

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import { useRouter } from "next/navigation";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // 1. 最初にページを開いた時のログイン状態を確認
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);
    };
    checkUser();

    // 2. ログイン状態の変化（ログインした・ログアウトした）をリアルタイムで監視
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setIsLoggedIn(!!session);
    });

    // クリーンアップ関数
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // ログアウトボタンが押された時の処理
  const handleLogout = async () => {
    await supabase.auth.signOut();
    alert("ログアウトしました");
    router.push("/");
    router.refresh();
  };

  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      {/* justify-between で左のリンクと右のボタンを両端に分ける */}
      <div className="flex justify-between items-center max-w-4xl mx-auto">
        
        {/* 左側のリンク群 */}
        <div className="flex gap-6">
          <Link href="/" className="font-bold hover:text-blue-200 transition">
            ホーム
          </Link>
          <Link href="/about" className="font-bold hover:text-blue-200 transition">
            サークル紹介
          </Link>
          <Link href="/articles" className="font-bold hover:text-blue-200 transition">
            お知らせ一覧
          </Link>
        </div>

        {/* 右側のログイン / ログアウトボタン */}
        <div>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-blue-700 hover:bg-blue-800 text-white text-sm font-bold py-2 px-4 rounded transition shadow-sm"
            >
              ログアウト
            </button>
          ) : (
            <Link
              href="/login"
              className="bg-white text-blue-600 hover:bg-blue-50 text-sm font-bold py-2 px-4 rounded transition shadow-sm inline-block"
            >
              ログイン
            </Link>
          )}
        </div>

      </div>
    </header>
  );
}