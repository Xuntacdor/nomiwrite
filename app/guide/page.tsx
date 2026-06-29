import AppShell from "../components/AppShell";
import { ArrowRight, BookOpen, Briefcase, GraduationCap, FileText, Mail, Star, ChevronRight } from "lucide-react";

const types = [
  {
    id: "ielts2",
    icon: GraduationCap,
    color: "from-blue-500 to-indigo-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
    tag: "IELTS",
    tagColor: "bg-blue-100 text-blue-700",
    label: "IELTS Writing Task 2",
    desc: "Bài luận phân tích quan điểm, thảo luận hai chiều hoặc đề xuất giải pháp cho vấn đề xã hội.",
    minWords: 250,
    time: "40 phút",
    structure: [
      { step: "Mở bài", detail: "Paraphrase đề + nêu quan điểm chính (2–3 câu)" },
      { step: "Thân bài 1", detail: "Luận điểm 1 + evidence + example" },
      { step: "Thân bài 2", detail: "Luận điểm 2 + evidence + example" },
      { step: "Kết luận", detail: "Tóm tắt + nhắc lại quan điểm" },
    ],
    connectors: ["It is widely argued that…", "From my perspective,…", "Furthermore,…", "In contrast,…", "In conclusion,…"],
    tips: ["Tránh dùng 'I think' — dùng 'I contend / I maintain'", "Mỗi đoạn thân bài chỉ 1 luận điểm rõ ràng", "Paraphrase đề bài, không copy nguyên"],
    mistakes: ["Lặp từ quá nhiều", "Thiếu cohesive devices", "Body paragraph không có example"],
  },
  {
    id: "ielts1",
    icon: FileText,
    color: "from-violet-500 to-purple-600",
    bg: "bg-violet-50",
    border: "border-violet-200",
    tag: "IELTS",
    tagColor: "bg-violet-100 text-violet-700",
    label: "IELTS Writing Task 1",
    desc: "Mô tả và phân tích dữ liệu từ biểu đồ, bảng, sơ đồ hoặc quy trình.",
    minWords: 150,
    time: "20 phút",
    structure: [
      { step: "Overview", detail: "Xu hướng nổi bật nhất — không có số liệu" },
      { step: "Key features 1", detail: "Nhóm dữ liệu cao nhất/thấp nhất + số liệu" },
      { step: "Key features 2", detail: "So sánh, biến động đáng chú ý + số liệu" },
    ],
    connectors: ["The graph illustrates…", "Overall, it can be seen that…", "There was a significant increase in…", "By contrast,…", "The figure peaked at…"],
    tips: ["Mở đầu bằng Overview — không nêu số liệu ngay", "Nhóm dữ liệu theo xu hướng, không liệt kê từng con số", "Dùng passive voice: 'was recorded', 'is shown'"],
    mistakes: ["Không có câu Overview", "Liệt kê số liệu không phân tích", "Copy nguyên câu hỏi vào đoạn mở"],
  },
  {
    id: "vstep",
    icon: Star,
    color: "from-emerald-500 to-teal-600",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    tag: "VSTEP",
    tagColor: "bg-emerald-100 text-emerald-700",
    label: "VSTEP Writing",
    desc: "Bài luận tiếng Anh học thuật theo định dạng kỳ thi VSTEP của Việt Nam.",
    minWords: 200,
    time: "35 phút",
    structure: [
      { step: "Introduction", detail: "Giới thiệu chủ đề + thesis statement" },
      { step: "Body paragraph 1", detail: "Luận điểm chính + dẫn chứng" },
      { step: "Body paragraph 2", detail: "Luận điểm phụ + dẫn chứng" },
      { step: "Conclusion", detail: "Tổng kết + nhận định cá nhân" },
    ],
    connectors: ["To begin with,…", "In addition,…", "As a result,…", "On the other hand,…", "To summarise,…"],
    tips: ["Thesis statement phải rõ ràng và trực tiếp", "Mỗi luận điểm cần có ví dụ thực tế", "Kết luận không nêu ý mới"],
    mistakes: ["Thesis statement mơ hồ", "Thiếu dẫn chứng cụ thể", "Kết luận quá ngắn"],
  },
  {
    id: "email",
    icon: Mail,
    color: "from-orange-500 to-amber-500",
    bg: "bg-orange-50",
    border: "border-orange-200",
    tag: "Workplace",
    tagColor: "bg-orange-100 text-orange-700",
    label: "Email công việc",
    desc: "Email tiếng Anh chuyên nghiệp dùng trong môi trường công sở: xin việc, đề xuất, báo cáo.",
    minWords: 100,
    time: "Linh hoạt",
    structure: [
      { step: "Subject line", detail: "Ngắn gọn, rõ mục đích: 'Request for…', 'Follow-up on…'" },
      { step: "Greeting", detail: "'Dear Mr./Ms. [Họ],' hoặc 'Hi [Tên],' tùy độ formal" },
      { step: "Opening line", detail: "Nêu mục đích ngay: 'I am writing to…'" },
      { step: "Body", detail: "Thông tin chi tiết, ngắn gọn, dùng bullet nếu cần" },
      { step: "Call to action", detail: "'Please let me know if…', 'I would appreciate if…'" },
      { step: "Sign-off", detail: "'Best regards,' / 'Sincerely,' + Tên" },
    ],
    connectors: ["I am writing to…", "Please find attached…", "I would like to…", "Could you please…", "I look forward to hearing from you."],
    tips: ["Subject line phải đủ thông tin để người nhận biết cần làm gì", "Một email = một mục đích duy nhất", "Dùng 'would' thay vì 'will' để lịch sự hơn"],
    mistakes: ["Subject line trống hoặc quá chung", "Quá dài, thiếu CTA rõ ràng", "Dùng ngôn ngữ quá informal"],
  },
  {
    id: "cover",
    icon: Briefcase,
    color: "from-pink-500 to-rose-600",
    bg: "bg-pink-50",
    border: "border-pink-200",
    tag: "Career",
    tagColor: "bg-pink-100 text-pink-700",
    label: "Cover Letter / Luận học bổng",
    desc: "Thư xin việc hoặc bài luận học bổng thể hiện động lực, kinh nghiệm và sự phù hợp.",
    minWords: 250,
    time: "Linh hoạt",
    structure: [
      { step: "Hook", detail: "Câu mở ấn tượng — thành tích, tình huống, câu hỏi gợi mở" },
      { step: "Background", detail: "Kinh nghiệm, kỹ năng liên quan đến vị trí/học bổng" },
      { step: "Motivation", detail: "Tại sao muốn vị trí này, tại sao đây là thời điểm đúng" },
      { step: "Value fit", detail: "Bạn đem lại gì cho tổ chức / chương trình" },
      { step: "Closing", detail: "Bày tỏ mong muốn được phỏng vấn / tiếp tục liên hệ" },
    ],
    connectors: ["Throughout my academic journey,…", "This opportunity would enable me to…", "I have consistently…", "My experience with… has equipped me to…"],
    tips: ["Mở bài không bao giờ bắt đầu bằng 'My name is'", "Dùng số liệu cụ thể: 'Led a team of 5', 'Increased by 30%'", "Nghiên cứu công ty/trường trước để cá nhân hóa nội dung"],
    mistakes: ["Generic — không nhắc tên công ty/trường cụ thể", "Liệt kê CV thay vì kể câu chuyện", "Kết thúc thụ động: 'Hope to hear from you'"],
  },
  {
    id: "academic",
    icon: BookOpen,
    color: "from-slate-600 to-slate-800",
    bg: "bg-slate-50",
    border: "border-slate-200",
    tag: "Academic",
    tagColor: "bg-slate-100 text-slate-700",
    label: "Văn bản học thuật",
    desc: "Bài báo, tiểu luận, research paper theo chuẩn học thuật quốc tế.",
    minWords: 300,
    time: "Linh hoạt",
    structure: [
      { step: "Abstract", detail: "Tóm tắt toàn bộ bài — mục tiêu, phương pháp, kết quả" },
      { step: "Introduction", detail: "Bối cảnh, khoảng trống nghiên cứu, thesis" },
      { step: "Literature review", detail: "Tổng hợp nghiên cứu trước có liên quan" },
      { step: "Discussion", detail: "Phân tích kết quả, so sánh với nghiên cứu khác" },
      { step: "Conclusion", detail: "Đóng góp, hạn chế, hướng nghiên cứu tiếp theo" },
    ],
    connectors: ["This paper aims to…", "Previous studies have shown…", "The findings suggest…", "It can be argued that…", "Further research is needed to…"],
    tips: ["Luôn trích dẫn nguồn — tránh plagiarism", "Dùng passive voice để tăng tính khách quan", "Tránh ngôn ngữ cảm xúc — ưu tiên evidence"],
    mistakes: ["Thiếu trích dẫn", "Kết luận không liên kết với introduction", "Dùng ngôn ngữ quá informal"],
  },
];

export default function GuidePage() {
  return (
    <AppShell activePath="/guide">
      {/* Top bar */}
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b border-slate-100 px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-blue-500" />
          <h1 className="text-sm font-extrabold text-slate-900">Hướng dẫn viết</h1>
        </div>
        <span className="text-xs text-slate-400">{types.length} loại văn bản</span>
      </div>

      <div className="p-6 w-full space-y-4">
        {/* Intro banner */}
        <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 p-5 text-white">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-200 mb-1">AI Writing Coach</p>
          <h2 className="text-lg font-extrabold mb-1">Học cách viết từng loại văn bản</h2>
          <p className="text-sm text-blue-100 leading-relaxed max-w-xl">
            Chọn loại văn bản bên dưới để xem cấu trúc, từ nối, lỗi thường gặp và mẹo viết từ AI Coach — rồi bắt đầu viết với hướng dẫn ngay trong trình soạn thảo.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {types.map((t) => {
            const Icon = t.icon;
            return (
              <div key={t.id} className={`bg-white rounded-2xl border ${t.border} shadow-sm overflow-hidden flex flex-col`}>
                {/* Card header */}
                <div className="p-5 flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${t.color} flex items-center justify-center shadow-sm`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <span className={`text-[10px] font-extrabold px-2 py-1 rounded-full uppercase tracking-wide ${t.tagColor}`}>
                      {t.tag}
                    </span>
                  </div>
                  <h3 className="text-sm font-extrabold text-slate-900 mb-1">{t.label}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-3">{t.desc}</p>

                  <div className="flex items-center gap-3 text-xs text-slate-400 mb-4">
                    <span className="flex items-center gap-1">
                      <span className="font-semibold text-slate-600">Tối thiểu:</span> {t.minWords} từ
                    </span>
                    <span className="w-px h-3 bg-slate-200" />
                    <span className="flex items-center gap-1">
                      <span className="font-semibold text-slate-600">Thời gian:</span> {t.time}
                    </span>
                  </div>

                  {/* Structure */}
                  <div className="mb-3">
                    <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">Cấu trúc</p>
                    <div className="space-y-1.5">
                      {t.structure.map((s, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span className={`w-5 h-5 rounded-full bg-gradient-to-br ${t.color} text-white text-[9px] font-extrabold flex items-center justify-center shrink-0 mt-0.5`}>
                            {i + 1}
                          </span>
                          <div>
                            <span className="text-xs font-bold text-slate-700">{s.step}</span>
                            <span className="text-xs text-slate-400"> — {s.detail}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Key phrases */}
                  <div className="mb-3">
                    <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">Từ nối thông dụng</p>
                    <div className="flex flex-wrap gap-1.5">
                      {t.connectors.slice(0, 3).map((c) => (
                        <span key={c} className={`text-[10px] font-semibold px-2 py-1 ${t.bg} rounded-lg text-slate-600 border ${t.border}`}>
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Common mistakes */}
                  <div>
                    <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">Lỗi hay gặp</p>
                    <ul className="space-y-1">
                      {t.mistakes.map((m) => (
                        <li key={m} className="flex items-start gap-1.5 text-xs text-slate-500">
                          <span className="text-red-400 mt-0.5 shrink-0">✕</span>
                          {m}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* CTA */}
                <div className="px-5 pb-5">
                  <a
                    href={`/write?type=${t.id}`}
                    className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-gradient-to-r ${t.color} text-white text-xs font-bold hover:opacity-90 transition-opacity shadow-sm`}
                  >
                    Bắt đầu viết loại này
                    <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom tip */}
        <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-2xl">
          <ArrowRight className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
          <p className="text-xs text-amber-700 leading-relaxed">
            <span className="font-bold">Mẹo:</span> Khi viết bài, mở bảng <span className="font-bold">AI Coach</span> bên phải trình soạn thảo để xem cấu trúc và từ nối ngay lúc viết — không cần nhớ hết.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
