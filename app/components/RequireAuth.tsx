// app/components/RequireAuth.tsx
"use client";

import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import { useRouter } from "next/navigation";

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        // 🚨 ログインしていなかったら、強制的にログイン画面へ飛ばす！
        router.push("/login");
      } else {
        setIsLoggedIn(true);
      }
      setLoading(false);
    };
    checkAuth();
  }, [router]);

  // 確認中、またはログインしていない間は何も表示しない（画面を白くしておく）
  if (loading || !isLoggedIn) return null;

  // ログインが確認できたら、中身（ページ）を表示する
  return <>{children}</>;
}