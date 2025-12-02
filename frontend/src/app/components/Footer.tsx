"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Rocket, BookOpen, ExternalLink, Heart, Github, Twitter, Mail } from "lucide-react";

const Footer = React.memo(() => {
  const learningItems = useMemo(
    () => ["App Router", "コンポーネント開発", "TypeScript", "API開発"],
    []
  );

  const links = useMemo(
    () => [
      { name: "Next.js Docs", url: "https://nextjs.org/docs", icon: ExternalLink },
      { name: "React Docs", url: "https://react.dev", icon: ExternalLink },
      { name: "TypeScript Docs", url: "https://www.typescriptlang.org/docs", icon: ExternalLink },
    ],
    []
  );

  const socialLinks = useMemo(
    () => [
      { name: "GitHub", url: "#", icon: Github },
      { name: "Twitter", url: "#", icon: Twitter },
      { name: "Email", url: "#", icon: Mail },
    ],
    []
  );

  return (
    <footer className="relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 border-t border-white/20 dark:border-white/10 mt-16 pt-12 pb-6 z-[60] shadow-2xl md:pt-8 overflow-hidden">
      {/* 背景装飾 */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-3xl"
        />
      </div>

      <div className="relative max-w-[1200px] mx-auto px-4">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-8 mb-8 md:grid-cols-1 md:gap-6">
          {/* セクション1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="group"
          >
            <h3 className="text-2xl font-bold mb-4 m-0 md:text-xl flex items-center gap-2">
              <Rocket className="w-8 h-8 text-blue-500" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500">
                Next.js 初心者講座
              </span>
            </h3>
            <p className="m-0 mb-4 text-foreground/80 leading-relaxed">
              Next.jsの基本から実践的な開発まで、段階的に学べる学習用プロジェクトです。
            </p>
          </motion.div>

          {/* セクション2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-bold mb-4 m-0 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-purple-500" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
                学習内容
              </span>
            </h4>
            <ul className="list-none p-0 m-0 space-y-2">
              {learningItems.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 8 }}
                  className="flex items-center gap-2 text-foreground/80 transition-all duration-300 hover:text-foreground cursor-pointer"
                >
                  <motion.span
                    whileHover={{ scale: 1.5 }}
                    className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                  />
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* セクション3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-bold mb-4 m-0 flex items-center gap-2">
              <ExternalLink className="w-6 h-6 text-green-500" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-500">
                リンク
              </span>
            </h4>
            <ul className="list-none p-0 m-0 space-y-2">
              {links.map((link, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <motion.a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 8 }}
                    className="inline-flex items-center gap-2 text-foreground/80 no-underline transition-all duration-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-green-500 hover:to-emerald-500"
                  >
                    <link.icon className="w-4 h-4" />
                    {link.name}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* ソーシャルリンク */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex justify-center gap-4 mb-8"
        >
          {socialLinks.map((social, index) => (
            <motion.a
              key={index}
              href={social.url}
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <social.icon className="w-5 h-5" />
            </motion.a>
          ))}
        </motion.div>

        {/* コピーライト */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="relative border-t border-white/10 pt-6 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl backdrop-blur-md bg-white/30 dark:bg-gray-800/30 border border-white/20 shadow-lg">
            <p className="m-0 text-foreground/70 text-sm font-medium flex items-center gap-2">
              <span>&copy; 2024 Next.js 初心者講座. All rights reserved.</span>
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              </motion.span>
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";

export default Footer;
