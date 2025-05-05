import ChatInterface from "@/components/ChatInterface"

export default function ChatPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="w-full mx-auto flex flex-col h-screen">
        <ChatInterface />
      </div>
    </main>
  )
}
