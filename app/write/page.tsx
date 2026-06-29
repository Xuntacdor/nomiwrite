"use client";

import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import AppShell from "../components/AppShell";
import {
  ChevronDown,
  Shuffle,
  Clock,
  Send,
  Sparkles,
  AlignLeft,
  List,
  MessageSquare,
  CheckSquare,
  Check,
  Circle,
} from "lucide-react";

const writingTypes = [
  { id: "ielts2",   label: "IELTS Writing Task 2",    badge: "IELTS"    },
  { id: "ielts1",   label: "IELTS Writing Task 1",    badge: "IELTS"    },
  { id: "vstep",    label: "VSTEP Writing",            badge: "VSTEP"    },
  { id: "email",    label: "Email công việc",          badge: "Email"    },
  { id: "cover",    label: "Cover Letter / Học bổng", badge: "Letter"   },
  { id: "academic", label: "Văn bản học thuật",       badge: "Academic" },
];

const topics: Record<string, string[]> = {
  ielts2:   ["Technology & Society", "Environment & Climate", "Education System", "Health & Lifestyle", "Urbanisation", "Work & Economy"],
  ielts1:   ["Bar Chart — Renewable Energy", "Line Graph — Population Growth", "Pie Chart — Spending Habits", "Table — Employment Rates", "Process Diagram — Water Recycling"],
  vstep:    ["Technology's Role in Society", "Climate Change", "Education System Reform", "Public Health & Lifestyle"],
  email:    ["Job Application", "Project Proposal", "Complaint Response", "Meeting Invitation", "Work Follow-up"],
  cover:    ["Software Engineer at a Startup", "Master's Scholarship in the US", "Marketing Manager", "PhD Scholarship in Europe"],
  academic: ["AI & the Labour Market", "Environmental Impact of Urbanisation", "Hybrid Learning Methods"],
};

const prompts: Record<string, Record<string, string>> = {
  ielts2: {
    "Technology & Society": "Some people believe that technology has made our lives more complicated, while others argue that it has made life easier. Discuss both views and give your own opinion.",
    "Environment & Climate": "Many countries are prioritising economic growth over environmental protection. To what extent do you agree or disagree?",
    "Education System": "Some people believe children should be taught to be competitive at school, while others believe cooperation is more beneficial. Discuss both views.",
    "Health & Lifestyle": "In many countries, obesity is increasing. What are the main causes and what measures could be taken?",
    "Urbanisation": "The growth of cities creates problems for both urban and rural populations. What problems are caused, and how can they be solved?",
    "Work & Economy": "Some argue that job satisfaction is more important than job security. To what extent do you agree?",
  },
  ielts1: {
    "Bar Chart — Renewable Energy": "The bar chart below shows the percentage of electricity generated from renewable sources in five countries in 2000 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    "Line Graph — Population Growth": "The line graph illustrates the population growth of three major cities between 1950 and 2020. Summarise the information and make comparisons where relevant.",
    "Pie Chart — Spending Habits": "The pie charts show how households in the UK spent their money in 1980 and 2020. Summarise the information by selecting and reporting the main features.",
    "Table — Employment Rates": "The table below shows employment rates across different sectors in four countries in 2022. Summarise the information by selecting and reporting the main features.",
    "Process Diagram — Water Recycling": "The diagram below shows how water is recycled for household use. Summarise the information by selecting and reporting the main features.",
  },
  vstep: {
    "Technology's Role in Society": "Technology is transforming every aspect of modern life. Write an essay discussing both the positive and negative impacts of technology on society, and give your own opinion.",
    "Climate Change": "Climate change is one of the greatest challenges of the 21st century. Analyse its root causes and propose practical solutions that governments and individuals can implement.",
    "Education System Reform": "Traditional education systems face mounting challenges in the digital era. Discuss the key changes needed to better prepare students for the future workforce.",
    "Public Health & Lifestyle": "Modern lifestyles are having a significant effect on public health. Analyse the main contributing factors and propose effective measures to address them.",
  },
  email: {
    "Job Application": "Write a job application email for a Marketing Executive position at ABC Company. Express your interest in the role, briefly highlight your relevant experience, and request an interview opportunity.",
    "Project Proposal": "Write an email to your HR Manager proposing a project to improve the employee onboarding process. Outline the problem, your proposed solution, and expected benefits.",
    "Complaint Response": "Write a professional response email to a customer who complained about a late delivery. Acknowledge the issue, apologise sincerely, and offer a clear compensation solution.",
    "Meeting Invitation": "Write an email inviting relevant stakeholders to a Q3 project review meeting next Friday afternoon. Include the agenda, location or video link, and ask for confirmation.",
    "Work Follow-up": "Write a polite follow-up email after sending a project proposal one week ago with no response. Restate your key point and suggest a next step.",
  },
  cover: {
    "Software Engineer at a Startup": "Write a cover letter for a Software Engineer role at a fintech startup. Highlight your experience with React and Node.js, and demonstrate your ability to thrive in a fast-paced startup environment.",
    "Master's Scholarship in the US": "Write a personal statement for a Master's scholarship in Computer Science at a top-50 US university. Clearly state your research goals, academic background, and why you chose this programme.",
    "Marketing Manager": "Write a cover letter for a Marketing Manager position. Emphasise your digital marketing expertise, campaign results with specific metrics, and your experience leading cross-functional teams.",
    "PhD Scholarship in Europe": "Write a motivation letter for a PhD scholarship in Sustainable Energy at a German university. Demonstrate your academic foundation and outline your proposed research direction.",
  },
  academic: {
    "AI & the Labour Market": "Analyse the impact of artificial intelligence on employment trends in the next decade. Discuss both displacement risks and new opportunities, supported by evidence from recent research.",
    "Environmental Impact of Urbanisation": "Examine the environmental consequences of rapid urbanisation in developing countries. Propose evidence-based policy interventions to mitigate these effects.",
    "Hybrid Learning Methods": "Evaluate the effectiveness of hybrid learning models in higher education post-pandemic. Consider student outcomes, accessibility, and the institutional challenges of implementation.",
  },
};

const coachData: Record<string, {
  structure: { step: string; detail: string }[];
  connectors: { label: string; phrases: string[] }[];
  checklist: string[];
  minWords: number;
}> = {
  ielts2: {
    structure: [
      { step: "Mở bài",    detail: "Paraphrase đề + nêu quan điểm (2–3 câu)" },
      { step: "Thân bài 1", detail: "Luận điểm 1 + evidence + example" },
      { step: "Thân bài 2", detail: "Luận điểm 2 + counterargument" },
      { step: "Kết luận",   detail: "Tóm tắt + nhắc lại quan điểm" },
    ],
    connectors: [
      { label: "Mở bài",    phrases: ["It is widely argued that…", "There is growing debate about…"] },
      { label: "Bổ sung",   phrases: ["Furthermore,…", "In addition,…", "Moreover,…"] },
      { label: "Tương phản", phrases: ["However,…", "On the other hand,…", "In contrast,…"] },
      { label: "Kết luận",  phrases: ["In conclusion,…", "To summarise,…", "Overall,…"] },
    ],
    checklist: ["Ít nhất 250 từ", "4 đoạn văn rõ ràng", "Có câu thesis rõ ràng", "Mỗi body paragraph có example", "Không lặp từ quá 3 lần", "Có cohesive devices"],
    minWords: 250,
  },
  ielts1: {
    structure: [
      { step: "Overview",       detail: "2–3 câu nêu xu hướng chính — không có số liệu" },
      { step: "Key features 1", detail: "Nhóm cao nhất / thấp nhất + số liệu cụ thể" },
      { step: "Key features 2", detail: "So sánh, biến động đáng chú ý + số liệu" },
    ],
    connectors: [
      { label: "Mô tả xu hướng", phrases: ["There was a significant increase in…", "…declined sharply to…", "remained relatively stable at…"] },
      { label: "So sánh",        phrases: ["By contrast,…", "Similarly,…", "Compared to…"] },
      { label: "Thời gian",      phrases: ["Between X and Y,…", "By 2020,…", "Over the period,…"] },
    ],
    checklist: ["Ít nhất 150 từ", "Có đoạn Overview riêng", "Dùng số liệu cụ thể", "Không có ý kiến cá nhân", "So sánh ít nhất 2 dữ liệu", "Dùng passive voice"],
    minWords: 150,
  },
  vstep: {
    structure: [
      { step: "Introduction", detail: "Giới thiệu chủ đề + thesis statement rõ ràng" },
      { step: "Body 1",       detail: "Luận điểm chính + dẫn chứng + phân tích" },
      { step: "Body 2",       detail: "Luận điểm phụ + dẫn chứng" },
      { step: "Conclusion",   detail: "Tổng kết, không nêu ý mới" },
    ],
    connectors: [
      { label: "Mở đầu",  phrases: ["To begin with,…", "First and foremost,…"] },
      { label: "Bổ sung", phrases: ["In addition,…", "Furthermore,…", "Apart from this,…"] },
      { label: "Kết luận", phrases: ["To summarise,…", "In conclusion,…", "All things considered,…"] },
    ],
    checklist: ["Ít nhất 200 từ", "Thesis statement rõ ràng", "Có dẫn chứng cụ thể", "Kết luận không có ý mới", "Dùng từ nối hợp lý"],
    minWords: 200,
  },
  email: {
    structure: [
      { step: "Subject line", detail: "'Request for…', 'Follow-up on…'" },
      { step: "Greeting",     detail: "'Dear Mr./Ms. [Họ],' hoặc 'Hi [Tên],'" },
      { step: "Opening",      detail: "Nêu mục đích ngay: 'I am writing to…'" },
      { step: "Body",         detail: "Thông tin chi tiết, bullet nếu cần" },
      { step: "CTA + Sign-off", detail: "'Please let me know…' / 'Best regards,'" },
    ],
    connectors: [
      { label: "Mở đầu",  phrases: ["I am writing to…", "I hope this email finds you well."] },
      { label: "Nội dung", phrases: ["Please find attached…", "I would like to…", "Could you please…"] },
      { label: "Kết thúc", phrases: ["I look forward to hearing from you.", "Please do not hesitate to contact me."] },
    ],
    checklist: ["Subject line rõ ràng", "Tự giới thiệu nếu lần đầu liên hệ", "Mục đích rõ ngay dòng đầu", "CTA cụ thể (deadline, yêu cầu rõ)", "Sign-off phù hợp độ formal", "Không quá 200 từ"],
    minWords: 100,
  },
  cover: {
    structure: [
      { step: "Hook",       detail: "Câu mở ấn tượng — thành tích, câu chuyện, câu hỏi" },
      { step: "Background", detail: "Kinh nghiệm liên quan với số liệu cụ thể" },
      { step: "Motivation", detail: "Tại sao vị trí này, tại sao công ty/trường này" },
      { step: "Value fit",  detail: "Bạn đem lại gì — cụ thể, không chung chung" },
      { step: "Closing",    detail: "Bày tỏ mong muốn, không thụ động" },
    ],
    connectors: [
      { label: "Mở bài",       phrases: ["Throughout my academic journey,…", "During my time at…"] },
      { label: "Nêu kinh nghiệm", phrases: ["I have consistently…", "My experience with… has equipped me to…"] },
      { label: "Kết thúc",     phrases: ["I would welcome the opportunity to…", "I am eager to contribute to…"] },
    ],
    checklist: ["Không bắt đầu bằng 'My name is'", "Có số liệu cụ thể (%, số người, dự án)", "Nhắc tên công ty/trường ít nhất 1 lần", "Kết thúc chủ động", "Dưới 400 từ", "Tone phù hợp (formal nhưng cá nhân)"],
    minWords: 250,
  },
  academic: {
    structure: [
      { step: "Introduction",      detail: "Bối cảnh + khoảng trống nghiên cứu + thesis" },
      { step: "Literature review", detail: "Tổng hợp, so sánh nghiên cứu liên quan" },
      { step: "Discussion",        detail: "Phân tích, lý giải, so sánh với evidence" },
      { step: "Conclusion",        detail: "Đóng góp, hạn chế, hướng nghiên cứu tiếp" },
    ],
    connectors: [
      { label: "Giới thiệu", phrases: ["This paper aims to…", "The purpose of this study is to…"] },
      { label: "Tham chiếu", phrases: ["Previous studies have shown…", "According to…", "As argued by…"] },
      { label: "Phân tích",  phrases: ["The findings suggest…", "It can be inferred that…", "This implies that…"] },
    ],
    checklist: ["Ít nhất 300 từ", "Thesis statement rõ trong introduction", "Có trích dẫn nguồn", "Dùng passive voice", "Tránh ngôn ngữ cảm xúc", "Conclusion liên kết với introduction"],
    minWords: 300,
  },
};

type CoachTab = "structure" | "connectors" | "checklist";

function WriteContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paramType = searchParams.get("type") || "ielts2";
  const initialType = writingTypes.find(t => t.id === paramType) ? paramType : "ielts2";

  const [selectedType, setSelectedType] = useState(initialType);
  const [selectedTopic, setSelectedTopic] = useState(topics[initialType]?.[0] || "");
  const [content, setContent] = useState("");
  const [timerOn, setTimerOn] = useState(false);
  const [coachTab, setCoachTab] = useState<CoachTab>("structure");
  const [checked, setChecked] = useState<Set<string>>(new Set());

  const currentType = writingTypes.find(t => t.id === selectedType)!;
  const currentTopics = topics[selectedType] || [];
  const currentPrompt = prompts[selectedType]?.[selectedTopic] || "";
  const coach = coachData[selectedType];

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const pct = Math.min((wordCount / coach.minWords) * 100, 100);

  const handleTypeChange = (id: string) => {
    setSelectedType(id);
    setSelectedTopic(topics[id]?.[0] || "");
    setChecked(new Set());
  };

  const handleSubmit = () => {
    const submission = {
      content,
      type: selectedType,
      typeLabel: currentType.label,
      topic: selectedTopic,
      prompt: currentPrompt,
      wordCount,
      submittedAt: new Date().toISOString(),
    };
    localStorage.setItem("nomiwrite_submission", JSON.stringify(submission));
    router.push("/result");
  };

  const toggleCheck = (item: string) => {
    setChecked(prev => {
      const next = new Set(prev);
      next.has(item) ? next.delete(item) : next.add(item);
      return next;
    });
  };

  return (
    <AppShell activePath="/write">
      {/* Top bar */}
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b border-slate-100 px-6 h-14 flex items-center justify-between">
        <h1 className="text-sm font-extrabold text-slate-900">Viết bài mới</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setTimerOn(!timerOn)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
              timerOn ? "bg-orange-50 border-orange-300 text-orange-600" : "bg-slate-50 border-slate-200 text-slate-500 hover:border-slate-300"
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            {timerOn ? "40:00" : "Bật đếm giờ"}
          </button>
          <button
            onClick={handleSubmit}
            disabled={wordCount === 0}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-all shadow-sm shadow-blue-200 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Send className="w-3.5 h-3.5" />
            Nộp bài
          </button>
        </div>
      </div>

      {/* 3-column layout */}
      <div className="p-5 grid grid-cols-1 lg:grid-cols-12 gap-4 w-full">

        {/* Col 1: Config */}
        <div className="lg:col-span-3 space-y-3">
          <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm">
            <h3 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2.5">Loại văn bản</h3>
            <div className="relative">
              <select
                value={selectedType}
                onChange={e => handleTypeChange(e.target.value)}
                className="w-full appearance-none text-sm font-semibold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 pr-8 focus:outline-none focus:border-blue-400 cursor-pointer"
              >
                {writingTypes.map(t => (
                  <option key={t.id} value={t.id}>{t.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="px-2 py-0.5 text-[10px] font-bold bg-blue-50 text-blue-600 rounded-md">{currentType.badge}</span>
              <a href="/guide" className="text-[10px] font-semibold text-blue-500 hover:text-blue-600">Xem hướng dẫn →</a>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2.5">
              <h3 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Chủ đề</h3>
              <button
                onClick={() => {
                  const rand = currentTopics[Math.floor(Math.random() * currentTopics.length)];
                  setSelectedTopic(rand);
                }}
                className="flex items-center gap-1 text-[10px] text-blue-500 font-semibold hover:text-blue-600"
              >
                <Shuffle className="w-3 h-3" />
                Ngẫu nhiên
              </button>
            </div>
            <div className="space-y-1">
              {currentTopics.map(topic => (
                <button
                  key={topic}
                  onClick={() => setSelectedTopic(topic)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-all ${
                    selectedTopic === topic
                      ? "bg-blue-50 text-blue-700 font-semibold border border-blue-200"
                      : "text-slate-600 hover:bg-slate-50 border border-transparent"
                  }`}
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Col 2: Editor */}
        <div className="lg:col-span-6 space-y-3">
          <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm">
            <div className="flex items-start gap-2.5">
              <div className="w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 mt-0.5">
                <AlignLeft className="w-3 h-3 text-slate-500" />
              </div>
              <div>
                <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5">Đề bài</p>
                <p className="text-sm text-slate-700 leading-relaxed">{currentPrompt}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-4 py-2.5 border-b border-slate-50 flex items-center justify-between">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Bài viết của bạn</span>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-20 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${wordCount >= coach.minWords ? "bg-emerald-500" : "bg-blue-500"}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className={`text-xs font-bold ${wordCount >= coach.minWords ? "text-emerald-600" : "text-slate-500"}`}>
                  {wordCount}/{coach.minWords} từ
                </span>
              </div>
            </div>
            <textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="Bắt đầu viết bài ở đây…"
              className="w-full min-h-80 p-4 text-sm text-slate-700 leading-relaxed placeholder-slate-300 focus:outline-none resize-none"
            />
          </div>

          <div className="flex items-center justify-between bg-white rounded-2xl border border-slate-100 px-4 py-3 shadow-sm">
            <p className="text-xs text-slate-500">
              {wordCount === 0
                ? "Chưa có nội dung"
                : wordCount < coach.minWords
                ? `Cần thêm ${coach.minWords - wordCount} từ`
                : "Đủ độ dài — sẵn sàng nộp!"}
            </p>
            <button
              onClick={handleSubmit}
              disabled={wordCount === 0}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-all shadow-md shadow-blue-200 hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:translate-y-0"
            >
              <Send className="w-3.5 h-3.5" />
              Nộp bài để chấm
            </button>
          </div>
        </div>

        {/* Col 3: AI Coach */}
        <div className="lg:col-span-3 space-y-3">
          <div className="bg-gradient-to-br from-blue-600 to-violet-600 rounded-2xl p-4 text-white">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-blue-200" />
              <span className="text-xs font-extrabold text-blue-100 uppercase tracking-widest">AI Coach</span>
            </div>
            <p className="text-sm font-bold">{currentType.label}</p>
            <p className="text-[11px] text-blue-200 mt-0.5">Tối thiểu {coach.minWords} từ</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="flex border-b border-slate-100">
              {([
                { key: "structure",  icon: List,          label: "Cấu trúc" },
                { key: "connectors", icon: MessageSquare, label: "Từ nối" },
                { key: "checklist",  icon: CheckSquare,   label: "Checklist" },
              ] as { key: CoachTab; icon: typeof List; label: string }[]).map(({ key, icon: Icon, label }) => (
                <button
                  key={key}
                  onClick={() => setCoachTab(key)}
                  className={`flex-1 flex items-center justify-center gap-1 py-2.5 text-[10px] font-bold uppercase tracking-wide transition-all ${
                    coachTab === key
                      ? "bg-blue-50 text-blue-600 border-b-2 border-blue-500"
                      : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  {label}
                </button>
              ))}
            </div>

            <div className="p-4 space-y-3">
              {coachTab === "structure" && (
                <div className="space-y-2.5">
                  {coach.structure.map((s, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[9px] font-extrabold flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <div>
                        <p className="text-xs font-extrabold text-slate-800">{s.step}</p>
                        <p className="text-[11px] text-slate-500 leading-snug mt-0.5">{s.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {coachTab === "connectors" && (
                <div className="space-y-3">
                  {coach.connectors.map((group) => (
                    <div key={group.label}>
                      <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5">{group.label}</p>
                      <div className="space-y-1">
                        {group.phrases.map((phrase) => (
                          <div
                            key={phrase}
                            className="px-2.5 py-1.5 bg-blue-50 border border-blue-100 rounded-lg text-[11px] text-blue-800 font-medium leading-snug cursor-pointer hover:bg-blue-100 transition-colors"
                            onClick={() => navigator.clipboard?.writeText(phrase)}
                          >
                            {phrase}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                  <p className="text-[10px] text-slate-400 text-center">Click để copy</p>
                </div>
              )}

              {coachTab === "checklist" && (
                <div className="space-y-2">
                  {coach.checklist.map((item) => {
                    const done = checked.has(item);
                    return (
                      <button
                        key={item}
                        onClick={() => toggleCheck(item)}
                        className={`w-full flex items-start gap-2.5 p-2.5 rounded-xl border transition-all text-left ${
                          done ? "bg-emerald-50 border-emerald-200" : "bg-slate-50 border-slate-100 hover:border-slate-200"
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${done ? "bg-emerald-500" : "border-2 border-slate-300"}`}>
                          {done ? <Check className="w-2.5 h-2.5 text-white" /> : <Circle className="w-2 h-2 text-slate-300" />}
                        </div>
                        <span className={`text-[11px] leading-snug font-medium ${done ? "text-emerald-700 line-through" : "text-slate-600"}`}>
                          {item}
                        </span>
                      </button>
                    );
                  })}
                  <p className="text-[10px] text-slate-400 text-center pt-1">
                    {checked.size}/{coach.checklist.length} mục hoàn thành
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

export default function WritePage() {
  return (
    <Suspense>
      <WriteContent />
    </Suspense>
  );
}
