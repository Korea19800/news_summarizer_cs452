'use client';

import { useState } from 'react';

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleGetNews = async () => {
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch('/api/news');
      const data = await res.json();
      if (res.ok) {
        setMessage(`✅ ${data.count}개 기사 요약 완료!`);
      } else {
        setMessage(`❌ 에러: ${data.error}`);
      }
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    } catch (_err) {            // err → _err (미사용 변수는 _ 접두사)
      setMessage('❌ 네트워크 오류 발생');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-4 p-6">
      <h1 className="text-2xl font-bold">📢 Real-time News Summarizer</h1>
      <button
        onClick={handleGetNews}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? '요약 중...' : 'Get News'}
      </button>
      {message && <p className="mt-2">{message}</p>}
    </main>
  );
}
