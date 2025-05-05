"use client"

import type React from "react"

import type { HistoricalFigure } from "@/data/historical-figures"
import { cn } from "@/lib/utils"

interface SwipeCardProps {
  figure: HistoricalFigure
  direction: "left" | "right" | null
  isDragging: boolean
  swipeDistance: number
  onTouchStart: (e: React.TouchEvent | React.MouseEvent) => void
  onTouchMove: (e: React.TouchEvent | React.MouseEvent) => void
  onTouchEnd: () => void
}

export default function SwipeCard({
  figure,
  direction,
  isDragging,
  swipeDistance,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
}: SwipeCardProps) {
  const cardStyle = {
    transform: isDragging
      ? `translateX(${swipeDistance}px) rotate(${swipeDistance * 0.05}deg)`
      : direction === "left"
        ? "translateX(-150%) rotate(-30deg)"
        : direction === "right"
          ? "translateX(150%) rotate(30deg)"
          : "translateX(0) rotate(0)",
    transition: isDragging ? "none" : "transform 0.3s ease",
  }

  const opacityStyle = {
    opacity: Math.min(Math.abs(swipeDistance) / 100, 1),
  }

  return (
    <div
      className="absolute w-full h-full"
      style={cardStyle}
      onMouseDown={onTouchStart}
      onMouseMove={onTouchMove}
      onMouseUp={onTouchEnd}
      onMouseLeave={onTouchEnd}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="relative w-full h-full bg-white rounded-2xl overflow-hidden shadow-xl border-2 border-amber-700 flex flex-col">
        {/* Like/Skip Overlays */}
        <div
          className={cn(
            "absolute top-10 right-5 z-10 transform rotate-12 border-4 border-green-500 rounded px-2 py-1",
            "text-green-500 text-3xl font-bold opacity-0",
          )}
          style={swipeDistance > 0 ? opacityStyle : { opacity: 0 }}
        >
          縁あり
        </div>
        <div
          className={cn(
            "absolute top-10 left-5 z-10 transform -rotate-12 border-4 border-red-500 rounded px-2 py-1",
            "text-red-500 text-3xl font-bold opacity-0",
          )}
          style={swipeDistance < 0 ? opacityStyle : { opacity: 0 }}
        >
          縁なし
        </div>

        {/* Image - 固定高さから比率ベースに変更 */}
        <div className="w-full flex-none" style={{ height: "45%" }}>
          <img
            src={figure.image || "/placeholder.svg"}
            alt={figure.name}
            className="w-full h-full object-cover object-top"
          />
        </div>

        {/* Content - 残りのスペースを使用 */}
        <div className="p-4 flex-grow bg-amber-50 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex justify-between items-center mb-1">
              <h2 className="text-xl sm:text-2xl font-bold text-amber-900">{figure.name}</h2>
              <span className="text-xs sm:text-sm text-gray-600">{figure.period}</span>
            </div>
            <p className="text-md sm:text-lg font-medium text-amber-800 mb-2">『{figure.catchphrase}』</p>
            <p className="text-sm sm:text-base text-gray-700 italic">「{figure.quote}」</p>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 mt-2">{figure.description}</p>
        </div>
      </div>
    </div>
  )
}
