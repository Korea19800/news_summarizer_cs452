// lib/news-api.ts

/**
 * 예: GNews API를 사용하는 경우.
 * .env.local 에서 GNEWS_API_KEY 를 가져와서 사용
 */

type Article = {
    title: string;
    description: string;
    url: string;
    publishedAt: string;
    source: {
      name: string;
      url?: string;
    };
  };
  
  export async function getNewsArticles(): Promise<Article[]> {
    const apiKey = process.env.GNEWS_API_KEY;
    if (!apiKey) {
      throw new Error('Missing GNEWS_API_KEY in environment');
    }
  
    // GNews API endpoint
    const endpoint = `https://gnews.io/api/v4/top-headlines?lang=en&country=us&token=${apiKey}`;
    
    const res = await fetch(endpoint);
    if (!res.ok) {
      throw new Error(`GNews API error: ${res.status} ${res.statusText}`);
    }
  
    const data = await res.json();
  
    // GNews 응답 구조에 맞게 가공
    // "articles": [{ title, description, url, source: { name }, publishedAt, ... }, ...]
    if (!data.articles) return [];
  
    const articles: Article[] = data.articles.map((item: any) => ({
      title: item.title,
      description: item.description,
      url: item.url,
      publishedAt: item.publishedAt,
      source: {
        name: item.source?.name || "Unknown",
        url: item.source?.url || ""
      },
    }));
  
    return articles;
  }
  