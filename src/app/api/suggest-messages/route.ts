import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { NextResponse } from 'next/server';


const openai = new OpenAI({
  baseURL: process.env.HUGGINGFACE_API_BASE_URL!,
  apiKey: process.env.HUGGINGFACE_API_KEY!
})


export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const prompt = "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience of coders. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a coding project you’ve recently started?||If you could have a coding session with any historical figure, who would it be?||What’s a coding challenge that you found particularly rewarding?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment and be professional and engaging.";


    const response = await openai.chat.completions.create({
      model: 'Qwen/Qwen2.5-72B-Instruct',
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.5,
      max_tokens: 2048,
      top_p: 0.7,
      stream: true,
    });

    const stream = OpenAIStream(response);


    return new StreamingTextResponse(stream);
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      // OpenAI API error handling
      const { name, status, headers, message } = error;
      return NextResponse.json({ name, status, headers, message }, { status });
    } else {
      // General error handling
      console.error('An unexpected error occurred:', error);
      throw error;
    }
  }
}
