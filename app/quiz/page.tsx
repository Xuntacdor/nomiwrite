"use client";

import { useState } from "react";
import AppShell from "../components/AppShell";
import { Check, X, ArrowRight, BrainCircuit, Trophy, RotateCcw } from "lucide-react";

const questions = [
  {
    id: 1,
    type: "multiple_choice",
    category: "Mạo từ",
    question: "Chọn mạo từ đúng cho câu sau:",
    sentence: '______ environment is a shared responsibility of every citizen.',
    options: ["A", "An", "The", "—"],
    correctIndex: 2,
    explanation: "'Environment' ở đây là một khái niệm cụ thể, duy nhất mà cả người nói và người nghe đều biết đến — cần 'the'.",
  },
  {
    id: 2,
    type: "multiple_choice",
    category: "Collocation",
    question: "Chọn collocation đúng:",
    sentence: 'We need to ______ efforts to combat climate change.',
    options: ["do", "make", "take", "give"],
    correctIndex: 1,
    explanation: "'Make efforts' là collocation đúng trong tiếng Anh. 'Do efforts' không tồn tại.",
  },
  {
    id: 3,
    type: "multiple_choice",
    category: "Chia thì",
    question: "Chọn dạng động từ đúng:",
    sentence: 'Over the past decade, smartphones ______ how we communicate.',
    options: ["has changed", "have changed", "changed", "are changing"],
    correctIndex: 1,
    explanation: "'Smartphones' là danh từ số nhiều → dùng 'have changed'. 'Has changed' dùng cho danh từ số ít.",
  },
  {
    id: 4,
    type: "multiple_choice",
    category: "Mạo từ",
    question: "Chọn mạo từ đúng:",
    sentence: 'She is ______ honest person who always tells the truth.',
    options: ["a", "an", "the", "—"],
    correctIndex: 1,
    explanation: "'Honest' bắt đầu bằng âm nguyên âm /ɒ/ nên dùng 'an', không phải 'a'.",
  },
];

type AnswerMap = Record<number, number>;

export default function QuizPage() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [finished, setFinished] = useState(false);

  const q = questions[current];
  const selected = answers[q.id];
  const isAnswered = selected !== undefined;
  const isCorrect = selected === q.correctIndex;
  const score = Object.entries(answers).filter(([id, ans]) => {
    const question = questions.find(q => q.id === Number(id));
    return question && ans === question.correctIndex;
  }).length;

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setAnswers(prev => ({ ...prev, [q.id]: idx }));
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent(prev => prev + 1);
      setShowExplanation(false);
    } else {
      setFinished(true);
    }
  };

  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <AppShell activePath="/quiz">
        <div className="flex-1 flex items-center justify-center p-6 min-h-screen">
          <div className="w-full max-w-sm text-center">
            <div className={`w-24 h-24 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-2xl ${
              pct >= 75 ? "bg-gradient-to-br from-emerald-500 to-teal-600 shadow-emerald-200" : "bg-gradient-to-br from-orange-500 to-red-500 shadow-orange-200"
            }`}>
              <Trophy className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 mb-2">
              {pct >= 75 ? "Xuất sắc!" : "Cần ôn thêm!"}
            </h2>
            <p className="text-slate-500 mb-6">
              Bạn trả lời đúng <span className="font-extrabold text-slate-900">{score}/{questions.length}</span> câu
            </p>

            {/* Score ring */}
            <div className="relative w-36 h-36 mx-auto mb-8">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#f1f5f9" strokeWidth="2.5" />
                <circle
                  cx="18" cy="18" r="15.9" fill="none"
                  stroke={pct >= 75 ? "#10b981" : "#f97316"}
                  strokeWidth="2.5"
                  strokeDasharray={`${pct} ${100 - pct}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-extrabold text-slate-900">{pct}%</span>
              </div>
            </div>

            {/* Result breakdown */}
            <div className="space-y-2 mb-8 text-left">
              {questions.map(q => {
                const ans = answers[q.id];
                const correct = ans === q.correctIndex;
                return (
                  <div key={q.id} className={`flex items-center gap-3 p-3 rounded-xl border ${correct ? "bg-emerald-50 border-emerald-200" : "bg-red-50 border-red-200"}`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${correct ? "bg-emerald-500" : "bg-red-500"}`}>
                      {correct ? <Check className="w-3.5 h-3.5 text-white" /> : <X className="w-3.5 h-3.5 text-white" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-slate-700 truncate">{q.category} — Câu {q.id}</p>
                      {!correct && <p className="text-xs text-red-600">Đáp án đúng: {q.options[q.correctIndex]}</p>}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => { setAnswers({}); setCurrent(0); setFinished(false); setShowExplanation(false); }}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full border-2 border-slate-200 text-slate-700 text-sm font-bold hover:bg-slate-50 transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                Làm lại
              </button>
              <a href="/dashboard" className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition-all">
                Về Dashboard
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell activePath="/quiz">
      {/* Top bar */}
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b border-slate-100 px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BrainCircuit className="w-4 h-4 text-violet-500" />
          <h1 className="text-sm font-extrabold text-slate-900">Quiz ôn tập</h1>
        </div>
        <span className="text-xs text-slate-500 font-semibold">
          {current + 1} / {questions.length} câu
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-slate-100">
        <div
          className="h-full bg-violet-500 transition-all duration-500"
          style={{ width: `${((current + (isAnswered ? 1 : 0)) / questions.length) * 100}%` }}
        />
      </div>

      <div className="flex items-start justify-center p-6 pt-10 min-h-[calc(100vh-4rem)]">
        <div className="w-full max-w-2xl space-y-5">
          {/* Category badge */}
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 text-xs font-bold bg-violet-50 text-violet-700 border border-violet-200 rounded-full">
              {q.category}
            </span>
            <span className="text-xs text-slate-400">Câu {q.id}/{questions.length}</span>
          </div>

          {/* Question card */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <p className="text-sm font-semibold text-slate-500 mb-3">{q.question}</p>
            <p className="text-base text-slate-800 leading-relaxed font-medium">
              {q.sentence.split("______").map((part, i, arr) => (
                <span key={i}>
                  {part}
                  {i < arr.length - 1 && (
                    <span className={`inline-block min-w-16 px-2 mx-1 rounded-lg border-b-2 text-center font-bold ${
                      !isAnswered
                        ? "border-blue-400 bg-blue-50 text-blue-400"
                        : isCorrect
                        ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                        : "border-red-400 bg-red-50 text-red-600"
                    }`}>
                      {isAnswered ? q.options[selected] : "______"}
                    </span>
                  )}
                </span>
              ))}
            </p>
          </div>

          {/* Options */}
          <div className="grid grid-cols-2 gap-3">
            {q.options.map((opt, idx) => {
              let style = "border-slate-200 bg-white text-slate-700 hover:border-violet-400 hover:bg-violet-50";
              if (isAnswered) {
                if (idx === q.correctIndex) style = "border-emerald-500 bg-emerald-50 text-emerald-700";
                else if (idx === selected) style = "border-red-400 bg-red-50 text-red-600";
                else style = "border-slate-100 bg-slate-50 text-slate-400 opacity-60";
              }
              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  disabled={isAnswered}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 text-sm font-semibold transition-all ${style} ${!isAnswered ? "cursor-pointer" : "cursor-default"}`}
                >
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-extrabold shrink-0 ${
                    isAnswered && idx === q.correctIndex ? "bg-emerald-500 text-white" :
                    isAnswered && idx === selected ? "bg-red-400 text-white" :
                    "bg-slate-100 text-slate-500"
                  }`}>
                    {isAnswered && idx === q.correctIndex ? <Check className="w-3.5 h-3.5" /> :
                     isAnswered && idx === selected ? <X className="w-3.5 h-3.5" /> :
                     String.fromCharCode(65 + idx)}
                  </span>
                  {opt}
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {showExplanation && (
            <div className={`rounded-xl p-4 border ${isCorrect ? "bg-emerald-50 border-emerald-200" : "bg-red-50 border-red-200"}`}>
              <div className="flex items-start gap-2">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${isCorrect ? "bg-emerald-500" : "bg-red-500"}`}>
                  {isCorrect ? <Check className="w-3 h-3 text-white" /> : <X className="w-3 h-3 text-white" />}
                </div>
                <div>
                  <p className={`text-xs font-bold mb-1 ${isCorrect ? "text-emerald-700" : "text-red-700"}`}>
                    {isCorrect ? "Chính xác!" : `Chưa đúng — Đáp án: ${q.options[q.correctIndex]}`}
                  </p>
                  <p className={`text-xs leading-relaxed ${isCorrect ? "text-emerald-600" : "text-red-600"}`}>
                    {q.explanation}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Next button */}
          {isAnswered && (
            <button
              onClick={handleNext}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-violet-600 hover:bg-violet-700 text-white text-sm font-bold transition-all shadow-lg shadow-violet-200 hover:-translate-y-0.5"
            >
              {current < questions.length - 1 ? "Câu tiếp theo" : "Xem kết quả"}
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </AppShell>
  );
}
