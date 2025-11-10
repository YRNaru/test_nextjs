import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next.js 初心者講座",
  description: "Next.jsの基本から実践的な開発まで、段階的に学べる学習用プロジェクト",
  keywords: ["Next.js", "React", "TypeScript", "学習", "講座"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
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
