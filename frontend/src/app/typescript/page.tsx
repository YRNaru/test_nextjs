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

  const currentSectionData = sections.find(
    (section) => section.id === activeSection,
  )?.data;

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
      data-oid="8olnqsy"
    >
      <h3
        className="text-[var(--card-text)] mb-4 text-xl font-semibold"
        data-oid="dj5n2:h"
      >
        {example.name}
      </h3>
      <p
        className="text-[var(--card-text-secondary)] leading-relaxed mb-4"
        data-oid="6u7slje"
      >
        {example.description}
      </p>
      <div
        className="bg-[var(--code-background)] text-[var(--code-text)] p-4 rounded-md mb-4 font-mono text-sm"
        data-oid="97miepz"
      >
        <code data-oid="a:--2qa">{example.example}</code>
      </div>
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
        data-oid="bpx82h1"
      >
        <div
          className="bg-[#d4edda] text-[#155724] p-4 rounded-md border border-[#c3e6cb]"
          data-oid="3k4n5fv"
        >
          <strong className="block mb-2" data-oid="ivd674f">
            正しい値:
          </strong>{" "}
          <code data-oid="tg3vcaz">{String(example.correctValue)}</code>
        </div>
        <div
          className="bg-[#f8d7da] text-[#721c24] p-4 rounded-md border border-[#f5c6cb]"
          data-oid="bnuonuk"
        >
          <strong className="block mb-2" data-oid="cba:upi">
            間違った値:
          </strong>{" "}
          <code data-oid="jgq1vxj">{String(example.incorrectValue)}</code>
        </div>
      </div>
      <p
        className="mb-4 text-[var(--card-text-secondary)] leading-relaxed italic"
        data-oid="l0hty.g"
      >
        {example.explanation}
      </p>
      {example.keyPoints && (
        <div
          className="bg-[var(--section-background)] p-5 rounded-lg mb-4 border-l-4 border-[#3498db]"
          data-oid="aa-qt_h"
        >
          <strong
            className="block mb-2 text-[var(--card-text)]"
            data-oid="f-2t6gc"
          >
            ポイント:
          </strong>
          <ul className="list-none p-0" data-oid="yjms.ut">
            {example.keyPoints.map((point: string, index: number) => (
              <li
                key={index}
                className="py-1.5 pl-6 relative text-[var(--card-text-secondary)] before:content-['✓'] before:absolute before:left-0 before:text-[#27ae60] before:font-bold"
                data-oid="rj86ix1"
              >
                {point}
              </li>
            ))}
          </ul>
        </div>
      )}
      {example.benefits && (
        <div
          className="bg-gradient-to-br from-[rgba(52,152,219,0.08)] to-[rgba(46,204,113,0.05)] p-5 rounded-lg mb-4 border border-[rgba(52,152,219,0.2)]"
          data-oid="36:cn7o"
        >
          <strong
            className="block mb-2 text-[var(--card-text)]"
            data-oid="joy_kj3"
          >
            ✨ 利点:
          </strong>
          <ul
            className="list-none p-0 space-y-1 text-[var(--card-text)]"
            data-oid="f.d9is3"
          >
            {example.benefits.map((benefit: string, idx: number) => (
              <li key={idx} data-oid="3hzbqkf">
                {benefit}
              </li>
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
      data-oid="08erfgh"
    >
      <h3
        className="text-[var(--card-text)] mb-4 text-xl font-semibold"
        data-oid="cx7t6en"
      >
        {example.name}
      </h3>
      <p
        className="text-[var(--card-text-secondary)] leading-relaxed mb-4"
        data-oid="uuva1jg"
      >
        {example.description}
      </p>
      <div
        className="bg-[var(--code-background)] text-[var(--code-text)] p-4 rounded-md mb-4 font-mono text-sm"
        data-oid="88oyctb"
      >
        <strong className="text-[#3498db]" data-oid="5kvro44">
          構文:
        </strong>{" "}
        <code data-oid="ize0zgc">{example.syntax}</code>
      </div>
      <div
        className="bg-[var(--code-background)] text-[var(--code-text)] p-4 rounded-md mb-4 font-mono text-sm"
        data-oid="r8g2hjj"
      >
        <pre className="m-0 whitespace-pre-wrap" data-oid="223-_mv">
          <code data-oid="9ne:y6q">{example.example}</code>
        </pre>
      </div>
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
        data-oid="llig1o6"
      >
        <div
          className="bg-[#d4edda] text-[#155724] p-4 rounded-md border border-[#c3e6cb]"
          data-oid="3-tpejp"
        >
          <strong className="block mb-2" data-oid="g4304i:">
            正しい使用法:
          </strong>
          <pre
            className="m-0 whitespace-pre-wrap font-mono text-xs"
            data-oid="gnfkh.l"
          >
            <code data-oid=".:tf.tk">{example.correctUsage}</code>
          </pre>
        </div>
        <div
          className="bg-[#f8d7da] text-[#721c24] p-4 rounded-md border border-[#f5c6cb]"
          data-oid="hczhhow"
        >
          <strong className="block mb-2" data-oid="40:ml08">
            間違った使用法:
          </strong>
          <pre
            className="m-0 whitespace-pre-wrap font-mono text-xs"
            data-oid="4a06jnf"
          >
            <code data-oid="tpsgtlb">{example.incorrectUsage}</code>
          </pre>
        </div>
      </div>
      <p
        className="mb-4 text-[var(--card-text-secondary)] leading-relaxed italic"
        data-oid="9xz38oo"
      >
        {example.explanation}
      </p>
      {example.keyPoints && (
        <div
          className="bg-[var(--section-background)] p-5 rounded-lg mb-4 border-l-4 border-[#3498db]"
          data-oid="om6d6u-"
        >
          <strong
            className="block mb-2 text-[var(--card-text)]"
            data-oid="4-bvb2t"
          >
            ポイント:
          </strong>
          <ul className="list-none p-0" data-oid="wrq0c9-">
            {example.keyPoints.map((point: string, index: number) => (
              <li
                key={index}
                className="py-1.5 pl-6 relative text-[var(--card-text-secondary)] before:content-['✓'] before:absolute before:left-0 before:text-[#27ae60] before:font-bold"
                data-oid="rvtr9:h"
              >
                {point}
              </li>
            ))}
          </ul>
        </div>
      )}
      {example.benefits && (
        <div
          className="bg-gradient-to-br from-[rgba(52,152,219,0.08)] to-[rgba(46,204,113,0.05)] p-5 rounded-lg mb-4 border border-[rgba(52,152,219,0.2)]"
          data-oid="s199inl"
        >
          <strong
            className="block mb-2 text-[var(--card-text)]"
            data-oid="x-lb0ve"
          >
            ✨ 利点:
          </strong>
          <ul
            className="list-none p-0 space-y-1 text-[var(--card-text)]"
            data-oid="mvjapgy"
          >
            {example.benefits.map((benefit: string, idx: number) => (
              <li key={idx} data-oid="m4p3tp:">
                {benefit}
              </li>
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
      data-oid="c_tak3u"
    >
      <h3 data-oid="7h.gr91">{example.name}</h3>
      <p data-oid="9m6n1dh">{example.description}</p>
      <div
        className="bg-[var(--code-background)] text-[var(--code-text)] p-4 rounded-md mb-4 font-mono text-sm"
        data-oid="gfslqfs"
      >
        <strong className="text-[#3498db]" data-oid="2tplf70">
          構文:
        </strong>{" "}
        <code data-oid="1q.h9t1">{example.syntax}</code>
      </div>
      <div
        className="bg-[var(--code-background)] text-[var(--code-text)] p-4 rounded-md mb-4 font-mono text-sm"
        data-oid="k442fxs"
      >
        <pre data-oid="skmx7_.">
          <code data-oid=".x130ix">{example.example}</code>
        </pre>
      </div>
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
        data-oid="poa4prg"
      >
        <div
          className="bg-[#d4edda] text-[#155724] p-4 rounded-md border border-[#c3e6cb]"
          data-oid="c1gtkck"
        >
          <strong className="block mb-2" data-oid="hpgf9gj">
            正しい使用法:
          </strong>
          <pre
            className="m-0 whitespace-pre-wrap font-mono text-xs"
            data-oid="stt1i.g"
          >
            <code data-oid="t5i3cwb">{example.correctUsage}</code>
          </pre>
        </div>
        <div
          className="bg-[#f8d7da] text-[#721c24] p-4 rounded-md border border-[#f5c6cb]"
          data-oid="_0e10i-"
        >
          <strong data-oid="j202_2s">間違った使用法:</strong>
          <pre data-oid="hwqi::c">
            <code data-oid="akgir-z">{example.incorrectUsage}</code>
          </pre>
        </div>
      </div>
      <p
        className="mb-4 text-[var(--card-text-secondary)] leading-relaxed italic"
        data-oid="kq8qbom"
      >
        {example.explanation}
      </p>
      {example.keyPoints && (
        <div
          className="bg-[var(--section-background)] p-5 rounded-lg mb-4 border-l-4 border-[#3498db]"
          data-oid="yxyxu38"
        >
          <strong
            className="block mb-2 text-[var(--card-text)]"
            data-oid="bctmev1"
          >
            ポイント:
          </strong>
          <ul className="list-none p-0" data-oid=".l94gt-">
            {example.keyPoints.map((point: string, index: number) => (
              <li
                key={index}
                className="py-1.5 pl-6 relative text-[var(--card-text-secondary)] before:content-['✓'] before:absolute before:left-0 before:text-[#27ae60] before:font-bold"
                data-oid="2706h6:"
              >
                {point}
              </li>
            ))}
          </ul>
        </div>
      )}
      {example.benefits && (
        <div
          className="bg-gradient-to-br from-[rgba(52,152,219,0.08)] to-[rgba(46,204,113,0.05)] p-5 rounded-lg mb-4 border border-[rgba(52,152,219,0.2)]"
          data-oid="uzgky_6"
        >
          <strong
            className="block mb-2 text-[var(--card-text)]"
            data-oid="_vm6pmj"
          >
            ✨ 利点:
          </strong>
          <ul
            className="list-none p-0 space-y-1 text-[var(--card-text)]"
            data-oid="79mhz69"
          >
            {example.benefits.map((benefit: string, idx: number) => (
              <li key={idx} data-oid="d7i..c4">
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      )}
      {example.optionalProperties && (
        <div
          className="bg-[var(--section-background)] p-5 rounded-lg mb-4 border-l-4 border-[#3498db]"
          data-oid="9ip4fs:"
        >
          <strong data-oid=":5lj3m5">オプショナルプロパティ:</strong>
          <ul data-oid="ezznd7t">
            {example.optionalProperties.map((prop: string, index: number) => (
              <li key={index} data-oid="m:e3vm6">
                {prop}
              </li>
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
      data-oid="phvunrb"
    >
      <h3 data-oid="6.qqb7c">{example.name}</h3>
      <p data-oid="wfz:9xn">{example.description}</p>
      <div
        className="bg-[var(--code-background)] text-[var(--code-text)] p-4 rounded-md mb-4 font-mono text-sm"
        data-oid="dx34x73"
      >
        <pre data-oid="qgmmjgf">
          <code data-oid="4xatb07">{example.example}</code>
        </pre>
      </div>
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
        data-oid="uj9:o3c"
      >
        <div
          className="bg-[#d4edda] text-[#155724] p-4 rounded-md border border-[#c3e6cb]"
          data-oid="k5asq22"
        >
          <strong className="block mb-2" data-oid="rvn2hzh">
            推奨される使用法:
          </strong>
          <pre
            className="m-0 whitespace-pre-wrap font-mono text-xs"
            data-oid="t7a9b:4"
          >
            <code data-oid="i:yitev">{example.correctUsage}</code>
          </pre>
        </div>
        <div
          className="bg-[#f8d7da] text-[#721c24] p-4 rounded-md border border-[#f5c6cb]"
          data-oid="nv_.0pa"
        >
          <strong data-oid="s8:9_ko">避けるべき使用法:</strong>
          <pre data-oid="paf_l:p">
            <code data-oid=":rcna7p">{example.incorrectUsage}</code>
          </pre>
        </div>
      </div>
      <p
        className="mb-4 text-[var(--card-text-secondary)] leading-relaxed italic"
        data-oid="w5qsqvj"
      >
        {example.explanation}
      </p>
      {example.keyPoints && (
        <div
          className="bg-[var(--section-background)] p-5 rounded-lg mb-4 border-l-4 border-[#3498db]"
          data-oid="_jp4qcv"
        >
          <strong data-oid="4ivbmt.">ポイント:</strong>
          <ul data-oid="g5ghlf0">
            {example.keyPoints.map((point: string, index: number) => (
              <li key={index} data-oid="9pp5xd2">
                {point}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div
        className="bg-[rgba(245,158,11,0.1)] p-5 rounded-lg mb-4 border-l-4 border-[#f59e0b]"
        data-oid="sq5rx_q"
      >
        <strong data-oid="ad_-36t">⚠️ 注意点:</strong>
        <ul data-oid="3_f1unh">
          {example.warnings.map((warning: string, index: number) => (
            <li key={index} data-oid="be4:0ka">
              {warning}
            </li>
          ))}
        </ul>
      </div>
      {example.benefits && (
        <div
          className="bg-gradient-to-br from-[rgba(52,152,219,0.08)] to-[rgba(46,204,113,0.05)] p-5 rounded-lg mb-4 border border-[rgba(52,152,219,0.2)]"
          data-oid="xzzz19q"
        >
          <strong data-oid="z2ckntq">✨ 利点:</strong>
          <ul data-oid="qg506k_">
            {example.benefits.map((benefit: string, idx: number) => (
              <li key={idx} data-oid="g8m7q5e">
                {benefit}
              </li>
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
      data-oid="x54.1lh"
    >
      <h3 data-oid="s71itqw">{example.name}</h3>
      <p data-oid="xa6enau">{example.description}</p>
      <div
        className="bg-[var(--code-background)] text-[var(--code-text)] p-4 rounded-md mb-4 font-mono text-sm"
        data-oid="fg:yek."
      >
        <strong data-oid="r3u0x4e">構文:</strong>{" "}
        <code data-oid="qwf9g1i">{example.syntax}</code>
      </div>
      <div
        className="bg-[var(--code-background)] text-[var(--code-text)] p-4 rounded-md mb-4 font-mono text-sm"
        data-oid="r8bc-2."
      >
        <pre data-oid="pt-7psm">
          <code data-oid="jbeu4hk">{example.example}</code>
        </pre>
      </div>
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
        data-oid="uwzuei1"
      >
        <div
          className="bg-[#d4edda] text-[#155724] p-4 rounded-md border border-[#c3e6cb]"
          data-oid="qc-za:n"
        >
          <strong className="block mb-2" data-oid="6eokhy7">
            正しい使用法:
          </strong>
          <pre
            className="m-0 whitespace-pre-wrap font-mono text-xs"
            data-oid="9_a9q:l"
          >
            <code data-oid="ff6qp5p">{example.correctUsage}</code>
          </pre>
        </div>
        <div
          className="bg-[#f8d7da] text-[#721c24] p-4 rounded-md border border-[#f5c6cb]"
          data-oid="eimoel_"
        >
          <strong data-oid="2m3-vi-">間違った使用法:</strong>
          <pre data-oid="hl45418">
            <code data-oid="4kb90ng">{example.incorrectUsage}</code>
          </pre>
        </div>
      </div>
      <p
        className="mb-4 text-[var(--card-text-secondary)] leading-relaxed italic"
        data-oid="7nxk8do"
      >
        {example.explanation}
      </p>
      {example.keyPoints && (
        <div
          className="bg-[var(--section-background)] p-5 rounded-lg mb-4 border-l-4 border-[#3498db]"
          data-oid="qjz-afu"
        >
          <strong data-oid="_27makq">ポイント:</strong>
          <ul data-oid="22g.qt6">
            {example.keyPoints.map((point: string, index: number) => (
              <li key={index} data-oid="2.0ztep">
                {point}
              </li>
            ))}
          </ul>
        </div>
      )}
      {example.parameters && (
        <div
          className="bg-[var(--section-background)] p-5 rounded-lg mb-4 border-l-4 border-[#3498db]"
          data-oid="jjk4knf"
        >
          <strong data-oid="is3dw89">📝 パラメータ:</strong>
          <ul data-oid="-sstt3c">
            {example.parameters.map((param: string, index: number) => (
              <li key={index} data-oid="jem53dd">
                {param}
              </li>
            ))}
          </ul>
        </div>
      )}
      {example.benefits && (
        <div
          className="bg-gradient-to-br from-[rgba(52,152,219,0.08)] to-[rgba(46,204,113,0.05)] p-5 rounded-lg mb-4 border border-[rgba(52,152,219,0.2)]"
          data-oid="9wf_o4e"
        >
          <strong data-oid="n.w33vm">✨ 利点:</strong>
          <ul data-oid="3ee0dtg">
            {example.benefits.map((benefit: string, idx: number) => (
              <li key={idx} data-oid="asenrnl">
                {benefit}
              </li>
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
      data-oid=".vrnwnu"
    >
      <h3 data-oid="fx7ysen">{example.name}</h3>
      <p data-oid="ox:wn44">{example.description}</p>
      <div
        className="bg-[var(--code-background)] text-[var(--code-text)] p-4 rounded-md mb-4 font-mono text-sm"
        data-oid="15hxp9b"
      >
        <pre data-oid="qfhq3qw">
          <code data-oid="5qcs82.">{example.example}</code>
        </pre>
      </div>
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
        data-oid=".4:xati"
      >
        <div
          className="bg-[#d4edda] text-[#155724] p-4 rounded-md border border-[#c3e6cb]"
          data-oid="ur:gula"
        >
          <strong className="block mb-2" data-oid="fppxnn3">
            正しい使用法:
          </strong>
          <pre
            className="m-0 whitespace-pre-wrap font-mono text-xs"
            data-oid="c6zm_4c"
          >
            <code data-oid="-8b2hkc">{example.correctUsage}</code>
          </pre>
        </div>
        <div
          className="bg-[#f8d7da] text-[#721c24] p-4 rounded-md border border-[#f5c6cb]"
          data-oid="r8hktz4"
        >
          <strong data-oid="c8ehy6b">間違った使用法:</strong>
          <pre data-oid="gz58:ma">
            <code data-oid="k_2a8c1">{example.incorrectUsage}</code>
          </pre>
        </div>
      </div>
      <p
        className="mb-4 text-[var(--card-text-secondary)] leading-relaxed italic"
        data-oid=":g9e.m3"
      >
        {example.explanation}
      </p>
      {example.keyPoints && (
        <div
          className="bg-[var(--section-background)] p-5 rounded-lg mb-4 border-l-4 border-[#3498db]"
          data-oid="soj6u-o"
        >
          <strong data-oid="9.8qn5_">ポイント:</strong>
          <ul data-oid="c.:q9dl">
            {example.keyPoints.map((point: string, index: number) => (
              <li key={index} data-oid="d.1_2sk">
                {point}
              </li>
            ))}
          </ul>
        </div>
      )}
      {example.benefits && (
        <div
          className="bg-gradient-to-br from-[rgba(52,152,219,0.08)] to-[rgba(46,204,113,0.05)] p-5 rounded-lg mb-4 border border-[rgba(52,152,219,0.2)]"
          data-oid="v4s6uj-"
        >
          <strong data-oid="v9utsdw">✨ 利点:</strong>
          <ul data-oid="x0vnuiz">
            {example.benefits.map((benefit: string, idx: number) => (
              <li key={idx} data-oid="xvrbvkv">
                {benefit}
              </li>
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
      data-oid="ir_g:ej"
    >
      <h3 data-oid="6zx811q">{example.name}</h3>
      <p data-oid="_8wddqh">{example.description}</p>
      <div
        className="bg-[var(--code-background)] text-[var(--code-text)] p-4 rounded-md mb-4 font-mono text-sm"
        data-oid="om9de5e"
      >
        <pre data-oid="1axss2j">
          <code data-oid="8wh_6qe">{example.example}</code>
        </pre>
      </div>
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
        data-oid="82h0-hp"
      >
        <div
          className="bg-[#d4edda] text-[#155724] p-4 rounded-md border border-[#c3e6cb]"
          data-oid="dw09h7t"
        >
          <strong className="block mb-2" data-oid="1y76im2">
            正しい使用法:
          </strong>
          <pre
            className="m-0 whitespace-pre-wrap font-mono text-xs"
            data-oid="1sw577a"
          >
            <code data-oid="dgj:a0c">{example.correctUsage}</code>
          </pre>
        </div>
        <div
          className="bg-[#f8d7da] text-[#721c24] p-4 rounded-md border border-[#f5c6cb]"
          data-oid="f3q7fti"
        >
          <strong data-oid="nkl5-bo">間違った使用法:</strong>
          <pre data-oid="q38sjk0">
            <code data-oid="jq5rh_3">{example.incorrectUsage}</code>
          </pre>
        </div>
      </div>
      <p
        className="mb-4 text-[var(--card-text-secondary)] leading-relaxed italic"
        data-oid="8iiblca"
      >
        {example.explanation}
      </p>
      {example.keyPoints && (
        <div
          className="bg-[var(--section-background)] p-5 rounded-lg mb-4 border-l-4 border-[#3498db]"
          data-oid="cw735n0"
        >
          <strong data-oid="q2_dc..">ポイント:</strong>
          <ul data-oid="fbpsj9p">
            {example.keyPoints.map((point: string, index: number) => (
              <li key={index} data-oid="x4zn_l9">
                {point}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div
        className="bg-[rgba(245,158,11,0.1)] p-5 rounded-lg mb-4 border-l-4 border-[#f59e0b]"
        data-oid="ph5pk1n"
      >
        <strong data-oid="vq-z3-u">⚠️ 注意点:</strong>
        <ul data-oid="hnh.:_8">
          {example.cautions.map((caution: string, index: number) => (
            <li key={index} data-oid="08yhy.1">
              {caution}
            </li>
          ))}
        </ul>
      </div>
      {example.benefits && (
        <div
          className="bg-gradient-to-br from-[rgba(52,152,219,0.08)] to-[rgba(46,204,113,0.05)] p-5 rounded-lg mb-4 border border-[rgba(52,152,219,0.2)]"
          data-oid="w1_8n-x"
        >
          <strong data-oid="7iwwcxe">✨ 利点:</strong>
          <ul data-oid="q58jw9p">
            {example.benefits.map((benefit: string, idx: number) => (
              <li key={idx} data-oid="w5_1jlb">
                {benefit}
              </li>
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
      data-oid="oo9d.lm"
    >
      <h3 data-oid="4:05pit">{example.name}</h3>
      <p data-oid=":22jmsd">{example.description}</p>
      <div
        className="bg-[var(--code-background)] text-[var(--code-text)] p-4 rounded-md mb-4 font-mono text-sm"
        data-oid="er2wett"
      >
        <pre data-oid="7lh.ow1">
          <code data-oid="lap2b6v">{example.example}</code>
        </pre>
      </div>
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
        data-oid="lxoi52h"
      >
        <div
          className="bg-[#d4edda] text-[#155724] p-4 rounded-md border border-[#c3e6cb]"
          data-oid="38mx_:h"
        >
          <strong className="block mb-2" data-oid="8jn1vd:">
            正しい使用法:
          </strong>
          <pre
            className="m-0 whitespace-pre-wrap font-mono text-xs"
            data-oid="0pmlouk"
          >
            <code data-oid="p2z591o">{example.correctUsage}</code>
          </pre>
        </div>
        <div
          className="bg-[#f8d7da] text-[#721c24] p-4 rounded-md border border-[#f5c6cb]"
          data-oid=".naxyho"
        >
          <strong data-oid="5ajv0yz">間違った使用法:</strong>
          <pre data-oid="bm26fz9">
            <code data-oid="4cknn6x">{example.incorrectUsage}</code>
          </pre>
        </div>
      </div>
      <p
        className="mb-4 text-[var(--card-text-secondary)] leading-relaxed italic"
        data-oid="4m9:o0o"
      >
        {example.explanation}
      </p>
      {example.keyPoints && (
        <div
          className="bg-[var(--section-background)] p-5 rounded-lg mb-4 border-l-4 border-[#3498db]"
          data-oid="0wbr4b3"
        >
          <strong data-oid="4-fxo50">ポイント:</strong>
          <ul data-oid="dsrobnf">
            {example.keyPoints.map((point: string, index: number) => (
              <li key={index} data-oid="zmsdlny">
                {point}
              </li>
            ))}
          </ul>
        </div>
      )}
      {example.benefits && (
        <div
          className="bg-gradient-to-br from-[rgba(52,152,219,0.08)] to-[rgba(46,204,113,0.05)] p-5 rounded-lg mb-4 border border-[rgba(52,152,219,0.2)]"
          data-oid="qkuncme"
        >
          <strong data-oid="6wh5ra_">✨ 利点:</strong>
          <ul data-oid="1hh7d04">
            {example.benefits.map((benefit: string, idx: number) => (
              <li key={idx} data-oid="ehu1yr7">
                {benefit}
              </li>
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
      data-oid="crkzgfu"
    >
      <h3 data-oid="q08lfi7">{example.name}</h3>
      <p data-oid="2my_55e">{example.description}</p>
      {example.example && (
        <div
          className="bg-[var(--code-background)] text-[var(--code-text)] p-4 rounded-md mb-4 font-mono text-sm"
          data-oid="j8xulnk"
        >
          <pre data-oid="1j:6ld:">
            <code data-oid="ny96jjr">{example.example}</code>
          </pre>
        </div>
      )}
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
        data-oid="n_jw-pw"
      >
        <div
          className="bg-[#d4edda] text-[#155724] p-4 rounded-md border border-[#c3e6cb]"
          data-oid="w36yyju"
        >
          <strong className="block mb-2" data-oid="a3rwr6a">
            正しい使用法:
          </strong>
          <pre
            className="m-0 whitespace-pre-wrap font-mono text-xs"
            data-oid="ee3-v_k"
          >
            <code data-oid="z_wjvnj">{example.correctUsage}</code>
          </pre>
        </div>
        <div
          className="bg-[#f8d7da] text-[#721c24] p-4 rounded-md border border-[#f5c6cb]"
          data-oid=".7s4j6l"
        >
          <strong data-oid="bp4zcfs">間違った使用法:</strong>
          <pre data-oid="xyyuclj">
            <code data-oid="3aw05lq">{example.incorrectUsage}</code>
          </pre>
        </div>
      </div>
      <p
        className="mb-4 text-[var(--card-text-secondary)] leading-relaxed italic"
        data-oid="o_05pbs"
      >
        {example.explanation}
      </p>
      {example.keyPoints && (
        <div
          className="bg-[var(--section-background)] p-5 rounded-lg mb-4 border-l-4 border-[#3498db]"
          data-oid="i2rz4l:"
        >
          <strong data-oid="6my.gk:">ポイント:</strong>
          <ul data-oid="thgi.24">
            {example.keyPoints.map((point: string, index: number) => (
              <li key={index} data-oid="23:ddww">
                {point}
              </li>
            ))}
          </ul>
        </div>
      )}
      {example.tips && (
        <div
          className="bg-gradient-to-br from-[rgba(52,152,219,0.08)] to-[rgba(46,204,113,0.05)] p-5 rounded-lg mb-4 border border-[rgba(52,152,219,0.2)]"
          data-oid="4051hdx"
        >
          <strong data-oid="asm72h:">💡 Tips:</strong>
          <ul data-oid="v_ikiif">
            {example.tips.map((tip: string, index: number) => (
              <li key={index} data-oid="8okb6p4">
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}
      {example.benefits && (
        <div
          className="bg-gradient-to-br from-[rgba(52,152,219,0.08)] to-[rgba(46,204,113,0.05)] p-5 rounded-lg mb-4 border border-[rgba(52,152,219,0.2)]"
          data-oid="8-ya15s"
        >
          <strong data-oid="vkc1cpl">✨ 利点:</strong>
          <ul data-oid=":om6zil">
            {example.benefits.map((benefit: string, idx: number) => (
              <li key={idx} data-oid="rakn9ni">
                {benefit}
              </li>
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
      data-oid="5is82k-"
    >
      <h3 data-oid="yy44e7_">{example.name}</h3>
      <p data-oid="jng_26n">{example.description}</p>
      <div
        className="bg-[var(--code-background)] text-[var(--code-text)] p-4 rounded-md mb-4 font-mono text-sm"
        data-oid="h83m5hu"
      >
        <pre data-oid="bqoa:-a">
          <code data-oid="6p3elzy">{example.example}</code>
        </pre>
      </div>
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
        data-oid="caw92:8"
      >
        <div
          className="bg-[#d4edda] text-[#155724] p-4 rounded-md border border-[#c3e6cb]"
          data-oid="bx4if3b"
        >
          <strong className="block mb-2" data-oid="vn0d7y_">
            正しい使用法:
          </strong>
          <pre
            className="m-0 whitespace-pre-wrap font-mono text-xs"
            data-oid="b.4pa:7"
          >
            <code data-oid="kciwl7r">{example.correctUsage}</code>
          </pre>
        </div>
        <div
          className="bg-[#f8d7da] text-[#721c24] p-4 rounded-md border border-[#f5c6cb]"
          data-oid="yhpzlt3"
        >
          <strong data-oid="prid.zu">間違った使用法:</strong>
          <pre data-oid="vv5e7fk">
            <code data-oid="5tlleby">{example.incorrectUsage}</code>
          </pre>
        </div>
      </div>
      <p
        className="mb-4 text-[var(--card-text-secondary)] leading-relaxed italic"
        data-oid="z64:81g"
      >
        {example.explanation}
      </p>
      {example.keyPoints && (
        <div
          className="bg-[var(--section-background)] p-5 rounded-lg mb-4 border-l-4 border-[#3498db]"
          data-oid="2539jy3"
        >
          <strong data-oid="g7wfwq6">ポイント:</strong>
          <ul data-oid="-on.gne">
            {example.keyPoints.map((point: string, index: number) => (
              <li key={index} data-oid="9vzp9u0">
                {point}
              </li>
            ))}
          </ul>
        </div>
      )}
      {example.tips && (
        <div
          className="bg-gradient-to-br from-[rgba(52,152,219,0.08)] to-[rgba(46,204,113,0.05)] p-5 rounded-lg mb-4 border border-[rgba(52,152,219,0.2)]"
          data-oid="4.t_uhn"
        >
          <strong data-oid="f9stz5d">💡 Tips:</strong>
          <ul data-oid="whmc34c">
            {example.tips.map((tip: string, index: number) => (
              <li key={index} data-oid="fct4j5w">
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}
      {example.benefits && (
        <div
          className="bg-gradient-to-br from-[rgba(52,152,219,0.08)] to-[rgba(46,204,113,0.05)] p-5 rounded-lg mb-4 border border-[rgba(52,152,219,0.2)]"
          data-oid="jjhs75t"
        >
          <strong data-oid="_.9umjq">✨ 利点:</strong>
          <ul data-oid="v.on5je">
            {example.benefits.map((benefit: string, idx: number) => (
              <li key={idx} data-oid="depj085">
                {benefit}
              </li>
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
      data-oid="bh02:fd"
    >
      <h3 data-oid="ew6aly9">{example.name}</h3>
      <p data-oid="7_wd_hx">{example.description}</p>
      <div
        className="bg-[var(--code-background)] text-[var(--code-text)] p-4 rounded-md mb-4 font-mono text-sm"
        data-oid="5bq6b8k"
      >
        <pre data-oid="pd034qz">
          <code data-oid="dn2phkx">{example.example}</code>
        </pre>
      </div>
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
        data-oid="19kytp-"
      >
        <div
          className="bg-[#d4edda] text-[#155724] p-4 rounded-md border border-[#c3e6cb]"
          data-oid="a9hldxb"
        >
          <strong className="block mb-2" data-oid="s16aw:c">
            正しい使用法:
          </strong>
          <pre
            className="m-0 whitespace-pre-wrap font-mono text-xs"
            data-oid="qwt362:"
          >
            <code data-oid="4c1:-cy">{example.correctUsage}</code>
          </pre>
        </div>
        <div
          className="bg-[#f8d7da] text-[#721c24] p-4 rounded-md border border-[#f5c6cb]"
          data-oid="cnh6ed_"
        >
          <strong data-oid="3fk20rw">間違った使用法:</strong>
          <pre data-oid="s6rn7db">
            <code data-oid="vbf.837">{example.incorrectUsage}</code>
          </pre>
        </div>
      </div>
      <p
        className="mb-4 text-[var(--card-text-secondary)] leading-relaxed italic"
        data-oid="-7vkamt"
      >
        {example.explanation}
      </p>
      {example.keyPoints && (
        <div
          className="bg-[var(--section-background)] p-5 rounded-lg mb-4 border-l-4 border-[#3498db]"
          data-oid="r-uoun0"
        >
          <strong data-oid="q9e9h96">ポイント:</strong>
          <ul data-oid="iijkbjf">
            {example.keyPoints.map((point: string, index: number) => (
              <li key={index} data-oid="4a42t:r">
                {point}
              </li>
            ))}
          </ul>
        </div>
      )}
      {example.tips && (
        <div
          className="bg-gradient-to-br from-[rgba(52,152,219,0.08)] to-[rgba(46,204,113,0.05)] p-5 rounded-lg mb-4 border border-[rgba(52,152,219,0.2)]"
          data-oid="mcjlnlm"
        >
          <strong data-oid="3k69dvf">💡 Tips:</strong>
          <ul data-oid="0q2lphu">
            {example.tips.map((tip: string, index: number) => (
              <li key={index} data-oid="v_p91tp">
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}
      {example.benefits && (
        <div
          className="bg-gradient-to-br from-[rgba(52,152,219,0.08)] to-[rgba(46,204,113,0.05)] p-5 rounded-lg mb-4 border border-[rgba(52,152,219,0.2)]"
          data-oid="lxm36rx"
        >
          <strong data-oid="4_37sfj">✨ 利点:</strong>
          <ul data-oid="wranl6g">
            {example.benefits.map((benefit: string, idx: number) => (
              <li key={idx} data-oid="74cwp:4">
                {benefit}
              </li>
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
      data-oid="jmaqedc"
    >
      <h3 data-oid="ofgg99:">{example.name}</h3>
      <p data-oid="i.8dts.">{example.description}</p>
      <div
        className="bg-[var(--code-background)] text-[var(--code-text)] p-4 rounded-md mb-4 font-mono text-sm"
        data-oid="nxigjgv"
      >
        <pre data-oid="lt8xalw">
          <code data-oid="dsbwkuu">{example.example}</code>
        </pre>
      </div>
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
        data-oid="-c_0xgn"
      >
        <div
          className="bg-[#d4edda] text-[#155724] p-4 rounded-md border border-[#c3e6cb]"
          data-oid="mnu4ybf"
        >
          <strong className="block mb-2" data-oid="brv2jc-">
            正しい使用法:
          </strong>
          <pre
            className="m-0 whitespace-pre-wrap font-mono text-xs"
            data-oid="fuq31z4"
          >
            <code data-oid="8df9:t6">{example.correctUsage}</code>
          </pre>
        </div>
        <div
          className="bg-[#f8d7da] text-[#721c24] p-4 rounded-md border border-[#f5c6cb]"
          data-oid="9ifl1l3"
        >
          <strong data-oid="8t-bg:w">間違った使用法:</strong>
          <pre data-oid="b:ec956">
            <code data-oid="j_f22l9">{example.incorrectUsage}</code>
          </pre>
        </div>
      </div>
      <p
        className="mb-4 text-[var(--card-text-secondary)] leading-relaxed italic"
        data-oid="cruohi."
      >
        {example.explanation}
      </p>
      {example.keyPoints && (
        <div
          className="bg-[var(--section-background)] p-5 rounded-lg mb-4 border-l-4 border-[#3498db]"
          data-oid="4iy-82e"
        >
          <strong data-oid="3s7f2e3">ポイント:</strong>
          <ul data-oid="gzvvfo2">
            {example.keyPoints.map((point: string, index: number) => (
              <li key={index} data-oid="xylljdo">
                {point}
              </li>
            ))}
          </ul>
        </div>
      )}
      {example.tips && (
        <div
          className="bg-gradient-to-br from-[rgba(52,152,219,0.08)] to-[rgba(46,204,113,0.05)] p-5 rounded-lg mb-4 border border-[rgba(52,152,219,0.2)]"
          data-oid="1opz3k4"
        >
          <strong data-oid="n_nafs.">💡 Tips:</strong>
          <ul data-oid="tumks-r">
            {example.tips.map((tip: string, index: number) => (
              <li key={index} data-oid="cac3j5k">
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}
      {example.benefits && (
        <div
          className="bg-gradient-to-br from-[rgba(52,152,219,0.08)] to-[rgba(46,204,113,0.05)] p-5 rounded-lg mb-4 border border-[rgba(52,152,219,0.2)]"
          data-oid="80drq:3"
        >
          <strong data-oid=":s-2-26">✨ 利点:</strong>
          <ul data-oid="ei99rxi">
            {example.benefits.map((benefit: string, idx: number) => (
              <li key={idx} data-oid="4b3vhr5">
                {benefit}
              </li>
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
      data-oid="0jm4nbp"
    >
      <h3 data-oid="2.avdfl">{example.name}</h3>
      <p data-oid="fqiv44x">{example.description}</p>
      <div
        className="bg-[var(--code-background)] text-[var(--code-text)] p-4 rounded-md mb-4 font-mono text-sm"
        data-oid="-j-aby_"
      >
        <pre data-oid="n0e912-">
          <code data-oid="fac9ff:">{example.example}</code>
        </pre>
      </div>
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
        data-oid="q57g5rb"
      >
        <div
          className="bg-[#d4edda] text-[#155724] p-4 rounded-md border border-[#c3e6cb]"
          data-oid="lmzv7ae"
        >
          <strong className="block mb-2" data-oid="fbktzug">
            正しい使用法:
          </strong>
          <pre
            className="m-0 whitespace-pre-wrap font-mono text-xs"
            data-oid="2m9:u9e"
          >
            <code data-oid="q9pjod.">{example.correctUsage}</code>
          </pre>
        </div>
        <div
          className="bg-[#f8d7da] text-[#721c24] p-4 rounded-md border border-[#f5c6cb]"
          data-oid="5:cm.pg"
        >
          <strong data-oid="wu4tx.a">間違った使用法:</strong>
          <pre data-oid="h9ibobq">
            <code data-oid="hl7y-7k">{example.incorrectUsage}</code>
          </pre>
        </div>
      </div>
      <p
        className="mb-4 text-[var(--card-text-secondary)] leading-relaxed italic"
        data-oid="gph6f4u"
      >
        {example.explanation}
      </p>
      {example.keyPoints && (
        <div
          className="bg-[var(--section-background)] p-5 rounded-lg mb-4 border-l-4 border-[#3498db]"
          data-oid="8oy1qdv"
        >
          <strong data-oid="agh:qpf">ポイント:</strong>
          <ul data-oid="vu759f9">
            {example.keyPoints.map((point: string, index: number) => (
              <li key={index} data-oid="h6hv.3.">
                {point}
              </li>
            ))}
          </ul>
        </div>
      )}
      {example.tips && (
        <div
          className="bg-gradient-to-br from-[rgba(52,152,219,0.08)] to-[rgba(46,204,113,0.05)] p-5 rounded-lg mb-4 border border-[rgba(52,152,219,0.2)]"
          data-oid="a0o5qpx"
        >
          <strong data-oid="cmm_58e">💡 Tips:</strong>
          <ul data-oid="twdgcy:">
            {example.tips.map((tip: string, index: number) => (
              <li key={index} data-oid="znyp5zp">
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}
      {example.benefits && (
        <div
          className="bg-gradient-to-br from-[rgba(52,152,219,0.08)] to-[rgba(46,204,113,0.05)] p-5 rounded-lg mb-4 border border-[rgba(52,152,219,0.2)]"
          data-oid="-2ns05v"
        >
          <strong data-oid="jcb38w4">✨ 利点:</strong>
          <ul data-oid="e--7n2k">
            {example.benefits.map((benefit: string, idx: number) => (
              <li key={idx} data-oid="v--xkhj">
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  const renderUnionIntersectionExample = (
    example: UnionIntersectionExample,
  ) => (
    <div
      key={example.id}
      className="bg-[var(--section-background)] rounded-lg p-6 mb-6 border border-[var(--border-color)]"
      data-oid="4pd.sxx"
    >
      <h3 data-oid="onzr1ud">{example.name}</h3>
      <p data-oid="7wkq:5-">{example.description}</p>
      <div
        className="bg-[var(--code-background)] text-[var(--code-text)] p-4 rounded-md mb-4 font-mono text-sm"
        data-oid="kg-2xr0"
      >
        <pre data-oid="a7ivus2">
          <code data-oid="rttcd:u">{example.example}</code>
        </pre>
      </div>
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
        data-oid="ezvgkp9"
      >
        <div
          className="bg-[#d4edda] text-[#155724] p-4 rounded-md border border-[#c3e6cb]"
          data-oid="sp:8uf_"
        >
          <strong data-oid="up6i8sy">正しい使用法:</strong>
          <pre data-oid="ulk3t8u">
            <code data-oid="wrgu1g4">{example.correctUsage}</code>
          </pre>
        </div>
        <div
          className="bg-[#f8d7da] text-[#721c24] p-4 rounded-md border border-[#f5c6cb]"
          data-oid="i868hxz"
        >
          <strong data-oid="ezlwt5f">間違った使用法:</strong>
          <pre data-oid="lk.oyyy">
            <code data-oid="_9x-:r.">{example.incorrectUsage}</code>
          </pre>
        </div>
      </div>
      <p
        className="mb-4 text-[var(--card-text-secondary)] leading-relaxed italic"
        data-oid="9sylmhk"
      >
        {example.explanation}
      </p>
      {example.keyPoints && (
        <div
          className="bg-[var(--section-background)] p-5 rounded-lg mb-4 border-l-4 border-[#3498db]"
          data-oid="_7juhg."
        >
          <strong data-oid="11p3kvw">ポイント:</strong>
          <ul data-oid="-g0c00:">
            {example.keyPoints.map((point: string, index: number) => (
              <li key={index} data-oid="lvuijlq">
                {point}
              </li>
            ))}
          </ul>
        </div>
      )}
      {example.tips && (
        <div
          className="bg-gradient-to-br from-[rgba(52,152,219,0.08)] to-[rgba(46,204,113,0.05)] p-5 rounded-lg mb-4 border border-[rgba(52,152,219,0.2)]"
          data-oid="9gr4isg"
        >
          <strong data-oid="6:dkm8r">💡 Tips:</strong>
          <ul data-oid="7fgwa-f">
            {example.tips.map((tip: string, index: number) => (
              <li key={index} data-oid="k30x9n1">
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}
      {example.benefits && (
        <div
          className="bg-gradient-to-br from-[rgba(52,152,219,0.08)] to-[rgba(46,204,113,0.05)] p-5 rounded-lg mb-4 border border-[rgba(52,152,219,0.2)]"
          data-oid="d60yqt_"
        >
          <strong data-oid="x4-d:06">✨ 利点:</strong>
          <ul data-oid="2r:ue8k">
            {example.benefits.map((benefit: string, idx: number) => (
              <li key={idx} data-oid="4yel62y">
                {benefit}
              </li>
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
      data-oid="hhhk.kl"
    >
      <h3 data-oid="nrm5gmb">{example.name}</h3>
      <p data-oid="ock1kb5">{example.description}</p>
      <div
        className="bg-[var(--code-background)] text-[var(--code-text)] p-4 rounded-md mb-4 font-mono text-sm"
        data-oid="32chos6"
      >
        <pre data-oid="nad5lpb">
          <code data-oid="1eiorv8">{example.example}</code>
        </pre>
      </div>
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
        data-oid="7btzyb5"
      >
        <div
          className="bg-[#d4edda] text-[#155724] p-4 rounded-md border border-[#c3e6cb]"
          data-oid="wlskk8a"
        >
          <strong data-oid="kh4zsck">正しい使用法:</strong>
          <pre data-oid="d496c_u">
            <code data-oid="zqks:g_">{example.correctUsage}</code>
          </pre>
        </div>
        <div
          className="bg-[#f8d7da] text-[#721c24] p-4 rounded-md border border-[#f5c6cb]"
          data-oid="x7:8cfo"
        >
          <strong data-oid="k31.74x">間違った使用法:</strong>
          <pre data-oid="hilu3tw">
            <code data-oid="r:8:xs1">{example.incorrectUsage}</code>
          </pre>
        </div>
      </div>
      <p
        className="mb-4 text-[var(--card-text-secondary)] leading-relaxed italic"
        data-oid="24pylgk"
      >
        {example.explanation}
      </p>
      {example.keyPoints && (
        <div
          className="bg-[var(--section-background)] p-5 rounded-lg mb-4 border-l-4 border-[#3498db]"
          data-oid=".m8jygn"
        >
          <strong data-oid="igfua62">ポイント:</strong>
          <ul data-oid="p1fae3f">
            {example.keyPoints.map((point: string, index: number) => (
              <li key={index} data-oid="_dc:yak">
                {point}
              </li>
            ))}
          </ul>
        </div>
      )}
      {example.tips && (
        <div
          className="bg-gradient-to-br from-[rgba(52,152,219,0.08)] to-[rgba(46,204,113,0.05)] p-5 rounded-lg mb-4 border border-[rgba(52,152,219,0.2)]"
          data-oid=".i.4ytm"
        >
          <strong data-oid="f3jlczl">💡 Tips:</strong>
          <ul data-oid="k-hs10m">
            {example.tips.map((tip: string, index: number) => (
              <li key={index} data-oid="d_4y.ef">
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}
      {example.benefits && (
        <div
          className="bg-gradient-to-br from-[rgba(52,152,219,0.08)] to-[rgba(46,204,113,0.05)] p-5 rounded-lg mb-4 border border-[rgba(52,152,219,0.2)]"
          data-oid="sc9lqg3"
        >
          <strong data-oid="25yhifg">✨ 利点:</strong>
          <ul data-oid="6wggv_d">
            {example.benefits.map((benefit: string, idx: number) => (
              <li key={idx} data-oid=".ybhdwe">
                {benefit}
              </li>
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
      data-oid="sdhfcsu"
    >
      <h3 data-oid="38vg18e">{example.name}</h3>
      <p data-oid="p0:3qku">{example.description}</p>
      <div
        className="bg-[var(--code-background)] text-[var(--code-text)] p-4 rounded-md mb-4 font-mono text-sm"
        data-oid="6rnfqx7"
      >
        <pre data-oid="y_nzm95">
          <code data-oid="u3y3sg1">{example.example}</code>
        </pre>
      </div>
      {example.correctUsage && (
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
          data-oid="p1xwp_u"
        >
          <div
            className="bg-[#d4edda] text-[#155724] p-4 rounded-md border border-[#c3e6cb]"
            data-oid="72exokg"
          >
            <strong data-oid="nkq2:tf">正しい使用法:</strong>
            <pre data-oid=":env74e">
              <code data-oid="mqqu7rg">{example.correctUsage}</code>
            </pre>
          </div>
          <div
            className="bg-[#f8d7da] text-[#721c24] p-4 rounded-md border border-[#f5c6cb]"
            data-oid="-w4wrnx"
          >
            <strong data-oid="7gp5nnz">間違った使用法:</strong>
            <pre data-oid="ca22twg">
              <code data-oid="vp7ar-j">{example.incorrectUsage}</code>
            </pre>
          </div>
        </div>
      )}
      <p
        className="mb-4 text-[var(--card-text-secondary)] leading-relaxed italic"
        data-oid="dd0vspz"
      >
        {example.explanation}
      </p>
      {example.keyPoints && (
        <div
          className="bg-[var(--section-background)] p-5 rounded-lg mb-4 border-l-4 border-[#3498db]"
          data-oid="4o0xuah"
        >
          <strong data-oid="-qgf8i3">ポイント:</strong>
          <ul data-oid="_beysu3">
            {example.keyPoints.map((point: string, index: number) => (
              <li key={index} data-oid="b49_k35">
                {point}
              </li>
            ))}
          </ul>
        </div>
      )}
      {example.benefits && (
        <div
          className="bg-gradient-to-br from-[rgba(52,152,219,0.08)] to-[rgba(46,204,113,0.05)] p-5 rounded-lg mb-4 border border-[rgba(52,152,219,0.2)]"
          data-oid="uiqms6s"
        >
          <strong data-oid="u_n.f5n">✨ 利点:</strong>
          <ul data-oid="ct:gehi">
            {example.benefits.map((benefit: string, idx: number) => (
              <li key={idx} data-oid="fs_h6vd">
                {benefit}
              </li>
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
      data-oid="83w0lss"
    >
      <h3 data-oid="5uh:qkm">{example.name}</h3>
      <p data-oid="v.l-_66">{example.description}</p>
      <div
        className="bg-[var(--code-background)] text-[var(--code-text)] p-4 rounded-md mb-4 font-mono text-sm"
        data-oid="9yd_uap"
      >
        <pre data-oid="po3nvek">
          <code data-oid="6zvu5a0">{example.example}</code>
        </pre>
      </div>
      {example.correctUsage && (
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
          data-oid="lnkqn3l"
        >
          <div
            className="bg-[#d4edda] text-[#155724] p-4 rounded-md border border-[#c3e6cb]"
            data-oid="8yr5zct"
          >
            <strong data-oid="r4i-3r7">正しい使用法:</strong>
            <pre data-oid="c.jmulk">
              <code data-oid="aqrc.cz">{example.correctUsage}</code>
            </pre>
          </div>
          <div
            className="bg-[#f8d7da] text-[#721c24] p-4 rounded-md border border-[#f5c6cb]"
            data-oid="atsbrdi"
          >
            <strong data-oid="p_waahq">間違った使用法:</strong>
            <pre data-oid="fk5526w">
              <code data-oid="t04vmkn">{example.incorrectUsage}</code>
            </pre>
          </div>
        </div>
      )}
      <p
        className="mb-4 text-[var(--card-text-secondary)] leading-relaxed italic"
        data-oid="2r66zyj"
      >
        {example.explanation}
      </p>
      {example.keyPoints && (
        <div
          className="bg-[var(--section-background)] p-5 rounded-lg mb-4 border-l-4 border-[#3498db]"
          data-oid="x_ikhf3"
        >
          <strong data-oid="9:ois4m">ポイント:</strong>
          <ul data-oid="0t:g.ew">
            {example.keyPoints.map((point: string, index: number) => (
              <li key={index} data-oid="lp0vzmq">
                {point}
              </li>
            ))}
          </ul>
        </div>
      )}
      {example.benefits && (
        <div
          className="bg-gradient-to-br from-[rgba(52,152,219,0.08)] to-[rgba(46,204,113,0.05)] p-5 rounded-lg mb-4 border border-[rgba(52,152,219,0.2)]"
          data-oid="drl0t1p"
        >
          <strong data-oid="0k-q8cb">✨ 利点:</strong>
          <ul data-oid="r2.x5y4">
            {example.benefits.map((benefit: string, idx: number) => (
              <li key={idx} data-oid="ta7jpr8">
                {benefit}
              </li>
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
      data-oid="n._65lx"
    >
      <h3 data-oid="f-lkh_o">{example.name}</h3>
      <p data-oid=":-g4vy-">{example.description}</p>
      <div
        className="bg-[var(--code-background)] text-[var(--code-text)] p-4 rounded-md mb-4 font-mono text-sm"
        data-oid="tnqpe3q"
      >
        <pre data-oid="3e2w8uv">
          <code data-oid="znwcxav">{example.example}</code>
        </pre>
      </div>
      {example.correctUsage && (
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
          data-oid="g0eeoxf"
        >
          <div
            className="bg-[#d4edda] text-[#155724] p-4 rounded-md border border-[#c3e6cb]"
            data-oid="ldf85f8"
          >
            <strong data-oid="ah58_np">正しい使用法:</strong>
            <pre data-oid="sdl0lvi">
              <code data-oid="578p86h">{example.correctUsage}</code>
            </pre>
          </div>
          <div
            className="bg-[#f8d7da] text-[#721c24] p-4 rounded-md border border-[#f5c6cb]"
            data-oid="ydc:yih"
          >
            <strong data-oid="r4jfnq8">間違った使用法:</strong>
            <pre data-oid="z51fvd-">
              <code data-oid="n-j70sv">{example.incorrectUsage}</code>
            </pre>
          </div>
        </div>
      )}
      <p
        className="mb-4 text-[var(--card-text-secondary)] leading-relaxed italic"
        data-oid="ed.7675"
      >
        {example.explanation}
      </p>
      {example.keyPoints && (
        <div
          className="bg-[var(--section-background)] p-5 rounded-lg mb-4 border-l-4 border-[#3498db]"
          data-oid="2k-n3.e"
        >
          <strong data-oid="8kii_ea">ポイント:</strong>
          <ul data-oid="3jd.th3">
            {example.keyPoints.map((point: string, index: number) => (
              <li key={index} data-oid="495qgyv">
                {point}
              </li>
            ))}
          </ul>
        </div>
      )}
      {example.benefits && (
        <div
          className="bg-gradient-to-br from-[rgba(52,152,219,0.08)] to-[rgba(46,204,113,0.05)] p-5 rounded-lg mb-4 border border-[rgba(52,152,219,0.2)]"
          data-oid="6en5shc"
        >
          <strong data-oid="em:pohh">✨ 利点:</strong>
          <ul data-oid="x8c1zxx">
            {example.benefits.map((benefit: string, idx: number) => (
              <li key={idx} data-oid="l3pwls4">
                {benefit}
              </li>
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
      data-oid="0_fyubb"
    >
      <h3 data-oid="6csyhg6">{example.name}</h3>
      <p data-oid="8u3x:d1">{example.description}</p>
      <div
        className="bg-[var(--code-background)] text-[var(--code-text)] p-4 rounded-md mb-4 font-mono text-sm"
        data-oid=".umzkkj"
      >
        <pre data-oid="cpvmpwn">
          <code data-oid="dw12:-c">{example.example}</code>
        </pre>
      </div>
      {example.correctUsage && (
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
          data-oid="ee3jzwd"
        >
          <div
            className="bg-[#d4edda] text-[#155724] p-4 rounded-md border border-[#c3e6cb]"
            data-oid="yievmcp"
          >
            <strong data-oid="_29q5aa">正しい使用法:</strong>
            <pre data-oid="mb7166j">
              <code data-oid="957bowu">{example.correctUsage}</code>
            </pre>
          </div>
          <div
            className="bg-[#f8d7da] text-[#721c24] p-4 rounded-md border border-[#f5c6cb]"
            data-oid="_yhep7z"
          >
            <strong data-oid="8mikncy">間違った使用法:</strong>
            <pre data-oid="dc0vz3g">
              <code data-oid="39lms0b">{example.incorrectUsage}</code>
            </pre>
          </div>
        </div>
      )}
      <p
        className="mb-4 text-[var(--card-text-secondary)] leading-relaxed italic"
        data-oid="89b2ukf"
      >
        {example.explanation}
      </p>
      {example.keyPoints && (
        <div
          className="bg-[var(--section-background)] p-5 rounded-lg mb-4 border-l-4 border-[#3498db]"
          data-oid="ft4e43:"
        >
          <strong data-oid="79lg3fb">ポイント:</strong>
          <ul data-oid="px9qnhs">
            {example.keyPoints.map((point: string, index: number) => (
              <li key={index} data-oid="gvmnmj3">
                {point}
              </li>
            ))}
          </ul>
        </div>
      )}
      {example.benefits && (
        <div
          className="bg-gradient-to-br from-[rgba(52,152,219,0.08)] to-[rgba(46,204,113,0.05)] p-5 rounded-lg mb-4 border border-[rgba(52,152,219,0.2)]"
          data-oid="rbfjt6-"
        >
          <strong data-oid="8im6gmo">✨ 利点:</strong>
          <ul data-oid="eanm.3t">
            {example.benefits.map((benefit: string, idx: number) => (
              <li key={idx} data-oid="_yrf0.8">
                {benefit}
              </li>
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
      data-oid="5i5nwlm"
    >
      <h3 data-oid="e0gok1v">{example.name}</h3>
      <p data-oid="vtlsihk">{example.description}</p>
      <div
        className="bg-[var(--code-background)] text-[var(--code-text)] p-4 rounded-md mb-4 font-mono text-sm"
        data-oid="2ip6c1:"
      >
        <pre data-oid=":2kixm2">
          <code data-oid="4zbyk29">{example.example}</code>
        </pre>
      </div>
      {example.correctUsage && (
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
          data-oid="vc1mn60"
        >
          <div
            className="bg-[#d4edda] text-[#155724] p-4 rounded-md border border-[#c3e6cb]"
            data-oid="s-6lv8m"
          >
            <strong data-oid="d-k_hri">正しい使用法:</strong>
            <pre data-oid="vpz6p1t">
              <code data-oid="7xtqjf8">{example.correctUsage}</code>
            </pre>
          </div>
          <div
            className="bg-[#f8d7da] text-[#721c24] p-4 rounded-md border border-[#f5c6cb]"
            data-oid="cf7n1ka"
          >
            <strong data-oid="cjj5c1e">間違った使用法:</strong>
            <pre data-oid="chqvwq9">
              <code data-oid="6n5_tag">{example.incorrectUsage}</code>
            </pre>
          </div>
        </div>
      )}
      <p
        className="mb-4 text-[var(--card-text-secondary)] leading-relaxed italic"
        data-oid="rd5mfea"
      >
        {example.explanation}
      </p>
      {example.keyPoints && (
        <div
          className="bg-[var(--section-background)] p-5 rounded-lg mb-4 border-l-4 border-[#3498db]"
          data-oid="10i4z7k"
        >
          <strong data-oid="90m:nhg">ポイント:</strong>
          <ul data-oid="1a4.z:5">
            {example.keyPoints.map((point: string, index: number) => (
              <li key={index} data-oid="-o-6xxx">
                {point}
              </li>
            ))}
          </ul>
        </div>
      )}
      {example.benefits && (
        <div
          className="bg-gradient-to-br from-[rgba(52,152,219,0.08)] to-[rgba(46,204,113,0.05)] p-5 rounded-lg mb-4 border border-[rgba(52,152,219,0.2)]"
          data-oid="oxnbx3k"
        >
          <strong data-oid="-v9i58p">✨ 利点:</strong>
          <ul data-oid="ez05d82">
            {example.benefits.map((benefit: string, idx: number) => (
              <li key={idx} data-oid="bp8mix3">
                {benefit}
              </li>
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
      return <p data-oid="9yz56vc">このセクションには例がありません。</p>;
    }
    switch (activeSection) {
      case "variables":
        return (currentSectionData.examples as VariableExample[]).map(
          (example) => renderVariableExample(example),
        );
      case "primitives":
        return (currentSectionData.examples as PrimitiveExample[]).map(
          (example) => renderPrimitiveExample(example),
        );
      case "arrays":
        return (currentSectionData.examples as ArrayExample[]).map((example) =>
          renderArrayExample(example),
        );
      case "objects":
        return (currentSectionData.examples as ObjectExample[]).map((example) =>
          renderObjectExample(example),
        );
      case "any":
        return (currentSectionData.examples as AnyExample[]).map((example) =>
          renderAnyExample(example),
        );
      case "unknown":
        return (currentSectionData.examples as AnyExample[]).map((example) =>
          renderAnyExample(example),
        );
      case "functions":
        return (currentSectionData.examples as FunctionExample[]).map(
          (example) => renderFunctionExample(example),
        );
      case "inference":
        return (currentSectionData.examples as InferenceExample[]).map(
          (example) => renderInferenceExample(example),
        );
      case "assertion":
        return (currentSectionData.examples as AssertionExample[]).map(
          (example) => renderAssertionExample(example),
        );
      case "alias":
        return (currentSectionData.examples as AliasExample[]).map((example) =>
          renderAliasExample(example),
        );
      case "interface":
        return (currentSectionData.examples as InterfaceExample[]).map(
          (example) => renderInterfaceExample(example),
        );
      case "class":
        return (currentSectionData.examples as ClassExample[]).map((example) =>
          renderClassExample(example),
        );
      case "enum":
        return (currentSectionData.examples as EnumExample[]).map((example) =>
          renderEnumExample(example),
        );
      case "generic":
        return (currentSectionData.examples as GenericExample[]).map(
          (example) => renderGenericExample(example),
        );
      case "unionintersection":
        return (currentSectionData.examples as UnionIntersectionExample[]).map(
          (example) => renderUnionIntersectionExample(example),
        );
      case "literal":
        return (currentSectionData.examples as LiteralExample[]).map(
          (example) => renderLiteralExample(example),
        );
      case "never":
        return (currentSectionData.examples as NeverExample[]).map(
          (example) => (
            <div
              key={example.title}
              className="bg-[var(--section-background)] rounded-lg p-6 mb-6 border border-[var(--border-color)]"
              data-oid="kw_u.5u"
            >
              <h3 data-oid="13mh-bk">{example.title}</h3>
              <p data-oid="m93_0js">{example.description}</p>
              <div
                className="bg-[var(--code-background)] text-[var(--code-text)] p-4 rounded-md mb-4 font-mono text-sm"
                data-oid="rzh4.n8"
              >
                <pre data-oid="km1n5.r">
                  <code data-oid="egeaq0m">{example.code}</code>
                </pre>
              </div>
              {example.points && (
                <div
                  className="bg-[var(--section-background)] p-5 rounded-lg mb-4 border-l-4 border-[#3498db]"
                  data-oid="rifi_zy"
                >
                  <strong data-oid="4tx_hzk">ポイント:</strong>
                  <ul data-oid="dmko0bf">
                    {example.points.map((point, index) => (
                      <li key={index} data-oid="440hbtm">
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ),
        );
      case "optional-chaining":
        return (currentSectionData.examples as OptionalChainingExample[]).map(
          (example) => renderOptionalChainingExample(example),
        );
      case "non-null-assertion":
        return (currentSectionData.examples as OptionalChainingExample[]).map(
          (example) => renderTypeGuardExample(example),
        );
      case "nullish-coalescing":
        return (currentSectionData.examples as OptionalChainingExample[]).map(
          (example) => renderOptionalChainingExample(example),
        );
      case "type-guard":
        return (currentSectionData.examples as OptionalChainingExample[]).map(
          (example) => renderTypeGuardExample(example),
        );
      case "keyof-operator":
        return (currentSectionData.examples as OptionalChainingExample[]).map(
          (example) => renderKeyofOperatorExample(example),
        );
      case "index-signature":
        return (currentSectionData.examples as OptionalChainingExample[]).map(
          (example) => renderIndexSignatureExample(example),
        );
      case "readonly":
        return (currentSectionData.examples as OptionalChainingExample[]).map(
          (example) => renderReadonlyExample(example),
        );
      case "async-await":
        return (currentSectionData.examples as OptionalChainingExample[]).map(
          (example) => renderOptionalChainingExample(example),
        );
      default:
        return <p data-oid="8xj4dcz">このセクションには例がありません。</p>;
    }
  };

  // 練習問題のセクションにunknown型を追加
  if (!("unknown" in sectionPracticeQuestions)) {
    (sectionPracticeQuestions as Record<string, PracticeQuestion[]>).unknown =
      unknownTypePractice as PracticeQuestion[];
  }

  return (
    <div
      className="flex flex-col items-center min-h-screen p-10 px-5 font-sans leading-relaxed max-w-[1200px] mx-auto py-4 px-8 md:p-5 md:px-4"
      data-oid="2huaw4d"
    >
      <main
        className="max-w-[1000px] w-full flex flex-col gap-10"
        data-oid="f::03x2"
      >
        <header className="text-center mb-8" data-oid="k:m-7ha">
          <h1
            className="text-4xl font-bold m-0 mb-4 text-foreground md:text-3xl"
            data-oid="4p.zjqy"
          >
            TypeScript 学習
          </h1>
          <p
            className="text-lg text-foreground opacity-80 m-0 md:text-base"
            data-oid="8dm4-7h"
          >
            TypeScriptの学習サイトです。
          </p>
        </header>

        {/* セクション切り替え */}
        <div
          className="flex justify-center gap-4 mb-12 flex-wrap"
          data-oid="rs.n04v"
        >
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
                    | "async-await",
                )
              }
              data-oid="bba-4_9"
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
          data-oid="w_do.zl"
        >
          <h2
            className="text-[var(--card-text)] mb-4 text-3xl font-bold"
            data-oid="0f.pcjb"
          >
            {currentSectionData?.title}
          </h2>
          <p
            className="text-lg leading-relaxed text-[var(--card-text-secondary)] mb-8"
            data-oid="mueiqvz"
          >
            {currentSectionData?.description}
          </p>

          {(currentSectionData as import("@/types/typescript").LearningSection)
            ?.benefits && (
            <div
              className="bg-gradient-to-br from-[rgba(52,152,219,0.08)] to-[rgba(46,204,113,0.05)] p-5 rounded-lg mb-6 border border-[rgba(52,152,219,0.2)]"
              data-oid="xialsv4"
            >
              <strong
                className="block mb-2 text-[var(--card-text)]"
                data-oid="f9u-gk5"
              >
                ✨ このセクションの利点:
              </strong>
              <ul
                className="list-none p-0 space-y-1 text-[var(--card-text)]"
                data-oid="i.7hd7l"
              >
                {(
                  currentSectionData as import("@/types/typescript").LearningSection
                ).benefits?.map((benefit: string, idx: number) => (
                  <li key={idx} data-oid="eurx1v6">
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div
            className="bg-[var(--section-background)] p-6 rounded-lg mb-8 border-l-4 border-[#3498db]"
            data-oid="1yu_v-d"
          >
            <h3
              className="text-[var(--card-text)] mb-4 text-xl font-semibold"
              data-oid="fnkguql"
            >
              重要なポイント
            </h3>
            <ul className="list-none p-0" data-oid="xo1.tkl">
              {(
                currentSectionData as import("@/types/typescript").LearningSection
              )?.keyPoints?.map((point: string, index: number) => (
                <li
                  key={index}
                  className="py-2 pl-6 relative text-[var(--card-text-secondary)] before:content-['✓'] before:absolute before:left-0 before:text-[#27ae60] before:font-bold"
                  data-oid=".ksm0lc"
                >
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8" data-oid="lmgr4m-">
            <h3
              className="text-[var(--card-text)] mb-6 text-2xl font-bold"
              data-oid="3t6:.oy"
            >
              型の例
            </h3>
            {renderExamples()}
          </div>
        </section>

        {/* 練習問題セクション */}
        <section
          ref={practiceSectionRef}
          className={`bg-[var(--card-background)] rounded-xl p-8 mb-12 shadow-[0_4px_6px_var(--shadow-color)] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${practiceSectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          data-oid="l..1tkl"
        >
          <h2
            className="text-[var(--card-text)] mb-6 text-3xl font-bold"
            data-oid="w5bhclw"
          >
            🧪 {currentSectionData?.title}の練習問題
          </h2>
          {currentSectionQuestions && currentSectionQuestions.length > 0 ? (
            <>
              <div
                className="flex justify-center items-center p-4 bg-[var(--section-background)] rounded-lg mb-6 text-sm font-semibold text-[var(--card-text)]"
                data-oid="6gt-z8i"
              >
                問題 {currentQuestion + 1} / {currentSectionQuestions.length}
              </div>

              {!showResult ? (
                !showFeedback ? (
                  <div
                    className="bg-[var(--card-background)] border border-[var(--border-color)] rounded-xl p-8 shadow-[0_2px_8px_var(--shadow-color)] md:p-6"
                    data-oid="wahlp2d"
                  >
                    <h3
                      className="mb-5 text-[var(--card-text)] text-2xl"
                      data-oid="ed1_7l2"
                    >
                      {currentSectionQuestions[currentQuestion].question}
                    </h3>
                    {currentSectionQuestions[currentQuestion].code && (
                      <pre
                        className="bg-[var(--section-background)] border border-[var(--border-color)] rounded-lg p-4 mb-5 overflow-x-auto font-mono text-sm"
                        data-oid="b-:3o-b"
                      >
                        <code
                          className="text-[var(--card-text)]"
                          data-oid="vx_8u3l"
                        >
                          {currentSectionQuestions[currentQuestion].code}
                        </code>
                      </pre>
                    )}
                    <div
                      className="flex flex-col gap-3 mb-6"
                      data-oid="apejg8i"
                    >
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
                            data-oid="rhoc13r"
                          >
                            {option}
                          </button>
                        ),
                      )}
                    </div>
                    <button
                      className="w-full py-3 px-6 border-none rounded-lg text-base font-semibold cursor-pointer transition-all duration-200 bg-[#3498db] text-white hover:bg-[#2980b9] disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={handleSubmitAnswer}
                      disabled={selectedAnswer === null}
                      data-oid=":kha87b"
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
                    data-oid="bt4s4ln"
                  >
                    <h3
                      className="text-2xl font-semibold mb-3"
                      data-oid="p1-rf9b"
                    >
                      {answerResults[currentQuestion]?.isCorrect
                        ? "✅ 正解！"
                        : "❌ 不正解"}
                    </h3>
                    <p className="mb-6 leading-relaxed" data-oid="hlfudwr">
                      {currentSectionQuestions[currentQuestion].explanation}
                    </p>
                    <button
                      className="w-full py-3 px-6 border-none rounded-lg text-base font-semibold cursor-pointer transition-all duration-200 bg-[#3498db] text-white hover:bg-[#2980b9]"
                      onClick={handleNextQuestion}
                      data-oid="-9.v20g"
                    >
                      {currentQuestion < currentSectionQuestions.length - 1
                        ? "次の問題"
                        : "結果を見る"}
                    </button>
                  </div>
                )
              ) : (
                <div
                  className="bg-[var(--card-background)] border border-[var(--border-color)] rounded-xl p-8 shadow-[0_2px_8px_var(--shadow-color)] md:p-6"
                  data-oid="e-_yl-s"
                >
                  <h3
                    className="text-2xl font-semibold mb-4 text-[var(--card-text)]"
                    data-oid="82j0o_p"
                  >
                    🎉 {currentSectionData?.title}の練習完了！
                  </h3>
                  <p
                    className="mb-2 text-[var(--card-text)]"
                    data-oid="4qkqgm4"
                  >
                    正解数: {answerResults.filter((r) => r.isCorrect).length} /{" "}
                    {currentSectionQuestions.length}
                  </p>
                  <p
                    className="mb-6 text-[var(--card-text)]"
                    data-oid=":ntzb53"
                  >
                    正答率:{" "}
                    {Math.round(
                      (answerResults.filter((r) => r.isCorrect).length /
                        currentSectionQuestions.length) *
                        100,
                    )}
                    %
                  </p>
                  <div className="mb-8" data-oid="w:v-hsj">
                    <h4
                      className="text-xl font-semibold mb-4 text-[var(--card-text)]"
                      data-oid="if1ahx2"
                    >
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
                        data-oid="-d.i-e7"
                      >
                        <div
                          className="flex justify-between items-center mb-3 flex-wrap gap-2.5"
                          data-oid="o.i70q3"
                        >
                          <span
                            className="font-semibold text-[var(--card-text)]"
                            data-oid="tf90g:1"
                          >
                            問題{idx + 1}：
                          </span>
                          <span className="text-xl" data-oid="xt.ovam">
                            {result.isCorrect ? "✅" : "❌"}
                          </span>
                        </div>
                        <div
                          className="mb-3 text-[var(--card-text)]"
                          data-oid="88crezc"
                        >
                          <strong data-oid="p5o3t0v">Q.</strong>{" "}
                          {result.question}
                        </div>
                        {result.code && (
                          <pre
                            className="bg-[var(--section-background)] border border-[var(--border-color)] rounded-lg p-3 mb-3 overflow-x-auto font-mono text-xs"
                            data-oid="493ri7i"
                          >
                            <code
                              className="text-[var(--card-text)]"
                              data-oid="0l2lmkw"
                            >
                              {result.code}
                            </code>
                          </pre>
                        )}
                        <div
                          className="mb-2 text-[var(--card-text)]"
                          data-oid="9urs-_n"
                        >
                          <strong data-oid="8-ksmn2">あなたの解答：</strong>{" "}
                          {result.options[result.selected]}
                        </div>
                        <div
                          className="mb-2 text-[var(--card-text)]"
                          data-oid="3g84o7b"
                        >
                          <strong data-oid="43no87k">正解：</strong>{" "}
                          {result.options[result.correct]}
                        </div>
                        <div
                          className="text-[var(--card-text)] leading-relaxed"
                          data-oid="30rr.qb"
                        >
                          <strong data-oid="gn5yreb">解説：</strong>{" "}
                          {result.explanation}
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    className="w-full py-4 px-6 border-none rounded-lg text-lg font-semibold cursor-pointer transition-all duration-200 bg-[#3498db] text-white hover:bg-[#2980b9]"
                    onClick={resetQuiz}
                    data-oid="l2vy3:w"
                  >
                    もう一度練習する
                  </button>
                </div>
              )}
            </>
          ) : (
            <div
              className="text-center p-8 text-[var(--card-text-secondary)]"
              data-oid="5a9fu67"
            >
              <p className="m-0" data-oid="_7w9u9l">
                このセクションには練習問題がありません。
              </p>
            </div>
          )}
        </section>

        <div
          className="text-center mt-5 flex justify-center gap-4 flex-wrap"
          data-oid="jm0v3h0"
        >
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-foreground text-background no-underline rounded-lg font-medium transition-opacity duration-200 hover:opacity-80"
            data-oid=":66strg"
          >
            ← ホームに戻る
          </Link>
          <Link
            href="/quiz"
            className="inline-flex items-center px-6 py-3 bg-foreground text-background no-underline rounded-lg font-medium transition-opacity duration-200 hover:opacity-80"
            data-oid="r6ixupy"
          >
            🧪 改善版クイズに挑戦 →
          </Link>
        </div>
      </main>
    </div>
  );
}
