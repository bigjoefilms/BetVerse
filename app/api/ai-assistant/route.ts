import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI client only if API key is available
let openai: OpenAI | null = null;
if (process.env.OPENAI_API_KEY) {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

// Define the system message for the sports betting assistant
const SYSTEM_MESSAGE = `You are an expert sports betting analyst and advisor with deep knowledge of cricket, football, basketball, and other sports. Your role is to help users make informed betting decisions based on comprehensive analysis.

For each response, you should structure your advice as follows:

1. Match Analysis:
   - Team form and recent performance
   - Head-to-head history
   - Key player availability
   - Venue and conditions impact

2. Recommended Bets:
   - Primary bet recommendation
   - Alternative bet options
   - Odds analysis and value assessment

3. Risk Level (with color-coding):
   🟢 Low Risk: Strong historical patterns, clear advantages
   🟡 Medium Risk: Mixed factors, moderate uncertainty
   🔴 High Risk: Volatile conditions, multiple unknowns

4. Justification:
   - Data-driven reasoning
   - Key factors affecting confidence
   - Potential variables to watch

5. Disclaimer:
   - Always include responsible betting reminder
   - Acknowledge prediction limitations
   - Encourage due diligence

Be data-driven, clear, and responsible in your advice. Never guarantee outcomes, and always emphasize the importance of responsible betting.`;

// Define types for request and response
export interface AIAssistantRequest {
  messages: Array<{ role: 'user' | 'assistant' | 'system'; content: string }>;
  userMessage: string;
  context?: string;
  sport?: string;
}

export interface AIAssistantResponse {
  content: string;
  error?: string;
}

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json() as AIAssistantRequest;
    
    if (!body.userMessage || body.userMessage.trim() === '') {
      return NextResponse.json(
        { content: '', error: 'Message is required' } as AIAssistantResponse,
        { status: 400 }
      );
    }

    // Check if OpenAI is available
    if (!openai) {
      return NextResponse.json({
        content: `I'm currently in demo mode and can't provide real-time betting analysis. Here's what I would typically analyze for your query about "${body.userMessage}":

**Demo Response:**
- Team performance trends
- Historical head-to-head data
- Player statistics and form
- Venue and weather conditions
- Market odds movement

To get real AI-powered betting insights, please configure the OPENAI_API_KEY environment variable.

**Disclaimer:** This is a demo response. Always do your own research and bet responsibly.`,
        error: 'OpenAI API not configured'
      } as AIAssistantResponse);
    }

    // Prepare the messages array for the API call
    const messages = [
      { role: 'system' as const, content: SYSTEM_MESSAGE },
      // If there's sport-specific context, add it
      ...(body.sport && body.sport !== 'all' ? [
        { 
          role: 'system' as const, 
          content: `Focus on ${body.sport} betting analysis and predictions.`
        }
      ] : []),
      // If there's additional context, add it
      ...(body.context ? [
        { 
          role: 'system' as const, 
          content: body.context 
        }
      ] : []),
      // Add the chat history
      ...body.messages,
      // Add the latest user message
      { role: 'user' as const, content: body.userMessage }
    ];
    
    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages,
      temperature: 0.4,
      max_tokens: 2000,
      presence_penalty: 0.1,
      frequency_penalty: 0.1,
      response_format: { type: "text" }
    });

    // Extract the assistant's response
    const responseContent = completion.choices[0]?.message?.content || 'Sorry, I could not generate a response.';
    
    // Return the response
    return NextResponse.json({ 
      content: responseContent 
    } as AIAssistantResponse);
    
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    
    return NextResponse.json(
      { 
        content: 'I apologize, but I\'m experiencing technical difficulties. Please try again later or contact support if the issue persists.',
        error: 'Failed to process your request. Please try again later.' 
      } as AIAssistantResponse,
      { status: 500 }
    );
  }
}