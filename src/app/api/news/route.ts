// app/api/news/route.ts
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server';
import { getNewsArticles } from '@/lib/news-api';
import { summarizeArticle, determinePoliticalBias } from '@/lib/utils';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // 1) 뉴스 기사 가져오기
    const articles = await getNewsArticles();
    console.log(articles);

    // 2) 각 기사에 대해 OpenAI 요약 + DB 저장
    const promises = articles.map(async (article) => {
      const { title, description, url, publishedAt, source } = article;

      // 중복 기사 url 체크
      const existing = await prisma.summary.findUnique({ where: { url } });
      if (existing) {
        // 이미 저장된 기사라면 스킵
        return existing;
      }

      // 요약 처리
      const contentToSummarize = description ? description : title;
      const summary = await summarizeArticle(contentToSummarize);

      // 정치 성향 분석
      const bias = determinePoliticalBias(source.name);

      // DB 저장
      const saved = await prisma.summary.create({
        data: {
          title,
          summary,
          url,
          publishedAt: new Date(publishedAt),
          source,
          politicalBias: bias,
        },
      });
      return saved;
    });

    const results = await Promise.all(promises);

    return NextResponse.json({
      success: true,
      count: results.length,
      message: 'News summarized and saved successfully',
    });
  } catch (error: unknown) {        // any → unknown
    if (error instanceof Error) {
      console.error('News API error:', error.message);
    }
    return NextResponse.json({ error: 'News fetch failed' }, { status: 500 });
  }
}
