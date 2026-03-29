import ChatWindow from '@/components/chat/ChatWindow'

export default function ChatPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">AI Chat</h1>
        <p className="text-sm text-[var(--muted)] mt-1">
          Get help setting up Vercel, GitHub, Supabase, VS Code, and Node.js
        </p>
      </div>
      <ChatWindow />
    </div>
  )
}
