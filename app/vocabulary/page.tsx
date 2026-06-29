"use client";

import { useState } from "react";
import AppShell from "../components/AppShell";
import {
  Search,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  Circle,
  Filter,
} from "lucide-react";

const allWords = [
  { id: 1, original: "good",       suggested: "beneficial",   example: "Regular exercise is highly beneficial for mental health.", topic: "Health",       mastered: true  },
  { id: 2, original: "bad",        suggested: "detrimental",  example: "Pollution has a detrimental effect on air quality.",        topic: "Environment",  mastered: true  },
  { id: 3, original: "important",  suggested: "crucial",      example: "It is crucial to address climate change immediately.",       topic: "General",      mastered: false },
  { id: 4, original: "many",       suggested: "a myriad of",  example: "The internet offers a myriad of learning opportunities.",   topic: "Technology",   mastered: false },
  { id: 5, original: "show",       suggested: "demonstrate",  example: "The data clearly demonstrates an upward trend.",            topic: "Academic",     mastered: false },
  { id: 6, original: "problem",    suggested: "predicament",  example: "Society faces a complex predicament regarding inequality.", topic: "General",      mastered: false },
  { id: 7, original: "help",       suggested: "facilitate",   example: "Technology can facilitate communication globally.",         topic: "Technology",   mastered: false },
  { id: 8, original: "think",      suggested: "contend",      example: "Some experts contend that AI will replace many jobs.",      topic: "General",      mastered: true  },
  { id: 9, original: "big",        suggested: "substantial",  example: "There has been a substantial increase in online learning.", topic: "Education",    mastered: false },
  { id: 10, original: "use",       suggested: "utilise",      example: "Students should utilise all available resources.",          topic: "Education",    mastered: false },
  { id: 11, original: "rise",      suggested: "surge",        example: "There has been a surge in renewable energy adoption.",      topic: "Environment",  mastered: false },
  { id: 12, original: "fast",      suggested: "rapidly",      example: "Technology is advancing more rapidly than ever before.",    topic: "Technology",   mastered: true  },
];

const topics = ["Tất cả", "Health", "Environment", "Technology", "Education", "Academic", "General"];

export default function VocabularyPage() {
  const [search, setSearch] = useState("");
  const [topicFilter, setTopicFilter] = useState("Tất cả");
  const [masteredFilter, setMasteredFilter] = useState<"all" | "mastered" | "learning">("all");
  const [words, setWords] = useState(allWords);

  const toggleMastered = (id: number) => {
    setWords(prev => prev.map(w => w.id === id ? { ...w, mastered: !w.mastered } : w));
  };

  const filtered = words.filter(w => {
    const matchSearch = search === "" || w.original.includes(search.toLowerCase()) || w.suggested.includes(search.toLowerCase());
    const matchTopic = topicFilter === "Tất cả" || w.topic === topicFilter;
    const matchMastered = masteredFilter === "all" || (masteredFilter === "mastered" ? w.mastered : !w.mastered);
    return matchSearch && matchTopic && matchMastered;
  });

  const masteredCount = words.filter(w => w.mastered).length;

  return (
    <AppShell activePath="/vocabulary">
      {/* Top bar */}
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b border-slate-100 px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-emerald-500" />
          <h1 className="text-sm font-extrabold text-slate-900">Sổ từ vựng</h1>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
          <span className="font-semibold">{masteredCount}/{words.length} từ thành thạo</span>
        </div>
      </div>

      <div className="p-6 w-full space-y-5">
        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Tổng từ",      value: words.length,                        color: "text-slate-900" },
            { label: "Đang học",     value: words.length - masteredCount,         color: "text-blue-600" },
            { label: "Thành thạo",  value: masteredCount,                        color: "text-emerald-600" },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-white rounded-2xl border border-slate-100 p-4 text-center shadow-sm">
              <p className={`text-2xl font-extrabold ${color}`}>{value}</p>
              <p className="text-xs text-slate-500 mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm từ vựng…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-blue-400 text-slate-700 placeholder-slate-400"
            />
          </div>

          {/* Mastered filter */}
          <div className="flex rounded-xl border border-slate-200 bg-white overflow-hidden text-xs font-semibold">
            {(["all", "learning", "mastered"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setMasteredFilter(f)}
                className={`px-3 py-2.5 transition-all ${masteredFilter === f ? "bg-blue-600 text-white" : "text-slate-500 hover:bg-slate-50"}`}
              >
                {f === "all" ? "Tất cả" : f === "learning" ? "Đang học" : "Thành thạo"}
              </button>
            ))}
          </div>

          {/* Topic filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            <select
              value={topicFilter}
              onChange={e => setTopicFilter(e.target.value)}
              className="pl-8 pr-8 py-2.5 text-xs font-semibold bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-blue-400 text-slate-700 appearance-none cursor-pointer"
            >
              {topics.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
        </div>

        {/* Word grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filtered.map((word) => (
            <div
              key={word.id}
              className={`group rounded-2xl border p-5 transition-all hover:shadow-md ${
                word.mastered
                  ? "border-emerald-200 bg-emerald-50/40"
                  : "border-slate-100 bg-white hover:border-blue-200"
              }`}
            >
              {/* Word pair */}
              <div className="flex items-center gap-2 mb-3">
                <span className={`text-sm line-through ${word.mastered ? "text-emerald-400" : "text-slate-400"}`}>
                  {word.original}
                </span>
                <ArrowRight className={`w-3.5 h-3.5 shrink-0 ${word.mastered ? "text-emerald-400" : "text-slate-300"}`} />
                <span className={`text-base font-extrabold ${word.mastered ? "text-emerald-700" : "text-slate-900"}`}>
                  {word.suggested}
                </span>
                <span className="ml-auto text-[10px] px-2 py-0.5 bg-slate-100 text-slate-500 rounded-full font-semibold shrink-0">
                  {word.topic}
                </span>
              </div>

              {/* Example */}
              <p className="text-xs text-slate-500 italic leading-relaxed mb-4">
                &ldquo;{word.example}&rdquo;
              </p>

              {/* Mastered toggle */}
              <button
                onClick={() => toggleMastered(word.id)}
                className={`flex items-center gap-2 text-xs font-semibold transition-all ${
                  word.mastered
                    ? "text-emerald-600 hover:text-emerald-700"
                    : "text-slate-400 hover:text-blue-600"
                }`}
              >
                {word.mastered
                  ? <CheckCircle2 className="w-4 h-4" />
                  : <Circle className="w-4 h-4" />}
                {word.mastered ? "Đã thành thạo" : "Đánh dấu thành thạo"}
              </button>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="col-span-2 text-center py-12 text-slate-400">
              <BookOpen className="w-8 h-8 mx-auto mb-3 opacity-40" />
              <p className="text-sm">Không tìm thấy từ nào phù hợp</p>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
