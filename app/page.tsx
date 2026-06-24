import Link from "next/link";

// 📝 記事のデータ（C言語の「構造体の配列」のようなものです）
// 本来はデータベースから取得しますが、今は直接書いておきます。
const articles = [
  {
    id: "1",
    title: "【ポケカ】サーフゴーexデッキの環境対面立ち回り解説",
    date: "2026.06.22",
    description: "現環境におけるオーガポンやバトルバレット対面での意識すべきポイントをまとめました。",
  },
  {
    id: "2",
    title: "学内イベント「サークル内かくれんぼ大会」を開催しました！",
    date: "2026.06.15",
    description: "キャンパス内でおこなった新入生歓迎イベントの様子をレポートします。大いに盛り上がりました！",
  },
  {
    id: "3",
    title: "新入生歓迎！飯塚キャンパスでの活動紹介",
    date: "2026.04.10",
    description: "今年のサークル活動の目標と、主な活動場所（部室や空き教室）について説明します。",
  },
];

export default function Home() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-6">最新の記事一覧</h1>
      
      {/* 🌟 ここから記事カードの並び替え */}
      <div className="grid gap-4">
        
        {/* 配列のデータを使って、カードを自動で量産する魔法のループ */}
        {articles.map((article) => (
          <Link 
            key={article.id} 
            href={`/articles/${article.id}`} 
            className="block p-6 bg-white border border-slate-200 rounded-lg shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
          >
            <div className="text-sm text-slate-500 mb-2">{article.date}</div>
            <h2 className="text-xl font-bold text-blue-600 mb-2">{article.title}</h2>
            <p className="text-slate-600">{article.description}</p>
          </Link>
        ))}

      </div>
    </div>
  );
}