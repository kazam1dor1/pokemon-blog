// app/components/ArticleCard.tsx
import Link from "next/link";

// 🌟 部品が受け取る「データ（引数）」のルールを決める
type ArticleProps = {
  id: string;
  title: string;
  date: string;
  description: string;
};

// 🌟 記事カードの部品本体
export default function ArticleCard({ id, title, date, description }: ArticleProps) {
  return (
    <Link 
      href={`/articles/${id}`} 
      className="block p-6 bg-white border border-slate-200 rounded-lg shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
    >
      <div className="text-sm text-slate-500 mb-2">{date}</div>
      <h2 className="text-xl font-bold text-blue-600 mb-2">{title}</h2>
      <p className="text-slate-600">{description}</p>
    </Link>
  );
}