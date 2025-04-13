// app/summaries/page.tsx
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function SummariesPage() {
  // DB에서 모든 요약 기사 불러오기
  const summaries = await prisma.summary.findMany({
    orderBy: { publishedAt: 'desc' },
  });

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">📰 Summarized News List</h1>
      <ul className="space-y-4">
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {summaries.map((item:any) => (
          <li key={item.id} className="border p-4 rounded shadow">
            <p className="text-sm text-gray-500">
              {new Date(item.publishedAt).toLocaleString()}
            </p>
            <a
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="text-lg font-bold text-blue-600 hover:underline"
            >
              {item.title}
            </a>
            <p className="mt-1">{item.summary}</p>
            <p className="mt-1 text-sm text-gray-600">
              출처: {item.source.name} ({item.politicalBias})
              {item.source.url && (
                <a 
                  href={item.source.url}
                  target="_blank"
                  rel="noreferrer"
                  className="ml-1 text-blue-500 hover:underline"
                >
                  🔗
                </a>
              )}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
