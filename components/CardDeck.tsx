"use client"
import { useRouter } from "next/navigation"
import type { HistoricalFigure } from "@/data/historical-figures"
import SwipeCard from "./SwipeCard"
import { useSwipe } from "@/hooks/useSwipe"
import { Heart, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CardDeckProps {
  figures: HistoricalFigure[]
}

export default function CardDeck({ figures }: CardDeckProps) {
  const router = useRouter()
  const {
    currentFigure,
    direction,
    isDragging,
    swipeDistance,
    isFinished,
    liked,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleButtonClick,
  } = useSwipe(figures)

  // When all cards are swiped, navigate to match page
  if (isFinished) {
    // Store liked figures in localStorage
    if (liked.length > 0) {
      localStorage.setItem("likedFigures", JSON.stringify(liked))
      router.push("/match")
    } else {
      // If no figures were liked, show a message
      return (
        <div className="flex flex-col items-center justify-center h-full p-4 text-center">
          <h2 className="text-2xl font-bold text-amber-900 mb-4">縁が結ばれませんでした...</h2>
          <p className="text-gray-700 mb-6">もう一度お試しください</p>
          <Button onClick={() => router.push("/")} className="bg-amber-700 hover:bg-amber-800 text-white">
            最初からやり直す
          </Button>
        </div>
      )
    }
  }

  return (
    <div className="flex flex-col w-full h-full max-w-md mx-auto">
      {/* カードコンテナ - 高さを調整 */}
      <div className="relative w-full" style={{ height: "calc(100% - 100px)" }}>
        {currentFigure && (
          <SwipeCard
            figure={currentFigure}
            direction={direction}
            isDragging={isDragging}
            swipeDistance={swipeDistance}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          />
        )}
      </div>

      {/* Control buttons - 固定高さを確保 */}
      <div className="flex justify-center gap-16 z-20 mt-4 h-[80px]">
        <Button
          onClick={() => handleButtonClick("left")}
          className="rounded-full w-16 h-16 bg-white border-2 border-red-500 text-red-500 hover:bg-red-100 p-0 flex items-center justify-center shadow-md"
        >
          <X size={32} />
        </Button>
        <Button
          onClick={() => handleButtonClick("right")}
          className="rounded-full w-16 h-16 bg-white border-2 border-green-500 text-green-500 hover:bg-green-100 p-0 flex items-center justify-center shadow-md"
        >
          <Heart size={32} />
        </Button>
      </div>
    </div>
  )
}
