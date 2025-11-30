"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import {
  primitiveTypesData,
  arrayTypesData,
  objectTypesData,
  anyTypesData,
  functionTypesData,
  inferenceTypesData,
  assertionTypesData,
  aliasTypesData,
  variableTypesData,
  sectionPracticeQuestions,
  interfaceTypesData,
  classTypesData,
  enumTypesData,
  genericTypesData,
  unionIntersectionTypesData,
  literalTypesData,
  neverTypesData,
  optionalChainingData,
  nonNullAssertionData,
  nullishCoalescingData,
  typeGuardData,
  keyofOperatorData,
  indexSignatureData,
  readonlyData,
  unknownTypeData,
  unknownTypePractice,
  asyncAwaitData,
  typeDefinitionData,
} from "@/data/typescript-data";
import {
  PrimitiveExample,
  ArrayExample,
  ObjectExample,
  AnyExample,
  FunctionExample,
  InferenceExample,
  AssertionExample,
  AliasExample,
  VariableExample,
  PracticeQuestion,
  InterfaceExample,
  ClassExample,
  EnumExample,
  GenericExample,
  UnionIntersectionExample,
  LiteralExample,
  NeverExample,
} from "@/types/typescript";

// Optional Chaining用の型定義
interface OptionalChainingExample {
  id: string;
  type: string;
  name: string;
  description: string;
  example: string;
  correctUsage?: string;
  incorrectUsage?: string;
  explanation: string;
  keyPoints?: string[];
  benefits?: string[];
}

export default function TypeScriptPage() {
  const [activeSection, setActiveSection] = useState<
    | "variables"
    | "primitives"
    | "arrays"
    | "objects"
    | "any"
    | "unknown"
    | "functions"
    | "inference"
    | "assertion"
    | "alias"
    | "interface"
    | "class"
    | "enum"
    | "generic"
    | "unionintersection"
    | "literal"
    | "never"
    | "optional-chaining"
    | "non-null-assertion"
    | "nullish-coalescing"
    | "type-guard"
    | "keyof-operator"
    | "index-signature"
    | "readonly"
    | "async-await"
  >("variables");
  const { elementRef: learningSectionRef, isVisible: learningSectionVisible } =
    useScrollAnimation();
  const { elementRef: practiceSectionRef, isVisible: practiceSectionVisible } =
    useScrollAnimation();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answerResults, setAnswerResults] = useState<
    {
      selected: number;
      correct: number;
      isCorrect: boolean;
      explanation: string;
      question: string;
      code?: string;
      options: string[];
    }[]
  >([]);
  const [showFeedback, setShowFeedback] = useState(false);

  const sections = [
    { id: "variables", title: "変数", data: variableTypesData },
    { id: "primitives", title: "プリミティブ型", data: primitiveTypesData },
    { id: "arrays", title: "配列型", data: arrayTypesData },
    { id: "objects", title: "オブジェクト型", data: objectTypesData },
    { id: "any", title: "any型", data: anyTypesData },
    { id: "unknown", title: "unknown型", data: unknownTypeData },
    { id: "async-await", title: "Async/Await", data: asyncAwaitData },
    { id: "functions", title: "関数型", data: functionTypesData },
    { id: "inference", title: "型推論", data: inferenceTypesData },
    { id: "assertion", title: "型アサーション", data: assertionTypesData },
    { id: "alias", title: "型エイリアス", data: aliasTypesData },
    { id: "interface", title: "インタフェース", data: interfaceTypesData },
    { id: "class", title: "クラス", data: classTypesData },
    { id: "enum", title: "Enum型", data: enumTypesData },
    { id: "generic", title: "ジェネリック型", data: genericTypesData },
    {
      id: "unionintersection",
      title: "Union型・Intersection型",
      data: unionIntersectionTypesData,
    },
    { id: "literal", title: "リテラル型", data: literalTypesData },
    { id: "never", title: "never型", data: neverTypesData },
    {
      id: "optional-chaining",
      title: "Optional Chaining",
      data: optionalChainingData,
    },
    {
      id: "non-null-assertion",
      title: "Non-null Assertion Operator",
      data: nonNullAssertionData,
    },
    {
      id: "nullish-coalescing",
      title: "Nullish Coalescing Operator",
      data: nullishCoalescingData,
    },
    { id: "type-guard", title: "型ガード", data: typeGuardData },
    {
      id: "keyof-operator",
      title: "keyofオペレーター",
      data: keyofOperatorData,
    },
    {
      id: "index-signature",
      title: "インデックス型",
      data: indexSignatureData,
    },
    { id: "readonly", title: "readonly", data: readonlyData },
    {
      id: "type-definition",
      title: "型定義ファイル",
      data: typeDefinitionData,
    },
  ];

  const currentSectionData = sections.find((section) => section.id === activeSection)?.data;

  // 現在のセクションに対応する問題を取得
  const currentSectionQuestions =
    (sectionPracticeQuestions[activeSection] as PracticeQuestion[]) || [];

  // セクションが変更されたときに問題をリセット
  useEffect(() => {
    setCurrentQuestion(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setAnswerResults([]);
    setShowFeedback(false);
  }, [activeSection]);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    const question = currentSectionQuestions[currentQuestion];
    const isCorrect = selectedAnswer === question.correctAnswer;
    setAnswerResults((prev) => [
      ...prev,
      {
        selected: selectedAnswer,
        correct: question.correctAnswer,
        isCorrect,
        explanation: question.explanation,
        question: question.question,
        code: question.code,
        options: question.options,
      },
    ]);
    setShowFeedback(true);
  };

  const handleNextQuestion = () => {
    setShowFeedback(false);
    setSelectedAnswer(null);
    if (currentQuestion < currentSectionQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setAnswerResults([]);
    setShowFeedback(false);
  };

  const renderPrimitiveExample = (example: PrimitiveExample) => (
    <div
      key={example.id}
      className="bg-[var(--section-background)] rounded-lg p-6 mb-6 border border-[var(--border-color)]"
    >
      <h3 className="text-[var(--card-text)] mb-4 text-xl font-semibold">{example.name}</h3>
      <p className="text-[var(--card-text-secondary)] leading-relaxed mb-4">
        {example.description}
      </p>
      <div className="bg-[var(--code-background)] text-[var(--code-text)] p-4 rounded-md mb-4 font-mono text-sm">
        <code>{example.example}</code>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="bg-[#d4edda] text-[#155724] p-4 rounded-md border border-[#c3e6cb]">
          <strong className="block mb-2">正しい値:</strong>{" "}
          <code>{String(example.correctValue)}</code>
        </div>
        <div className="bg-[#f8d7da] text-[#721c24] p-4 rounded-md border border-[#f5c6cb]">
          <strong className="block mb-2">間違った値:</strong>{" "}
          <code>{String(example.incorrectValue)}</code>
        </div>
      </div>
      <p className="mb-4 text-[var(--card-text-secondary)] leading-relaxed italic">
        {example.explanation}
      </p>
      {example.keyPoints && (
        <div className="bg-[var(--section-background)] p-5 rounded-lg mb-4 border-l-4 border-[#3498db]">
          <strong className="block mb-2 text-[var(--card-text)]">ポイント:</strong>
          <ul className="list-none p-0">
            {example.keyPoints.map((point: string, index: number) => (
              <li
                key={index}
                className="py-1.5 pl-6 relative text-[var(--card-text-secondary)] before:content-['✓'] before:absolute before:left-0 before:text-[#27ae60] before:font-bold"
              >
                {point}
              </li>
            ))}
          </ul>
        </div>
      )}
      {example.benefits && (
        <div className="bg-gradient-to-br from-[rgba(52,152,219,0.08)] to-[rgba(46,204,113,0.05)] p-5 rounded-lg mb-4 border border-[rgba(52,152,219,0.2)]">
          <strong className="block mb-2 text-[var(--card-text)]">✨ 利点:</strong>
          <ul className="list-none p-0 space-y-1 text-[var(--card-text)]">
            {example.benefits.map((benefit: string, idx: number) => (
              <li key={idx}>{benefit}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  const renderArrayExample = (example: ArrayExample) => (
    <div
      key={example.id}
      className="bg-[var(--section-background)] rounded-lg p-6 mb-6 border border-[var(--border-color)]"
    >
      <h3 className="text-[var(--card-text)] mb-4 text-xl font-semibold">{example.name}</h3>
      <p className="text-[var(--card-text-secondary)] leading-relaxed mb-4">
        {example.description}
      </p>
      <div className="bg-[var(--code-background)] text-[var(--code-text)] p-4 rounded-md mb-4 font-mono text-sm">
        <strong className="text-[#3498db]">構文:</strong> <code>{example.syntax}</code>
      </div>
      <div className="bg-[var(--code-background)] text-[var(--code-text)] p-4 rounded-md mb-4 font-mono text-sm">
        <pre className="m-0 whitespace-pre-wrap">
          <code>{example.example}</code>
        </pre>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="bg-[#d4edda] text-[#155724] p-4 rounded-md border border-[#c3e6cb]">
          <strong className="block mb-2">正しい使用法:</strong>
          <pre className="m-0 whitespace-pre-wrap font-mono text-xs">
            <code>{example.correctUsage}</code>
          </pre>
        </div>
        <div className="bg-[#f8d7da] text-[#721c24] p-4 rounded-md border border-[#f5c6cb]">
          <strong className="block mb-2">間違った使用法:</strong>
          <pre className="m-0 whitespace-pre-wrap font-mono text-xs">
            <code>{example.incorrectUsage}</code>
          </pre>
        </div>
      </div>
      <p className="mb-4 text-[var(--card-text-secondary)] leading-relaxed italic">
        {example.explanation}
      </p>
      {example.keyPoints && (
        <div className="bg-[var(--section-background)] p-5 rounded-lg mb-4 border-l-4 border-[#3498db]">
          <strong className="block mb-2 text-[var(--card-text)]">ポイント:</strong>
          <ul className="list-none p-0">
            {example.keyPoints.map((point: string, index: number) => (
              <li
                key={index}
                className="py-1.5 pl-6 relative text-[var(--card-text-secondary)] before:content-['✓'] before:absolute before:left-0 before:text-[#27ae60] before:font-bold"
              >
                {point}
              </li>
            ))}
          </ul>
        </div>
      )}
      {example.benefits && (
        <div className="bg-gradient-to-br from-[rgba(52,152,219,0.08)] to-[rgba(46,204,113,0.05)] p-5 rounded-lg mb-4 border border-[rgba(52,152,219,0.2)]">
          <strong className="block mb-2 text-[var(--card-text)]">✨ 利点:</strong>
          <ul className="list-none p-0 space-y-1 text-[var(--card-text)]">
            {example.benefits.map((benefit: string, idx: number) => (
              <li key={idx}>{benefit}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  const renderObjectExample = (example: ObjectExample) => (
    <div
      key={example.id}
      className="bg-[var(--section-background)] rounded-lg p-6 mb-6 border border-[var(--border-color)]"
    >
      <h3>{example.name}</h3>
      <p>{example.description}</p>
      <div className="bg-[var(--code-background)] text-[var(--code-text)] p-4 rounded-md mb-4 font-mono text-sm">
        <strong className="text-[#3498db]">構文:</strong> <code>{example.syntax}</code>
      </div>
      <div className="bg-[var(--code-background)] text-[var(--code-text)] p-4 rounded-md mb-4 font-mono text-sm">
        <pre>
          <code>{example.example}</code>
        </pre>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="bg-[#d4edda] text-[#155724] p-4 rounded-md border border-[#c3e6cb]">
          <strong className="block mb-2">正しい使用法:</strong>
          <pre className="m-0 whitespace-pre-wrap font-mono text-xs">
            <code>{example.correctUsage}</code>
          </pre>
        </div>
        <div className="bg-[#f8d7da] text-[#721c24] p-4 rounded-md border border-[#f5c6cb]">
          <strong>間違った使用法:</strong>
          <pre>
            <code>{example.incorrectUsage}</code>
          </pre>
        </div>
      </div>
      <p className="mb-4 text-[var(--card-text-secondary)] leading-relaxed italic">
        {example.explanation}
      </p>
      {example.keyPoints && (
        <div className="bg-[var(--section-background)] p-5 rounded-lg mb-4 border-l-4 border-[#3498db]">
          <strong className="block mb-2 text-[var(--card-text)]">ポイント:</strong>
          <ul className="list-none p-0">
            {example.keyPoints.map((point: string, index: number) => (
              <li
                key={index}
                className="py-1.5 pl-6 relative text-[var(--card-text-secondary)] before:content-['✓'] before:absolute before:left-0 before:text-[#27ae60] before:font-bold"
              >
                {point}
              </li>
            ))}
          </ul>
        </div>
      )}
      {example.benefits && (
        <div className="bg-gradient-to-br from-[rgba(52,152,219,0.08)] to-[rgba(46,204,113,0.05)] p-5 rounded-lg mb-4 border border-[rgba(52,152,219,0.2)]">
          <strong className="block mb-2 text-[var(--card-text)]">✨ 利点:</strong>
          <ul className="list-none p-0 space-y-1 text-[var(--card-text)]">
            {example.benefits.map((benefit: string, idx: number) => (
              <li key={idx}>{benefit}</li>
            ))}
          </ul>
        </div>
      )}
      {example.optionalProperties && (
        <div className="bg-[var(--section-background)] p-5 rounded-lg mb-4 border-l-4 border-[#3498db]">
          <strong>オプショナルプロパティ:</strong>
          <ul>
            {example.optionalProperties.map((prop: string, index: number) => (
              <li key={index}>{prop}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  const renderAnyExample = (example: AnyExample) => (
    <div
      key={example.id}
      className="bg-[var(--section-background)] rounded-lg p-6 mb-6 border border-[var(--border-color)]"
    >
      <h3>{example.name}</h3>
      <p>{example.description}</p>
      <div className="bg-[var(--code-background)] text-[var(--code-text)] p-4 rounded-md mb-4 font-mono text-sm">
        <pre>
          <code>{example.example}</code>
        </pre>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="bg-[#d4edda] text-[#155724] p-4 rounded-md border border-[#c3e6cb]">
          <strong className="block mb-2">推奨される使用法:</strong>
          <pre className="m-0 whitespace-pre-wrap font-mono text-xs">
            <code>{example.correctUsage}</code>
          </pre>
        </div>
        <div className="bg-[#f8d7da] text-[#721c24] p-4 rounded-md border border-[#f5c6cb]">
          <strong>避けるべき使用法:</strong>
          <pre>
            <code>{example.incorrectUsage}</code>
          </pre>
        </div>
      </div>
      <p className="mb-4 text-[var(--card-text-secondary)] leading-relaxed italic">
        {example.explanation}
      </p>
      {example.keyPoints && (
        <div className="bg-[var(--section-background)] p-5 rounded-lg mb-4 border-l-4 border-[#3498db]">
          <strong>ポイント:</strong>
          <ul>
            {example.keyPoints.map((point: string, index: number) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="bg-[rgba(245,158,11,0.1)] p-5 rounded-lg mb-4 border-l-4 border-[#f59e0b]">
        <strong>⚠️ 注意点:</strong>
        <ul>
          {example.warnings.map((warning: string, index: number) => (
            <li key={index}>{warning}</li>
          ))}
        </ul>
      </div>
      {example.benefits && (
        <div className="bg-gradient-to-br from-[rgba(52,152,219,0.08)] to-[rgba(46,204,113,0.05)] p-5 rounded-lg mb-4 border border-[rgba(52,152,219,0.2)]">
          <strong>✨ 利点:</strong>
          <ul>
            {example.benefits.map((benefit: string, idx: number) => (
              <li key={idx}>{benefit}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  const renderFunctionExample = (example: FunctionExample) => (
    <div
      key={example.id}
      className="bg-[var(--section-background)] rounded-lg p-6 mb-6 border border-[var(--border-color)]"
    >
      <h3>{example.name}</h3>
      <p>{example.description}</p>
      <div className="bg-[var(--code-background)] text-[var(--code-text)] p-4 rounded-md mb-4 font-mono text-sm">
        <strong>構文:</strong> <code>{example.syntax}</code>
      </div>
      <div className="bg-[var(--code-background)] text-[var(--code-text)] p-4 rounded-md mb-4 font-mono text-sm">
        <pre>
          <code>{example.example}</code>
        </pre>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="bg-[#d4edda] text-[#155724] p-4 rounded-md border border-[#c3e6cb]">
          <strong className="block mb-2">正しい使用法:</strong>
          <pre className="m-0 whitespace-pre-wrap font-mono text-xs">
            <code>{example.correctUsage}</code>
          </pre>
        </div>
        <div className="bg-[#f8d7da] text-[#721c24] p-4 rounded-md border border-[#f5c6cb]">
          <strong>間違った使用法:</strong>
          <pre>
            <code>{example.incorrectUsage}</code>
          </pre>
        </div>
      </div>
      <p className="mb-4 text-[var(--card-text-secondary)] leading-relaxed italic">
        {example.explanation}
      </p>
      {example.keyPoints && (
        <div className="bg-[var(--section-background)] p-5 rounded-lg mb-4 border-l-4 border-[#3498db]">
          <strong>ポイント:</strong>
          <ul>
            {example.keyPoints.map((point: string, index: number) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
      )}
      {example.parameters && (
        <div className="bg-[var(--section-background)] p-5 rounded-lg mb-4 border-l-4 border-[#3498db]">
          <strong>📝 パラメータ:</strong>
          <ul>
            {example.parameters.map((param: string, index: number) => (
              <li key={index}>{param}</li>
            ))}
          </ul>
        </div>
      )}
      {example.benefits && (
        <div className="bg-gradient-to-br from-[rgba(52,152,219,0.08)] to-[rgba(46,204,113,0.05)] p-5 rounded-lg mb-4 border border-[rgba(52,152,219,0.2)]">
          <strong>✨ 利点:</strong>
          <ul>
            {example.benefits.map((benefit: string, idx: number) => (
              <li key={idx}>{benefit}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  const renderInferenceExample = (example: InferenceExample) => (
    <div
      key={example.id}
      className="bg-[var(--section-background)] rounded-lg p-6 mb-6 border border-[var(--border-color)]"
    >
      <h3>{example.name}</h3>
      <p>{example.description}</p>
      <div className="bg-[var(--code-background)] text-[var(--code-text)] p-4 rounded-md mb-4 font-mono text-sm">
        <pre>
          <code>{example.example}</code>
        </pre>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="bg-[#d4edda] text-[#155724] p-4 rounded-md border border-[#c3e6cb]">
          <strong className="block mb-2">正しい使用法:</strong>
          <pre className="m-0 whitespace-pre-wrap font-mono text-xs">
            <code>{example.correctUsage}</code>
          </pre>
        </div>
        <div className="bg-[#f8d7da] text-[#721c24] p-4 rounded-md border border-[#f5c6cb]">
          <strong>間違った使用法:</strong>
          <pre>
            <code>{example.incorrectUsage}</code>
          </pre>
        </div>
      </div>
      <p className="mb-4 text-[var(--card-text-secondary)] leading-relaxed italic">
        {example.explanation}
      </p>
      {example.keyPoints && (
        <div className="bg-[var(--section-background)] p-5 rounded-lg mb-4 border-l-4 border-[#3498db]">
          <strong>ポイント:</strong>
          <ul>
            {example.keyPoints.map((point: string, index: number) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
      )}
      {example.benefits && (
        <div className="bg-gradient-to-br from-[rgba(52,152,219,0.08)] to-[rgba(46,204,113,0.05)] p-5 rounded-lg mb-4 border border-[rgba(52,152,219,0.2)]">
          <strong>✨ 利点:</strong>
          <ul>
            {example.benefits.map((benefit: string, idx: number) => (
              <li key={idx}>{benefit}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  const renderAssertionExample = (example: AssertionExample) => (
    <div
      key={example.id}
      className="bg-[var(--section-background)] rounded-lg p-6 mb-6 border border-[var(--border-color)]"
    >
      <h3>{example.name}</h3>
      <p>{example.description}</p>
      <div className="bg-[var(--code-background)] text-[var(--code-text)] p-4 rounded-md mb-4 font-mono text-sm">
        <pre>
          <code>{example.example}</code>
        </pre>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="bg-[#d4edda] text-[#155724] p-4 rounded-md border border-[#c3e6cb]">
          <strong className="block mb-2">正しい使用法:</strong>
          <pre className="m-0 whitespace-pre-wrap font-mono text-xs">
            <code>{example.correctUsage}</code>
          </pre>
        </div>
        <div className="bg-[#f8d7da] text-[#721c24] p-4 rounded-md border border-[#f5c6cb]">
          <strong>間違った使用法:</strong>
          <pre>
            <code>{example.incorrectUsage}</code>
          </pre>
        </div>
      </div>
      <p className="mb-4 text-[var(--card-text-secondary)] leading-relaxed italic">
        {example.explanation}
      </p>
      {example.keyPoints && (
        <div className="bg-[var(--section-background)] p-5 rounded-lg mb-4 border-l-4 border-[#3498db]">
          <strong>ポイント:</strong>
          <ul>
            {example.keyPoints.map((point: string, index: number) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="bg-[rgba(245,158,11,0.1)] p-5 rounded-lg mb-4 border-l-4 border-[#f59e0b]">
        <strong>⚠️ 注意点:</strong>
        <ul>
          {example.cautions.map((caution: string, index: number) => (
            <li key={index}>{caution}</li>
          ))}
        </ul>
      </div>
      {example.benefits && (
        <div className="bg-gradient-to-br from-[rgba(52,152,219,0.08)] to-[rgba(46,204,113,0.05)] p-5 rounded-lg mb-4 border border-[rgba(52,152,219,0.2)]">
          <strong>✨ 利点:</strong>
          <ul>
            {example.benefits.map((benefit: string, idx: number) => (
              <li key={idx}>{benefit}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  const renderAliasExample = (example: AliasExample) => (
    <div
      key={example.id}
      className="bg-[var(--section-background)] rounded-lg p-6 mb-6 border border-[var(--border-color)]"
    >
      <h3>{example.name}</h3>
      <p>{example.description}</p>
      <div className="bg-[var(--code-background)] text-[var(--code-text)] p-4 rounded-md mb-4 font-mono text-sm">
        <pre>
          <code>{example.example}</code>
        </pre>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="bg-[#d4edda] text-[#155724] p-4 rounded-md border border-[#c3e6cb]">
          <strong className="block mb-2">正しい使用法:</strong>
          <pre className="m-0 whitespace-pre-wrap font-mono text-xs">
            <code>{example.correctUsage}</code>
          </pre>
        </div>
        <div className="bg-[#f8d7da] text-[#721c24] p-4 rounded-md border border-[#f5c6cb]">
          <strong>間違った使用法:</strong>
          <pre>
            <code>{example.incorrectUsage}</code>
          </pre>
        </div>
      </div>
      <p className="mb-4 text-[var(--card-text-secondary)] leading-relaxed italic">
        {example.explanation}
      </p>
      {example.keyPoints && (
        <div className="bg-[var(--section-background)] p-5 rounded-lg mb-4 border-l-4 border-[#3498db]">
          <strong>ポイント:</strong>
          <ul>
            {example.keyPoints.map((point: string, index: number) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
      )}
      {example.benefits && (
        <div className="bg-gradient-to-br from-[rgba(52,152,219,0.08)] to-[rgba(46,204,113,0.05)] p-5 rounded-lg mb-4 border border-[rgba(52,152,219,0.2)]">
          <strong>✨ 利点:</strong>
          <ul>
            {example.benefits.map((benefit: string, idx: number) => (
              <li key={idx}>{benefit}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  const renderVariableExample = (example: VariableExample) => (
    <div
      key={example.id}
      className="bg-[var(--section-background)] rounded-lg p-6 mb-6 border border-[var(--border-color)]"
    >
      <h3>{example.name}</h3>
      <p>{example.description}</p>
      {example.example && (
        <div className="bg-[var(--code-background)] text-[var(--code-text)] p-4 rounded-md mb-4 font-mono text-sm">
          <pre>
            <code>{example.example}</code>
          </pre>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="bg-[#d4edda] text-[#155724] p-4 rounded-md border border-[#c3e6cb]">
          <strong className="block mb-2">正しい使用法:</strong>
          <pre className="m-0 whitespace-pre-wrap font-mono text-xs">
            <code>{example.correctUsage}</code>
          </pre>
        </div>
        <div className="bg-[#f8d7da] text-[#721c24] p-4 rounded-md border border-[#f5c6cb]">
          <strong>間違った使用法:</strong>
          <pre>
            <code>{example.incorrectUsage}</code>
          </pre>
        </div>
      </div>
      <p className="mb-4 text-[var(--card-text-secondary)] leading-relaxed italic">
        {example.explanation}
      </p>
      {example.keyPoints && (
        <div className="bg-[var(--section-background)] p-5 rounded-lg mb-4 border-l-4 border-[#3498db]">
          <strong>ポイント:</strong>
          <ul>
            {example.keyPoints.map((point: string, index: number) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
      )}
      {example.tips && (
        <div className="bg-gradient-to-br from-[rgba(52,152,219,0.08)] to-[rgba(46,204,113,0.05)] p-5 rounded-lg mb-4 border border-[rgba(52,152,219,0.2)]">
          <strong>💡 Tips:</strong>
          <ul>
            {example.tips.map((tip: string, index: number) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      )}
      {example.benefits && (
        <div className="bg-gradient-to-br from-[rgba(52,152,219,0.08)] to-[rgba(46,204,113,0.05)] p-5 rounded-lg mb-4 border border-[rgba(52,152,219,0.2)]">
          <strong>✨ 利点:</strong>
          <ul>
            {example.benefits.map((benefit: string, idx: number) => (
              <li key={idx}>{benefit}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  const renderInterfaceExample = (example: InterfaceExample) => (
    <div
      key={example.id}
      className="bg-[var(--section-background)] rounded-lg p-6 mb-6 border border-[var(--border-color)]"
    >
      <h3>{example.name}</h3>
      <p>{example.description}</p>
      <div className="bg-[var(--code-background)] text-[var(--code-text)] p-4 rounded-md mb-4 font-mono text-sm">
        <pre>
          <code>{example.example}</code>
        </pre>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="bg-[#d4edda] text-[#155724] p-4 rounded-md border border-[#c3e6cb]">
          <strong className="block mb-2">正しい使用法:</strong>
          <pre className="m-0 whitespace-pre-wrap font-mono text-xs">
            <code>{example.correctUsage}</code>
          </pre>
        </div>
        <div className="bg-[#f8d7da] text-[#721c24] p-4 rounded-md border border-[#f5c6cb]">
          <strong>間違った使用法:</strong>
          <pre>
            <code>{example.incorrectUsage}</code>
          </pre>
        </div>
      </div>
      <p className="mb-4 text-[var(--card-text-secondary)] leading-relaxed italic">
        {example.explanation}
      </p>
      {example.keyPoints && (
        <div className="bg-[var(--section-background)] p-5 rounded-lg mb-4 border-l-4 border-[#3498db]">
          <strong>ポイント:</strong>
          <ul>
            {example.keyPoints.map((point: string, index: number) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
      )}
      {example.tips && (
        <div className="bg-gradient-to-br from-[rgba(52,152,219,0.08)] to-[rgba(46,204,113,0.05)] p-5 rounded-lg mb-4 border border-[rgba(52,152,219,0.2)]">
          <strong>💡 Tips:</strong>
          <ul>
            {example.tips.map((tip: string, index: number) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      )}
      {example.benefits && (
        <div className="bg-gradient-to-br from-[rgba(52,152,219,0.08)] to-[rgba(46,204,113,0.05)] p-5 rounded-lg mb-4 border border-[rgba(52,152,219,0.2)]">
          <strong>✨ 利点:</strong>
          <ul>
            {example.benefits.map((benefit: string, idx: number) => (
              <li key={idx}>{benefit}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  const renderClassExample = (example: ClassExample) => (
    <div
      key={example.id}
      className="bg-[var(--section-background)] rounded-lg p-6 mb-6 border border-[var(--border-color)]"
    >
      <h3>{example.name}</h3>
      <p>{example.description}</p>
      <div className="bg-[var(--code-background)] text-[var(--code-text)] p-4 rounded-md mb-4 font-mono text-sm">
        <pre>
          <code>{example.example}</code>
        </pre>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="bg-[#d4edda] text-[#155724] p-4 rounded-md border border-[#c3e6cb]">
          <strong className="block mb-2">正しい使用法:</strong>
          <pre className="m-0 whitespace-pre-wrap font-mono text-xs">
            <code>{example.correctUsage}</code>
          </pre>
        </div>
        <div className="bg-[#f8d7da] text-[#721c24] p-4 rounded-md border border-[#f5c6cb]">
          <strong>間違った使用法:</strong>
          <pre>
            <code>{example.incorrectUsage}</code>
          </pre>
        </div>
      </div>
      <p className="mb-4 text-[var(--card-text-secondary)] leading-relaxed italic">
        {example.explanation}
      </p>
      {example.keyPoints && (
        <div className="bg-[var(--section-background)] p-5 rounded-lg mb-4 border-l-4 border-[#3498db]">
          <strong>ポイント:</strong>
          <ul>
            {example.keyPoints.map((point: string, index: number) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
      )}
      {example.tips && (
        <div className="bg-gradient-to-br from-[rgba(52,152,219,0.08)] to-[rgba(46,204,113,0.05)] p-5 rounded-lg mb-4 border border-[rgba(52,152,219,0.2)]">
          <strong>💡 Tips:</strong>
          <ul>
            {example.tips.map((tip: string, index: number) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      )}
      {example.benefits && (
        <div className="bg-gradient-to-br from-[rgba(52,152,219,0.08)] to-[rgba(46,204,113,0.05)] p-5 rounded-lg mb-4 border border-[rgba(52,152,219,0.2)]">
          <strong>✨ 利点:</strong>
          <ul>
            {example.benefits.map((benefit: string, idx: number) => (
              <li key={idx}>{benefit}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  const renderEnumExample = (example: EnumExample) => (
    <div
      key={example.id}
      className="bg-[var(--section-background)] rounded-lg p-6 mb-6 border border-[var(--border-color)]"
    >
      <h3>{example.name}</h3>
      <p>{example.description}</p>
      <div className="bg-[var(--code-background)] text-[var(--code-text)] p-4 rounded-md mb-4 font-mono text-sm">
        <pre>
          <code>{example.example}</code>
        </pre>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="bg-[#d4edda] text-[#155724] p-4 rounded-md border border-[#c3e6cb]">
          <strong className="block mb-2">正しい使用法:</strong>
          <pre className="m-0 whitespace-pre-wrap font-mono text-xs">
            <code>{example.correctUsage}</code>
          </pre>
        </div>
        <div className="bg-[#f8d7da] text-[#721c24] p-4 rounded-md border border-[#f5c6cb]">
          <strong>間違った使用法:</strong>
          <pre>
            <code>{example.incorrectUsage}</code>
          </pre>
        </div>
      </div>
      <p className="mb-4 text-[var(--card-text-secondary)] leading-relaxed italic">
        {example.explanation}
      </p>
      {example.keyPoints && (
        <div className="bg-[var(--section-background)] p-5 rounded-lg mb-4 border-l-4 border-[#3498db]">
          <strong>ポイント:</strong>
          <ul>
            {example.keyPoints.map((point: string, index: number) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
      )}
      {example.tips && (
        <div className="bg-gradient-to-br from-[rgba(52,152,219,0.08)] to-[rgba(46,204,113,0.05)] p-5 rounded-lg mb-4 border border-[rgba(52,152,219,0.2)]">
          <strong>💡 Tips:</strong>
          <ul>
            {example.tips.map((tip: string, index: number) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      )}
      {example.benefits && (
        <div className="bg-gradient-to-br from-[rgba(52,152,219,0.08)] to-[rgba(46,204,113,0.05)] p-5 rounded-lg mb-4 border border-[rgba(52,152,219,0.2)]">
          <strong>✨ 利点:</strong>
          <ul>
            {example.benefits.map((benefit: string, idx: number) => (
              <li key={idx}>{benefit}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  const renderGenericExample = (example: GenericExample) => (
    <div
      key={example.id}
      className="bg-[var(--section-background)] rounded-lg p-6 mb-6 border border-[var(--border-color)]"
    >
      <h3>{example.name}</h3>
      <p>{example.description}</p>
      <div className="bg-[var(--code-background)] text-[var(--code-text)] p-4 rounded-md mb-4 font-mono text-sm">
        <pre>
          <code>{example.example}</code>
        </pre>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="bg-[#d4edda] text-[#155724] p-4 rounded-md border border-[#c3e6cb]">
          <strong className="block mb-2">正しい使用法:</strong>
          <pre className="m-0 whitespace-pre-wrap font-mono text-xs">
            <code>{example.correctUsage}</code>
          </pre>
        </div>
        <div className="bg-[#f8d7da] text-[#721c24] p-4 rounded-md border border-[#f5c6cb]">
          <strong>間違った使用法:</strong>
          <pre>
            <code>{example.incorrectUsage}</code>
          </pre>
        </div>
      </div>
      <p className="mb-4 text-[var(--card-text-secondary)] leading-relaxed italic">
        {example.explanation}
      </p>
      {example.keyPoints && (
        <div className="bg-[var(--section-background)] p-5 rounded-lg mb-4 border-l-4 border-[#3498db]">
          <strong>ポイント:</strong>
          <ul>
            {example.keyPoints.map((point: string, index: number) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
      )}
      {example.tips && (
        <div className="bg-gradient-to-br from-[rgba(52,152,219,0.08)] to-[rgba(46,204,113,0.05)] p-5 rounded-lg mb-4 border border-[rgba(52,152,219,0.2)]">
          <strong>💡 Tips:</strong>
          <ul>
            {example.tips.map((tip: string, index: number) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      )}
      {example.benefits && (
        <div className="bg-gradient-to-br from-[rgba(52,152,219,0.08)] to-[rgba(46,204,113,0.05)] p-5 rounded-lg mb-4 border border-[rgba(52,152,219,0.2)]">
          <strong>✨ 利点:</strong>
          <ul>
            {example.benefits.map((benefit: string, idx: number) => (
              <li key={idx}>{benefit}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  const renderUnionIntersectionExample = (example: UnionIntersectionExample) => (
    <div
      key={example.id}
      className="bg-[var(--section-background)] rounded-lg p-6 mb-6 border border-[var(--border-color)]"
    >
      <h3>{example.name}</h3>
      <p>{example.description}</p>
      <div className="bg-[var(--code-background)] text-[var(--code-text)] p-4 rounded-md mb-4 font-mono text-sm">
        <pre>
          <code>{example.example}</code>
        </pre>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="bg-[#d4edda] text-[#155724] p-4 rounded-md border border-[#c3e6cb]">
          <strong>正しい使用法:</strong>
          <pre>
            <code>{example.correctUsage}</code>
          </pre>
        </div>
        <div className="bg-[#f8d7da] text-[#721c24] p-4 rounded-md border border-[#f5c6cb]">
          <strong>間違った使用法:</strong>
          <pre>
            <code>{example.incorrectUsage}</code>
          </pre>
        </div>
      </div>
      <p className="mb-4 text-[var(--card-text-secondary)] leading-relaxed italic">
        {example.explanation}
      </p>
      {example.keyPoints && (
        <div className="bg-[var(--section-background)] p-5 rounded-lg mb-4 border-l-4 border-[#3498db]">
          <strong>ポイント:</strong>
          <ul>
            {example.keyPoints.map((point: string, index: number) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
      )}
      {example.tips && (
        <div className="bg-gradient-to-br from-[rgba(52,152,219,0.08)] to-[rgba(46,204,113,0.05)] p-5 rounded-lg mb-4 border border-[rgba(52,152,219,0.2)]">
          <strong>💡 Tips:</strong>
          <ul>
            {example.tips.map((tip: string, index: number) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      )}
      {example.benefits && (
        <div className="bg-gradient-to-br from-[rgba(52,152,219,0.08)] to-[rgba(46,204,113,0.05)] p-5 rounded-lg mb-4 border border-[rgba(52,152,219,0.2)]">
          <strong>✨ 利点:</strong>
          <ul>
            {example.benefits.map((benefit: string, idx: number) => (
              <li key={idx}>{benefit}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  const renderLiteralExample = (example: LiteralExample) => (
    <div
      key={example.id}
      className="bg-[var(--section-background)] rounded-lg p-6 mb-6 border border-[var(--border-color)]"
    >
      <h3>{example.name}</h3>
      <p>{example.description}</p>
      <div className="bg-[var(--code-background)] text-[var(--code-text)] p-4 rounded-md mb-4 font-mono text-sm">
        <pre>
          <code>{example.example}</code>
        </pre>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="bg-[#d4edda] text-[#155724] p-4 rounded-md border border-[#c3e6cb]">
          <strong>正しい使用法:</strong>
          <pre>
            <code>{example.correctUsage}</code>
          </pre>
        </div>
        <div className="bg-[#f8d7da] text-[#721c24] p-4 rounded-md border border-[#f5c6cb]">
          <strong>間違った使用法:</strong>
          <pre>
            <code>{example.incorrectUsage}</code>
          </pre>
        </div>
      </div>
      <p className="mb-4 text-[var(--card-text-secondary)] leading-relaxed italic">
        {example.explanation}
      </p>
      {example.keyPoints && (
        <div className="bg-[var(--section-background)] p-5 rounded-lg mb-4 border-l-4 border-[#3498db]">
          <strong>ポイント:</strong>
          <ul>
            {example.keyPoints.map((point: string, index: number) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
      )}
      {example.tips && (
        <div className="bg-gradient-to-br from-[rgba(52,152,219,0.08)] to-[rgba(46,204,113,0.05)] p-5 rounded-lg mb-4 border border-[rgba(52,152,219,0.2)]">
          <strong>💡 Tips:</strong>
          <ul>
            {example.tips.map((tip: string, index: number) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      )}
      {example.benefits && (
        <div className="bg-gradient-to-br from-[rgba(52,152,219,0.08)] to-[rgba(46,204,113,0.05)] p-5 rounded-lg mb-4 border border-[rgba(52,152,219,0.2)]">
          <strong>✨ 利点:</strong>
          <ul>
            {example.benefits.map((benefit: string, idx: number) => (
              <li key={idx}>{benefit}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  const renderOptionalChainingExample = (example: OptionalChainingExample) => (
    <div
      key={example.id}
      className="bg-[var(--section-background)] rounded-lg p-6 mb-6 border border-[var(--border-color)]"
    >
      <h3>{example.name}</h3>
      <p>{example.description}</p>
      <div className="bg-[var(--code-background)] text-[var(--code-text)] p-4 rounded-md mb-4 font-mono text-sm">
        <pre>
          <code>{example.example}</code>
        </pre>
      </div>
      {example.correctUsage && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="bg-[#d4edda] text-[#155724] p-4 rounded-md border border-[#c3e6cb]">
            <strong>正しい使用法:</strong>
            <pre>
              <code>{example.correctUsage}</code>
            </pre>
          </div>
          <div className="bg-[#f8d7da] text-[#721c24] p-4 rounded-md border border-[#f5c6cb]">
            <strong>間違った使用法:</strong>
            <pre>
              <code>{example.incorrectUsage}</code>
            </pre>
          </div>
        </div>
      )}
      <p className="mb-4 text-[var(--card-text-secondary)] leading-relaxed italic">
        {example.explanation}
      </p>
      {example.keyPoints && (
        <div className="bg-[var(--section-background)] p-5 rounded-lg mb-4 border-l-4 border-[#3498db]">
          <strong>ポイント:</strong>
          <ul>
            {example.keyPoints.map((point: string, index: number) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
      )}
      {example.benefits && (
        <div className="bg-gradient-to-br from-[rgba(52,152,219,0.08)] to-[rgba(46,204,113,0.05)] p-5 rounded-lg mb-4 border border-[rgba(52,152,219,0.2)]">
          <strong>✨ 利点:</strong>
          <ul>
            {example.benefits.map((benefit: string, idx: number) => (
              <li key={idx}>{benefit}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  const renderTypeGuardExample = (example: OptionalChainingExample) => (
    <div
      key={example.id}
      className="bg-[var(--section-background)] rounded-lg p-6 mb-6 border border-[var(--border-color)]"
    >
      <h3>{example.name}</h3>
      <p>{example.description}</p>
      <div className="bg-[var(--code-background)] text-[var(--code-text)] p-4 rounded-md mb-4 font-mono text-sm">
        <pre>
          <code>{example.example}</code>
        </pre>
      </div>
      {example.correctUsage && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="bg-[#d4edda] text-[#155724] p-4 rounded-md border border-[#c3e6cb]">
            <strong>正しい使用法:</strong>
            <pre>
              <code>{example.correctUsage}</code>
            </pre>
          </div>
          <div className="bg-[#f8d7da] text-[#721c24] p-4 rounded-md border border-[#f5c6cb]">
            <strong>間違った使用法:</strong>
            <pre>
              <code>{example.incorrectUsage}</code>
            </pre>
          </div>
        </div>
      )}
      <p className="mb-4 text-[var(--card-text-secondary)] leading-relaxed italic">
        {example.explanation}
      </p>
      {example.keyPoints && (
        <div className="bg-[var(--section-background)] p-5 rounded-lg mb-4 border-l-4 border-[#3498db]">
          <strong>ポイント:</strong>
          <ul>
            {example.keyPoints.map((point: string, index: number) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
      )}
      {example.benefits && (
        <div className="bg-gradient-to-br from-[rgba(52,152,219,0.08)] to-[rgba(46,204,113,0.05)] p-5 rounded-lg mb-4 border border-[rgba(52,152,219,0.2)]">
          <strong>✨ 利点:</strong>
          <ul>
            {example.benefits.map((benefit: string, idx: number) => (
              <li key={idx}>{benefit}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  const renderKeyofOperatorExample = (example: OptionalChainingExample) => (
    <div
      key={example.id}
      className="bg-[var(--section-background)] rounded-lg p-6 mb-6 border border-[var(--border-color)]"
    >
      <h3>{example.name}</h3>
      <p>{example.description}</p>
      <div className="bg-[var(--code-background)] text-[var(--code-text)] p-4 rounded-md mb-4 font-mono text-sm">
        <pre>
          <code>{example.example}</code>
        </pre>
      </div>
      {example.correctUsage && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="bg-[#d4edda] text-[#155724] p-4 rounded-md border border-[#c3e6cb]">
            <strong>正しい使用法:</strong>
            <pre>
              <code>{example.correctUsage}</code>
            </pre>
          </div>
          <div className="bg-[#f8d7da] text-[#721c24] p-4 rounded-md border border-[#f5c6cb]">
            <strong>間違った使用法:</strong>
            <pre>
              <code>{example.incorrectUsage}</code>
            </pre>
          </div>
        </div>
      )}
      <p className="mb-4 text-[var(--card-text-secondary)] leading-relaxed italic">
        {example.explanation}
      </p>
      {example.keyPoints && (
        <div className="bg-[var(--section-background)] p-5 rounded-lg mb-4 border-l-4 border-[#3498db]">
          <strong>ポイント:</strong>
          <ul>
            {example.keyPoints.map((point: string, index: number) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
      )}
      {example.benefits && (
        <div className="bg-gradient-to-br from-[rgba(52,152,219,0.08)] to-[rgba(46,204,113,0.05)] p-5 rounded-lg mb-4 border border-[rgba(52,152,219,0.2)]">
          <strong>✨ 利点:</strong>
          <ul>
            {example.benefits.map((benefit: string, idx: number) => (
              <li key={idx}>{benefit}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  const renderIndexSignatureExample = (example: OptionalChainingExample) => (
    <div
      key={example.id}
      className="bg-[var(--section-background)] rounded-lg p-6 mb-6 border border-[var(--border-color)]"
    >
      <h3>{example.name}</h3>
      <p>{example.description}</p>
      <div className="bg-[var(--code-background)] text-[var(--code-text)] p-4 rounded-md mb-4 font-mono text-sm">
        <pre>
          <code>{example.example}</code>
        </pre>
      </div>
      {example.correctUsage && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="bg-[#d4edda] text-[#155724] p-4 rounded-md border border-[#c3e6cb]">
            <strong>正しい使用法:</strong>
            <pre>
              <code>{example.correctUsage}</code>
            </pre>
          </div>
          <div className="bg-[#f8d7da] text-[#721c24] p-4 rounded-md border border-[#f5c6cb]">
            <strong>間違った使用法:</strong>
            <pre>
              <code>{example.incorrectUsage}</code>
            </pre>
          </div>
        </div>
      )}
      <p className="mb-4 text-[var(--card-text-secondary)] leading-relaxed italic">
        {example.explanation}
      </p>
      {example.keyPoints && (
        <div className="bg-[var(--section-background)] p-5 rounded-lg mb-4 border-l-4 border-[#3498db]">
          <strong>ポイント:</strong>
          <ul>
            {example.keyPoints.map((point: string, index: number) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
      )}
      {example.benefits && (
        <div className="bg-gradient-to-br from-[rgba(52,152,219,0.08)] to-[rgba(46,204,113,0.05)] p-5 rounded-lg mb-4 border border-[rgba(52,152,219,0.2)]">
          <strong>✨ 利点:</strong>
          <ul>
            {example.benefits.map((benefit: string, idx: number) => (
              <li key={idx}>{benefit}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  const renderReadonlyExample = (example: OptionalChainingExample) => (
    <div
      key={example.id}
      className="bg-[var(--section-background)] rounded-lg p-6 mb-6 border border-[var(--border-color)]"
    >
      <h3>{example.name}</h3>
      <p>{example.description}</p>
      <div className="bg-[var(--code-background)] text-[var(--code-text)] p-4 rounded-md mb-4 font-mono text-sm">
        <pre>
          <code>{example.example}</code>
        </pre>
      </div>
      {example.correctUsage && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="bg-[#d4edda] text-[#155724] p-4 rounded-md border border-[#c3e6cb]">
            <strong>正しい使用法:</strong>
            <pre>
              <code>{example.correctUsage}</code>
            </pre>
          </div>
          <div className="bg-[#f8d7da] text-[#721c24] p-4 rounded-md border border-[#f5c6cb]">
            <strong>間違った使用法:</strong>
            <pre>
              <code>{example.incorrectUsage}</code>
            </pre>
          </div>
        </div>
      )}
      <p className="mb-4 text-[var(--card-text-secondary)] leading-relaxed italic">
        {example.explanation}
      </p>
      {example.keyPoints && (
        <div className="bg-[var(--section-background)] p-5 rounded-lg mb-4 border-l-4 border-[#3498db]">
          <strong>ポイント:</strong>
          <ul>
            {example.keyPoints.map((point: string, index: number) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
      )}
      {example.benefits && (
        <div className="bg-gradient-to-br from-[rgba(52,152,219,0.08)] to-[rgba(46,204,113,0.05)] p-5 rounded-lg mb-4 border border-[rgba(52,152,219,0.2)]">
          <strong>✨ 利点:</strong>
          <ul>
            {example.benefits.map((benefit: string, idx: number) => (
              <li key={idx}>{benefit}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  const renderExamples = () => {
    if (
      !currentSectionData ||
      !Array.isArray(currentSectionData.examples) ||
      currentSectionData.examples.length === 0
    ) {
      return <p>このセクションには例がありません。</p>;
    }
    switch (activeSection) {
      case "variables":
        return (currentSectionData.examples as VariableExample[]).map((example) =>
          renderVariableExample(example)
        );
      case "primitives":
        return (currentSectionData.examples as PrimitiveExample[]).map((example) =>
          renderPrimitiveExample(example)
        );
      case "arrays":
        return (currentSectionData.examples as ArrayExample[]).map((example) =>
          renderArrayExample(example)
        );
      case "objects":
        return (currentSectionData.examples as ObjectExample[]).map((example) =>
          renderObjectExample(example)
        );
      case "any":
        return (currentSectionData.examples as AnyExample[]).map((example) =>
          renderAnyExample(example)
        );
      case "unknown":
        return (currentSectionData.examples as AnyExample[]).map((example) =>
          renderAnyExample(example)
        );
      case "functions":
        return (currentSectionData.examples as FunctionExample[]).map((example) =>
          renderFunctionExample(example)
        );
      case "inference":
        return (currentSectionData.examples as InferenceExample[]).map((example) =>
          renderInferenceExample(example)
        );
      case "assertion":
        return (currentSectionData.examples as AssertionExample[]).map((example) =>
          renderAssertionExample(example)
        );
      case "alias":
        return (currentSectionData.examples as AliasExample[]).map((example) =>
          renderAliasExample(example)
        );
      case "interface":
        return (currentSectionData.examples as InterfaceExample[]).map((example) =>
          renderInterfaceExample(example)
        );
      case "class":
        return (currentSectionData.examples as ClassExample[]).map((example) =>
          renderClassExample(example)
        );
      case "enum":
        return (currentSectionData.examples as EnumExample[]).map((example) =>
          renderEnumExample(example)
        );
      case "generic":
        return (currentSectionData.examples as GenericExample[]).map((example) =>
          renderGenericExample(example)
        );
      case "unionintersection":
        return (currentSectionData.examples as UnionIntersectionExample[]).map((example) =>
          renderUnionIntersectionExample(example)
        );
      case "literal":
        return (currentSectionData.examples as LiteralExample[]).map((example) =>
          renderLiteralExample(example)
        );
      case "never":
        return (currentSectionData.examples as NeverExample[]).map((example) => (
          <div
            key={example.title}
            className="bg-[var(--section-background)] rounded-lg p-6 mb-6 border border-[var(--border-color)]"
          >
            <h3>{example.title}</h3>
            <p>{example.description}</p>
            <div className="bg-[var(--code-background)] text-[var(--code-text)] p-4 rounded-md mb-4 font-mono text-sm">
              <pre>
                <code>{example.code}</code>
              </pre>
            </div>
            {example.points && (
              <div className="bg-[var(--section-background)] p-5 rounded-lg mb-4 border-l-4 border-[#3498db]">
                <strong>ポイント:</strong>
                <ul>
                  {example.points.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ));
      case "optional-chaining":
        return (currentSectionData.examples as OptionalChainingExample[]).map((example) =>
          renderOptionalChainingExample(example)
        );
      case "non-null-assertion":
        return (currentSectionData.examples as OptionalChainingExample[]).map((example) =>
          renderTypeGuardExample(example)
        );
      case "nullish-coalescing":
        return (currentSectionData.examples as OptionalChainingExample[]).map((example) =>
          renderOptionalChainingExample(example)
        );
      case "type-guard":
        return (currentSectionData.examples as OptionalChainingExample[]).map((example) =>
          renderTypeGuardExample(example)
        );
      case "keyof-operator":
        return (currentSectionData.examples as OptionalChainingExample[]).map((example) =>
          renderKeyofOperatorExample(example)
        );
      case "index-signature":
        return (currentSectionData.examples as OptionalChainingExample[]).map((example) =>
          renderIndexSignatureExample(example)
        );
      case "readonly":
        return (currentSectionData.examples as OptionalChainingExample[]).map((example) =>
          renderReadonlyExample(example)
        );
      case "async-await":
        return (currentSectionData.examples as OptionalChainingExample[]).map((example) =>
          renderOptionalChainingExample(example)
        );
      default:
        return <p>このセクションには例がありません。</p>;
    }
  };

  // 練習問題のセクションにunknown型を追加
  if (!("unknown" in sectionPracticeQuestions)) {
    (sectionPracticeQuestions as Record<string, PracticeQuestion[]>).unknown =
      unknownTypePractice as PracticeQuestion[];
  }

  return (
    <div className="flex flex-col items-center min-h-screen p-10 px-5 font-sans leading-relaxed max-w-[1200px] mx-auto py-4 px-8 md:p-5 md:px-4">
      <main className="max-w-[1000px] w-full flex flex-col gap-10">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold m-0 mb-4 text-foreground md:text-3xl">
            TypeScript 学習
          </h1>
          <p className="text-lg text-foreground opacity-80 m-0 md:text-base">
            TypeScriptの学習サイトです。
          </p>
        </header>

        {/* セクション切り替え */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {sections.map((section) => (
            <button
              key={section.id}
              className={`px-8 py-4 border-2 rounded-lg cursor-pointer text-lg font-semibold transition-all duration-300 ${
                activeSection === section.id
                  ? "border-[#3498db] bg-[#3498db] text-white shadow-[0_4px_12px_rgba(52,152,219,0.3)]"
                  : "border-[#3498db] bg-[var(--card-background)] text-[#3498db] hover:bg-[#3498db] hover:text-white hover:-translate-y-0.5"
              }`}
              onClick={() =>
                setActiveSection(
                  section.id as
                    | "variables"
                    | "primitives"
                    | "arrays"
                    | "objects"
                    | "any"
                    | "unknown"
                    | "functions"
                    | "inference"
                    | "assertion"
                    | "alias"
                    | "interface"
                    | "class"
                    | "enum"
                    | "generic"
                    | "unionintersection"
                    | "literal"
                    | "never"
                    | "optional-chaining"
                    | "non-null-assertion"
                    | "nullish-coalescing"
                    | "type-guard"
                    | "keyof-operator"
                    | "index-signature"
                    | "readonly"
                    | "async-await"
                )
              }
            >
              {section.title}
            </button>
          ))}
        </div>

        {/* 学習セクション */}
        <section
          key={activeSection}
          ref={learningSectionRef}
          className={`bg-[var(--card-background)] rounded-xl p-8 mb-12 shadow-[0_4px_6px_var(--shadow-color)] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${learningSectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <h2 className="text-[var(--card-text)] mb-4 text-3xl font-bold">
            {currentSectionData?.title}
          </h2>
          <p className="text-lg leading-relaxed text-[var(--card-text-secondary)] mb-8">
            {currentSectionData?.description}
          </p>

          {(currentSectionData as import("@/types/typescript").LearningSection)?.benefits && (
            <div className="bg-gradient-to-br from-[rgba(52,152,219,0.08)] to-[rgba(46,204,113,0.05)] p-5 rounded-lg mb-6 border border-[rgba(52,152,219,0.2)]">
              <strong className="block mb-2 text-[var(--card-text)]">
                ✨ このセクションの利点:
              </strong>
              <ul className="list-none p-0 space-y-1 text-[var(--card-text)]">
                {(currentSectionData as import("@/types/typescript").LearningSection).benefits?.map(
                  (benefit: string, idx: number) => (
                    <li key={idx}>{benefit}</li>
                  )
                )}
              </ul>
            </div>
          )}

          <div className="bg-[var(--section-background)] p-6 rounded-lg mb-8 border-l-4 border-[#3498db]">
            <h3 className="text-[var(--card-text)] mb-4 text-xl font-semibold">重要なポイント</h3>
            <ul className="list-none p-0">
              {(currentSectionData as import("@/types/typescript").LearningSection)?.keyPoints?.map(
                (point: string, index: number) => (
                  <li
                    key={index}
                    className="py-2 pl-6 relative text-[var(--card-text-secondary)] before:content-['✓'] before:absolute before:left-0 before:text-[#27ae60] before:font-bold"
                  >
                    {point}
                  </li>
                )
              )}
            </ul>
          </div>

          <div className="mt-8">
            <h3 className="text-[var(--card-text)] mb-6 text-2xl font-bold">型の例</h3>
            {renderExamples()}
          </div>
        </section>

        {/* 練習問題セクション */}
        <section
          ref={practiceSectionRef}
          className={`bg-[var(--card-background)] rounded-xl p-8 mb-12 shadow-[0_4px_6px_var(--shadow-color)] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${practiceSectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <h2 className="text-[var(--card-text)] mb-6 text-3xl font-bold">
            🧪 {currentSectionData?.title}の練習問題
          </h2>
          {currentSectionQuestions && currentSectionQuestions.length > 0 ? (
            <>
              <div className="flex justify-center items-center p-4 bg-[var(--section-background)] rounded-lg mb-6 text-sm font-semibold text-[var(--card-text)]">
                問題 {currentQuestion + 1} / {currentSectionQuestions.length}
              </div>

              {!showResult ? (
                !showFeedback ? (
                  <div className="bg-[var(--card-background)] border border-[var(--border-color)] rounded-xl p-8 shadow-[0_2px_8px_var(--shadow-color)] md:p-6">
                    <h3 className="mb-5 text-[var(--card-text)] text-2xl">
                      {currentSectionQuestions[currentQuestion].question}
                    </h3>
                    {currentSectionQuestions[currentQuestion].code && (
                      <pre className="bg-[var(--section-background)] border border-[var(--border-color)] rounded-lg p-4 mb-5 overflow-x-auto font-mono text-sm">
                        <code className="text-[var(--card-text)]">
                          {currentSectionQuestions[currentQuestion].code}
                        </code>
                      </pre>
                    )}
                    <div className="flex flex-col gap-3 mb-6">
                      {currentSectionQuestions[currentQuestion].options.map(
                        (option: string, index: number) => (
                          <button
                            key={index}
                            className={`px-5 py-4 border-2 rounded-lg text-left cursor-pointer transition-all duration-200 text-base leading-relaxed ${
                              selectedAnswer === index
                                ? "border-[#3498db] bg-[rgba(52,152,219,0.1)] text-[#3498db] font-semibold"
                                : "border-[var(--border-color)] bg-[var(--card-background)] text-[var(--card-text)] hover:border-[#3498db] hover:bg-[var(--section-background)]"
                            }`}
                            onClick={() => handleAnswerSelect(index)}
                          >
                            {option}
                          </button>
                        )
                      )}
                    </div>
                    <button
                      className="w-full py-3 px-6 border-none rounded-lg text-base font-semibold cursor-pointer transition-all duration-200 bg-[#3498db] text-white hover:bg-[#2980b9] disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={handleSubmitAnswer}
                      disabled={selectedAnswer === null}
                    >
                      回答する
                    </button>
                  </div>
                ) : (
                  <div
                    className={`p-6 rounded-xl mb-6 border-l-4 ${
                      answerResults[currentQuestion]?.isCorrect
                        ? "bg-[#d4edda] border-l-[#28a745] text-[#155724]"
                        : "bg-[#f8d7da] border-l-[#dc3545] text-[#721c24]"
                    }`}
                  >
                    <h3 className="text-2xl font-semibold mb-3">
                      {answerResults[currentQuestion]?.isCorrect ? "✅ 正解！" : "❌ 不正解"}
                    </h3>
                    <p className="mb-6 leading-relaxed">
                      {currentSectionQuestions[currentQuestion].explanation}
                    </p>
                    <button
                      className="w-full py-3 px-6 border-none rounded-lg text-base font-semibold cursor-pointer transition-all duration-200 bg-[#3498db] text-white hover:bg-[#2980b9]"
                      onClick={handleNextQuestion}
                    >
                      {currentQuestion < currentSectionQuestions.length - 1
                        ? "次の問題"
                        : "結果を見る"}
                    </button>
                  </div>
                )
              ) : (
                <div className="bg-[var(--card-background)] border border-[var(--border-color)] rounded-xl p-8 shadow-[0_2px_8px_var(--shadow-color)] md:p-6">
                  <h3 className="text-2xl font-semibold mb-4 text-[var(--card-text)]">
                    🎉 {currentSectionData?.title}の練習完了！
                  </h3>
                  <p className="mb-2 text-[var(--card-text)]">
                    正解数: {answerResults.filter((r) => r.isCorrect).length} /{" "}
                    {currentSectionQuestions.length}
                  </p>
                  <p className="mb-6 text-[var(--card-text)]">
                    正答率:{" "}
                    {Math.round(
                      (answerResults.filter((r) => r.isCorrect).length /
                        currentSectionQuestions.length) *
                        100
                    )}
                    %
                  </p>
                  <div className="mb-8">
                    <h4 className="text-xl font-semibold mb-4 text-[var(--card-text)]">
                      全問題と解説
                    </h4>
                    {answerResults.map((result, idx) => (
                      <div
                        key={idx}
                        className={`p-4 mb-4 rounded-lg border-l-4 ${
                          result.isCorrect
                            ? "bg-[#d4edda] border-l-[#28a745]"
                            : "bg-[#f8d7da] border-l-[#dc3545]"
                        }`}
                      >
                        <div className="flex justify-between items-center mb-3 flex-wrap gap-2.5">
                          <span className="font-semibold text-[var(--card-text)]">
                            問題{idx + 1}：
                          </span>
                          <span className="text-xl">{result.isCorrect ? "✅" : "❌"}</span>
                        </div>
                        <div className="mb-3 text-[var(--card-text)]">
                          <strong>Q.</strong> {result.question}
                        </div>
                        {result.code && (
                          <pre className="bg-[var(--section-background)] border border-[var(--border-color)] rounded-lg p-3 mb-3 overflow-x-auto font-mono text-xs">
                            <code className="text-[var(--card-text)]">{result.code}</code>
                          </pre>
                        )}
                        <div className="mb-2 text-[var(--card-text)]">
                          <strong>あなたの解答：</strong> {result.options[result.selected]}
                        </div>
                        <div className="mb-2 text-[var(--card-text)]">
                          <strong>正解：</strong> {result.options[result.correct]}
                        </div>
                        <div className="text-[var(--card-text)] leading-relaxed">
                          <strong>解説：</strong> {result.explanation}
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    className="w-full py-4 px-6 border-none rounded-lg text-lg font-semibold cursor-pointer transition-all duration-200 bg-[#3498db] text-white hover:bg-[#2980b9]"
                    onClick={resetQuiz}
                  >
                    もう一度練習する
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center p-8 text-[var(--card-text-secondary)]">
              <p className="m-0">このセクションには練習問題がありません。</p>
            </div>
          )}
        </section>

        <div className="text-center mt-5 flex justify-center gap-4 flex-wrap">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-foreground text-background no-underline rounded-lg font-medium transition-opacity duration-200 hover:opacity-80"
          >
            ← ホームに戻る
          </Link>
          <Link
            href="/quiz"
            className="inline-flex items-center px-6 py-3 bg-foreground text-background no-underline rounded-lg font-medium transition-opacity duration-200 hover:opacity-80"
          >
            🧪 改善版クイズに挑戦 →
          </Link>
        </div>
      </main>
    </div>
  );
}
