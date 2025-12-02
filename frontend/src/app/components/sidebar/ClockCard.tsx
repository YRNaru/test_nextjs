"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ClockCard() {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  useEffect(() => {
    setCurrentTime(new Date());

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      <Card className="relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full blur-3xl opacity-20"></div>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Clock className="w-5 h-5 text-blue-500" />
            </motion.div>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500">
              現在時刻
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <motion.div
            key={currentTime?.toLocaleTimeString()}
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="text-3xl font-bold text-center py-5 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white mb-3 font-mono shadow-lg"
          >
            {currentTime ? currentTime.toLocaleTimeString("ja-JP") : "--:--:--"}
          </motion.div>
          <div className="text-sm text-center text-muted-foreground">
            {currentTime
              ? currentTime.toLocaleDateString("ja-JP", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  weekday: "long",
                })
              : "読み込み中..."}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
