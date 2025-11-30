export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 border-t border-white/20 dark:border-white/10 mt-16 pt-12 pb-6 z-[60] shadow-2xl md:pt-8 overflow-hidden">
      {/* 背景装飾 */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-[1200px] mx-auto px-4">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-8 mb-8 md:grid-cols-1 md:gap-6">
          {/* セクション1 */}
          <div className="group">
            <h3 className="text-2xl font-bold mb-4 m-0 md:text-xl flex items-center gap-2">
              <span className="text-3xl md:text-2xl">🚀</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500">
                Next.js 初心者講座
              </span>
            </h3>
            <p className="m-0 mb-4 text-foreground/80 leading-relaxed">
              Next.jsの基本から実践的な開発まで、段階的に学べる学習用プロジェクトです。
            </p>
          </div>

          {/* セクション2 */}
          <div>
            <h4 className="text-lg font-bold mb-4 m-0 flex items-center gap-2">
              <span className="text-xl">📚</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
                学習内容
              </span>
            </h4>
            <ul className="list-none p-0 m-0 space-y-2">
              {["App Router", "コンポーネント開発", "TypeScript", "API開発"].map((item, index) => (
                <li
                  key={index}
                  className="group flex items-center gap-2 text-foreground/80 transition-all duration-300 hover:text-foreground hover:translate-x-2"
                >
                  <span className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* セクション3 */}
          <div>
            <h4 className="text-lg font-bold mb-4 m-0 flex items-center gap-2">
              <span className="text-xl">🔗</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-500">
                リンク
              </span>
            </h4>
            <ul className="list-none p-0 m-0 space-y-2">
              {[
                { name: "Next.js Docs", url: "https://nextjs.org/docs" },
                { name: "React Docs", url: "https://react.dev" },
                { name: "TypeScript Docs", url: "https://www.typescriptlang.org/docs" },
              ].map((link, index) => (
                <li key={index}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 text-foreground/80 no-underline transition-all duration-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-green-500 hover:to-emerald-500 hover:translate-x-2"
                  >
                    <span className="transition-transform group-hover:rotate-45">→</span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* コピーライト */}
        <div className="relative border-t border-white/10 pt-6 text-center">
          <div className="inline-block px-6 py-3 rounded-2xl backdrop-blur-md bg-white/30 dark:bg-gray-800/30 border border-white/20 shadow-lg">
            <p className="m-0 text-foreground/70 text-sm font-medium">
              &copy; 2024 Next.js 初心者講座. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
