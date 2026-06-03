import React, { useState, useEffect } from "react";
import { 
  Users, 
  Settings, 
  Key, 
  Plus, 
  Trash2, 
  Check, 
  FileCheck, 
  Lock, 
  Unlock, 
  UserPlus, 
  BookOpen, 
  RefreshCw, 
  AlertCircle, 
  Search, 
  Filter, 
  Info,
  LogOut,
  Sparkles,
  Database,
  Link,
  ChevronRight,
  DatabaseZap,
  ExternalLink
} from "lucide-react";
import Header from "./components/Header";
import CandidateForm from "./components/CandidateForm";
import { Applicant } from "./types";

export default function App() {
  // Views toggle: "parent" | "admin"
  const [activeTab, setActiveTab] = useState<"parent" | "admin">("parent");

  // Authentication State
  const [passcodeInput, setPasscodeInput] = useState("");
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminToken, setAdminToken] = useState(""); // Stores passcode as authorization header
  const [loginError, setLoginError] = useState<string | null>(null);

  // System Configuration & Candidates List
  const [googleFormUrl, setGoogleFormUrl] = useState("");
  const [allowedIds, setAllowedIds] = useState<string[]>([]);
  const [candidates, setCandidates] = useState<Applicant[]>([]);
  const [systemLoading, setSystemLoading] = useState(false);
  const [systemError, setSystemError] = useState<string | null>(null);

  // Admin Actions Text Area for raw copy-pasted IDs
  const [rawIdsInput, setRawIdsInput] = useState("");
  
  // Custom Google Form URL configuration input setup
  const [customFormUrl, setCustomFormUrl] = useState("");

  // Search and Filters inside Admin Panel
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("Tất cả");
  const [genderFilter, setGenderFilter] = useState("Tất cả");

  // Admin Add Candidate state
  const [adminAddId, setAdminAddId] = useState("");
  const [adminAddName, setAdminAddName] = useState("");
  const [adminAddDob, setAdminAddDob] = useState("");
  const [adminAddGender, setAdminAddGender] = useState("Nam");
  const [adminAddParentName, setAdminAddParentName] = useState("");
  const [adminAddParentPhone, setAdminAddParentPhone] = useState("");
  const [adminAddAddress, setAdminAddAddress] = useState("");
  const [adminAddSuccess, setAdminAddSuccess] = useState<string | null>(null);
  const [adminAddError, setAdminAddError] = useState<string | null>(null);

  // Notification Status Toast Banner
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Update passcode state
  const [newPasscode, setNewPasscode] = useState("");
  const [isChangingPasscode, setIsChangingPasscode] = useState(false);

  // Clear toast notifications after brief period
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setNotification({ message, type });
  };

  // Fetch admin configured parameters & student data
  const fetchAdminData = async (token = adminToken) => {
    setSystemLoading(true);
    setSystemError(null);
    try {
      const response = await fetch("/api/admin/data", {
        headers: {
          "Authorization": token
        }
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setGoogleFormUrl(data.googleFormUrl);
        setCustomFormUrl(data.googleFormUrl);
        setAllowedIds(data.allowedIds);
        setRawIdsInput(data.allowedIds.join("\n"));
        setCandidates(data.candidates);
      } else {
        setSystemError(data.error || "Không thể tải dữ liệu cấu hình hệ thống tuyển sinh.");
        // Log out as fallback if token expired/incorrect
        if (response.status === 401 || response.status === 403) {
          setIsAdminLoggedIn(false);
          setAdminToken("");
        }
      }
    } catch (err) {
      setSystemError("Lỗi kết nối tới máy chủ API tuyển sinh.");
    } finally {
      setSystemLoading(false);
    }
  };

  // Admin login request handling
  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcodeInput.trim()) {
      setLoginError("Vui lòng điền mã bảo mật.");
      return;
    }

    setLoginError(null);
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode: passcodeInput.trim() })
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setIsAdminLoggedIn(true);
        setAdminToken(data.passcode);
        showToast("Đăng nhập quản trị viên thành công!", "success");
        fetchAdminData(data.passcode);
      } else {
        setLoginError(data.error || "Mật mã quản trị viên chưa đúng.");
      }
    } catch (err) {
      setLoginError("Ổ kết nối thông tin hoặc máy chủ tạm đóng.");
    }
  };

  // Admin update system settings
  const handleSaveConfig = async () => {
    try {
      // Split the text area input by newlines to form allowedIds array
      const idArray = rawIdsInput
        .split("\n")
        .map(id => id.trim().toUpperCase())
        .filter(id => id.length > 0);

      const response = await fetch("/api/admin/save-config", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": adminToken
        },
        body: JSON.stringify({
          googleFormUrl: customFormUrl.trim(),
          allowedIds: idArray
        })
      });

      const data = await response.json();
      if (response.ok && data.success) {
        showToast("Lưu cấu hình hệ thống tuyển sinh thành công!", "success");
        fetchAdminData();
      } else {
        showToast(data.error || "Lỗi lưu cấu hình.", "error");
      }
    } catch (err) {
      showToast("Lỗi mạng khi lưu cấu hình.", "error");
    }
  };

  // Admin Update single Student status
  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const response = await fetch("/api/admin/update-candidate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": adminToken
        },
        body: JSON.stringify({ id, status: newStatus })
      });

      const data = await response.json();
      if (response.ok && data.success) {
        showToast("Cập nhật trạng thái hồ sơ thành công!");
        // Update local state without full refetch
        setCandidates(prev => 
          prev.map(c => c.id === id ? { ...c, status: newStatus } : c)
        );
      } else {
        showToast(data.error || "Lỗi cập nhật trạng thái.", "error");
      }
    } catch (err) {
      showToast("Lỗi máy chủ.", "error");
    }
  };

  // Admin Register Candidate direct
  const handleAdminAddCandidate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminAddId.trim() || !adminAddName.trim() || !adminAddDob || !adminAddParentName.trim() || !adminAddParentPhone.trim() || !adminAddAddress.trim()) {
      setAdminAddError("Vui lòng điền đủ mọi trường thông tin.");
      return;
    }

    setAdminAddError(null);
    setAdminAddSuccess(null);

    try {
      const response = await fetch("/api/admin/create-candidate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": adminToken
        },
        body: JSON.stringify({
          candidateId: adminAddId.trim().toUpperCase(),
          fullName: adminAddName,
          birthDate: adminAddDob,
          gender: adminAddGender,
          parentName: adminAddParentName,
          parentPhone: adminAddParentPhone,
          address: adminAddAddress,
          status: "Đã tiếp nhận"
        })
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setAdminAddSuccess("Hồ sơ đã được lập trực tiếp thành công!");
        showToast("Đã thêm hồ sơ học sinh trực tiếp thành công!");
        
        // Reset fields
        setAdminAddId("");
        setAdminAddName("");
        setAdminAddDob("");
        setAdminAddParentName("");
        setAdminAddParentPhone("");
        setAdminAddAddress("");
        
        // Refetch newest list
        fetchAdminData();
      } else {
        setAdminAddError(data.error || "Không thể đăng ký hồ sơ.");
      }
    } catch (err) {
      setAdminAddError("Lỗi kết nối máy chủ khi tạo hồ sơ.");
    }
  };

  // Admin Delete candidate registration
  const handleDeleteCandidate = async (id: string, name: string) => {
    if (!window.confirm(`Bạn có chắc chắn muốn xóa hồ sơ tuyển sinh của học sinh ${name}?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/delete-candidate/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": adminToken
        }
      });

      const data = await response.json();
      if (response.ok && data.success) {
        showToast("Đã hủy hồ sơ thành công.", "success");
        setCandidates(prev => prev.filter(c => c.id !== id));
      } else {
        showToast(data.error || "Gặp lỗi khi xóa hồ sơ.", "error");
      }
    } catch (err) {
      showToast("Không thể gửi yêu cầu xóa đến máy chủ.", "error");
    }
  };

  // Change security password
  const handleChangePasscode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPasscode.trim()) {
      showToast("Chưa nhập mật mã mới.", "error");
      return;
    }

    setIsChangingPasscode(true);
    try {
      const response = await fetch("/api/admin/change-passcode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": adminToken
        },
        body: JSON.stringify({ newPasscode: newPasscode.trim() })
      });

      const data = await response.json();
      if (response.ok && data.success) {
        showToast("Đổi mật mã thành công! Mật mã quản trị mới: " + newPasscode.trim());
        setAdminToken(newPasscode.trim());
        setNewPasscode("");
      } else {
        showToast(data.error || "Lỗi thay đổi mật mã.", "error");
      }
    } catch (err) {
      showToast("Lỗi gửi yêu cầu.", "error");
    } finally {
      setIsChangingPasscode(false);
    }
  };

  // Log Out admin panel
  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    setAdminToken("");
    setPasscodeInput("");
    showToast("Đã đăng xuất tài khoản quản trị.");
  };

  // Filter lists based on admin controls
  const filteredCandidates = candidates.filter(cand => {
    const checkSearch = 
      cand.fullName.toLowerCase().includes(searchQuery.toLowerCase()) || 
      cand.candidateId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cand.parentPhone.includes(searchQuery);
    
    const checkStatus = statusFilter === "Tất cả" || cand.status === statusFilter;
    const checkGender = genderFilter === "Tất cả" || cand.gender === genderFilter;

    return checkSearch && checkStatus && checkGender;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased pb-24 selection:bg-indigo-600 selection:text-white">
      
      {/* Decorative top yellow and red traditional banner ribbon */}
      <div className="w-full h-2.5 bg-gradient-to-r from-red-600 via-amber-400 to-indigo-700" />

      {/* Floating System Notification Toast */}
      {notification && (
        <div 
          id="toast-notification"
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-xl transition-all border transform translate-y-0 scale-100 ${
            notification.type === "success" 
              ? "bg-slate-900 border-emerald-500/30 text-emerald-300" 
              : "bg-red-950 border-red-500/30 text-red-300"
          }`}
        >
          <div className={`w-2 h-2 rounded-full ${notification.type === "success" ? "bg-emerald-400 animate-ping" : "bg-red-400"}`} />
          <span className="text-xs sm:text-sm font-semibold">{notification.message}</span>
        </div>
      )}

      {/* Outer Main Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10 space-y-8">
        
        {/* Navigation Selector Tabs */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-200 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold border border-blue-200 shadow-inner">
               🏫
            </div>
            <div>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Hệ Thống Trực Tuyến</p>
              <h3 className="font-serif font-bold text-slate-800 leading-tight">Tuyển sinh Lớp 1 Tiểu học</h3>
            </div>
          </div>

          {/* Toggle Switches */}
          <div className="flex gap-2 bg-slate-200/60 p-1 rounded-xl">
            <button
              id="switch-parent-portal-btn"
              onClick={() => setActiveTab("parent")}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all tracking-wide flex items-center gap-1.5 ${
                activeTab === "parent"
                  ? "bg-white text-blue-800 shadow-sm border border-slate-100"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Tra cứu & Đăng ký
            </button>
            <button
              id="switch-admin-portal-btn"
              onClick={() => setActiveTab("admin")}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wide transition-all flex items-center gap-1.5 ${
                activeTab === "admin"
                  ? "bg-blue-900 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              Quản lý danh sách
              {allowedIds.length > 0 && (
                <span className="ml-1 bg-red-500 text-white font-mono text-[9px] px-1.5 py-0.5 rounded-full">
                  {allowedIds.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Header Institution Banner */}
        <Header />

        {/* View switching panel logic */}
        {activeTab === "parent" ? (
          /* Public Search & Verification System */
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-amber-50 to-amber-100/30 border border-amber-200 rounded-xl p-4 flex gap-3 text-slate-700">
              <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-xs leading-relaxed">
                <span className="font-semibold text-amber-900">Thông báo tuyển sinh:</span> Theo kế hoạch phát triển phổ cập, phụ huynh vui lòng kiểm tra chính xác mã số định danh cá nhân của học sinh lớp 1 trước khi tiến hành khai báo vào <span className="font-bold">Google Form</span> hoặc đăng ký trực tiếp trên cổng.
              </div>
            </div>

            {/* Verification & Native form */}
            <CandidateForm />
          </div>
        ) : (
          /* Administrator Panel Section */
          <div className="space-y-8">
            
            {!isAdminLoggedIn ? (
              /* If Admin Not Logged In yet */
              <div id="admin-login-lock-container" className="max-w-md mx-auto bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
                <div className="bg-gradient-to-b from-slate-900 to-indigo-950 p-6 text-center text-white">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto text-amber-400 border border-white/15 shadow-inner mb-3">
                    <Lock className="w-6 h-6 animate-pulse" />
                  </div>
                  <h3 className="font-serif text-lg font-bold">Xác thực quyền Quản trị</h3>
                  <p className="text-xs text-slate-300 mt-1">Chỉ những cán bộ tuyển sinh được cấp phép mới được quyền nạp danh sách mã định danh.</p>
                </div>

                <form onSubmit={handleAdminLogin} className="p-6 space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5 flex items-center gap-1.5">
                      <Key className="w-3.5 h-3.5 text-slate-400" />
                      Mật mã quản trị viên
                    </label>
                    <input
                      id="admin-passcode-input"
                      type="password"
                      placeholder="Nhập mật mã quản trị để tiếp tục..."
                      value={passcodeInput}
                      onChange={(e) => setPasscodeInput(e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white text-center font-bold tracking-widest text-slate-800"
                    />
                  </div>

                  {loginError && (
                    <div className="p-3 bg-red-50 border border-red-100 rounded-lg text-xs font-medium text-red-700 flex gap-1.5">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                      <span>{loginError}</span>
                    </div>
                  )}

                  <button
                    id="submit-admin-login-btn"
                    type="submit"
                    className="w-full py-2.5 bg-indigo-950 hover:bg-slate-900 text-white font-bold rounded-lg text-xs uppercase tracking-wider transition-all shadow border border-slate-800 flex items-center justify-center gap-2"
                  >
                    Đăng nhập hệ thống
                  </button>
                </form>
              </div>
            ) : (
              /* If Admin Logged In */
              <div className="space-y-8">
                
                {/* Admin Top Dashboard Quick stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-indigo-950 text-white rounded-xl p-5 border border-indigo-900 relative overflow-hidden">
                    <p className="text-xs text-indigo-200 font-bold uppercase tracking-wider">Mã định danh đã nạp</p>
                    <h3 className="text-3.5xl font-mono font-bold mt-1 text-amber-300">{allowedIds.length}</h3>
                    <p className="text-[10px] text-indigo-300 mt-1">Đủ điều kiện đăng ký đợt này</p>
                    <div className="absolute right-4 bottom-4 opacity-10">
                      <Database className="w-12 h-12" />
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-5 border border-slate-200 relative overflow-hidden shadow-sm">
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Tổng hồ sơ đã nhận</p>
                    <h3 className="text-3.5xl font-mono font-bold text-slate-800 mt-1 ">{candidates.length}</h3>
                    <p className="text-[10px] text-slate-400 mt-1">Gồm nộp qua cổng trực tiếp</p>
                    <div className="absolute right-4 bottom-4 opacity-10 text-slate-500 animate-pulse">
                      <FileCheck className="w-12 h-12" />
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-5 border border-slate-200 relative overflow-hidden shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Cách Xác Thực</span>
                        <span className="text-[10px] bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full font-bold">Quản trị</span>
                      </div>
                      <div className="flex items-center gap-1.5 mt-2.5">
                        <Unlock className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span className="text-xs font-semibold text-slate-700 truncate">Họ tên: namlog@gmail.com</span>
                      </div>
                    </div>

                    <button 
                      onClick={handleLogout}
                      className="mt-3 text-xs text-red-600 hover:text-red-700 font-bold flex items-center gap-1 self-start"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Đăng xuất quản trị
                    </button>
                  </div>
                </div>

                {/* Configurations Card (Google Form & allowed codes database list edit) */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
                  
                  <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                        <Settings className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-serif text-base font-bold text-slate-800">Cấu hình URL Tuyển Sinh & Mã định danh</h3>
                        <p className="text-xs text-slate-500">Thiết lập linh hoạt link liên kết Google Form/Sheet & nạp mã định danh cho phường.</p>
                      </div>
                    </div>

                    <button
                      onClick={handleSaveConfig}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg text-xs uppercase tracking-wide transition-all shadow-sm flex items-center gap-1.5"
                    >
                      <Check className="w-4 h-4" />
                      Lưu thay đổi cấu hình
                    </button>
                  </div>

                  {/* Form configuration item */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <Link className="w-3.5 h-3.5 text-blue-500" />
                        Đường dẫn Google Form đăng ký tuyển sinh / Bảng tính liên kết
                      </span>
                      <a 
                        href={customFormUrl} 
                        target="_blank" 
                        referrerPolicy="no-referrer"
                        className="text-[10px] text-blue-600 hover:underline flex items-center gap-0.5 lowercase normal-case"
                      >
                        Liên kết hiện tại <ExternalLink className="w-2.5 h-2.5 inline" />
                      </a>
                    </label>
                    <input
                      id="admin-form-url-input"
                      type="text"
                      placeholder="Nhập link Google Form tuyển sinh..."
                      value={customFormUrl}
                      onChange={(e) => setCustomFormUrl(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white text-slate-700 font-mono"
                    />
                  </div>

                  {/* Configuration key elements */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-5 pt-1">
                    
                    {/* Database codes text area */}
                    <div className="col-span-1 md:col-span-8 space-y-1.5">
                      <label className="block text-xs font-bold text-slate-700 uppercase">
                        Nạp Danh sách Mã Số Định Danh Hợp Lệ 
                        <span className="text-slate-400 font-normal ml-1"> (Mỗi mã nằm trên một dòng riêng biệt)</span>
                      </label>
                      <textarea
                        id="admin-allowed-ids-textarea"
                        rows={6}
                        placeholder="Ví dụ:&#10;HS202601&#10;HS202602&#10;HS202603&#10;001206000123"
                        value={rawIdsInput}
                        onChange={(e) => setRawIdsInput(e.target.value)}
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white text-slate-700 font-semibold tracking-wider font-mono placeholder:text-slate-300"
                      />
                      <p className="text-[10px] text-slate-400 leading-tight">
                        💡 Chỉ khi phụ huynh gõ đúng mã định danh đã có mặt trong danh mục này thì link Google Form phía trên mới xuất hiện công khai. Hãy nhập nhiều mã cách nhau bằng phím xuống dòng (Enter).
                      </p>
                    </div>

                    {/* Change passcode panel */}
                    <div className="col-span-1 md:col-span-4 bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col justify-between">
                      <form onSubmit={handleChangePasscode} className="space-y-3.5">
                        <p className="text-xs font-bold text-slate-700 uppercase flex items-center gap-1">
                          <Key className="w-3.5 h-3.5 text-amber-500" />
                          Đổi mật mã bảo mật
                        </p>
                        
                        <input
                          id="admin-change-passcode-input"
                          type="text"
                          placeholder="Mật mã mới..."
                          value={newPasscode}
                          onChange={(e) => setNewPasscode(e.target.value)}
                          className="w-full px-3 py-2 border border-slate-250 bg-white rounded-lg text-xs"
                        />

                        <button
                          type="submit"
                          disabled={isChangingPasscode}
                          className="w-full py-1.5 bg-slate-800 hover:bg-slate-900 text-white font-semibold rounded text-xs transition"
                        >
                          {isChangingPasscode ? "Đang xử lý..." : "Xác nhận đổi mật mã"}
                        </button>
                      </form>
                      
                      <div className="mt-3 text-[10px] text-slate-400 leading-normal border-t border-slate-200/60 pt-2 bg-amber-50/50 p-2 rounded border border-amber-100">
                        🔑 <span className="font-bold text-slate-600">Bảo mật:</span> Ghi lại mật mã để tránh mất quyền đăng nhập hệ thống quản lý danh sách.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Candidate registrations list Table Manager */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
                  
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                    <div>
                      <h3 className="font-serif text-base font-bold text-slate-800">Danh sách quản lý hồ sơ đăng ký</h3>
                      <p className="text-xs text-slate-500 mt-0.5">Danh sách các hồ sơ học sinh đăng ký tuyển sinh trực tuyến và trực tiếp.</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <button 
                        onClick={() => fetchAdminData()}
                        className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-lg border border-slate-200 transition"
                        title="Tải lại danh sách"
                      >
                        <RefreshCw className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Searching & Filter utilities */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 bg-slate-50 p-4 rounded-xl border border-slate-100/65">
                    
                    {/* Search string */}
                    <div className="col-span-1 sm:col-span-6 relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        id="admin-candidate-search-input"
                        type="text"
                        placeholder="Tìm tên, mã định danh, điện thoại..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none bg-white text-slate-700"
                      />
                    </div>

                    {/* Status filtering */}
                    <div className="col-span-1 sm:col-span-3 flex items-center gap-1.5">
                      <span className="text-xs font-semibold text-slate-500 shrink-0">Hồ sơ:</span>
                      <select
                        id="admin-status-filter-select"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="w-full p-2 border border-slate-200 rounded-lg text-xs bg-white text-slate-700 font-medium"
                      >
                        <option value="Tất cả">Tất cả trạng thái</option>
                        <option value="Đã tiếp nhận">Đã tiếp nhận</option>
                        <option value="Chờ duyệt">Chờ duyệt</option>
                        <option value="Đã trúng tuyển">Đã trúng tuyển</option>
                        <option value="Cần bổ sung">Cần bổ bổ sung</option>
                      </select>
                    </div>

                    {/* Gender filtering */}
                    <div className="col-span-1 sm:col-span-3 flex items-center gap-1.5">
                      <span className="text-xs font-semibold text-slate-500 shrink-0">Phái:</span>
                      <select
                        id="admin-gender-filter-select"
                        value={genderFilter}
                        onChange={(e) => setGenderFilter(e.target.value)}
                        className="w-full p-2 border border-slate-200 rounded-lg text-xs bg-white text-slate-700"
                      >
                        <option value="Tất cả">Tất cả giới tính</option>
                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                      </select>
                    </div>
                  </div>

                  {/* Registered candidates Table and empty handling */}
                  <div className="overflow-x-auto border border-slate-100 rounded-xl">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-slate-900 text-white font-medium">
                          <th className="p-3">Học sinh</th>
                          <th className="p-3">Mã Định Danh/Ngày Sinh</th>
                          <th className="p-3">Giám hộ & SĐT</th>
                          <th className="p-3">Địa chỉ cư trú</th>
                          <th className="p-3 text-center">Trạng thái hồ sơ</th>
                          <th className="p-3 text-center">Hành động</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-150">
                        {filteredCandidates.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="text-center py-8 text-slate-400 italic">
                              Hệ thống chưa tìm thấy kết quả hồ sơ tuyển sinh phù hợp với bộ lọc hiển thị.
                            </td>
                          </tr>
                        ) : (
                          filteredCandidates.map((cand) => (
                            <tr key={cand.id} className="hover:bg-slate-50/70 transition-colors">
                              <td className="p-3">
                                <div className="font-bold text-slate-800 text-sm">{cand.fullName}</div>
                                <div className="text-[10px] text-slate-400 mt-0.5">Giới tính: <span className="font-semibold text-slate-600">{cand.gender}</span></div>
                              </td>
                              <td className="p-3 font-mono">
                                <div className="text-indigo-700 font-bold tracking-wide uppercase">{cand.candidateId}</div>
                                <div className="text-slate-500 text-[10px] mt-0.5">NS: {cand.birthDate}</div>
                              </td>
                              <td className="p-3">
                                <div className="font-medium text-slate-700">{cand.parentName}</div>
                                <div className="text-slate-500 font-mono mt-0.5">{cand.parentPhone}</div>
                              </td>
                              <td className="p-3 text-slate-600 max-w-[180px] truncate" title={cand.address}>
                                {cand.address}
                              </td>
                              <td className="p-3 text-center">
                                <select
                                  value={cand.status}
                                  onChange={(e) => handleUpdateStatus(cand.id, e.target.value)}
                                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold border outline-none text-center inline-block cursor-pointer ${
                                    cand.status === "Đã trúng tuyển"
                                      ? "bg-emerald-50 border-emerald-300 text-emerald-800"
                                      : cand.status === "Đã tiếp nhận"
                                      ? "bg-blue-50 border-blue-300 text-blue-800"
                                      : cand.status === "Cần bổ sung"
                                      ? "bg-amber-50 border-amber-300 text-amber-800"
                                      : "bg-slate-100 border-slate-350 text-slate-700"
                                  }`}
                                >
                                  <option value="Chờ duyệt">Chờ duyệt</option>
                                  <option value="Đã tiếp nhận">Đã tiếp nhận</option>
                                  <option value="Đã trúng tuyển">Đã trúng tuyển</option>
                                  <option value="Cần bổ sung">Cần bổ sung</option>
                                </select>
                              </td>
                              <td className="p-3 text-center">
                                <button
                                  onClick={() => handleDeleteCandidate(cand.id, cand.fullName)}
                                  className="p-1 px-2.5 rounded text-red-600 hover:text-white hover:bg-red-500 transition-colors border border-red-200 font-medium"
                                  title="Xoá hồ sơ khỏi hệ thống"
                                >
                                  <Trash2 className="w-3.5 h-3.5 inline" />
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Add Candidate manually direct form panel */}
                  <div className="bg-slate-50/70 p-5 rounded-2xl border border-slate-200">
                    <h4 className="text-xs font-bold text-slate-700 uppercase tracking-widest mb-4 flex items-center gap-1.5">
                      <UserPlus className="w-4 h-4 text-blue-600" />
                      Lập hồ sơ trực tiếp nhanh (Admin)
                    </h4>

                    <form onSubmit={handleAdminAddCandidate} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Mã định danh trẻ *</label>
                        <input
                          type="text"
                          required
                          placeholder="Ví dụ: HS202609..."
                          value={adminAddId}
                          onChange={(e) => setAdminAddId(e.target.value)}
                          className="w-full p-2 text-xs border border-slate-200 rounded bg-white text-slate-700 font-mono font-bold"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Họ tên học sinh *</label>
                        <input
                          type="text"
                          required
                          placeholder="Họ tên đầy đủ"
                          value={adminAddName}
                          onChange={(e) => setAdminAddName(e.target.value)}
                          className="w-full p-2 text-xs border border-slate-200 rounded bg-white text-slate-700"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Ngày sinh *</label>
                          <input
                            type="date"
                            required
                            value={adminAddDob}
                            onChange={(e) => setAdminAddDob(e.target.value)}
                            className="w-full p-2 text-xs border border-slate-200 rounded bg-white text-slate-700"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Giới tính</label>
                          <select
                            value={adminAddGender}
                            onChange={(e) => setAdminAddGender(e.target.value)}
                            className="w-full p-2 text-xs border border-slate-200 rounded bg-white text-slate-700"
                          >
                            <option value="Nam">Nam</option>
                            <option value="Nữ">Nữ</option>
                            <option value="Khác">Khác</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Họ tên phụ huynh *</label>
                        <input
                          type="text"
                          required
                          placeholder="Họ tên cha hoặc mẹ"
                          value={adminAddParentName}
                          onChange={(e) => setAdminAddParentName(e.target.value)}
                          className="w-full p-2 text-xs border border-slate-200 rounded bg-white text-slate-700"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Số điện thoại *</label>
                        <input
                          type="text"
                          required
                          placeholder="Số ĐT liên lạc"
                          value={adminAddParentPhone}
                          onChange={(e) => setAdminAddParentPhone(e.target.value)}
                          className="w-full p-2 text-xs border border-slate-200 rounded bg-white text-slate-700"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Hộ khẩu thường trú *</label>
                        <input
                          type="text"
                          required
                          placeholder="Số nhà, đường phố Văn Phú..."
                          value={adminAddAddress}
                          onChange={(e) => setAdminAddAddress(e.target.value)}
                          className="w-full p-2 text-xs border border-slate-200 rounded bg-white text-slate-700"
                        />
                      </div>

                      <div className="col-span-1 md:col-span-3 flex justify-end pt-2 border-t border-slate-200/50">
                        <button
                          id="submit-admin-add-btn"
                          type="submit"
                          className="px-4 py-2 bg-indigo-900 hover:bg-slate-900 text-white font-bold rounded text-xs uppercase flex items-center gap-1 transition"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          Lập hồ sơ trực tiếp
                        </button>
                      </div>

                      {adminAddSuccess && (
                        <div className="col-span-1 md:col-span-3 p-3.5 bg-emerald-50 text-emerald-800 text-xs rounded border border-emerald-100">
                          🎉 {adminAddSuccess}
                        </div>
                      )}

                      {adminAddError && (
                        <div className="col-span-1 md:col-span-3 p-3.5 bg-rose-50 text-rose-800 text-xs rounded border border-rose-100">
                          ⚠️ {adminAddError}
                        </div>
                      )}
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Traditional School Footer notes info */}
        <footer className="mt-16 text-center border-t border-slate-200 pt-6 text-xs text-slate-400 space-y-2">
          <p>© 2026 TRƯỜNG TIỂU HỌC YÊN THỊNH. Mọi quyền được bảo lưu.</p>
          <p className="text-[10px] tracking-normal leading-relaxed text-slate-350">
            Địa chỉ: Tuyến đường Văn Phú - Phường Văn Phú, tỉnh Lào Cai.
            <br />
            Hỗ trợ kỹ thuật: namlog@gmail.com | Hotline: 024.3351.455x
          </p>
        </footer>
      </div>
    </div>
  );
}
