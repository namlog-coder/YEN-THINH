import React from 'react';
import { FileText, ExternalLink, ShieldCheck, Heart } from 'lucide-react';

export default function RegistrationButton() {
  const formUrl = "https://docs.google.com/forms/d/e/1FAIpQLSeLyRPttjcDrhkTulA9P1Apf-ZWYKbDaPfnW9sR_GON3jVHYA/viewform?usp=header";

  return (
    <div 
      id="registration-cta-card" 
      className="bg-white rounded-2xl border border-slate-100 shadow-xl overflow-hidden"
    >
      {/* Decorative top accent colored bars */}
      <div id="cta-accent-strip" className="h-1.5 w-full bg-gradient-to-r from-[#df1d24] via-blue-500 to-[#fbbf24]" />

      <div id="cta-body" className="p-6 md:p-10 flex flex-col items-center text-center">
        {/* Heart/Welcoming Graphic Icon */}
        <div 
          id="cta-icon-wrapper" 
          className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mb-6 border border-blue-100 transition-transform duration-300 hover:scale-110"
        >
          <FileText className="w-8 h-8 stroke-[1.8]" />
        </div>

        {/* Heading */}
        <h2 id="cta-headline" className="text-xl md:text-2xl font-bold text-slate-800 font-display">
          Đăng Ký Tuyển Sinh Ngay
        </h2>
        <p id="cta-sublead" className="mt-2 text-sm text-slate-500 max-w-lg">
          Quý phụ huynh vui lòng nhấn vào nút đăng ký dưới đây để tiến hành nhập thông tin trực tuyến cho học sinh chuẩn bị vào Lớp 1 tại Trường Tiểu học Yên Thịnh.
        </p>

        {/* Central Dynamic Link Button */}
        <div id="cta-action-container" className="mt-8 w-full max-w-md">
          <a
            href={formUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="register-google-form-button"
            className="group relative flex items-center justify-center gap-3 w-full py-4 px-6 text-white font-semibold rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all duration-200 text-base md:text-lg cursor-pointer"
          >
            <ShieldCheck className="w-5.5 h-5.5 text-blue-100 group-hover:rotate-12 transition-transform duration-200" />
            <span>NỘP HỒ SƠ ĐĂNG KÝ TRỰC TUYẾN</span>
            <ExternalLink className="w-4.5 h-4.5 text-blue-200 font-bold group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-200 whitespace-nowrap" />
          </a>
        </div>

        {/* Security & Official badge line */}
        <div id="cta-security-line" className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-slate-400">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            Khai báo an toàn
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
          <span className="flex items-center gap-1">
            <Heart className="w-4 h-4 text-red-400" />
            Hỗ trợ tận tình
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
          <span>Thời gian kê khai: ~5-10 phút</span>
        </div>
      </div>
    </div>
  );
}
