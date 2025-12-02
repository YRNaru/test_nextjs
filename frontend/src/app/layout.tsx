import type { Metadata } from "next";
import dynamic from "next/dynamic";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import { SidebarProvider } from "./components/SidebarContext";
import { AuthProvider } from "@/contexts/AuthContext";

// 動的インポート（コード分割）でパフォーマンス最適化
const Header = dynamic(() => import("./components/Header"), {
  ssr: true, // サーバーサイドレンダリングを維持
});
const Footer = dynamic(() => import("./components/Footer"), {
  ssr: true,
});
const ScrollToTop = dynamic(() => import("./components/ScrollToTop"), {
  ssr: false, // クライアントサイドのみで実行
});
const LeftSidebar = dynamic(() => import("./components/LeftSidebar"), {
  ssr: false,
});
const RightSidebar = dynamic(() => import("./components/RightSidebar"), {
  ssr: false,
});
const MainContent = dynamic(() => import("./components/MainContent"), {
  ssr: true,
});

export const metadata: Metadata = {
  title: "Next.js 初心者講座",
  description: "Next.jsの基本から実践的な開発まで、段階的に学べる学習用プロジェクト",
  keywords: ["Next.js", "React", "TypeScript", "学習", "講座"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const storedTheme = localStorage.getItem('theme');
                  let theme = 'light';
                  
                  if (storedTheme) {
                    const parsedTheme = JSON.parse(storedTheme);
                    if (parsedTheme === 'dark') {
                      theme = 'dark';
                    } else if (parsedTheme === 'light') {
                      theme = 'light';
                    } else {
                      theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                    }
                  } else {
                    theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  }
                  
                  document.documentElement.setAttribute('data-theme', theme);
                  document.documentElement.style.colorScheme = theme;
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="">
        <AuthProvider>
          <ThemeProvider>
            <SidebarProvider>
              <Header />
              <LeftSidebar />
              <RightSidebar />
              <MainContent>
                {children}
                <Footer />
              </MainContent>
              <ScrollToTop />
            </SidebarProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
