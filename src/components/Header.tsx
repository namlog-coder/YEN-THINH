import { GraduationCap, MapPin, Sparkles } from "lucide-react";

export default function Header() {
  return (
    <header className="relative w-full overflow-hidden bg-gradient-to-b from-blue-900 to-indigo-950 text-white shadow-xl rounded-2xl md:rounded-3xl border border-blue-800/50">
      {/* Decorative Traditional Red Ribbon on left or background details */}
      <div className="absolute top-0 left-0 w-2 h-full bg-red-600" />
      
      {/* Background radial soft light glow */}
      <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[350px] md:w-[600px] h-[350px] md:h-[600px] rounded-full bg-blue-500/10 blur-[120px] pointer-events-none" />

      {/* Main Grid container */}
      <div className="relative px-6 py-8 md:py-12 md:px-12 flex flex-col items-center text-center">
        
        {/* National / Government Subtitle */}
        <p className="text-xs md:text-sm font-semibold tracking-widest text-blue-200 uppercase mb-2">
          ỦY BAN NHÂN DÂN PHƯỜNG VĂN PHÚ
        </p>

        {/* Traditional separator dot or line */}
        <div className="w-12 h-1 bg-red-500 rounded-full my-1.5" />

        {/* Official School Title */}
        <h1 className="text-xl md:text-3.5xl font-serif font-bold tracking-wide text-amber-300 drop-shadow-md">
          TRƯỜNG TIỂU HỌC YÊN THỊNH
        </h1>

        {/* Secondary Title */}
        <p className="mt-4 max-w-xl text-xs md:text-sm text-blue-100 font-sans tracking-normal leading-relaxed">
          Cổng Thông Tin Đăng Ký Tuyển Sinh Trực Tuyến Hợp Pháp & Quản Lý Hồ Sơ
          <br className="hidden sm:inline" /> Học sinh Trường Tiểu học Yên Thịnh - Năm học 2026 - 2027
        </p>

        {/* Active badges */}
        <div className="mt-5 flex flex-wrap gap-2.5 justify-center items-center text-xs">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/35 font-medium shadow-sm">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
            Đang Mở Tuyển Sinh Lớp 1
          </span>
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-500/20 text-blue-200 rounded-full border border-blue-500/35">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            Phường Văn Phú, tỉnh Lào Cai
          </span>
        </div>

        {/* Academic cap Floating icon at the side background */}
        <div className="absolute right-6 top-6 opacity-5 pointer-events-none hidden md:block">
          <GraduationCap className="w-24 h-24" />
        </div>
      </div>
    </header>
  );
}
