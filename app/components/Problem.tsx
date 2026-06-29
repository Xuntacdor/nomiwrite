import { XCircle, CheckCircle2, Edit3, BarChart2, Layers } from "lucide-react";

const problems = [
  {
    tool: "Grammarly",
    Icon: Edit3,
    problem: "Sửa lỗi hộ bạn",
    detail:
      "Bạn copy bản sửa mà không hiểu tại sao. Lần sau vẫn sai y chang. Không học được gì cả.",
    border: "border-red-200",
    bg: "bg-red-50/60",
    iconColor: "text-red-500 bg-red-100",
    tagColor: "text-red-600 bg-red-50",
  },
  {
    tool: "App chấm IELTS",
    Icon: BarChart2,
    problem: "Chấm điểm rồi thôi",
    detail:
      "Biết band 6.0 hay 7.0 nhưng không biết mình yếu nhóm lỗi nào — lần sau không tiến được.",
    border: "border-orange-200",
    bg: "bg-orange-50/60",
    iconColor: "text-orange-500 bg-orange-100",
    tagColor: "text-orange-600 bg-orange-50",
  },
  {
    tool: "Quizlet / Anki",
    Icon: Layers,
    problem: "Học từ rời rạc",
    detail:
      "Từ vựng tách hoàn toàn khỏi bài viết thật. Học xong không biết dùng trong ngữ cảnh nào.",
    border: "border-amber-200",
    bg: "bg-amber-50/60",
    iconColor: "text-amber-600 bg-amber-100",
    tagColor: "text-amber-700 bg-amber-50",
  },
];

export default function Problem() {
  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-3 py-1 text-xs font-bold text-red-600 bg-red-50 rounded-full uppercase tracking-widest mb-4">
            Vấn đề
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight">
            Công cụ hiện tại không dạy —
            <br />
            <span className="text-red-500">chúng chỉ sửa hộ bạn</span>
          </h2>
          <p className="mt-5 text-lg text-slate-500 max-w-xl mx-auto">
            Người học tiếng Anh ở Việt Nam đang mắc kẹt giữa ba loại công cụ,
            không cái nào giải quyết đúng vấn đề.
          </p>
        </div>

        {/* Problem cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {problems.map((item) => {
            const { Icon } = item;
            return (
              <div
                key={item.tool}
                className={`group rounded-2xl border-2 ${item.border} ${item.bg} p-7 card-hover flex flex-col`}
              >
                <div className="flex items-start justify-between mb-5">
                  <div className={`w-11 h-11 rounded-xl ${item.iconColor} flex items-center justify-center`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <XCircle className="w-5 h-5 text-red-400 mt-0.5" />
                </div>

                <span className={`self-start mb-2 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider rounded ${item.tagColor}`}>
                  {item.tool}
                </span>
                <h3 className="text-lg font-extrabold text-slate-800 mb-3">
                  {item.problem}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed flex-1">
                  {item.detail}
                </p>
              </div>
            );
          })}
        </div>

        {/* Solution bridge */}
        <div className="relative rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-violet-700" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(139,92,246,0.3),transparent_60%)]" />
          <div className="relative p-8 sm:p-10 flex flex-col sm:flex-row items-center gap-6 text-white">
            <div className="w-14 h-14 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-7 h-7 text-white" />
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-xl sm:text-2xl font-extrabold mb-2">
                NomiWrite giải quyết cả ba khoảng trống này
              </h3>
              <p className="text-blue-100 text-sm sm:text-base max-w-xl leading-relaxed">
                Dùng bài viết của bạn làm nguồn dữ liệu. Phân loại lỗi cố hữu.
                Sinh bài tập từ đúng điểm yếu đó. Rồi đo xem bạn có tiến bộ thật không.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
