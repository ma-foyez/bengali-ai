import { Configuration, OpenAIApi } from 'openai';
import { getAIConfig } from './config';

let openai: OpenAIApi | null = null;

function getAIClient() {
  if (!openai) {
    const config = getAIConfig();
    const configuration = new Configuration({
      apiKey: config.apiKey,
      basePath: config.baseUrl,
    });
    openai = new OpenAIApi(configuration);
  }
  return openai;
}

export async function generateResponse(prompt: string) {
  try {
    const config = getAIConfig();
    const client = getAIClient();

    const completion = await client.createChatCompletion({
      model: config.model,
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that responds in Bengali language. Always provide responses in Bengali script.",
        },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      max_tokens: config.maxTokens,
    });

    return completion.data.choices[0]?.message?.content || "দুঃখিত, একটি ত্রুটি ঘটেছে।";
  } catch (error) {
    console.error('Error:', error);
    return "দুঃখিত, একটি ত্রুটি ঘটেছে। পরে আবার চেষ্টা করুন।";
  }
}