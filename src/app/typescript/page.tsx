'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../styles/typescript.module.css';
import { primitiveTypesData, arrayTypesData, objectTypesData, anyTypesData, functionTypesData, inferenceTypesData, assertionTypesData, aliasTypesData, variableTypesData, sectionPracticeQuestions, interfaceTypesData, classTypesData, enumTypesData, genericTypesData, unionIntersectionTypesData, literalTypesData, neverTypesData, optionalChainingData, nonNullAssertionData, nullishCoalescingData, typeGuardData, keyofOperatorData, indexSignatureData, readonlyData, unknownTypeData, unknownTypePractice, asyncAwaitData, typeDefinitionData } from '@/data/typescript-data';
import { PrimitiveExample, ArrayExample, ObjectExample, AnyExample, FunctionExample, InferenceExample, AssertionExample, AliasExample, VariableExample, PracticeQuestion, InterfaceExample, ClassExample, EnumExample, GenericExample, UnionIntersectionExample, LiteralExample, NeverExample } from '@/types/typescript';

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
  const [activeSection, setActiveSection] = useState<'variables' | 'primitives' | 'arrays' | 'objects' | 'any' | 'unknown' | 'functions' | 'inference' | 'assertion' | 'alias' | 'interface' | 'class' | 'enum' | 'generic' | 'unionintersection' | 'literal' | 'never' | 'optional-chaining' | 'non-null-assertion' | 'nullish-coalescing' | 'type-guard' | 'keyof-operator' | 'index-signature' | 'readonly' | 'async-await'>('variables');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answerResults, setAnswerResults] = useState<{ selected: number; correct: number; isCorrect: boolean; explanation: string; question: string; code?: string; options: string[] }[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);

  const sections = [
    { id: 'variables', title: '変数', data: variableTypesData },
    { id: 'primitives', title: 'プリミティブ型', data: primitiveTypesData },
    { id: 'arrays', title: '配列型', data: arrayTypesData },
    { id: 'objects', title: 'オブジェクト型', data: objectTypesData },
    { id: 'any', title: 'any型', data: anyTypesData },
    { id: 'unknown', title: 'unknown型', data: unknownTypeData },
    { id: 'async-await', title: 'Async/Await', data: asyncAwaitData },
    { id: 'functions', title: '関数型', data: functionTypesData },
    { id: 'inference', title: '型推論', data: inferenceTypesData },
    { id: 'assertion', title: '型アサーション', data: assertionTypesData },
    { id: 'alias', title: '型エイリアス', data: aliasTypesData },
    { id: 'interface', title: 'インタフェース', data: interfaceTypesData },
    { id: 'class', title: 'クラス', data: classTypesData },
    { id: 'enum', title: 'Enum型', data: enumTypesData },
    { id: 'generic', title: 'ジェネリック型', data: genericTypesData },
    { id: 'unionintersection', title: 'Union型・Intersection型', data: unionIntersectionTypesData },
    { id: 'literal', title: 'リテラル型', data: literalTypesData },
    { id: 'never', title: 'never型', data: neverTypesData },
    { id: 'optional-chaining', title: 'Optional Chaining', data: optionalChainingData },
    { id: 'non-null-assertion', title: 'Non-null Assertion Operator', data: nonNullAssertionData },
    { id: 'nullish-coalescing', title: 'Nullish Coalescing Operator', data: nullishCoalescingData },
    { id: 'type-guard', title: '型ガード', data: typeGuardData },
    { id: 'keyof-operator', title: 'keyofオペレーター', data: keyofOperatorData },
    { id: 'index-signature', title: 'インデックス型', data: indexSignatureData },
    { id: 'readonly', title: 'readonly', data: readonlyData },
    { id: 'type-definition', title: '型定義ファイル', data: typeDefinitionData },
  ];

  const currentSectionData = sections.find(section => section.id === activeSection)?.data;

  // 現在のセクションに対応する問題を取得
  const currentSectionQuestions = (sectionPracticeQuestions[activeSection] as PracticeQuestion[] || []);

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
    setAnswerResults(prev => [
      ...prev,
      {
        selected: selectedAnswer,
        correct: question.correctAnswer,
        isCorrect,
        explanation: question.explanation,
        question: question.question,
        code: question.code,
        options: question.options
      }
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
    <div key={example.id} className={styles.exampleCard}>
      <h3>{example.name}</h3>
      <p>{example.description}</p>
      <div className={styles.codeBlock}>
        <code>{example.example}</code>
      </div>
      <div className={styles.valueComparison}>
        <div className={styles.correctValue}>
          <strong>正しい値:</strong> <code>{String(example.correctValue)}</code>
        </div>
        <div className={styles.incorrectValue}>
          <strong>間違った値:</strong> <code>{String(example.incorrectValue)}</code>
        </div>
      </div>
      <p className={styles.explanation}>{example.explanation}</p>
      {example.keyPoints && (
        <div className={styles.keyPoints}>
          <strong>ポイント:</strong>
          <ul>
            {example.keyPoints.map((point: string, index: number) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
      )}
      {example.benefits && (
        <div className={styles.benefits}>
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

  const renderArrayExample = (example: ArrayExample) => (
    <div key={example.id} className={styles.exampleCard}>
      <h3>{example.name}</h3>
      <p>{example.description}</p>
      <div className={styles.syntaxBlock}>
        <strong>構文:</strong> <code>{example.syntax}</code>
      </div>
      <div className={styles.codeBlock}>
        <pre><code>{example.example}</code></pre>
      </div>
      <div className={styles.usageComparison}>
        <div className={styles.correctUsage}>
          <strong>正しい使用法:</strong>
          <pre><code>{example.correctUsage}</code></pre>
        </div>
        <div className={styles.incorrectUsage}>
          <strong>間違った使用法:</strong>
          <pre><code>{example.incorrectUsage}</code></pre>
        </div>
      </div>
      <p className={styles.explanation}>{example.explanation}</p>
      {example.keyPoints && (
        <div className={styles.keyPoints}>
          <strong>ポイント:</strong>
          <ul>
            {example.keyPoints.map((point: string, index: number) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
      )}
      {example.benefits && (
        <div className={styles.benefits}>
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

  const renderObjectExample = (example: ObjectExample) => (
    <div key={example.id} className={styles.exampleCard}>
      <h3>{example.name}</h3>
      <p>{example.description}</p>
      <div className={styles.syntaxBlock}>
        <strong>構文:</strong> <code>{example.syntax}</code>
      </div>
      <div className={styles.codeBlock}>
        <pre><code>{example.example}</code></pre>
      </div>
      <div className={styles.usageComparison}>
        <div className={styles.correctUsage}>
          <strong>正しい使用法:</strong>
          <pre><code>{example.correctUsage}</code></pre>
        </div>
        <div className={styles.incorrectUsage}>
          <strong>間違った使用法:</strong>
          <pre><code>{example.incorrectUsage}</code></pre>
        </div>
      </div>
      <p className={styles.explanation}>{example.explanation}</p>
      {example.keyPoints && (
        <div className={styles.keyPoints}>
          <strong>ポイント:</strong>
          <ul>
            {example.keyPoints.map((point: string, index: number) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
      )}
      {example.benefits && (
        <div className={styles.benefits}>
          <strong>✨ 利点:</strong>
          <ul>
            {example.benefits.map((benefit: string, idx: number) => (
              <li key={idx}>{benefit}</li>
            ))}
          </ul>
        </div>
      )}
      {example.optionalProperties && (
        <div className={styles.optionalProperties}>
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
    <div key={example.id} className={styles.exampleCard}>
      <h3>{example.name}</h3>
      <p>{example.description}</p>
      <div className={styles.codeBlock}>
        <pre><code>{example.example}</code></pre>
      </div>
      <div className={styles.usageComparison}>
        <div className={styles.correctUsage}>
          <strong>推奨される使用法:</strong>
          <pre><code>{example.correctUsage}</code></pre>
        </div>
        <div className={styles.incorrectUsage}>
          <strong>避けるべき使用法:</strong>
          <pre><code>{example.incorrectUsage}</code></pre>
        </div>
      </div>
      <p className={styles.explanation}>{example.explanation}</p>
      {example.keyPoints && (
        <div className={styles.keyPoints}>
          <strong>ポイント:</strong>
          <ul>
            {example.keyPoints.map((point: string, index: number) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
      )}
      <div className={styles.warnings}>
        <strong>⚠️ 注意点:</strong>
        <ul>
          {example.warnings.map((warning: string, index: number) => (
            <li key={index}>{warning}</li>
          ))}
        </ul>
      </div>
      {example.benefits && (
        <div className={styles.benefits}>
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
    <div key={example.id} className={styles.exampleCard}>
      <h3>{example.name}</h3>
      <p>{example.description}</p>
      <div className={styles.syntaxBlock}>
        <strong>構文:</strong> <code>{example.syntax}</code>
      </div>
      <div className={styles.codeBlock}>
        <pre><code>{example.example}</code></pre>
      </div>
      <div className={styles.usageComparison}>
        <div className={styles.correctUsage}>
          <strong>正しい使用法:</strong>
          <pre><code>{example.correctUsage}</code></pre>
        </div>
        <div className={styles.incorrectUsage}>
          <strong>間違った使用法:</strong>
          <pre><code>{example.incorrectUsage}</code></pre>
        </div>
      </div>
      <p className={styles.explanation}>{example.explanation}</p>
      {example.keyPoints && (
        <div className={styles.keyPoints}>
          <strong>ポイント:</strong>
          <ul>
            {example.keyPoints.map((point: string, index: number) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
      )}
      {example.parameters && (
        <div className={styles.parameters}>
          <strong>📝 パラメータ:</strong>
          <ul>
            {example.parameters.map((param: string, index: number) => (
              <li key={index}>{param}</li>
            ))}
          </ul>
        </div>
      )}
      {example.benefits && (
        <div className={styles.benefits}>
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
    <div key={example.id} className={styles.exampleCard}>
      <h3>{example.name}</h3>
      <p>{example.description}</p>
      <div className={styles.codeBlock}>
        <pre><code>{example.example}</code></pre>
      </div>
      <div className={styles.usageComparison}>
        <div className={styles.correctUsage}>
          <strong>正しい使用法:</strong>
          <pre><code>{example.correctUsage}</code></pre>
        </div>
        <div className={styles.incorrectUsage}>
          <strong>間違った使用法:</strong>
          <pre><code>{example.incorrectUsage}</code></pre>
        </div>
      </div>
      <p className={styles.explanation}>{example.explanation}</p>
      {example.keyPoints && (
        <div className={styles.keyPoints}>
          <strong>ポイント:</strong>
          <ul>
            {example.keyPoints.map((point: string, index: number) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
      )}
      {example.benefits && (
        <div className={styles.benefits}>
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
    <div key={example.id} className={styles.exampleCard}>
      <h3>{example.name}</h3>
      <p>{example.description}</p>
      <div className={styles.codeBlock}>
        <pre><code>{example.example}</code></pre>
      </div>
      <div className={styles.usageComparison}>
        <div className={styles.correctUsage}>
          <strong>正しい使用法:</strong>
          <pre><code>{example.correctUsage}</code></pre>
        </div>
        <div className={styles.incorrectUsage}>
          <strong>間違った使用法:</strong>
          <pre><code>{example.incorrectUsage}</code></pre>
        </div>
      </div>
      <p className={styles.explanation}>{example.explanation}</p>
      {example.keyPoints && (
        <div className={styles.keyPoints}>
          <strong>ポイント:</strong>
          <ul>
            {example.keyPoints.map((point: string, index: number) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
      )}
      <div className={styles.cautions}>
        <strong>⚠️ 注意点:</strong>
        <ul>
          {example.cautions.map((caution: string, index: number) => (
            <li key={index}>{caution}</li>
          ))}
        </ul>
      </div>
      {example.benefits && (
        <div className={styles.benefits}>
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
    <div key={example.id} className={styles.exampleCard}>
      <h3>{example.name}</h3>
      <p>{example.description}</p>
      <div className={styles.codeBlock}>
        <pre><code>{example.example}</code></pre>
      </div>
      <div className={styles.usageComparison}>
        <div className={styles.correctUsage}>
          <strong>正しい使用法:</strong>
          <pre><code>{example.correctUsage}</code></pre>
        </div>
        <div className={styles.incorrectUsage}>
          <strong>間違った使用法:</strong>
          <pre><code>{example.incorrectUsage}</code></pre>
        </div>
      </div>
      <p className={styles.explanation}>{example.explanation}</p>
      {example.keyPoints && (
        <div className={styles.keyPoints}>
          <strong>ポイント:</strong>
          <ul>
            {example.keyPoints.map((point: string, index: number) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
      )}
      {example.benefits && (
        <div className={styles.benefits}>
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
    <div key={example.id} className={styles.exampleCard}>
      <h3>{example.name}</h3>
      <p>{example.description}</p>
      {example.example && (
        <div className={styles.codeBlock}>
          <pre><code>{example.example}</code></pre>
        </div>
      )}
      <div className={styles.usageComparison}>
        <div className={styles.correctUsage}>
          <strong>正しい使用法:</strong>
          <pre><code>{example.correctUsage}</code></pre>
        </div>
        <div className={styles.incorrectUsage}>
          <strong>間違った使用法:</strong>
          <pre><code>{example.incorrectUsage}</code></pre>
        </div>
      </div>
      <p className={styles.explanation}>{example.explanation}</p>
      {example.keyPoints && (
        <div className={styles.keyPoints}>
          <strong>ポイント:</strong>
          <ul>
            {example.keyPoints.map((point: string, index: number) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
      )}
      {example.tips && (
        <div className={styles.benefits}>
          <strong>💡 Tips:</strong>
          <ul>
            {example.tips.map((tip: string, index: number) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      )}
      {example.benefits && (
        <div className={styles.benefits}>
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
    <div key={example.id} className={styles.exampleCard}>
      <h3>{example.name}</h3>
      <p>{example.description}</p>
      <div className={styles.codeBlock}>
        <pre><code>{example.example}</code></pre>
      </div>
      <div className={styles.usageComparison}>
        <div className={styles.correctUsage}>
          <strong>正しい使用法:</strong>
          <pre><code>{example.correctUsage}</code></pre>
        </div>
        <div className={styles.incorrectUsage}>
          <strong>間違った使用法:</strong>
          <pre><code>{example.incorrectUsage}</code></pre>
        </div>
      </div>
      <p className={styles.explanation}>{example.explanation}</p>
      {example.keyPoints && (
        <div className={styles.keyPoints}>
          <strong>ポイント:</strong>
          <ul>
            {example.keyPoints.map((point: string, index: number) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
      )}
      {example.tips && (
        <div className={styles.benefits}>
          <strong>💡 Tips:</strong>
          <ul>
            {example.tips.map((tip: string, index: number) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      )}
      {example.benefits && (
        <div className={styles.benefits}>
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
    <div key={example.id} className={styles.exampleCard}>
      <h3>{example.name}</h3>
      <p>{example.description}</p>
      <div className={styles.codeBlock}>
        <pre><code>{example.example}</code></pre>
      </div>
      <div className={styles.usageComparison}>
        <div className={styles.correctUsage}>
          <strong>正しい使用法:</strong>
          <pre><code>{example.correctUsage}</code></pre>
        </div>
        <div className={styles.incorrectUsage}>
          <strong>間違った使用法:</strong>
          <pre><code>{example.incorrectUsage}</code></pre>
        </div>
      </div>
      <p className={styles.explanation}>{example.explanation}</p>
      {example.keyPoints && (
        <div className={styles.keyPoints}>
          <strong>ポイント:</strong>
          <ul>
            {example.keyPoints.map((point: string, index: number) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
      )}
      {example.tips && (
        <div className={styles.benefits}>
          <strong>💡 Tips:</strong>
          <ul>
            {example.tips.map((tip: string, index: number) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      )}
      {example.benefits && (
        <div className={styles.benefits}>
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
    <div key={example.id} className={styles.exampleCard}>
      <h3>{example.name}</h3>
      <p>{example.description}</p>
      <div className={styles.codeBlock}>
        <pre><code>{example.example}</code></pre>
      </div>
      <div className={styles.usageComparison}>
        <div className={styles.correctUsage}>
          <strong>正しい使用法:</strong>
          <pre><code>{example.correctUsage}</code></pre>
        </div>
        <div className={styles.incorrectUsage}>
          <strong>間違った使用法:</strong>
          <pre><code>{example.incorrectUsage}</code></pre>
        </div>
      </div>
      <p className={styles.explanation}>{example.explanation}</p>
      {example.keyPoints && (
        <div className={styles.keyPoints}>
          <strong>ポイント:</strong>
          <ul>
            {example.keyPoints.map((point: string, index: number) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
      )}
      {example.tips && (
        <div className={styles.benefits}>
          <strong>💡 Tips:</strong>
          <ul>
            {example.tips.map((tip: string, index: number) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      )}
      {example.benefits && (
        <div className={styles.benefits}>
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
    <div key={example.id} className={styles.exampleCard}>
      <h3>{example.name}</h3>
      <p>{example.description}</p>
      <div className={styles.codeBlock}>
        <pre><code>{example.example}</code></pre>
      </div>
      <div className={styles.usageComparison}>
        <div className={styles.correctUsage}>
          <strong>正しい使用法:</strong>
          <pre><code>{example.correctUsage}</code></pre>
        </div>
        <div className={styles.incorrectUsage}>
          <strong>間違った使用法:</strong>
          <pre><code>{example.incorrectUsage}</code></pre>
        </div>
      </div>
      <p className={styles.explanation}>{example.explanation}</p>
      {example.keyPoints && (
        <div className={styles.keyPoints}>
          <strong>ポイント:</strong>
          <ul>
            {example.keyPoints.map((point: string, index: number) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
      )}
      {example.tips && (
        <div className={styles.benefits}>
          <strong>💡 Tips:</strong>
          <ul>
            {example.tips.map((tip: string, index: number) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      )}
      {example.benefits && (
        <div className={styles.benefits}>
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
    <div key={example.id} className={styles.exampleCard}>
      <h3>{example.name}</h3>
      <p>{example.description}</p>
      <div className={styles.codeBlock}>
        <pre><code>{example.example}</code></pre>
      </div>
      <div className={styles.usageComparison}>
        <div className={styles.correctUsage}>
          <strong>正しい使用法:</strong>
          <pre><code>{example.correctUsage}</code></pre>
        </div>
        <div className={styles.incorrectUsage}>
          <strong>間違った使用法:</strong>
          <pre><code>{example.incorrectUsage}</code></pre>
        </div>
      </div>
      <p className={styles.explanation}>{example.explanation}</p>
      {example.keyPoints && (
        <div className={styles.keyPoints}>
          <strong>ポイント:</strong>
          <ul>
            {example.keyPoints.map((point: string, index: number) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
      )}
      {example.tips && (
        <div className={styles.benefits}>
          <strong>💡 Tips:</strong>
          <ul>
            {example.tips.map((tip: string, index: number) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      )}
      {example.benefits && (
        <div className={styles.benefits}>
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
    <div key={example.id} className={styles.exampleCard}>
      <h3>{example.name}</h3>
      <p>{example.description}</p>
      <div className={styles.codeBlock}>
        <pre><code>{example.example}</code></pre>
      </div>
      <div className={styles.usageComparison}>
        <div className={styles.correctUsage}>
          <strong>正しい使用法:</strong>
          <pre><code>{example.correctUsage}</code></pre>
        </div>
        <div className={styles.incorrectUsage}>
          <strong>間違った使用法:</strong>
          <pre><code>{example.incorrectUsage}</code></pre>
        </div>
      </div>
      <p className={styles.explanation}>{example.explanation}</p>
      {example.keyPoints && (
        <div className={styles.keyPoints}>
          <strong>ポイント:</strong>
          <ul>
            {example.keyPoints.map((point: string, index: number) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
      )}
      {example.tips && (
        <div className={styles.benefits}>
          <strong>💡 Tips:</strong>
          <ul>
            {example.tips.map((tip: string, index: number) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      )}
      {example.benefits && (
        <div className={styles.benefits}>
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
    <div key={example.id} className={styles.exampleCard}>
      <h3>{example.name}</h3>
      <p>{example.description}</p>
      <div className={styles.codeBlock}>
        <pre><code>{example.example}</code></pre>
      </div>
      {example.correctUsage && (
        <div className={styles.usageComparison}>
          <div className={styles.correctUsage}>
            <strong>正しい使用法:</strong>
            <pre><code>{example.correctUsage}</code></pre>
          </div>
          <div className={styles.incorrectUsage}>
            <strong>間違った使用法:</strong>
            <pre><code>{example.incorrectUsage}</code></pre>
          </div>
        </div>
      )}
      <p className={styles.explanation}>{example.explanation}</p>
      {example.keyPoints && (
        <div className={styles.keyPoints}>
          <strong>ポイント:</strong>
          <ul>
            {example.keyPoints.map((point: string, index: number) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
      )}
      {example.benefits && (
        <div className={styles.benefits}>
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
    <div key={example.id} className={styles.exampleCard}>
      <h3>{example.name}</h3>
      <p>{example.description}</p>
      <div className={styles.codeBlock}>
        <pre><code>{example.example}</code></pre>
      </div>
      {example.correctUsage && (
        <div className={styles.usageComparison}>
          <div className={styles.correctUsage}>
            <strong>正しい使用法:</strong>
            <pre><code>{example.correctUsage}</code></pre>
          </div>
          <div className={styles.incorrectUsage}>
            <strong>間違った使用法:</strong>
            <pre><code>{example.incorrectUsage}</code></pre>
          </div>
        </div>
      )}
      <p className={styles.explanation}>{example.explanation}</p>
      {example.keyPoints && (
        <div className={styles.keyPoints}>
          <strong>ポイント:</strong>
          <ul>
            {example.keyPoints.map((point: string, index: number) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
      )}
      {example.benefits && (
        <div className={styles.benefits}>
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
    <div key={example.id} className={styles.exampleCard}>
      <h3>{example.name}</h3>
      <p>{example.description}</p>
      <div className={styles.codeBlock}>
        <pre><code>{example.example}</code></pre>
      </div>
      {example.correctUsage && (
        <div className={styles.usageComparison}>
          <div className={styles.correctUsage}>
            <strong>正しい使用法:</strong>
            <pre><code>{example.correctUsage}</code></pre>
          </div>
          <div className={styles.incorrectUsage}>
            <strong>間違った使用法:</strong>
            <pre><code>{example.incorrectUsage}</code></pre>
          </div>
        </div>
      )}
      <p className={styles.explanation}>{example.explanation}</p>
      {example.keyPoints && (
        <div className={styles.keyPoints}>
          <strong>ポイント:</strong>
          <ul>
            {example.keyPoints.map((point: string, index: number) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
      )}
      {example.benefits && (
        <div className={styles.benefits}>
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
    <div key={example.id} className={styles.exampleCard}>
      <h3>{example.name}</h3>
      <p>{example.description}</p>
      <div className={styles.codeBlock}>
        <pre><code>{example.example}</code></pre>
      </div>
      {example.correctUsage && (
        <div className={styles.usageComparison}>
          <div className={styles.correctUsage}>
            <strong>正しい使用法:</strong>
            <pre><code>{example.correctUsage}</code></pre>
          </div>
          <div className={styles.incorrectUsage}>
            <strong>間違った使用法:</strong>
            <pre><code>{example.incorrectUsage}</code></pre>
          </div>
        </div>
      )}
      <p className={styles.explanation}>{example.explanation}</p>
      {example.keyPoints && (
        <div className={styles.keyPoints}>
          <strong>ポイント:</strong>
          <ul>
            {example.keyPoints.map((point: string, index: number) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
      )}
      {example.benefits && (
        <div className={styles.benefits}>
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
    <div key={example.id} className={styles.exampleCard}>
      <h3>{example.name}</h3>
      <p>{example.description}</p>
      <div className={styles.codeBlock}>
        <pre><code>{example.example}</code></pre>
      </div>
      {example.correctUsage && (
        <div className={styles.usageComparison}>
          <div className={styles.correctUsage}>
            <strong>正しい使用法:</strong>
            <pre><code>{example.correctUsage}</code></pre>
          </div>
          <div className={styles.incorrectUsage}>
            <strong>間違った使用法:</strong>
            <pre><code>{example.incorrectUsage}</code></pre>
          </div>
        </div>
      )}
      <p className={styles.explanation}>{example.explanation}</p>
      {example.keyPoints && (
        <div className={styles.keyPoints}>
          <strong>ポイント:</strong>
          <ul>
            {example.keyPoints.map((point: string, index: number) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
      )}
      {example.benefits && (
        <div className={styles.benefits}>
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
    if (!currentSectionData || !Array.isArray(currentSectionData.examples) || currentSectionData.examples.length === 0) {
      return <p>このセクションには例がありません。</p>;
    }
    switch (activeSection) {
      case 'variables':
        return (currentSectionData.examples as VariableExample[]).map(example => renderVariableExample(example));
      case 'primitives':
        return (currentSectionData.examples as PrimitiveExample[]).map(example => renderPrimitiveExample(example));
      case 'arrays':
        return (currentSectionData.examples as ArrayExample[]).map(example => renderArrayExample(example));
      case 'objects':
        return (currentSectionData.examples as ObjectExample[]).map(example => renderObjectExample(example));
      case 'any':
        return (currentSectionData.examples as AnyExample[]).map(example => renderAnyExample(example));
      case 'unknown':
        return (currentSectionData.examples as AnyExample[]).map(example => renderAnyExample(example));
      case 'functions':
        return (currentSectionData.examples as FunctionExample[]).map(example => renderFunctionExample(example));
      case 'inference':
        return (currentSectionData.examples as InferenceExample[]).map(example => renderInferenceExample(example));
      case 'assertion':
        return (currentSectionData.examples as AssertionExample[]).map(example => renderAssertionExample(example));
      case 'alias':
        return (currentSectionData.examples as AliasExample[]).map(example => renderAliasExample(example));
      case 'interface':
        return (currentSectionData.examples as InterfaceExample[]).map(example => renderInterfaceExample(example));
      case 'class':
        return (currentSectionData.examples as ClassExample[]).map(example => renderClassExample(example));
      case 'enum':
        return (currentSectionData.examples as EnumExample[]).map(example => renderEnumExample(example));
      case 'generic':
        return (currentSectionData.examples as GenericExample[]).map(example => renderGenericExample(example));
      case 'unionintersection':
        return (currentSectionData.examples as UnionIntersectionExample[]).map(example => renderUnionIntersectionExample(example));
      case 'literal':
        return (currentSectionData.examples as LiteralExample[]).map(example => renderLiteralExample(example));
      case 'never':
        return (currentSectionData.examples as NeverExample[]).map(example => (
          <div key={example.title} className={styles.exampleCard}>
            <h3>{example.title}</h3>
            <p>{example.description}</p>
            <div className={styles.codeBlock}>
              <pre><code>{example.code}</code></pre>
            </div>
            {example.points && (
              <div className={styles.keyPoints}>
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
      case 'optional-chaining':
        return (currentSectionData.examples as OptionalChainingExample[]).map(example => renderOptionalChainingExample(example));
      case 'non-null-assertion':
        return (currentSectionData.examples as OptionalChainingExample[]).map(example => renderTypeGuardExample(example));
      case 'nullish-coalescing':
        return (currentSectionData.examples as OptionalChainingExample[]).map(example => renderOptionalChainingExample(example));
      case 'type-guard':
        return (currentSectionData.examples as OptionalChainingExample[]).map(example => renderTypeGuardExample(example));
      case 'keyof-operator':
        return (currentSectionData.examples as OptionalChainingExample[]).map(example => renderKeyofOperatorExample(example));
      case 'index-signature':
        return (currentSectionData.examples as OptionalChainingExample[]).map(example => renderIndexSignatureExample(example));
      case 'readonly':
        return (currentSectionData.examples as OptionalChainingExample[]).map(example => renderReadonlyExample(example));
      case 'async-await':
        return (currentSectionData.examples as OptionalChainingExample[]).map(example => renderOptionalChainingExample(example));
      default:
        return <p>このセクションには例がありません。</p>;
    }
  };

  // 練習問題のセクションにunknown型を追加
  if (!('unknown' in sectionPracticeQuestions)) {
    (sectionPracticeQuestions as Record<string, PracticeQuestion[]>).unknown = unknownTypePractice;
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <header className={styles.header}>
          <h1>TypeScript 学習</h1>
          <p>TypeScriptの学習サイトです。</p>
        </header>

        {/* セクション切り替え */}
        <div className={styles.sectionTabs}>
          {sections.map(section => (
            <button
              key={section.id}
              className={`${styles.tab} ${activeSection === section.id ? styles.activeTab : ''}`}
              onClick={() => setActiveSection(section.id as 'variables' | 'primitives' | 'arrays' | 'objects' | 'any' | 'unknown' | 'functions' | 'inference' | 'assertion' | 'alias' | 'interface' | 'class' | 'enum' | 'generic' | 'unionintersection' | 'literal' | 'never' | 'optional-chaining' | 'non-null-assertion' | 'nullish-coalescing' | 'type-guard' | 'keyof-operator' | 'index-signature' | 'readonly' | 'async-await')}
            >
              {section.title}
            </button>
          ))}
        </div>

        {/* 学習セクション */}
        <section className={styles.learningSection}>
          <h2>{currentSectionData?.title}</h2>
          <p className={styles.description}>{currentSectionData?.description}</p>
          
          {(currentSectionData as import('@/types/typescript').LearningSection)?.benefits && (
            <div className={styles.benefits}>
              <strong>✨ このセクションの利点:</strong>
              <ul>
                {(currentSectionData as import('@/types/typescript').LearningSection).benefits?.map((benefit: string, idx: number) => (
                  <li key={idx}>{benefit}</li>
                ))}
              </ul>
            </div>
          )}

          <div className={styles.keyPoints}>
            <h3>重要なポイント</h3>
            <ul>
              {(currentSectionData as import('@/types/typescript').LearningSection)?.keyPoints?.map((point: string, index: number) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>

          <div className={styles.examples}>
            <h3>型の例</h3>
            {renderExamples()}
          </div>
        </section>

        {/* 練習問題セクション */}
        <section className={styles.practiceSection}>
          <h2>🧪 {currentSectionData?.title}の練習問題</h2>
          {currentSectionQuestions && currentSectionQuestions.length > 0 ? (
            <>
              <div className={styles.progress}>
                問題 {currentQuestion + 1} / {currentSectionQuestions.length}
              </div>

              {!showResult ? (
                !showFeedback ? (
                  <div className={styles.questionCard}>
                    <h3>{currentSectionQuestions[currentQuestion].question}</h3>
                    <pre className={styles.questionCode}>
                      <code>{currentSectionQuestions[currentQuestion].code}</code>
                    </pre>
                    <div className={styles.options}>
                      {currentSectionQuestions[currentQuestion].options.map((option: string, index: number) => (
                        <button
                          key={index}
                          className={`${styles.option} ${selectedAnswer === index ? styles.selectedOption : ''}`}
                          onClick={() => handleAnswerSelect(index)}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                    <button
                      className={styles.nextButton}
                      onClick={handleSubmitAnswer}
                      disabled={selectedAnswer === null}
                    >
                      回答する
                    </button>
                  </div>
                ) : (
                  <div className={styles.feedbackCard}>
                    <h3>{answerResults[currentQuestion]?.isCorrect ? '✅ 正解！' : '❌ 不正解'}</h3>
                    <p>{currentSectionQuestions[currentQuestion].explanation}</p>
                    <button
                      className={styles.nextButton}
                      onClick={handleNextQuestion}
                    >
                      {currentQuestion < currentSectionQuestions.length - 1 ? '次の問題' : '結果を見る'}
                    </button>
                  </div>
                )
              ) : (
                <div className={styles.resultCard}>
                  <h3>🎉 {currentSectionData?.title}の練習完了！</h3>
                  <p>正解数: {answerResults.filter(r => r.isCorrect).length} / {currentSectionQuestions.length}</p>
                  <p>正答率: {Math.round((answerResults.filter(r => r.isCorrect).length / currentSectionQuestions.length) * 100)}%</p>
                  <div className={styles.detailedResults}>
                    <h4>全問題と解説</h4>
                    {answerResults.map((result, idx) => (
                      <div key={idx} className={styles.resultItem}>
                        <div className={styles.resultHeader}>
                          <span>問題{idx + 1}：</span>
                          <span>{result.isCorrect ? '✅' : '❌'}</span>
                        </div>
                        <div className={styles.resultQuestion}><strong>Q.</strong> {result.question}</div>
                        {result.code && (
                          <pre className={styles.questionCode}><code>{result.code}</code></pre>
                        )}
                        <div className={styles.resultAnswer}>
                          <strong>あなたの解答：</strong> {result.options[result.selected]}
                        </div>
                        <div className={styles.resultCorrect}>
                          <strong>正解：</strong> {result.options[result.correct]}
                        </div>
                        <div className={styles.resultExplanation}>
                          <strong>解説：</strong> {result.explanation}
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className={styles.resetButton} onClick={resetQuiz}>
                    もう一度練習する
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className={styles.noQuestions}>
              <p>このセクションには練習問題がありません。</p>
            </div>
          )}
        </section>

        <div className={styles.navigation}>
          <Link href="/" className={styles.backLink}>
            ← ホームに戻る
          </Link>
          <Link href="/quiz" className={styles.backLink}>
            🧪 改善版クイズに挑戦 →
          </Link>
        </div>
      </main>
    </div>
  );
} 