export interface AIProvider {
  baseUrl: string;
  apiKey: string;
  model: string;
  maxTokens: number;
}

// Default configuration for different AI providers
export const AI_PROVIDERS = {
  openai: {
    baseUrl: 'https://api.openai.com/v1',
    model: 'gpt-3.5-turbo',
    maxTokens: 1000,
  },
  freeai: {
    baseUrl: 'https://api.free-ai-api.com/v1',
    model: 'gpt-3.5-turbo',
    maxTokens: 1000,
  },
  huggingface: {
    baseUrl: 'https://api-inference.huggingface.co/models',
    model: 'bengali-gpt',
    maxTokens: 1000,
  },
} as const;

// Get current AI provider configuration
export function getAIConfig(): AIProvider {
  const provider = process.env.NEXT_PUBLIC_AI_PROVIDER || 'freeai';
  const apiKey = process.env.NEXT_PUBLIC_AI_API_KEY;

  if (!apiKey) {
    throw new Error('AI API key not configured');
  }

  const config = AI_PROVIDERS[provider as keyof typeof AI_PROVIDERS];
  
  return {
    ...config,
    apiKey,
  };
}