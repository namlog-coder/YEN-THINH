import React from 'react';
import { School, PhoneCall } from 'lucide-react';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 py-3 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Branding */}
        <div id="header-brand-container" className="flex items-center gap-3">
          <div 
            id="header-logo-badge" 
            className="w-12 h-12 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shadow-sm"
          >
            {/* Elegant school graphic */}
            <div className="relative">
              <School className="w-6 h-6 stroke-[1.8]" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border border-white animate-ping" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border border-white" />
            </div>
          </div>
          <div id="header-text-block" className="flex flex-col">
            <span 
              id="header-subtitle" 
              className="text-[10px] md:text-[11px] font-semibold text-slate-400 tracking-wider uppercase font-display"
            >
              HỆ THỐNG TRỰC TUYẾN
            </span>
            <span 
              id="header-title" 
              className="text-base md:text-lg font-bold text-slate-800 tracking-tight"
            >
              Tuyển sinh Lớp 1 Tiểu học
            </span>
          </div>
        </div>

        {/* Support Hotline / Quick CTA (Clean alternative since we removed the buttons) */}
        <div id="header-support-block" className="flex items-center gap-3">
          <a
            href="tel:02143820202"
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200/60 hover:bg-slate-100/80 transition-colors duration-200 text-xs text-slate-600 font-medium"
          >
            <PhoneCall className="w-3.5 h-3.5 text-blue-500" />
            <span>Hỗ trợ: 0214.382.0202</span>
          </a>
          <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-green-50 border border-green-200/50 text-xs text-green-600 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            Trực tuyến
          </span>
        </div>
      </div>
    </header>
  );
}
