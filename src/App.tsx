import React from 'react';
import { motion } from 'motion/react';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import RegistrationButton from './components/RegistrationButton';
import AdmissionSteps from './components/AdmissionSteps';
import AdmissionTimeline from './components/AdmissionTimeline';
import FAQSupport from './components/FAQSupport';
import { Building2, Award, Users, BookOpen } from 'lucide-react';

export default function App() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
  };

  return (
    <div id="school-admission-app" className="min-h-screen bg-[#fafbfc] text-slate-800 font-sans selection:bg-indigo-100 selection:text-indigo-900 pb-20">
      {/* Navigation Header */}
      <Header />

      {/* Main Container */}
      <main id="main-content-layout" className="max-w-7xl mx-auto px-4 md:px-8 pt-28 md:pt-32">
        <motion.div
          id="animated-elements-wrapper"
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-12 md:space-y-16"
        >
          {/* 1. Hero Block directly representing the image design */}
          <motion.div id="anim-hero-block" variants={itemVariants}>
            <HeroBanner />
          </motion.div>

          {/* 2. Registration Buttons Block (Crucial call to action) */}
          <motion.div id="anim-registration-block" variants={itemVariants}>
            <RegistrationButton />
          </motion.div>

          {/* School stats panel or highlights section (adds deep context as a premium school site) */}
          <motion.div id="anim-stats-block" variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <div id="stat1" className="bg-white border border-slate-100/80 rounded-2xl p-5 text-center shadow-xs flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                <Building2 className="w-5 h-5" />
              </div>
              <h5 className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wide">Phòng học</h5>
              <p className="text-xl md:text-2xl font-black text-slate-800 mt-1 font-display">100% Khang trang</p>
              <p className="text-[10px] md:text-xs text-slate-400 mt-0.5">Đạt chuẩn Quốc gia</p>
            </div>

            <div id="stat2" className="bg-white border border-slate-100/80 rounded-2xl p-5 text-center shadow-xs flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                <Users className="w-5 h-5" />
              </div>
              <h5 className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wide">Giáo viên</h5>
              <p className="text-xl md:text-2xl font-black text-slate-800 mt-1 font-display">Đạt Chuẩn trở lên</p>
              <p className="text-[10px] md:text-xs text-slate-400 mt-0.5">Giàu kinh nghiệm, sư phạm cao</p>
            </div>

            <div id="stat3" className="bg-white border border-slate-100/80 rounded-2xl p-5 text-center shadow-xs flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center mb-3">
                <Award className="w-5 h-5" />
              </div>
              <h5 className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wide">Danh hiệu</h5>
              <p className="text-xl md:text-2xl font-black text-slate-800 mt-1 font-display">Chuẩn Quốc Gia Mức I</p>
              <p className="text-[10px] md:text-xs text-slate-400 mt-0.5">Nhiều bằng khen xuất sắc</p>
            </div>

            <div id="stat4" className="bg-white border border-slate-100/80 rounded-2xl p-5 text-center shadow-xs flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
                <BookOpen className="w-5 h-5" />
              </div>
              <h5 className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wide">Bán trú</h5>
              <p className="text-xl md:text-2xl font-black text-slate-800 mt-1 font-display">Chất lượng cao</p>
              <p className="text-[10px] md:text-xs text-slate-400 mt-0.5">Bếp ăn dinh dưỡng chuẩn</p>
            </div>
          </motion.div>

          {/* 3. Steps Block */}
          <motion.div id="anim-steps-block" variants={itemVariants}>
            <AdmissionSteps />
          </motion.div>

          {/* 4. Timeline Block */}
          <motion.div id="anim-timeline-block" variants={itemVariants}>
            <AdmissionTimeline />
          </motion.div>

          {/* 5. Frequently Asked Questions & Contacts Block */}
          <motion.div id="anim-faq-block" variants={itemVariants}>
            <FAQSupport />
          </motion.div>
        </motion.div>
      </main>

      {/* Decorative footer */}
      <footer id="admission-footer" className="mt-20 border-t border-slate-100 pt-8 pb-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-400">
          <p>© 2026 Trường Tiểu học Yên Thịnh - Lào Cai. Bảo lưu mọi quyền.</p>
          <div className="flex gap-4">
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSeLyRPttjcDrhkTulA9P1Apf-ZWYKbDaPfnW9sR_GON3jVHYA/viewform?usp=header" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors">Liên kết Google Form tuyển sinh</a>
            <span>•</span>
            <span>Cổng Đăng Ký Trực Tuyến Hợp Pháp</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
