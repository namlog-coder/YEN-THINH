export interface Applicant {
  id: string;
  candidateId: string;
  fullName: string;
  birthDate: string;
  gender: string;
  parentName: string;
  parentPhone: string;
  address: string;
  status: string; // 'Chờ duyệt' | 'Đã tiếp nhận' | 'Đã trúng tuyển' | 'Cần bổ sung'
  createdAt: string;
}

export interface AdminData {
  googleFormUrl: string;
  allowedIds: string[];
  candidates: Applicant[];
}
