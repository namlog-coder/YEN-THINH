import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

interface Applicant {
  id: string;
  candidateId: string;
  fullName: string;
  birthDate: string;
  gender: string;
  parentName: string;
  parentPhone: string;
  address: string;
  status: string; 
  createdAt: string;
}

interface AppData {
  adminPasscode: string;
  googleFormUrl: string;
  allowedIds: string[];
  candidates: Applicant[];
}

const DATA_FILE = path.join(process.cwd(), "data.json");

const defaultData: AppData = {
  adminPasscode: "859796",
  googleFormUrl: "https://docs.google.com/forms/d/1cMs13LkQ4f_T4sGtV6RGH5G8t4wlyRHNp1NEljGaRM4/edit",
  allowedIds: [
    "001206000123",
    "001206000456",
    "037301012345",
    "040302008888",
    "001306002345",
    "HS202601",
    "HS202602",
    "HS202603",
    "HS202604",
    "HS202605"
  ],
  candidates: [
    {
      id: "app-1",
      candidateId: "001206000123",
      fullName: "Nguyễn Minh Khang",
      birthDate: "2020-05-12",
      gender: "Nam",
      parentName: "Nguyễn Minh Hải",
      parentPhone: "0912345678",
      address: "Số 15, Ngách 10/2, Phố Văn Phú, Phường Văn Phú, tỉnh Lào Cai",
      status: "Đã tiếp nhận",
      createdAt: "2026-05-30T08:30:00Z"
    },
    {
      id: "app-2",
      candidateId: "001206000456",
      fullName: "Lê Quỳnh Chi",
      birthDate: "2020-09-24",
      gender: "Nữ",
      parentName: "Lê Văn Tám",
      parentPhone: "0987654321",
      address: "Căn hộ 1208, Toà nhà Victoria, Phường Văn Phú, tỉnh Lào Cai",
      status: "Chờ duyệt",
      createdAt: "2026-05-31T09:12:00Z"
    }
  ]
};

// Ensure data file exists or initialize it
function readDatabase(): AppData {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify(defaultData, null, 2), "utf-8");
      return defaultData;
    }
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    const data: AppData = JSON.parse(raw);
    // Auto-migrate to the new Google Form/Spreadsheet URL requested by user or update pass codes
    if (!data.googleFormUrl || data.googleFormUrl.includes("1-JGN-wn5tE-vS_2gnO0X3688gsj4tsSg") || data.googleFormUrl.includes("1HTS978aOdYKDywi2aXQ7tZVNorIQUZ4VbmnfLJsCNbo")) {
      data.googleFormUrl = defaultData.googleFormUrl;
      data.adminPasscode = defaultData.adminPasscode;
      fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
    }
    return data;
  } catch (err) {
    console.error("Error reading database, resetting to default:", err);
    return defaultData;
  }
}

function writeDatabase(data: AppData) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing database:", err);
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Security Middleware for Admin APIs
  const checkAdminAuth = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const authHeaders = req.headers.authorization;
    if (!authHeaders) {
      res.status(401).json({ success: false, error: "Thiếu thông tin xác thực quản trị." });
      return;
    }

    const { adminPasscode } = readDatabase();
    if (authHeaders !== adminPasscode) {
      res.status(403).json({ success: false, error: "Mật khẩu quản trị không đúng." });
      return;
    }
    next();
  };

  // --- API ROUTE PART ---

  // Check unique citizen identifier (Mã định danh)
  app.post("/api/verify-id", (req, res) => {
    const { candidateId } = req.body;
    if (!candidateId) {
      res.status(400).json({ success: false, error: "Vui lòng nhập mã định danh." });
      return;
    }

    const db = readDatabase();
    const sanitizedId = candidateId.trim().toUpperCase();
    const matched = db.allowedIds.some(id => id.trim().toUpperCase() === sanitizedId);

    if (matched) {
      res.json({
        success: true,
        isValid: true,
        googleFormUrl: db.googleFormUrl,
        message: "Mã số định danh hợp lệ! Cổng đăng ký trực tuyến đã mở."
      });
    } else {
      res.json({
        success: true,
        isValid: false,
        message: "Mã số định danh chưa có trong danh sách phê duyệt tuyến của phường. Vui lòng thử lại hoặc liên hệ Văn phòng."
      });
    }
  });

  // Admin login check
  app.post("/api/admin/login", (req, res) => {
    const { passcode } = req.body;
    if (!passcode) {
      res.status(400).json({ success: false, error: "Vui lòng cung cấp mật mã." });
      return;
    }

    const db = readDatabase();
    if (db.adminPasscode === passcode.trim()) {
      res.json({ success: true, passcode: db.adminPasscode });
    } else {
      res.status(401).json({ success: false, error: "Mật mã quản trị chưa chính xác." });
    }
  });

  // Get full current configuration and registrations
  app.get("/api/admin/data", checkAdminAuth, (req, res) => {
    const db = readDatabase();
    // Return all data but strip confidential passcode for ease, or supply it
    res.json({
      success: true,
      googleFormUrl: db.googleFormUrl,
      allowedIds: db.allowedIds,
      candidates: db.candidates
    });
  });

  // Save new identification code list or change google form url
  app.post("/api/admin/save-config", checkAdminAuth, (req, res) => {
    const { googleFormUrl, allowedIds } = req.body;
    const db = readDatabase();

    if (googleFormUrl !== undefined) {
      db.googleFormUrl = googleFormUrl.trim();
    }
    if (Array.isArray(allowedIds)) {
      // Clean up inputs, remove blanks
      db.allowedIds = allowedIds
        .map(id => id.trim().toUpperCase())
        .filter(id => id.length > 0);
    }

    writeDatabase(db);
    res.json({ success: true, message: "Cấu hình hệ thống tuyển sinh đã được cập nhật." });
  });

  // Change password admin
  app.post("/api/admin/change-passcode", checkAdminAuth, (req, res) => {
    const { newPasscode } = req.body;
    if (!newPasscode || newPasscode.trim().length === 0) {
      res.status(400).json({ success: false, error: "Mật mã mới không thể bỏ trống." });
      return;
    }

    const db = readDatabase();
    db.adminPasscode = newPasscode.trim();
    writeDatabase(db);
    res.json({ success: true, message: "Mật mã quản trị viên được thay đổi thành công." });
  });

  // Parent registers candidate natively directly in the app (Backup / Dynamic sync channel)
  app.post("/api/enroll", (req, res) => {
    const { candidateId, fullName, birthDate, gender, parentName, parentPhone, address } = req.body;
    
    if (!candidateId || !fullName || !birthDate || !gender || !parentName || !parentPhone || !address) {
      res.status(400).json({ success: false, error: "Vui lòng nhập đầy đủ các trường thông tin." });
      return;
    }

    const db = readDatabase();
    const sanitizedId = candidateId.trim().toUpperCase();

    // Verify code exists in permitted list
    const isAllowed = db.allowedIds.some(id => id.trim().toUpperCase() === sanitizedId);
    if (!isAllowed) {
      res.status(403).json({ success: false, error: "Mã định danh không hợp lệ hoặc không có quyền đăng ký." });
      return;
    }

    // Check if child already registered
    const isExists = db.candidates.some(c => c.candidateId.trim().toUpperCase() === sanitizedId);
    if (isExists) {
      res.status(400).json({ success: false, error: "Mã định danh này đã được đăng ký hồ sơ tuyển sinh trước đó." });
      return;
    }

    const newApplicant: Applicant = {
      id: "app-" + Date.now(),
      candidateId: sanitizedId,
      fullName: fullName.trim(),
      birthDate,
      gender,
      parentName: parentName.trim(),
      parentPhone: parentPhone.trim(),
      address: address.trim(),
      status: "Chờ duyệt",
      createdAt: new Date().toISOString()
    };

    db.candidates.unshift(newApplicant);
    writeDatabase(db);

    res.json({
      success: true,
      message: "Gửi hồ sơ tuyển sinh thành công! Nhà trường sẽ liên hệ sau khi duyệt.",
      applicant: newApplicant
    });
  });

  // Admin updates applicant status
  app.post("/api/admin/update-candidate", checkAdminAuth, (req, res) => {
    const { id, status } = req.body;
    if (!id || !status) {
      res.status(400).json({ success: false, error: "Thiếu dữ liệu ID hoặc Trạng thái." });
      return;
    }

    const db = readDatabase();
    const candidateIdx = db.candidates.findIndex(c => c.id === id);
    if (candidateIdx === -1) {
      res.status(404).json({ success: false, error: "Không tìm thấy hồ sơ thí sinh này." });
      return;
    }

    db.candidates[candidateIdx].status = status;
    writeDatabase(db);
    res.json({ success: true, message: "Đã cập nhật trạng thái hồ sơ thí sinh." });
  });

  // Admin manually registers candidate
  app.post("/api/admin/create-candidate", checkAdminAuth, (req, res) => {
    const { candidateId, fullName, birthDate, gender, parentName, parentPhone, address, status } = req.body;
    
    if (!candidateId || !fullName || !birthDate || !gender || !parentName || !parentPhone || !address) {
      res.status(400).json({ success: false, error: "Vui lòng điền đầy đủ thông tin bắt buộc." });
      return;
    }

    const db = readDatabase();
    const sanitizedId = candidateId.trim().toUpperCase();

    // Prevent duplicate active ID registrants
    const alreadyRegistered = db.candidates.some(c => c.candidateId.trim().toUpperCase() === sanitizedId);
    if (alreadyRegistered) {
      res.status(400).json({ success: false, error: "Mã định danh này đã có người đăng ký tuyển sinh." });
      return;
    }

    const newApplicant: Applicant = {
      id: "app-" + Date.now(),
      candidateId: sanitizedId,
      fullName: fullName.trim(),
      birthDate,
      gender,
      parentName: parentName.trim(),
      parentPhone: parentPhone.trim(),
      address: address.trim(),
      status: status || "Chờ duyệt",
      createdAt: new Date().toISOString()
    };

    // Auto add ID to approved id lists as safety mechanism in case clerk puts a new one
    if (!db.allowedIds.some(i => i.trim().toUpperCase() === sanitizedId)) {
      db.allowedIds.push(sanitizedId);
    }

    db.candidates.unshift(newApplicant);
    writeDatabase(db);

    res.json({ success: true, message: "Đã đăng ký trực tiếp hồ sơ thành công.", candidate: newApplicant });
  });

  // Admin deletes applicant record
  app.delete("/api/admin/delete-candidate/:id", checkAdminAuth, (req, res) => {
    const { id } = req.params;
    const db = readDatabase();
    const updatedCandidates = db.candidates.filter(c => c.id !== id);
    
    if (updatedCandidates.length === db.candidates.length) {
      res.status(404).json({ success: false, error: "Không tìm thấy hồ sơ để xóa." });
      return;
    }

    db.candidates = updatedCandidates;
    writeDatabase(db);
    res.json({ success: true, message: "Hồ sơ thí sinh đã được xoá thành công." });
  });

  // --- VITE DEV OR PROD COMPILATION ---

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
