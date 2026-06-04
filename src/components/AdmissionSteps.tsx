import React from 'react';
import { ClipboardList, FormInput, MessageSquareCode, FileCheck } from 'lucide-react';
import { AdmissionStep } from '../types';

export default function AdmissionSteps() {
  const steps: AdmissionStep[] = [
    {
      id: 1,
      title: "Chuẩn Bị Hồ Sơ",
      description: "Phụ huynh chuẩn bị ảnh chụp/bản scan Giấy khai sinh hợp lệ của trẻ, và thông tin Số định danh cá nhân của học sinh.",
      iconName: "ClipboardList"
    },
    {
      id: 2,
      title: "Điền Biểu Mẫu Trực Tuyến",
      description: "Nhấp vào nút nộp hồ sơ ở trên để truy cập Google Form tuyển sinh. Nhập đầy đủ, chính xác thông tin cá nhân và liên hệ.",
      iconName: "FormInput"
    },
    {
      id: 3,
      title: "Nhà Trường Tiếp Nhận",
      description: "Ban Tuyển sinh trường Tiểu học Yên Thịnh tiếp nhận thông tin đăng ký trực tuyến, tiến hành đối chiếu và duyệt hồ sơ cơ bản.",
      iconName: "MessageSquareCode"
    },
    {
      id: 4,
      title: "Hoàn Tất Nhập Học",
      description: "Phụ huynh đưa trẻ đến trường nộp hồ sơ giấy bản chính theo lịch hẹn cụ thể được giáo viên gọi điện hoặc gửi tin nhắn thông báo.",
      iconName: "FileCheck"
    }
  ];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ClipboardList':
        return <ClipboardList className="w-6 h-6 text-indigo-600" />;
      case 'FormInput':
        return <FormInput className="w-6 h-6 text-indigo-600" />;
      case 'MessageSquareCode':
        return <MessageSquareCode className="w-6 h-6 text-indigo-600" />;
      case 'FileCheck':
        return <FileCheck className="w-6 h-6 text-indigo-600" />;
      default:
        return <ClipboardList className="w-6 h-6 text-indigo-600" />;
    }
  };

  return (
    <div id="admission-steps-section" className="mt-12 md:mt-16">
      <div id="steps-header" className="text-center mb-10">
        <h3 id="steps-title" className="text-xl md:text-2xl font-bold text-slate-800 font-display">
          Quy Trình Đăng Ký Tuyển Sinh Lớp 1
        </h3>
        <p id="steps-lead" className="mt-2 text-sm text-slate-500 max-w-xl mx-auto">
          Quy trình gồm 4 bước nhanh chóng giúp phụ huynh đăng ký học cho con em một cách thuận tiện nhất.
        </p>
      </div>

      <div id="steps-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, index) => (
          <div 
            key={step.id} 
            id={`step-card-${step.id}`} 
            className="group relative bg-white rounded-xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
          >
            {/* Step Number Top-Right */}
            <span className="absolute top-4 right-4 text-3xl font-extrabold text-slate-100 select-none group-hover:text-indigo-50 font-display transition-colors">
              0{step.id}
            </span>

            {/* Icon Wrapper */}
            <div className="w-12 h-12 rounded-lg bg-indigo-50 flex items-center justify-center mb-5 shrink-0">
              {getIcon(step.iconName)}
            </div>

            {/* Title & Desc */}
            <h4 className="text-sm md:text-base font-bold text-slate-800 mb-2 font-display">
              {step.title}
            </h4>
            <p className="text-xs md:text-sm text-slate-550 leading-relaxed flex-grow">
              {step.description}
            </p>

            {/* Connection Arrow/Lines for desktop */}
            {index < 3 && (
              <div className="hidden lg:block absolute top-10 -right-4 w-8 h-[1px] border-t border-dashed border-slate-200 z-10 pointer-events-none" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
