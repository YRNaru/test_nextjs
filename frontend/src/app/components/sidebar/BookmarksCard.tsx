import GradientCard from "../ui/GradientCard";
import SectionHeader from "../ui/SectionHeader";

const bookmarks = [
  "⭐ よく使うコードスニペット",
  "📚 参考書籍リスト",
  "🎥 おすすめ動画",
  "🛠️ 便利ツール集",
];

export default function BookmarksCard() {
  return (
    <GradientCard
      gradientFrom="rgb(249, 115, 22)"
      gradientTo="rgb(234, 179, 8)"
      className="p-3"
    >
      <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full blur-3xl opacity-20"></div>
      <SectionHeader
        icon="🔖"
        title="ブックマーク"
        gradientFrom="rgb(249, 115, 22)"
        gradientTo="rgb(234, 179, 8)"
        iconSize="text-lg"
        className="text-base mb-4"
      />
      <ul className="relative list-none p-0 m-0 flex flex-col gap-2">
        {bookmarks.map((item, index) => (
          <li
            key={index}
            className="group px-4 py-3 rounded-xl text-sm font-medium text-foreground bg-white/50 dark:bg-gray-800/50 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-md hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-yellow-500/20"
          >
            {item}
          </li>
        ))}
      </ul>
    </GradientCard>
  );
}

