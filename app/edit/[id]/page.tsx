// app/edit/[id]/page.tsx
import { supabase } from "@/app/utils/supabase";
import { notFound } from "next/navigation";
import EditForm from "@/app/components/EditForm"; // 🌟 さっき作った部品
import RequireAuth from "@/app/components/RequireAuth";

interface Props {
  params: Promise<{ id: string }>;
}

// 🌟 "use client" が無いので、ここは爆速のサーバー側！
export default async function EditArticle({ params }: Props) {
  const { id } = await params;

  // まずはサーバー側で、Supabaseから「今の記事データ」を取ってくる
  const { data: article, error } = await supabase
    .from("articles")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !article) {
    notFound();
  }

  return (
    <RequireAuth>

      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-sm mt-8">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">記事を編集する</h1>
        
        {/* 🌟 取ってきた本物のデータを、ブラウザ側のフォーム部品に手渡す！ */}
        <EditForm article={article} />
      </div>
    </RequireAuth>
  );
}