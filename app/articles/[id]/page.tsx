// app/articles/[id]/page.tsx

export default async function ArticleDetail({ params }: { params: { id: string } }) {
    const { id } = await params;

    return (
      <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
        <h1 className="text-2xl font-bold text-blue-600 mb-4">
          記事ID: {id} のページ
        </h1>
        <p className="text-slate-600">
          ここに「{id}」番の記事の本文（サーフゴーexの解説やイベントのレポートなど）が入ります。
        </p>
      </div>
    );
  }