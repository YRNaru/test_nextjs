import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import LeftSidebar from "./components/LeftSidebar";
import RightSidebar from "./components/RightSidebar";
import MainContent from "./components/MainContent";
import { ThemeProvider } from "./components/ThemeProvider";
import { SidebarProvider } from "./components/SidebarContext";
import { AuthProvider } from "@/contexts/AuthContext";
export const metadata: Metadata = {
  title: "Next.js 初心者講座",
  description:
    "Next.jsの基本から実践的な開発まで、段階的に学べる学習用プロジェクト",
  keywords: ["Next.js", "React", "TypeScript", "学習", "講座"],
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" suppressHydrationWarning data-oid="61wjhdg">
      <head data-oid="j-k8q9d">
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
          data-oid="6gp-rid"
        />
      </head>
      <body className="" data-oid="np147.i">
        <AuthProvider data-oid="c7w-4.k">
          <ThemeProvider data-oid="wjrff3q">
            <SidebarProvider data-oid="tm9apl8">
              <Header data-oid="dxx440z" />
              <LeftSidebar data-oid="ojf_8x:" />
              <RightSidebar data-oid="9a5rgvb" />
              <MainContent data-oid="dj5u0dp">
                {children}
                <Footer data-oid="3ifzjdk" />
              </MainContent>
              <ScrollToTop data-oid=".i7_cbl" />
            </SidebarProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
