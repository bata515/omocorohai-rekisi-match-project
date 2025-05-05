import { historicalFigures } from "@/data/historical-figures"
import CardDeck from "@/components/CardDeck"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 bg-amber-50 bg-[url('/images/background-pattern.png')] bg-repeat">
      <div className="w-full max-w-md mx-auto flex flex-col h-screen">
        <header className="text-center py-2">
          <h1 className="text-3xl md:text-4xl font-bold text-amber-900">縁結び</h1>
          <p className="text-amber-800">日本史上の偉人とマッチング</p>
        </header>

        <div className="flex-1 flex items-center justify-center">
          <CardDeck figures={historicalFigures} />
        </div>

        <footer className="text-center py-2 text-amber-800 text-sm">© 2025 縁結び - 歴史マッチングアプリ</footer>
      </div>
    </main>
  )
}
