"use client";

import { BasicExample } from "@/types/react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface ExampleCardProps {
  example: BasicExample;
}

export default function ExampleCard({ example }: ExampleCardProps) {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <div
      ref={elementRef}
      className={`bg-[var(--card-background)] border border-[var(--border-color)] rounded-xl p-6 mb-6 shadow-[0_2px_8px_var(--shadow-color)] transition-all duration-300 hover:shadow-[0_4px_12px_var(--shadow-color)] ${isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95"}`}
    >
      <h3 className="text-xl font-semibold mb-3 text-[var(--card-text)]">
        {example.name}
      </h3>
      <p className="mb-4 text-[var(--card-text-secondary)] leading-relaxed">
        {example.description}
      </p>
      <div className="bg-[var(--code-background)] text-[var(--code-text)] p-4 rounded-lg overflow-x-auto mb-4 font-mono text-sm leading-relaxed">
        <pre>
          <code>{example.example}</code>
        </pre>
      </div>
      {example.correctUsage && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="bg-[#d4edda] border border-[#28a745] rounded-lg p-4">
            <strong className="block mb-2 text-[#155724]">正しい使用法:</strong>
            <pre className="text-xs overflow-x-auto">
              <code className="text-[#155724]">{example.correctUsage}</code>
            </pre>
          </div>
          <div className="bg-[#f8d7da] border border-[#dc3545] rounded-lg p-4">
            <strong className="block mb-2 text-[#721c24]">
              間違った使用法:
            </strong>
            <pre className="text-xs overflow-x-auto">
              <code className="text-[#721c24]">{example.incorrectUsage}</code>
            </pre>
          </div>
        </div>
      )}
      <p className="mb-4 text-[var(--card-text-secondary)] leading-relaxed italic">
        {example.explanation}
      </p>
      {example.keyPoints && (
        <div className="bg-gradient-to-br from-[rgba(52,152,219,0.08)] to-[rgba(46,204,113,0.05)] p-5 rounded-xl border border-[rgba(52,152,219,0.2)]">
          <strong className="block mb-2 text-[var(--card-text)]">
            ポイント:
          </strong>
          <ul className="list-disc pl-5 space-y-1 text-[var(--card-text)]">
            {example.keyPoints.map((point, idx) => (
              <li key={idx}>{point}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
