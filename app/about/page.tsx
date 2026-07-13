// app/about/page.tsx
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-16">
      
      {/* 🟢 ページタイトル */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">
          サークル紹介
        </h1>
        <p className="text-slate-600 font-medium">
          ポケキットについて
        </p>
      </div>

      {/* 🟢 1. サークル概要 */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-800 border-b-2 border-slate-100 pb-3 flex items-center gap-2">
          <span className="text-blue-500">🎮</span> ポケキットについて
        </h2>
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 text-slate-700 leading-loose">
          <p>
            ポケキットは、九州工業大学飯塚キャンパスのポケモンサークルです。
          </p>
          <p>
            「エンジョイ勢」から、「ガチ勢」まで、ポケモンを愛する多様なメンバーが在籍しています。
          </p>
          <p className="mt-4">
            「ポケモンが好き」という共通点さえがあれば、学年を問わず誰でも打ち解けられるアットホームな雰囲気で活動を行っています。
          </p>
        </div>
      </section>

      {/* 🟢 2. 活動内容 */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-800 border-b-2 border-slate-100 pb-3 flex items-center gap-2">
          <span className="text-blue-500">🎮</span> 活動内容
        </h2>
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 text-slate-700 leading-loose">
          <ul className="list-disc list-inside space-y-2 ml-2">
            <li>通常部会</li>
            <li>ポケモンカードやビデオゲームを使った対戦企画</li>
            <li>遠征</li>
            <li>他大学ポケモンサークルとの交流</li>
            <li>学園祭での出展</li>
          </ul>
        </div>
      </section>




      {/* 🟢 3. 活動スケジュール */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-800 border-b-2 border-slate-100 pb-3 flex items-center gap-2">
          <span className="text-blue-500">📅</span> 2026年度活動スケジュール
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-2">活動日</h3>
            <p className="text-slate-600 mb-2 font-bold text-blue-600">毎週月曜日 18:00〜20:00</p>
            <p className="text-slate-600 text-sm">
              講義室に集まり活動しています。2週間に1回ほど対戦企画を行っています。
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-2">工大祭</h3>
            <p className="text-slate-600 mb-2 font-bold text-blue-600">2026年度 10月10(土)、11(日)</p>
            <p className="text-slate-600 text-sm">
              九州工業大学の学園祭、「工大祭」にポケキットも出展を予定しています！
            </p>
            <p className="text-slate-600 text-sm">
              来ていただいた人に楽しんでもらえるような内容を考えています。詳細が決まり次第こちらに記載します。
            </p>
          </div>
        </div>
      </section>

      {/* 🟢 4. よくある質問 (Q&A) */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-800 border-b-2 border-slate-100 pb-3 flex items-center gap-2">
          <span className="text-blue-500">💡</span> よくある質問
        </h2>
        <div className="space-y-4">
          
          <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100">
            <p className="font-bold text-slate-800 flex gap-2">
              <span className="text-blue-500">Q.</span> 初心者ですが大丈夫ですか？
            </p>
            <p className="text-slate-600 mt-2 ml-6 text-sm leading-relaxed">
              大歓迎です！ルールが分からない方でも、メンバーが優しくお教えします。まずは貸し出し用のデッキで一緒に遊んでみましょう。
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100">
            <p className="font-bold text-slate-800 flex gap-2">
              <span className="text-blue-500">Q.</span> 他のサークルと掛け持ち（兼部）はできますか？
            </p>
            <p className="text-slate-600 mt-2 ml-6 text-sm leading-relaxed">
              もちろん可能です。自分のペースで参加できるので、学業や他サークル、アルバイトとの両立も全く問題ありません。
            </p>
          </div>

        </div>
      </section>

      {/* 🟢 トップページへ戻るボタン */}
      <div className="text-center pt-8">
        <Link href="/" className="inline-block bg-slate-100 text-slate-600 font-bold py-3 px-8 rounded-full hover:bg-slate-200 transition shadow-sm">
          トップページへ戻る
        </Link>
      </div>

    </div>
  );
}