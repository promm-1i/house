export type Listing = {
  id: number;
  title: string;
  region: string;
  type: string;
  category: "주거" | "상업" | "토지/건물";
  price: string;
  manager: string;
  status: "공개" | "비공개";
  registeredAt: string;
  image: string;
};

export type DeletedListing = Listing & { deletedAt: string; deletedBy: string; deletedReason: string };

export type PropertyCategory = { id: number; name: string; group: "주거" | "상업" | "토지/건물"; order: number; active: boolean };

export type Complex = {
  id: number;
  name: string;
  address: string;
  builtYear: number;
  households: number;
  buildings: number;
  parking: number;
  heating: string;
  builder: string;
};

export type ComplexIcon = { id: number; name: string; category: string; active: boolean };

export type ComplexSystem = { id: number; name: string; complexes: number[] };

export type PropertyLogEntry = {
  id: number;
  propertyTitle: string;
  manager: string;
  type: "전화" | "문자" | "상담" | "가격변경" | "현장방문" | "집주인 연락" | "고객 안내";
  content: string;
  createdAt: string;
};

export type FieldVisit = {
  id: number;
  propertyTitle: string;
  manager: string;
  visitDate: string;
  address: string;
  owner: string;
  ownerPhone: string;
  status: "예정" | "진행중" | "완료";
  memo: string;
  pros: string;
  cons: string;
  reaction: string;
};

export type CustomerStatus = "신규" | "상담중" | "매물추천" | "방문예정" | "협의중" | "계약완료" | "보류";

export type CustomerActivity = { id: number; type: string; content: string; at: string };

export type Customer = {
  id: number;
  name: string;
  phone: string;
  manager: string;
  interestRegion: string;
  dealType: string;
  budget: string;
  status: CustomerStatus;
  lastConsultAt: string;
  activities: CustomerActivity[];
};

export type Inquiry = { id: number; name: string; phone: string; content: string; status: "상담중" | "완료" };

export type HomeRequest = {
  id: number;
  customer: string;
  region: string;
  dealType: string;
  propertyType: string;
  budget: string;
  rooms: string;
  moveInDate: string;
  matchCount: number;
};

export type ScheduleType = "상담" | "임장" | "계약" | "입주" | "퇴거" | "전화" | "기타";

export type Schedule = {
  id: number;
  date: string;
  title: string;
  type: ScheduleType;
  customer: string;
  manager: string;
  done: boolean;
};

export type Message = {
  id: number;
  from: string;
  to: string;
  title: string;
  content: string;
  read: boolean;
  sentAt: string;
  box: "받은쪽지" | "보낸쪽지";
};

export type Staff = {
  id: number;
  name: string;
  role: "관리자" | "직원";
  position: string;
  email: string;
  phone: string;
  status: "재직" | "비활성";
  propertyCount: number;
  lastLoginAt: string;
};

export type DealCase = {
  id: number;
  address: string;
  complex: string;
  dealDate: string;
  amount: string;
  dealType: string;
  area: number;
  floor: string;
  manager: string;
};

export type Payment = {
  id: number;
  contractNo: string;
  customer: string;
  property: string;
  kind: "계약금" | "중도금" | "잔금" | "중개보수" | "기타";
  amount: string;
  paidAt: string;
  status: "입금완료" | "입금대기";
};

export type Payroll = {
  id: number;
  staff: string;
  month: string;
  base: string;
  incentive: string;
  allowance: string;
  deduction: string;
  total: string;
};

export type ProvisionalContract = {
  id: number;
  property: string;
  customer: string;
  landlord: string;
  manager: string;
  contractDate: string;
  deposit: string;
  scheduledDate: string;
  status: "가계약" | "본계약예정" | "본계약완료" | "취소";
  note: string;
};

export type MoveInOut = {
  id: number;
  property: string;
  customer: string;
  moveInDate: string;
  moveOutDate: string;
  actualMoveOutDate: string;
  deposit: string;
  settled: boolean;
  manager: string;
};

export type Notice = { id: number; title: string; published: boolean };

export type Partner = {
  id: number;
  name: string;
  category: string;
  manager: string;
  phone: string;
  rating: number;
  active: boolean;
};

export type ActivityLog = { id: number; time: string; action: string; target: string };
