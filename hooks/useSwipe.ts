"use client"

import type React from "react"

import { useState, useRef } from "react"
import type { HistoricalFigure } from "@/data/historical-figures"

type Direction = "left" | "right" | null

export function useSwipe(figures: HistoricalFigure[]) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState<Direction>(null)
  const [liked, setLiked] = useState<HistoricalFigure[]>([])
  const startX = useRef(0)
  const currentX = useRef(0)
  const [isDragging, setIsDragging] = useState(false)
  const [swipeDistance, setSwipeDistance] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const currentFigure = figures[currentIndex]
  const isFinished = currentIndex >= figures.length

  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    if (isAnimating) return

    setIsDragging(true)
    if ("touches" in e) {
      startX.current = e.touches[0].clientX
      currentX.current = e.touches[0].clientX
    } else {
      startX.current = e.clientX
      currentX.current = e.clientX
    }
  }

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging || isAnimating) return

    if ("touches" in e) {
      currentX.current = e.touches[0].clientX
    } else {
      currentX.current = e.clientX
    }

    const distance = currentX.current - startX.current
    setSwipeDistance(distance)
  }

  const handleTouchEnd = () => {
    if (!isDragging || isAnimating) return

    setIsDragging(false)
    const distance = currentX.current - startX.current

    // Threshold for a swipe
    const threshold = 100

    if (distance > threshold) {
      // Swipe right - Like
      handleSwipe("right")
    } else if (distance < -threshold) {
      // Swipe left - Skip
      handleSwipe("left")
    } else {
      // Reset if not a significant swipe
      setSwipeDistance(0)
    }
  }

  const handleSwipe = (dir: Direction) => {
    if (isAnimating || isFinished) return

    setDirection(dir)
    setIsAnimating(true)

    // If swiped right (liked), add to liked array
    if (dir === "right" && currentFigure) {
      setLiked((prev) => [...prev, currentFigure])
    }

    // Wait for animation to complete before moving to next card
    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1)
      setDirection(null)
      setSwipeDistance(0)
      setIsAnimating(false)
    }, 300)
  }

  const handleButtonClick = (dir: Direction) => {
    if (isAnimating || isFinished) return
    handleSwipe(dir)
  }

  // リセット機能を追加
  const resetSwipe = () => {
    setCurrentIndex(0)
    setDirection(null)
    setLiked([])
    setIsDragging(false)
    setSwipeDistance(0)
    setIsAnimating(false)
  }

  return {
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
    resetSwipe,
  }
}
