import { cn } from '@/lib/utils'
import type { ChatMessage as ChatMessageType } from '@/types'

interface ChatMessageProps {
  message: ChatMessageType
  isStreaming?: boolean
}

export default function ChatMessage({ message, isStreaming }: ChatMessageProps) {
  const isUser = message.role === 'user'

  return (
    <div className={cn('flex gap-3', isUser ? 'justify-end' : 'justify-start')}>
      {!isUser && (
        <div className="flex-shrink-0 w-7 h-7 rounded-full bg-[var(--accent)]/20 border border-[var(--accent)]/30 flex items-center justify-center">
          <svg className="w-3.5 h-3.5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
      )}
      <div
        className={cn(
          'max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed',
          isUser
            ? 'bg-[var(--accent)] text-white rounded-br-sm'
            : 'bg-[var(--surface)] border border-[var(--border)] text-[var(--foreground)] rounded-bl-sm'
        )}
      >
        <MessageContent content={message.content} />
        {isStreaming && (
          <span className="inline-block w-1 h-4 ml-0.5 bg-current animate-pulse rounded-sm" />
        )}
      </div>
    </div>
  )
}

function MessageContent({ content }: { content: string }) {
  // Simple rendering: split by code blocks and newlines
  const parts = content.split(/(```[\s\S]*?```|`[^`]+`)/g)

  return (
    <div className="space-y-2">
      {parts.map((part, i) => {
        if (part.startsWith('```') && part.endsWith('```')) {
          const code = part.slice(3, -3).replace(/^\w+\n/, '')
          return (
            <pre key={i} className="bg-black/30 rounded-lg p-3 text-xs overflow-x-auto font-mono">
              <code>{code.trim()}</code>
            </pre>
          )
        }
        if (part.startsWith('`') && part.endsWith('`')) {
          return (
            <code key={i} className="bg-black/30 px-1.5 py-0.5 rounded text-xs font-mono">
              {part.slice(1, -1)}
            </code>
          )
        }
        return (
          <span key={i} style={{ whiteSpace: 'pre-wrap' }}>
            {part}
          </span>
        )
      })}
    </div>
  )
}
