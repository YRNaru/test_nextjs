import GradientCard from "../ui/GradientCard";
import SectionHeader from "../ui/SectionHeader";

interface ExternalLink {
  name: string;
  url: string;
  icon: string;
}

const externalLinks: ExternalLink[] = [
  {
    name: "Next.js 公式ドキュメント",
    url: "https://nextjs.org/docs",
    icon: "📖",
  },
  { name: "React 公式サイト", url: "https://react.dev", icon: "⚛️" },
  {
    name: "TypeScript ドキュメント",
    url: "https://www.typescriptlang.org/docs",
    icon: "📘",
  },
];

export default function UsefulLinksCard() {
  return (
    <GradientCard
      gradientFrom="rgb(168, 85, 247)"
      gradientTo="rgb(236, 72, 153)"
      className="p-3"
    >
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-3xl opacity-20"></div>
      <SectionHeader
        icon="💡"
        title="便利リンク"
        gradientFrom="rgb(168, 85, 247)"
        gradientTo="rgb(236, 72, 153)"
        iconSize="text-lg"
        className="text-base mb-4"
      />
      <ul className="relative list-none p-0 m-0 flex flex-col gap-2">
        {externalLinks.map((link, index) => (
          <li key={index} className="m-0">
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-2.5 rounded-xl no-underline text-foreground text-sm font-medium transition-all duration-300 hover:scale-105 hover:bg-white/50 dark:hover:bg-gray-800/50 hover:shadow-md hover:translate-x-1"
            >
              <span className="mr-2">{link.icon}</span>
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </GradientCard>
  );
}

