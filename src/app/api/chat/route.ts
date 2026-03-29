import Anthropic from '@anthropic-ai/sdk'
import { createClient } from '@/lib/supabase/server'

const SYSTEM_PROMPT = `You are a friendly and encouraging assistant helping beginner developers get set up with modern web development tools. You specialize in:

- **Vercel**: deploying apps, preview URLs, environment variables, custom domains
- **GitHub**: creating repositories, committing code, pull requests, GitHub Actions
- **Supabase**: setting up databases, authentication, RLS policies, storage buckets
- **VS Code**: installing extensions, keyboard shortcuts, integrated terminal, debugging
- **Node.js**: installing packages with npm, running scripts, understanding package.json

Guidelines:
- Keep answers concise and friendly
- Use numbered steps for instructions
- Include code snippets when helpful, wrapped in backticks
- Never assume prior experience — explain terms when you use them
- End with an encouraging message when appropriate
- If asked about something outside your specialties, politely redirect to the above topics`

export async function POST(request: Request) {
  // Auth gate
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return new Response('Unauthorized', { status: 401 })
  }

  let messages: Array<{ role: 'user' | 'assistant'; content: string }>
  try {
    const body = await request.json()
    messages = body.messages
    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response('Invalid messages', { status: 400 })
    }
    // Safety: cap message history and content length
    messages = messages.slice(-20).map((m) => ({
      role: m.role,
      content: String(m.content).slice(0, 4000),
    }))
  } catch {
    return new Response('Invalid JSON', { status: 400 })
  }

  const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  })

  const stream = await anthropic.messages.stream({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    system: SYSTEM_PROMPT,
    messages,
  })

  const readableStream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder()
      try {
        for await (const chunk of stream) {
          if (
            chunk.type === 'content_block_delta' &&
            chunk.delta.type === 'text_delta'
          ) {
            controller.enqueue(encoder.encode(chunk.delta.text))
          }
        }
      } finally {
        controller.close()
      }
    },
  })

  return new Response(readableStream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      'X-Accel-Buffering': 'no',
    },
  })
}
