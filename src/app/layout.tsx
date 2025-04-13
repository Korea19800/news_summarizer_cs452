// app/layout.tsx
import Link from 'next/link';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
      <nav className="bg-gray-100 p-4 flex justify-between">
      <Link href="/">Home Page</Link>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Link href="/summaries">Summarized News List Page</Link>
    </nav>
        {children}
      </body>
    </html>
  );
}
