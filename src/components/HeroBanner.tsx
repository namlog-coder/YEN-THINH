import React from 'react';
import { Mail, MapPin, GraduationCap } from 'lucide-react';

export default function HeroBanner() {
  return (
    <div 
      id="hero-banner-card" 
      className="relative overflow-hidden rounded-2xl md:rounded-[2rem] bg-gradient-to-br from-[#0b1636] via-[#102561] to-[#08102a] text-white shadow-xl border border-slate-800"
    >
      {/* Absolute Red Left Accent Line */}
      <div 
        id="hero-red-accent" 
        className="absolute left-0 top-0 bottom-0 w-2 bg-[#df1d24]" 
      />

      {/* Decorative Mortarboard watermark, precisely rotated and scaled on the right */}
      <div 
        id="hero-watermark-container" 
        className="absolute right-6 md:right-16 top-1/2 -translate-y-1/2 opacity-[0.06] pointer-events-none select-none"
      >
        <GraduationCap className="w-48 h-48 md:w-80 md:h-80 -rotate-12 stroke-[1.2]" />
      </div>

      {/* Content wrapper with generous padding */}
      <div 
        id="hero-content-padding" 
        className="relative z-10 px-6 py-12 md:py-16 md:px-12 flex flex-col items-center text-center max-w-4xl mx-auto"
      >
        {/* Superior Authority */}
        <span 
          id="hero-executive-authority" 
          className="text-xs md:text-sm font-semibold tracking-[0.13em] uppercase text-slate-350 opacity-90 font-display"
        >
          ỦY BAN NHÂN DÂN PHƯỜNG VĂN PHÚ
        </span>
        
        {/* Subtle red line below authority */}
        <div id="hero-divider-red" className="w-10 h-[3px] bg-[#df1d24] mt-2 mb-4" />

        {/* School Name */}
        <h1 
          id="hero-school-name" 
          className="text-2xl md:text-4xl lg:text-5xl font-extrabold tracking-wide text-[#fbbf24] drop-shadow-md font-display uppercase leading-tight"
        >
          TRƯỜNG TIỂU HỌC YÊN THỊNH
        </h1>

        {/* Cổng thông tin description */}
        <p 
          id="hero-portal-description" 
          className="mt-5 text-sm md:text-base text-slate-200 font-normal leading-relaxed max-w-3xl"
        >
          Cổng thông tin đăng ký trực tuyến hợp pháp & quản lý hồ sơ học sinh trường Tiểu học Yên Thịnh - Năm học 2026-2027
        </p>

        {/* Status badges */}
        <div id="hero-badge-container" className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {/* Active Enrollment Badge */}
          <div 
            id="badge-active-enrollment" 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-teal-500/30 bg-teal-950/40 text-teal-300 text-xs md:text-sm font-medium backdrop-blur-sm"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span>Đang mở tuyển sinh lớp 1</span>
          </div>

          {/* Location Badge */}
          <div 
            id="badge-location" 
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-950/40 text-blue-200 text-xs md:text-sm font-medium backdrop-blur-sm"
          >
            <MapPin className="w-4 h-4 text-orange-400 shrink-0" />
            <span>Phường Văn Phú, tỉnh Lào Cai</span>
          </div>
        </div>
      </div>
    </div>
  );
}
