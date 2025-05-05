"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import type { HistoricalFigure } from "@/data/historical-figures"
import { Button } from "@/components/ui/button"
import { MessageCircle, RefreshCw } from "lucide-react"
import confetti from "canvas-confetti"

export default function MatchScreen() {
  const router = useRouter()
  const [matchedFigure, setMatchedFigure] = useState<HistoricalFigure | null>(null)

  useEffect(() => {
    // Get liked figures from localStorage
    const likedFiguresJson = localStorage.getItem("likedFigures")
    if (likedFiguresJson) {
      const likedFigures: HistoricalFigure[] = JSON.parse(likedFiguresJson)

      // Randomly select one of the liked figures
      if (likedFigures.length > 0) {
        const randomIndex = Math.floor(Math.random() * likedFigures.length)
        setMatchedFigure(likedFigures[randomIndex])

        // Store the matched figure for the chat page
        localStorage.setItem("matchedFigure", JSON.stringify(likedFigures[randomIndex]))

        // Trigger confetti effect
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        })
      }
    }
  }, [])

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
    <div className="flex flex-col items-center justify-center h-full p-4 text-center">
      <h1 className="text-3xl md:text-4xl font-bold text-amber-900 mb-4">縁、結ばれ申した！</h1>

      <div className="bg-white rounded-2xl overflow-hidden shadow-xl border-2 border-amber-700 max-w-sm w-full mb-6">
        <div className="w-full" style={{ height: "250px" }}>
          <img
            src={matchedFigure.image || "/placeholder.svg"}
            alt={matchedFigure.name}
            className="w-full h-full object-cover object-top"
          />
        </div>
        <div className="p-4 bg-amber-50">
          <h2 className="text-2xl font-bold text-amber-900 mb-2">{matchedFigure.name}</h2>
          <p className="text-lg font-medium text-amber-800 mb-2">『{matchedFigure.catchphrase}』</p>
          <p className="text-gray-700 italic mb-4">「{matchedFigure.quote}」</p>
          <p className="text-gray-600">{matchedFigure.description}</p>
        </div>
      </div>

      <div className="flex gap-4">
        <Button
          onClick={() => router.push("/chat")}
          className="bg-amber-700 hover:bg-amber-800 text-white flex items-center gap-2"
        >
          <MessageCircle size={20} />
          会話を始める
        </Button>

        <Button
          onClick={handleReset}
          variant="outline"
          className="border-amber-700 text-amber-700 hover:bg-amber-100 flex items-center gap-2"
        >
          <RefreshCw size={20} />
          最初からやり直す
        </Button>
      </div>
    </div>
  )
}
