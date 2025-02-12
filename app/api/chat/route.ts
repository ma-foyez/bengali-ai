import { NextResponse } from 'next/server';
import { generateResponse } from '@/lib/ai';

export const runtime = 'edge'; // Enable edge runtime for better performance

export async function POST(request: Request) {
  try {
    const { message } = await request.json();
    const response = await generateResponse(message);
    
    return NextResponse.json({ response });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
