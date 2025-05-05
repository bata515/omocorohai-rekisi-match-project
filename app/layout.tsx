import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'HistoryMatch 〜縁、結ばれ申した〜',
  description: 'スワイプで歴史上の人物とマッチングしよう！',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
