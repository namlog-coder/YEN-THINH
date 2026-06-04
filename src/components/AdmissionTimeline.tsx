import React from 'react';
import { Calendar, CheckCircle2, Circle, Clock } from 'lucide-react';
import { TimelineItem } from '../types';

export default function AdmissionTimeline() {
  const timeline: TimelineItem[] = [
    {
      id: 1,
      phase: "Tháng Thử nghiệm & Chuẩn bị",
      dateRange: "01/05/2026 - 31/05/2026",
      description: "Nhà trường rà soát thông tin số lượng trẻ 6 tuổi sinh năm 2020 trên địa bàn phường, chuẩn bị cơ sở dữ liệu và hệ thống tuyển sinh trực tuyến.",
      status: "past"
    },
    {
      id: 2,
      phase: "Đăng Ký Tuyển Sinh Trực Tuyến Lớp 1",
      dateRange: "01/06/2026 - 15/07/2026",
      description: "Nhà trường mở chính thức cổng đăng ký trực tuyến. Phụ huynh nộp thông tin qua Google Form tuyển sinh chính thức học kỳ mới.",
      status: "current"
    },
    {
      id: 3,
      phase: "Đối Chiếu Hồ Sơ & Nhận Bản Giấy",
      dateRange: "20/07/2026 - 31/07/2026",
      description: "Ban Tuyển sinh tiếp nhận đối chiếu hồ sơ trực tiếp tại trường. Quý phụ huynh vui lòng mang theo Giấy khai sinh bản sao và giấy tờ liên quan hợp pháp.",
      status: "future"
    },
    {
      id: 4,
      phase: "Công Bố Danh Sách Học Sinh Lớp 1",
      dateRange: "05/08/2026",
      description: "Hội đồng tuyển sinh duyệt phương án phân lớp học sinh, chính thức ban hành danh sách học sinh Lớp 1 năm học mới 2026 - 2027.",
      status: "future"
    }
  ];

  return (
    <div id="timeline-section" className="mt-12 md:mt-16 bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm">
      <div id="timeline-heading-block" className="flex items-center gap-3 mb-8">
        <div id="timeline-calendar-wrapper" className="p-2.5 rounded-lg bg-orange-50 text-orange-500">
          <Calendar className="w-6 h-6" />
        </div>
        <div>
          <h3 id="timeline-title" className="text-xl font-bold text-slate-800 font-display">
            Lịch Trình Tuyển Sinh Chi Tiết (2026 - 2027)
          </h3>
          <p id="timeline-lead" className="text-xs md:text-sm text-slate-400">
            Các mốc thời gian quan trọng mà phụ huynh cần lưu ý trong suốt quá trình đăng ký trực tuyển & nộp học bạ.
          </p>
        </div>
      </div>

      {/* Timeline flow */}
      <div id="timeline-flow" className="relative pl-6 md:pl-8 border-l border-slate-100 space-y-8">
        {timeline.map((item) => (
          <div key={item.id} id={`timeline-row-${item.id}`} className="relative">
            {/* Timeline State circle indicator */}
            <div className="absolute -left-[35px] md:-left-[43px] top-1 z-10 bg-white p-1 rounded-full">
              {item.status === 'past' && (
                <CheckCircle2 className="w-5 h-5 text-emerald-500 bg-white rounded-full" />
              )}
              {item.status === 'current' && (
                <span className="relative flex h-5 w-5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-5 w-5 bg-blue-600 border-4 border-white"></span>
                </span>
              )}
              {item.status === 'future' && (
                <Circle className="w-5 h-5 text-slate-300 stroke-[2] bg-white rounded-full" />
              )}
            </div>

            {/* Content Container */}
            <div 
              id={`timeline-card-${item.id}`}
              className={`p-4 md:p-5 rounded-xl border transition-all duration-300 ${
                item.status === 'current' 
                  ? 'bg-blue-50/50 border-blue-200 shadow-sm shadow-blue-50' 
                  : 'bg-slate-50/40 border-transparent hover:bg-slate-50/80 hover:border-slate-100'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                <h4 className={`text-sm md:text-base font-bold ${
                  item.status === 'current' ? 'text-blue-900 font-display' : 'text-slate-850'
                }`}>
                  {item.phase}
                </h4>
                {/* Date range badge */}
                <div className={`inline-flex items-center gap-1 text-[11px] font-semibold tracking-wide py-1 px-2.5 rounded-full w-fit ${
                  item.status === 'current' 
                    ? 'bg-blue-100 text-blue-700' 
                    : item.status === 'past' 
                      ? 'bg-emerald-50 text-emerald-700' 
                      : 'bg-slate-200 text-slate-500'
                }`}>
                  <Clock className="w-3 h-3" />
                  <span>{item.dateRange}</span>
                </div>
              </div>
              
              <p className={`text-xs md:text-sm leading-relaxed ${
                item.status === 'current' ? 'text-slate-650' : 'text-slate-500'
              }`}>
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
