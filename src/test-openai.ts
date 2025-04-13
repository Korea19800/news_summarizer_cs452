// src/test-openai.ts
const { OpenAI } = require('openai');
const dotenv = require('dotenv');

// 환경 변수 불러오기
dotenv.config();

async function testOpenAI() {
  console.log('Testing OpenAI API connection...');
  
  if (!process.env.OPENAI_API_KEY) {
    console.error('Error: OPENAI_API_KEY environment variable is not set');
    return;
  }
  
  console.log(`API Key exists: ${process.env.OPENAI_API_KEY.substring(0, 9)}...`);
  
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    
    console.log('OpenAI client created successfully');
    
    // API 호출 테스트
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: 'Hello, how are you?' }
      ],
      max_tokens: 50,
    });
    
    console.log('OpenAI API Response:');
    console.log(JSON.stringify(completion, null, 2));
    console.log('\nTest completed successfully!');
  } catch (error) {
    console.error('Error during OpenAI API test:');
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    } else {
      console.error(error);
    }
  }
}

// 테스트 실행
testOpenAI(); 