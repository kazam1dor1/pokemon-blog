// app/components/LogoutButton.tsx
"use client";

import { supabase } from "../utils/supabase";

export default function LogoutButton() {
  const handleLogout = async () => {
    // 1. Supabaseからログアウトする
    await supabase.auth.signOut();
    
    // 2. 🌟 画面を強制的に再読み込みして、ブラウザの表示をリセットする！
    window.location.reload();
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-50 text-red-500 px-4 py-2 rounded-md hover:bg-red-100 font-bold text-sm transition"
    >
      ログアウト
    </button>
  );
}