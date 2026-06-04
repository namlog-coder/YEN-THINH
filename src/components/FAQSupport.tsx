import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, MapPin, Phone, HelpCircle as HelpIcon, Mail, ShieldAlert } from 'lucide-react';
import { FAQItem, SchoolContact } from '../types';

export default function FAQSupport() {
  const [openId, setOpenId] = useState<number | null>(1); // default open first item

  const faqs: FAQItem[] = [
    {
      id: 1,
      question: "Độ tuổi quy định tuyển sinh vào Lớp 1 năm nay là bao nhiêu?",
      answer: "Năm học 2026 - 2027, trường Tiểu học Yên Thịnh tiếp nhận học sinh vào Lớp 1 là trẻ 6 tuổi (sinh năm 2020). Không nhận trẻ thiếu tuổi vào học trừ các trường hợp đặc biệt được quy định bởi Sở Giáo dục và Đào tạo."
    },
    {
      id: 2,
      question: "Địa bàn tuyển sinh của Trường Tiểu học Yên Thịnh bao gồm khu vực nào?",
      answer: "Địa bàn tuyển sinh chính thức bao gồm toàn bộ khu dân cư, tổ dân phố thuộc Phường Văn Phú, thành phố Lào Cai (tỉnh Lào Cai). Phụ huynh có đăng ký thường trú hoặc tạm trú hợp pháp cho con em tại đây đều có thể nộp đơn."
    },
    {
      id: 3,
      question: "Sau khi hoàn tất gửi Google Form, tôi cần làm gì tiếp theo?",
      answer: "Ban Tuyển sinh sẽ tiến hành rà soát danh sách thông tin gửi qua Google Form thường xuyên. Phụ huynh sẽ receive điện thoại xác nhận hoặc tin nhắn SMS từ đường dây nóng tuyển sinh của nhà trường hẹn ngày giờ cụ thể mang hồ sơ giấy (bản đối chứng) đến đối chiếu trực tiếp tại văn phòng trường tuyển sinh."
    },
    {
      id: 4,
      question: "Hồ sơ bản gốc cần chuẩn bị đầy đủ khi đến đối chiếu gồm những gì?",
      answer: "Hồ sơ gồm: 1 Bản sao Giấy khai sinh hợp lệ, Mã định danh cá nhân của học sinh (xin tại Công an phường), và thông tin liên lạc chính xác của ít nhất bố hoặc mẹ. Đơn xin nhập học theo mẫu chung sẽ được giáo viên hướng dẫn viết và ký trực tiếp tại bàn tiếp nhận."
    }
  ];

  const contact: SchoolContact = {
    hotline: "0911.339.866",
    alternativePhone: "0912.456.789",
    email: "th.yenthing.vanphu@laocai.edu.vn",
    address: "Tổ dân phố 3, Phường Văn Phú, Thành phố Lào Cai, Tỉnh Lào Cai",
    officeHours: "Thứ Hai đến Thứ Sáu (Sáng: 07:30 - 11:30 | Chiều: 14:00 - 17:00)"
  };

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div id="faq-support-section" className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* FAQ Left Column */}
      <div id="faq-pane" className="lg:col-span-7 space-y-6">
        <div id="faq-header" className="flex items-center gap-3 mb-6">
          <div id="faq-icon-bg" className="p-2.5 rounded-lg bg-blue-50 text-blue-600">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <h3 id="faq-title" className="text-xl font-bold text-slate-800 font-display">
              Câu Hỏi Thường Gặp
            </h3>
            <p id="faq-lead" className="text-xs md:text-sm text-slate-400">
              Giải đáp thắc mắc phổ biến của quý phụ huynh trong đợt tuyển sinh mới này.
            </p>
          </div>
        </div>

        {/* Accordions */}
        <div id="faq-accordion-group" className="space-y-4">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div 
                key={faq.id} 
                id={`faq-item-${faq.id}`}
                className={`border rounded-xl transition-all duration-200 ${
                  isOpen 
                    ? 'border-indigo-200 bg-indigo-50/10 shadow-sm' 
                    : 'border-slate-100 bg-white hover:border-slate-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 font-semibold text-slate-800 text-sm md:text-base focus:outline-none cursor-pointer"
                >
                  <span className="font-display pr-2">{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-indigo-500 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                  )}
                </button>
                
                {/* Accordion Content with transition height */}
                {isOpen && (
                  <div id={`faq-answer-${faq.id}`} className="px-5 pb-5 pt-1 text-xs md:text-sm text-slate-550 leading-relaxed border-t border-indigo-100/30">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Support Info Right Column */}
      <div id="support-pane" className="lg:col-span-5 space-y-6">
        <div id="support-header" className="flex items-center gap-3 mb-6">
          <div id="support-icon-bg" className="p-2.5 rounded-lg bg-orange-50 text-orange-500">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h3 id="support-title" className="text-xl font-bold text-slate-800 font-display">
              Thông Tin Hỗ Trợ
            </h3>
            <p id="support-lead" className="text-xs md:text-sm text-slate-400">
              Liên hệ trực tiếp với Ban Tuyển sinh của trường học khi gặp khó khăn.
            </p>
          </div>
        </div>

        {/* Contact Info Card */}
        <div id="contact-card" className="bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 rounded-2xl p-6 space-y-6 shadow-sm">
          {/* Address row */}
          <div className="flex gap-3">
            <MapPin className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Địa chỉ trường</p>
              <p className="text-sm text-slate-755 font-medium mt-0.5 leading-relaxed">
                {contact.address}
              </p>
            </div>
          </div>

          {/* Hotline row */}
          <div className="flex gap-3">
            <Phone className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Đường dây nóng</p>
              <p className="text-base font-extrabold text-slate-800 mt-0.5">
                <a href={`tel:${contact.hotline.replace(/\./g, '')}`} className="hover:text-indigo-600 transition-colors">
                  {contact.hotline}
                </a>
              </p>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">
                SĐT sơ phòng trực: {contact.alternativePhone}
              </p>
            </div>
          </div>

          {/* Email row */}
          <div className="flex gap-3">
            <Mail className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Hòm thư điện tử</p>
              <p className="text-sm font-semibold text-slate-700 mt-0.5 break-all">
                <a href={`mailto:${contact.email}`} className="hover:text-indigo-600 transition-colors">
                  {contact.email}
                </a>
              </p>
            </div>
          </div>

          {/* Working hours badge */}
          <div className="pt-4 border-t border-slate-200/80">
            <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 py-1 px-2.5 rounded-full uppercase tracking-wider">
              Thời gian trực tuyển sinh
            </span>
            <p className="text-xs text-slate-600 font-medium mt-2">
              {contact.officeHours}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
