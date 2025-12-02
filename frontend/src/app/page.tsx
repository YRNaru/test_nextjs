"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  BookOpen,
  Code,
  Database,
  Rocket,
  Layout,
  Palette,
  ArrowRight,
  Sparkles,
  Zap,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useFadeInUp, useStaggerFadeIn, useScaleIn } from "@/hooks/useGsapAnimations";

export default function Home() {
  // GSAPアニメーションフック
  const heroRef = useFadeInUp<HTMLDivElement>();
  const cardsRef = useStaggerFadeIn<HTMLDivElement>();
  const ctaRef = useScaleIn<HTMLDivElement>();

  const learningContent = [
    { icon: Layout, text: "App Router - 新しいルーティングシステム" },
    { icon: Code, text: "コンポーネント - 再利用可能なUI部品" },
    { icon: Palette, text: "スタイリング - CSS ModulesとTailwind CSS" },
    { icon: Database, text: "データフェッチ - API RoutesとSSR" },
    { icon: Rocket, text: "デプロイ - Vercelへの公開" },
  ];

  const techStack = [
    "Next.js 16.0.6",
    "React 19.2.0",
    "TypeScript",
    "Tailwind CSS",
    "shadcn/ui",
    "Framer Motion",
    "GSAP",
    "Lenis",
  ];

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center p-8 px-4 md:p-4 md:min-h-[calc(100vh-150px)]">
      <main className="w-full max-w-4xl mx-auto py-8 px-6 md:py-6 md:px-4">
        {/* GSAPスクロールアニメーション付きヒーローセクション */}
        <div ref={heroRef}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold mb-8 text-foreground text-center md:text-3xl flex items-center justify-center gap-3">
              <Sparkles className="w-10 h-10 text-yellow-500" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
                モダンWeb開発講座
              </span>
              <Zap className="w-10 h-10 text-yellow-500" />
            </h1>
          </motion.div>
        </div>

        {/* GSAPスタガーアニメーション付きカードセクション */}
        <div ref={cardsRef} className="space-y-8">
          <Card className="transform-gpu">
            <CardHeader>
              <CardTitle className="text-2xl md:text-xl flex items-center gap-2">
                <Rocket className="w-6 h-6 text-blue-500" />
                この講座について
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground leading-relaxed opacity-90">
                この講座では、モダンWebアプリケーション(Next.js)の基本から実践的な開発まで、段階的に学んでいきます。
                実際にコードを書きながら、Next.jsの強力な機能を体験してください。
              </p>
            </CardContent>
          </Card>

          <Card className="transform-gpu">
            <CardHeader>
              <CardTitle className="text-2xl md:text-xl flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-purple-500" />
                学習内容
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {learningContent.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                    whileHover={{ x: 8 }}
                    className="flex items-center gap-3 text-foreground cursor-pointer"
                  >
                    <item.icon className="w-5 h-5 text-blue-500" />
                    <span className="font-medium">{item.text}</span>
                  </motion.li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="transform-gpu">
            <CardHeader>
              <CardTitle className="text-2xl md:text-xl flex items-center gap-2">
                <Code className="w-6 h-6 text-green-500" />
                開発環境
              </CardTitle>
              <CardDescription>現在使用している技術スタック：</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <Badge variant="secondary" className="text-sm font-medium">
                      {tech}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* GSAPスケールインアニメーション付きCTAセクション */}
        <div ref={ctaRef} className="text-center mt-12">
          <Link href="/mypage">
            <Button
              variant="default"
              size="lg"
              className="group bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              マイページへ
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="ml-2"
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
