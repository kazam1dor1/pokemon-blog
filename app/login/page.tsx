// app/login/page.tsx
"use client"; // 🌟 ユーザーの入力を受け取る画面なので "use client" が必須！

import { useState } from "react";
import { supabase } from "../utils/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // ボタンを押した時の画面のチカチカ（リロード）を防ぐ
    setErrorMsg("");

    // 💡 ここが裏技！入力されたIDにダミーのドメインをくっつける
    const dummyEmail = `${username}@pokekit.local`;

    // Supabaseにログインの申請を出す
    const { error } = await supabase.auth.signInWithPassword({
      email: dummyEmail,
      password: password,
    });

    if (error) {
      setErrorMsg("IDかパスワードが間違っています。");
      return;
    }

    // ログイン成功したらトップページへ飛ばす
    router.push("/");
    router.refresh(); // 最新の状態に画面を更新
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-2xl shadow-sm border border-slate-100">
      <h1 className="text-2xl font-bold text-center text-slate-800 mb-6">
        サークル管理ログイン
      </h1>
      
      <form onSubmit={handleLogin} className="space-y-5">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">
            ユーザーID
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-slate-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="admin"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">
            パスワード
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-slate-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="••••••••"
            required
          />
        </div>

        {errorMsg && (
          <p className="text-red-500 text-sm font-bold text-center">{errorMsg}</p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-3 rounded-md hover:bg-blue-700 transition"
        >
          ログイン
        </button>
      </form>
    </div>
  );
}