import React, { useState } from "react";
import { CheckCircle, AlertTriangle, ExternalLink, Send, ArrowRight, UserCheck, Calendar, ShieldCheck } from "lucide-react";
import { Applicant } from "../types";

interface CandidateFormProps {
  onSuccessCheck: (url: string) => void;
  allowedIds?: string[];
}

export default function CandidateForm() {
  const [candidateId, setCandidateId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Verification states
  const [isVerified, setIsVerified] = useState(false);
  const [googleFormUrl, setGoogleFormUrl] = useState("");
  const [verifyMessage, setVerifyMessage] = useState("");

  // Native registration state
  const [fullName, setFullName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("Nam");
  const [parentName, setParentName] = useState("");
  const [parentPhone, setParentPhone] = useState("");
  const [address, setAddress] = useState("");
  
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!candidateId.trim()) {
      setError("Vui lòng nhập định danh cá nhân cần tra cứu.");
      return;
    }

    setLoading(true);
    setError(null);
    setIsVerified(false);

    try {
      const response = await fetch("/api/verify-id", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ candidateId: candidateId.trim() })
      });

      const data = await response.json();
      if (data.isValid) {
        setIsVerified(true);
        setGoogleFormUrl(data.googleFormUrl);
        setVerifyMessage(data.message);
      } else {
        setIsVerified(false);
        setError(data.message || "Mã định danh không thuộc danh sách tuyển sinh.");
      }
    } catch (err) {
      setError("Không thể kết nối đến hệ thống kiểm tra mã định danh.");
    } finally {
      setLoading(false);
    }
  };

  const handleNativeEnroll = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !birthDate || !parentName.trim() || !parentPhone.trim() || !address.trim()) {
      setSubmitError("Vui lòng điền đầy đủ mọi thông tin hồ sơ tuyển sinh.");
      return;
    }

    setSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(null);

    try {
      const response = await fetch("/api/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          candidateId: candidateId.trim(),
          fullName,
          birthDate,
          gender,
          parentName,
          parentPhone,
          address
        })
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setSubmitSuccess(data.message);
        // Clear native form inputs
        setFullName("");
        setBirthDate("");
        setParentName("");
        setParentPhone("");
        setAddress("");
      } else {
        setSubmitError(data.error || "Gặp lỗi khi tạo hồ sơ đăng ký. Vui lòng thử lại.");
      }
    } catch (err) {
      setSubmitError("Không phản hồi hoặc lỗi mạng từ máy chủ tuyển sinh.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Search checking card */}
      <div id="mdd-checker" className="bg-white rounded-2xl shadow-md border border-slate-100 p-6 md:p-8 relative">
        <div className="absolute top-0 right-0 w-24 h-1 bg-gradient-to-l from-indigo-500 to-blue-500 rounded-bl-full" />
        
        <div className="flex items-start gap-4 mb-6">
          <div className="p-3 bg-blue-50 rounded-lg text-blue-600 shrink-0">
            <ShieldCheck className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-800">Bước 1: Tra cứu mã định danh cá nhân</h2>
            <p className="text-xs text-slate-500 mt-1">
              Hệ thống yêu cầu xác thực Mã định danh của trẻ trong danh sách đủ tuổi đi học được Phường Văn Phú cập nhật.
            </p>
          </div>
        </div>

        <form onSubmit={handleVerify} className="space-y-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <input
                id="search-candidate-id-input"
                type="text"
                placeholder="Nhập mã định danh học sinh (Ví dụ: HS202601 hoặc mã định danh 12 số)..."
                value={candidateId}
                onChange={(e) => {
                  setCandidateId(e.target.value);
                  setIsVerified(false);
                  setError(null);
                }}
                disabled={loading}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white text-sm placeholder:text-slate-400 font-semibold tracking-wide transition-all uppercase"
              />
            </div>
            
            <button
              id="verify-candidate-id-btn"
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shrink-0 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                "Xác thực mã định danh"
              )}
            </button>
          </div>

          <div className="text-[11px] leading-relaxed text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-100">
            💡 <span className="font-semibold text-slate-600">Trải nghiệm chạy thử:</span> Để kiểm tra hoạt động, bạn có thể nhập một trong các mã định danh mặc định đã nạp sẵn trong hệ thống: <code className="font-bold text-indigo-600 px-1 border border-indigo-100 rounded bg-indigo-50">HS202601</code>, <code className="font-bold text-indigo-600 px-1 border border-indigo-100 rounded bg-indigo-50">HS202602</code>, <code className="font-bold text-indigo-600 px-1 border border-indigo-100 rounded bg-indigo-50">001206000123</code>.
          </div>
        </form>

        {/* Feedback Messages */}
        {error && (
          <div className="mt-5 flex gap-3 p-4 bg-red-50 border border-red-100 text-red-700 rounded-xl text-xs sm:text-sm animate-fade-in">
            <AlertTriangle className="w-5 h-5 shrink-0 text-red-500" />
            <div>
              <p className="font-semibold">Xác thực không thành công</p>
              <p className="mt-1 text-red-600/90 font-medium">{error}</p>
            </div>
          </div>
        )}

        {isVerified && (
          <div className="mt-5 flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-xl animate-fade-in">
            <div className="flex gap-3">
              <CheckCircle className="w-5 h-5 shrink-0 text-emerald-600 mt-0.5" />
              <div>
                <p className="font-bold text-emerald-900">Mã định danh hợp lệ!</p>
                <p className="mt-1 text-xs text-emerald-700 font-medium">{verifyMessage}</p>
              </div>
            </div>
            
            <a
              id="google-form-portal-link"
              href={googleFormUrl}
              target="_blank"
              referrerPolicy="no-referrer"
              className="inline-flex items-center gap-1.5 px-4.5 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold rounded-lg text-xs tracking-wide shadow-sm hover:shadow transition-all shrink-0 uppercase animate-bounce"
            >
              Vào nhập thông tin tuyển sinh
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
