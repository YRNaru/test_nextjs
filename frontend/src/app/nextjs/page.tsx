"use client";
import Link from "next/link";
import { useState } from "react";
import {
  TopicKey,
  SubRenderingKey,
  topicDetails,
  subRenderingDetails,
} from "@/data/nextjs-data";

const topics: { key: TopicKey; label: string }[] = [
  { key: "routing", label: "ファイルベースルーティング" },
  { key: "rendering", label: "レンダリング" },
  { key: "typescript", label: "TypeScript対応" },
  { key: "optimize", label: "自動最適化" },
];

const subRenderings: { key: SubRenderingKey; label: string }[] = [
  { key: "ssg", label: "SSG" },
  { key: "ssr", label: "SSR" },
  { key: "csr", label: "CSR" },
  { key: "isr", label: "ISR" },
];

export default function NextjsPage() {
  const [activeKey, setActiveKey] = useState<TopicKey>("routing");
  const [activeSubRendering, setActiveSubRendering] =
    useState<SubRenderingKey>("ssg");
  const detail = topicDetails[activeKey];
  const subDetail = subRenderingDetails[activeSubRendering];

  return (
    <div className="flex flex-col items-center min-h-screen p-10 px-5 font-sans leading-relaxed md:p-5 md:px-4">
      <main className="max-w-[800px] w-full flex flex-col gap-10">
        <h1 className="text-4xl font-bold text-center m-0 text-foreground md:text-3xl">
          📝 Next.jsの主な特徴
        </h1>
        <div className="bg-black/5 dark:bg-white/6 p-6 rounded-xl border border-black/[0.08] dark:border-white/[0.145] md:p-5">
          <h2 className="text-2xl font-semibold m-0 mb-4 text-foreground md:text-xl">
            Next.jsの主な学習項目
          </h2>
          <p className="m-0 mb-4 text-foreground">
            Next.jsの代表的な特徴や機能を、タブで切り替えて学べます。
            <br />
            それぞれの項目を選択して詳細を確認しましょう。
          </p>
        </div>
        <div className="bg-black/5 dark:bg-white/6 p-6 rounded-xl border border-black/[0.08] dark:border-white/[0.145] md:p-5">
          <div
            style={{
              display: "flex",
              gap: "1rem",
              marginBottom: "2rem",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {topics.map((topic) => (
              <button
                key={topic.key}
                onClick={() => {
                  setActiveKey(topic.key);
                  if (topic.key === "rendering") setActiveSubRendering("ssg");
                }}
                style={{
                  padding: "1rem 2rem",
                  border:
                    activeKey === topic.key
                      ? "2px solid #3498db"
                      : "2px solid #ccc",
                  background: activeKey === topic.key ? "#3498db" : "#fff",
                  color: activeKey === topic.key ? "#fff" : "#3498db",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: 600,
                  fontSize: "1.1rem",
                  transition: "all 0.2s",
                  boxShadow:
                    activeKey === topic.key
                      ? "0 4px 12px rgba(52,152,219,0.15)"
                      : "none",
                }}
              >
                <span style={{ marginRight: 8 }}>
                  {topicDetails[topic.key].icon}
                </span>
                {topic.label}
              </button>
            ))}
          </div>
          {activeKey === "rendering" ? (
            <>
              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  marginBottom: "2rem",
                  justifyContent: "center",
                }}
              >
                {subRenderings.map((sub) => (
                  <button
                    key={sub.key}
                    onClick={() => setActiveSubRendering(sub.key)}
                    style={{
                      padding: "0.7rem 1.5rem",
                      border:
                        activeSubRendering === sub.key
                          ? "2px solid #27ae60"
                          : "2px solid #ccc",
                      background:
                        activeSubRendering === sub.key ? "#27ae60" : "#fff",
                      color:
                        activeSubRendering === sub.key ? "#fff" : "#27ae60",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontWeight: 600,
                      fontSize: "1rem",
                      transition: "all 0.2s",
                      boxShadow:
                        activeSubRendering === sub.key
                          ? "0 2px 8px rgba(39,174,96,0.15)"
                          : "none",
                    }}
                  >
                    <span style={{ marginRight: 8 }}>
                      {subRenderingDetails[sub.key].icon}
                    </span>
                    {sub.label}
                  </button>
                ))}
              </div>
              <div
                style={{
                  background: "var(--gray-alpha-100)",
                  borderRadius: 12,
                  padding: 24,
                  border: "1px solid var(--gray-alpha-200)",
                }}
              >
                <h3
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: "1.3rem",
                    marginBottom: 12,
                  }}
                >
                  <span style={{ fontSize: "2rem", marginRight: 12 }}>
                    {subDetail.icon}
                  </span>
                  {subDetail.title}
                </h3>
                <p style={{ fontWeight: 500, marginBottom: 16 }}>
                  {subDetail.summary}
                </p>
                <div style={{ marginBottom: 16 }}>
                  <strong>✅ 主な特徴</strong>
                  <ul style={{ margin: 0, paddingLeft: 20 }}>
                    {subDetail.features.map((f: string, i: number) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <strong>✅ 向いているケース</strong>
                  <ul style={{ margin: 0, paddingLeft: 20 }}>
                    {subDetail.useCases.map((f: string, i: number) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <strong>⚠️ 注意点</strong>
                  <ul style={{ margin: 0, paddingLeft: 20 }}>
                    {subDetail.cautions.map((f: string, i: number) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </div>
                {subDetail.notes && subDetail.notes.length > 0 && (
                  <div style={{ marginBottom: 8 }}>
                    <strong>💡 補足</strong>
                    <ul style={{ margin: 0, paddingLeft: 20 }}>
                      {subDetail.notes.map((f: string, i: number) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div
              style={{
                background: "var(--gray-alpha-100)",
                borderRadius: 12,
                padding: 24,
                border: "1px solid var(--gray-alpha-200)",
              }}
            >
              <h3
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "1.3rem",
                  marginBottom: 12,
                }}
              >
                <span style={{ fontSize: "2rem", marginRight: 12 }}>
                  {detail.icon}
                </span>
                {detail.title}
              </h3>
              <p style={{ fontWeight: 500, marginBottom: 16 }}>
                {detail.summary}
              </p>
              {detail.features.length > 0 && (
                <div style={{ marginBottom: 16 }}>
                  <strong>✅ 主な特徴</strong>
                  <ul style={{ margin: 0, paddingLeft: 20 }}>
                    {detail.features.map((f: string, i: number) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </div>
              )}
              {detail.useCases.length > 0 && (
                <div style={{ marginBottom: 16 }}>
                  <strong>✅ 向いているケース</strong>
                  <ul style={{ margin: 0, paddingLeft: 20 }}>
                    {detail.useCases.map((f: string, i: number) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </div>
              )}
              {detail.cautions.length > 0 && (
                <div style={{ marginBottom: 16 }}>
                  <strong>⚠️ 注意点</strong>
                  <ul style={{ margin: 0, paddingLeft: 20 }}>
                    {detail.cautions.map((f: string, i: number) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </div>
              )}
              {detail.notes && detail.notes.length > 0 && (
                <div style={{ marginBottom: 8 }}>
                  <strong>💡 補足</strong>
                  <ul style={{ margin: 0, paddingLeft: 20 }}>
                    {detail.notes.map((f: string, i: number) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="text-center mt-5">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-foreground text-background no-underline rounded-lg font-medium transition-opacity duration-200 hover:opacity-80"
          >
            ← ホームに戻る
          </Link>
        </div>
      </main>
    </div>
  );
}
