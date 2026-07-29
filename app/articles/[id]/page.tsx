// app/articles/[id]/page.tsx
import { supabase } from "@/app/utils/supabase";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import LinkCard from "@/app/components/LinkCard";
import AdminActions from "@/app/components/AdminActions"; // 🌟 作ったコンポーネントをインポート

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ArticleDetail({ params }: Props) {
  const { id } = await params;

  // 🌟 ここにあった getSession() は削除！

  const { data: article, error } = await supabase
    .from("articles")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !article) {
    console.error("記事の取得に失敗しました:", error);
    return notFound();
  }

  return (
    <article className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <div className="text-sm text-slate-400">{article.date}</div>
        
        {/* 🌟 ログイン判定とボタン表示を、ブラウザ側(Client Component)に任せる */}
        <AdminActions id={article.id} />
        
      </div>

      <h1 className="text-3xl font-bold text-slate-800 mb-4">
        {article.title}
      </h1>
      
      <hr className="border-slate-100 mb-6" />
      
      <div className="prose max-w-none text-slate-700">
        <ReactMarkdown
          components={{
            a: (props) => {
              const { href, children } = props;
              const text = String(children).trim();
              const decodedHref = decodeURI(href || "").trim();
              const isMatch = text.replace(/\/$/, "") === decodedHref.replace(/\/$/, "");
              
              if (href && isMatch) {
                return <LinkCard url={href} />;
              }
              
              return (
                <a href={href || ""} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  {children}
                </a>
              );
            }
          }}
        >
          {article.content}
        </ReactMarkdown>
      </div>
    </article>
  );
}