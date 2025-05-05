"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import type { HistoricalFigure } from "@/data/historical-figures"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, ArrowLeft, RefreshCw } from "lucide-react"

interface Message {
  id: number
  text: string
  sender: "user" | "figure"
  timestamp: Date
}

export default function ChatInterface() {
  const router = useRouter()
  const [matchedFigure, setMatchedFigure] = useState<HistoricalFigure | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Get matched figure from localStorage
    const matchedFigureJson = localStorage.getItem("matchedFigure")
    if (matchedFigureJson) {
      const figure: HistoricalFigure = JSON.parse(matchedFigureJson)
      setMatchedFigure(figure)

      // Add initial message from the historical figure
      setMessages([
        {
          id: 1,
          text: figure.messages[0],
          sender: "figure",
          timestamp: new Date(),
        },
      ])
    } else {
      // If no matched figure, redirect to home
      router.push("/")
    }
  }, [router])

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = () => {
    if (!inputText.trim() || !matchedFigure) return

    // Add user message
    const newUserMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newUserMessage])
    setInputText("")

    // Simulate typing delay
    setTimeout(() => {
      // Get random response from figure's messages
      const randomIndex = Math.floor(Math.random() * matchedFigure.messages.length)
      const figureResponse = matchedFigure.messages[randomIndex]

      // Add figure message
      const newFigureMessage: Message = {
        id: messages.length + 2,
        text: figureResponse,
        sender: "figure",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, newFigureMessage])
    }, 1000)
  }

  // 最初からやり直す関数
  const handleReset = () => {
    // ローカルストレージをクリア
    localStorage.removeItem("likedFigures")
    localStorage.removeItem("matchedFigure")

    // 強制的にページをリロード
    window.location.href = "/"
  }

  if (!matchedFigure) {
    return <div className="flex items-center justify-center h-full">Loading...</div>
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center p-4 border-b bg-amber-700 text-white">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push("/match")}
          className="text-white hover:bg-amber-800 mr-2"
        >
          <ArrowLeft size={24} />
        </Button>
        <div className="flex items-center flex-1">
          <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
            <img
              src={matchedFigure.image || "/placeholder.svg"}
              alt={matchedFigure.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="font-bold">{matchedFigure.name}</h2>
            <p className="text-xs opacity-80">オンライン</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleReset}
          className="text-white hover:bg-amber-800"
          title="最初からやり直す"
        >
          <RefreshCw size={20} />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-amber-50">
        {messages.map((message) => (
          <div key={message.id} className={`mb-4 flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
            {message.sender === "figure" && (
              <div className="w-8 h-8 rounded-full overflow-hidden mr-2 flex-shrink-0">
                <img
                  src={matchedFigure.image || "/placeholder.svg"}
                  alt={matchedFigure.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div
              className={`max-w-[70%] p-3 rounded-lg ${
                message.sender === "user"
                  ? "bg-amber-700 text-white rounded-tr-none"
                  : "bg-white border border-amber-200 rounded-tl-none"
              }`}
            >
              <p>{message.text}</p>
              <p className={`text-xs mt-1 ${message.sender === "user" ? "text-amber-200" : "text-gray-500"}`}>
                {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t bg-white">
        <div className="flex">
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="メッセージを入力..."
            className="flex-1 mr-2 border-amber-300 focus-visible:ring-amber-500"
          />
          <Button onClick={handleSendMessage} className="bg-amber-700 hover:bg-amber-800">
            <Send size={20} />
          </Button>
        </div>
      </div>
    </div>
  )
}
