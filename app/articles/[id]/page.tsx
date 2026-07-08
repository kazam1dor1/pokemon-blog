// app/articles/[id]/page.tsx

import { supabase } from "@/app/utils/supabase"; // 🌟 受話器をインポート
import { notFound } from "next/navigation";
import DeleteButton from "@/app/components/DeleteButton";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import LinkCard from "@/app/components/LinkCard";


interface Props {
  params: Promise<{ id: string }>;
}

export default async function ArticleDetail({ params }: Props) {
  // 1. URLからIDを受け取る
  const { id } = await params;

  // 2. データベースから、IDと同じ記事を探し出す！
  const { data: article, error } = await supabase
  .from('articles')
  .select('*')
  .eq('id', id)
  .single();

  if (error || !article) {
    console.error("記事の取得に失敗しました:", error);
    return notFound();
  }

  // 3. 見つかった記事を表示する！
  return (
    <article className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-sm">
      {/* 日付 と 削除ボタン*/}
      <div className="flex justify-between items-center mb-2">
        <div className="text-sm text-slate-400">{article.date}</div>
        <div className="flex gap-2">
          {/*編集ボタン*/}
          <Link
            href={`/edit/${article.id}`}
            className="bg-blue-200 text-slate-700 px-4 py-2 rounded-md hover:bg-slate-300 font-bold text-sm shadow-sm">
            編集する
          </Link>
          {/*削除ボタン*/}
          <DeleteButton id={article.id} />
        </div>
      </div>

      {/* タイトル */}
      <h1 className="text-3xl font-bold text-slate-800 mb-4">
        {article.title}
      </h1>
      
      {/* 境界線 */}
      <hr className="border-slate-100 mb-6" />
      
      {/* 本文（改行をそのまま画面に反映させる設定） */}
      <div className="prose max-w-none text-slate-700">
        <ReactMarkdown
        components={{
          // 🌟 リンク（aタグ）のルールを上書きする！
          a: ({ node, href, children, ...props }) => {
            const text = String(children);
            // もし「リンク先のURL」と「画面に表示する文字」が全く同じならカード化する
            if (href === text && href) {
              return <LinkCard url={href} />;
            }
            return (
              <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline" {...props}>
                {children}
              </a>
            );
          }
        }}
        >{article.content}</ReactMarkdown>
      </div>
    </article>
  );
}