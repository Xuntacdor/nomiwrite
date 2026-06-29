import { Check, X, Minus } from "lucide-react";

type CellValue = boolean | "partial";

interface Row {
  feature: string;
  writewise: CellValue;
  grammarly: CellValue;
  ieltsApps: CellValue;
  quizlet: CellValue;
}

const rows: Row[] = [
  {
    feature: "Chấm điểm theo loại văn bản",
    writewise: true,
    grammarly: false,
    ieltsApps: "partial",
    quizlet: false,
  },
  {
    feature: "Phân loại lỗi ngữ pháp cố định",
    writewise: true,
    grammarly: false,
    ieltsApps: false,
    quizlet: false,
  },
  {
    feature: "Gợi ý nâng cấp từ vựng",
    writewise: true,
    grammarly: true,
    ieltsApps: "partial",
    quizlet: false,
  },
  {
    feature: "Quiz sinh từ bài viết của bạn",
    writewise: true,
    grammarly: false,
    ieltsApps: false,
    quizlet: false,
  },
  {
    feature: "Đo tiến bộ theo nhóm lỗi",
    writewise: true,
    grammarly: false,
    ieltsApps: false,
    quizlet: false,
  },
  {
    feature: "Hỗ trợ nhiều loại văn bản",
    writewise: true,
    grammarly: true,
    ieltsApps: false,
    quizlet: false,
  },
  {
    feature: "Phân tích lỗi người Việt",
    writewise: true,
    grammarly: false,
    ieltsApps: "partial",
    quizlet: false,
  },
  {
    feature: "Dạy thật (không sửa hộ)",
    writewise: true,
    grammarly: false,
    ieltsApps: false,
    quizlet: false,
  },
];

function Cell({ value, highlight }: { value: CellValue; highlight?: boolean }) {
  if (value === true) {
    return (
      <div className={`flex justify-center ${highlight ? "text-blue-600" : "text-emerald-500"}`}>
        <Check className="w-5 h-5" strokeWidth={2.5} />
      </div>
    );
  }
  if (value === "partial") {
    return (
      <div className="flex justify-center text-yellow-500">
        <Minus className="w-5 h-5" strokeWidth={2.5} />
      </div>
    );
  }
  return (
    <div className="flex justify-center text-slate-300">
      <X className="w-5 h-5" strokeWidth={2} />
    </div>
  );
}

export default function Comparison() {
  return (
    <section className="py-20 sm:py-28 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 text-xs font-semibold text-emerald-600 bg-emerald-50 rounded-full uppercase tracking-wide mb-3">
            So sánh
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
            NomiWrite vs. các công cụ khác
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-xl mx-auto">
            Tại sao không công cụ nào hiện tại giải quyết đúng vấn đề của
            người học viết tiếng Anh.
          </p>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
          {/* Header row */}
          <div className="grid grid-cols-5 gap-0 border-b border-slate-100">
            <div className="col-span-1 px-4 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Tính năng
            </div>
            <div className="col-span-1 px-2 py-4 text-center bg-blue-50 border-x border-blue-100">
              <p className="text-sm font-bold text-blue-700">NomiWrite</p>
            </div>
            <div className="col-span-1 px-2 py-4 text-center">
              <p className="text-xs font-semibold text-slate-500">Grammarly</p>
            </div>
            <div className="col-span-1 px-2 py-4 text-center">
              <p className="text-xs font-semibold text-slate-500">App IELTS</p>
            </div>
            <div className="col-span-1 px-2 py-4 text-center">
              <p className="text-xs font-semibold text-slate-500">Quizlet</p>
            </div>
          </div>

          {/* Data rows */}
          {rows.map((row, idx) => (
            <div
              key={row.feature}
              className={`grid grid-cols-5 gap-0 border-b border-slate-50 ${
                idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"
              }`}
            >
              <div className="col-span-1 px-4 py-3.5">
                <p className="text-sm text-slate-700">{row.feature}</p>
              </div>
              <div className="col-span-1 px-2 py-3.5 bg-blue-50/60 border-x border-blue-100">
                <Cell value={row.writewise} highlight />
              </div>
              <div className="col-span-1 px-2 py-3.5">
                <Cell value={row.grammarly} />
              </div>
              <div className="col-span-1 px-2 py-3.5">
                <Cell value={row.ieltsApps} />
              </div>
              <div className="col-span-1 px-2 py-3.5">
                <Cell value={row.quizlet} />
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-4 flex items-center justify-center gap-5 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-emerald-500" />
            <span>Có đầy đủ</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Minus className="w-3.5 h-3.5 text-yellow-500" />
            <span>Có một phần</span>
          </div>
          <div className="flex items-center gap-1.5">
            <X className="w-3.5 h-3.5 text-slate-300" />
            <span>Không có</span>
          </div>
        </div>
      </div>
    </section>
  );
}
