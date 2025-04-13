// lib/utils.ts
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,   // NODE_ENV=production에서도 반드시 존재해야 함
  dangerouslyAllowBrowser: true, // Browser 환경에서도 실행 가능하도록 설정
});

/**
 * OpenAI API 사용이 불가능한 경우 간단히 텍스트 요약하는 함수
 * 첫 100자를 추출하고 끝에 말줄임표 추가
 */
function fallbackSummarize(content: string): string {
  if (!content || content.trim() === '') {
    return '내용 없음';
  }
  
  // 내용이 너무 짧으면 그대로 반환
  if (content.length <= 100) {
    return content;
  }
  
  // 첫 100자 + 말줄임표
  return content.substring(0, 100).trim() + '...';
}

/**
 * OpenAI Chat API로 content를 한 문장으로 요약
 */
export async function summarizeArticle(content: string): Promise<string> {
  if (!process.env.OPENAI_API_KEY) {
    console.error('OpenAI API Key is missing');
    return fallbackSummarize(content);
  }

  if (!content || content.trim() === '') {
    return '요약 실패 (빈 내용)';
  }

  try {
    const res = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'Summarize in one concise sentence.' },
        { role: 'user',   content },
      ],
      max_tokens: 40,
      temperature: 0.3,
    });

    // 응답 객체 구조 확인을 위한 로깅 (개발 중에만 사용)
    // console.log('OpenAI Response:', JSON.stringify(res, null, 2));

    const summary =
      res.choices?.[0]?.message?.content?.trim() ?? fallbackSummarize(content);
    return summary;
  } catch (error) {
    console.error('OpenAI Error:', error);
    
    // 에러 객체 세부 정보 출력
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      
      // 할당량 초과 오류 특별 처리
      if (error.message.includes('quota') || error.message.includes('429')) {
        console.error('API 할당량이 초과되었습니다. OpenAI 계정의 결제 정보를 확인하세요.');
        return fallbackSummarize(content);
      }
      
      return fallbackSummarize(content);
    }
    return fallbackSummarize(content);
  }
}

/**
 * 뉴스 소스명에 따라 정치 성향을 추정하는 함수
 */
export function determinePoliticalBias(sourceName: string): string {
  // 간단한 예시
  const leftSources = ['CNN', 'BBC', 'The New York Times'];
  const rightSources = ['Fox News', 'Breitbart'];

  if (leftSources.includes(sourceName)) return 'Left';
  if (rightSources.includes(sourceName)) return 'Right';
  return 'Neutral';
}
