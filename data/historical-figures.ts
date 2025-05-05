export interface HistoricalFigure {
  id: string
  name: string
  period: string
  catchphrase: string
  quote: string
  image: string
  description: string
  messages: string[]
}

// 画像パスを更新します
export const historicalFigures: HistoricalFigure[] = [
  {
    id: "oda-nobunaga",
    name: "織田信長",
    period: "1534年 - 1582年",
    catchphrase: "天下布武",
    quote: "泣かぬなら 殺してしまえ ホトトギス",
    image: "/images/nobunaga.png",
    description: "戦国時代の武将。天下統一への道を開いた革新的な指導者。",
    messages: [
      "我が名は織田信長なり。汝と縁を結ぶことができて嬉しく思う。",
      "天下統一は時間の問題じゃ。共に歩む覚悟はあるか？",
      "わしの時代には無かった「スマホ」とやらは面白いのう。",
      "敵は本能寺にあり！...冗談じゃ。今は平和な時代で何よりじゃ。",
    ],
  },
  {
    id: "murasaki-shikibu",
    name: "紫式部",
    period: "973年頃 - 1025年頃",
    catchphrase: "雅なる物語の紡ぎ手",
    quote: "世の中に絶えて桜のなかりせば 春の心はのどけからまし",
    image: "/images/murasaki.png",
    description: "平安時代の女流作家。「源氏物語」の作者として知られる。",
    messages: [
      "わらわは紫式部と申します。お会いできて光栄です。",
      "源氏物語を読んでくださいましたか？千年の時を超えて読み継がれるとは。",
      "現代の言葉は難しゅうございますね。「マッチング」とは何でしょう？",
      "平安の雅な世界をあなたにもお見せしたいものです。",
    ],
  },
  {
    id: "sakamoto-ryoma",
    name: "坂本龍馬",
    period: "1836年 - 1867年",
    catchphrase: "日本を洗濯いたし申候",
    quote: "世の中を変えてみせるぜよ",
    image: "/images/ryoma.png",
    description: "幕末の志士。日本の近代化に貢献した革命家。",
    messages: [
      "龍馬でござる！よろしゅうお願いしますぜよ！",
      "この「スマホ」とかいう黒船、面白いもんじゃのう。",
      "薩長同盟ならぬ、我らの同盟も天下を取れるかもしれんのう。",
      "いつか一緒に海外旅行でもいきませんかい？世界は広いぜよ！",
    ],
  },
  {
    id: "toyotomi-hideyoshi",
    name: "豊臣秀吉",
    period: "1537年 - 1598年",
    catchphrase: "太閤さま",
    quote: "賤ヶ岳の七本槍よりも強き絆を結びたい",
    image: "/images/hideyoshi.png",
    description: "農民から天下人へと上り詰めた戦国武将。",
    messages: [
      "わしは豊臣秀吉じゃ。農民から天下人になった男じゃ。",
      "お主も志があれば、どこまでも登れるぞよ。",
      "黄金の茶室でお茶でもいかがかな？",
      "朝鮮出兵は失敗じゃった...今度は平和的な国際交流をしたいものじゃ。",
    ],
  },
  {
    id: "tokugawa-ieyasu",
    name: "徳川家康",
    period: "1543年 - 1616年",
    catchphrase: "人の一生は重荷を負うて遠き道を行くがごとし",
    quote: "今に見ておれ",
    image: "/images/ieyasu.png",
    description: "江戸幕府を開いた将軍。忍耐強く、計算高い政治家。",
    messages: [
      "徳川家康にございます。末永きお付き合いを。",
      "急がば回れ。焦らず着実に関係を育みましょう。",
      "天下泰平の世を築きたいものですな。",
      "三方ヶ原の戦いでの敗北から学んだように、失敗も大切な経験です。",
    ],
  },
]
