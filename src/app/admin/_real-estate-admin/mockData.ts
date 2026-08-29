import type {
  Listing,
  DeletedListing,
  PropertyCategory,
  Complex,
  ComplexIcon,
  ComplexSystem,
  PropertyLogEntry,
  FieldVisit,
  Customer,
  Inquiry,
  HomeRequest,
  Schedule,
  Message,
  Staff,
  DealCase,
  Payment,
  Payroll,
  ProvisionalContract,
  MoveInOut,
  Notice,
  Partner,
} from "./types";

export const PROPERTY_TYPES = ["아파트", "오피스텔", "원룸", "투룸", "빌라", "주택", "상가", "사무실", "토지"];

const MANAGERS = ["김민수", "박정민", "이지은", "설재성"];

export const INITIAL_LISTINGS: Listing[] = [
  { id: 1, title: "역세권 신축 아파트", region: "서울 강남구 대치동", type: "아파트", category: "주거", price: "매 9억", manager: "김민수", status: "공개", registeredAt: "2026-08-20", image: "🏢" },
  { id: 2, title: "깨끗한 리모델링 오피스텔", region: "서울 마포구 합정동", type: "오피스텔", category: "주거", price: "전 3억", manager: "박정민", status: "공개", registeredAt: "2026-08-21", image: "🏬" },
  { id: 3, title: "채광 좋은 원룸", region: "서울 광진구 능동", type: "원룸", category: "주거", price: "보 3천 / 월 50", manager: "이지은", status: "공개", registeredAt: "2026-08-22", image: "🏠" },
  { id: 4, title: "마당 있는 단독주택", region: "경기 성남시 분당구", type: "주택", category: "주거", price: "매 12억", manager: "김민수", status: "공개", registeredAt: "2026-08-19", image: "🏡" },
  { id: 5, title: "역삼동 투룸 전세", region: "서울 강남구 역삼동", type: "투룸", category: "주거", price: "전 4억 5천", manager: "설재성", status: "공개", registeredAt: "2026-08-18", image: "🏢" },
  { id: 6, title: "망원동 신축 빌라", region: "서울 마포구 망원동", type: "빌라", category: "주거", price: "매 3억 3천 / 융 1억 9천", manager: "박정민", status: "공개", registeredAt: "2026-08-17", image: "🏘️" },
  { id: 7, title: "청담동 럭셔리 오피스텔", region: "서울 강남구 청담동", type: "오피스텔", category: "주거", price: "보 2억 / 월 120", manager: "이지은", status: "공개", registeredAt: "2026-08-16", image: "🏬" },
  { id: 8, title: "테헤란로 사무실", region: "서울 강남구 테헤란로", type: "사무실", category: "상업", price: "보 1억 / 월 350", manager: "설재성", status: "공개", registeredAt: "2026-08-15", image: "🏢" },
  { id: 9, title: "홍대입구 1층 상가", region: "서울 마포구 서교동", type: "상가", category: "상업", price: "권 5천 / 보 5천 / 월 250", manager: "김민수", status: "비공개", registeredAt: "2026-08-14", image: "🏪" },
  { id: 10, title: "판교 지식산업센터", region: "경기 성남시 분당구", type: "사무실", category: "상업", price: "매 15억", manager: "박정민", status: "공개", registeredAt: "2026-08-13", image: "🏢" },
  { id: 11, title: "잠실 리버뷰 아파트", region: "서울 송파구 잠실동", type: "아파트", category: "주거", price: "매 18억", manager: "이지은", status: "공개", registeredAt: "2026-08-12", image: "🏢" },
  { id: 12, title: "성수동 창고형 사무실", region: "서울 성동구 성수동", type: "사무실", category: "상업", price: "보 3천 / 월 200", manager: "설재성", status: "비공개", registeredAt: "2026-08-11", image: "🏭" },
  { id: 13, title: "일산 원룸 단기임대", region: "경기 고양시 일산동구", type: "원룸", category: "주거", price: "보 500 / 월 45", manager: "김민수", status: "공개", registeredAt: "2026-08-10", image: "🏠" },
  { id: 14, title: "강남역 3분거리 상가", region: "서울 강남구 역삼동", type: "상가", category: "상업", price: "권 1억 / 보 1억 / 월 500", manager: "박정민", status: "공개", registeredAt: "2026-08-09", image: "🏪" },
  { id: 15, title: "용인 물류창고 부지", region: "경기 용인시 처인구", type: "토지", category: "토지/건물", price: "매 8억", manager: "이지은", status: "공개", registeredAt: "2026-08-08", image: "🌳" },
  { id: 16, title: "여의도 오피스텔", region: "서울 영등포구 여의도동", type: "오피스텔", category: "주거", price: "전 5억", manager: "설재성", status: "공개", registeredAt: "2026-08-07", image: "🏬" },
  { id: 17, title: "동탄 신축 아파트", region: "경기 화성시 동탄", type: "아파트", category: "주거", price: "매 7억 5천", manager: "김민수", status: "공개", registeredAt: "2026-08-06", image: "🏢" },
  { id: 18, title: "분당 학군 인기 빌라", region: "경기 성남시 분당구", type: "빌라", category: "주거", price: "매 5억", manager: "박정민", status: "비공개", registeredAt: "2026-08-05", image: "🏘️" },
];

export const EMPTY_LISTING_FORM = {
  title: "",
  region: "",
  type: PROPERTY_TYPES[0],
  category: "주거" as Listing["category"],
  price: "",
  manager: MANAGERS[0],
};

export const INITIAL_DELETED_LISTINGS: DeletedListing[] = [
  { id: 101, title: "노후 다세대주택 매매", region: "서울 강북구 미아동", type: "빌라", category: "주거", price: "매 2억 8천", manager: "김민수", status: "비공개", registeredAt: "2026-07-01", image: "🏘️", deletedAt: "2026-08-15", deletedBy: "박정민", deletedReason: "매물 거래완료" },
  { id: 102, title: "공실 상가 (중복등록)", region: "서울 은평구 갈현동", type: "상가", category: "상업", price: "보 3천 / 월 100", manager: "이지은", status: "비공개", registeredAt: "2026-07-10", image: "🏪", deletedAt: "2026-08-12", deletedBy: "설재성", deletedReason: "중복 등록 정리" },
];

export const INITIAL_CATEGORIES: PropertyCategory[] = [
  { id: 1, name: "아파트", group: "주거", order: 1, active: true },
  { id: 2, name: "오피스텔", group: "주거", order: 2, active: true },
  { id: 3, name: "원룸", group: "주거", order: 3, active: true },
  { id: 4, name: "투룸", group: "주거", order: 4, active: true },
  { id: 5, name: "빌라", group: "주거", order: 5, active: true },
  { id: 6, name: "주택", group: "주거", order: 6, active: true },
  { id: 7, name: "상가", group: "상업", order: 1, active: true },
  { id: 8, name: "사무실", group: "상업", order: 2, active: true },
  { id: 9, name: "공장", group: "상업", order: 3, active: false },
  { id: 10, name: "창고", group: "상업", order: 4, active: true },
  { id: 11, name: "토지", group: "토지/건물", order: 1, active: true },
  { id: 12, name: "건물", group: "토지/건물", order: 2, active: true },
];

export const INITIAL_COMPLEXES: Complex[] = [
  { id: 1, name: "대치 래미안", address: "서울 강남구 대치동 123", builtYear: 2018, households: 850, buildings: 6, parking: 1200, heating: "지역난방", builder: "삼성물산" },
  { id: 2, name: "합정 파크뷰", address: "서울 마포구 합정동 45", builtYear: 2021, households: 320, buildings: 3, parking: 450, heating: "개별난방", builder: "GS건설" },
  { id: 3, name: "잠실 리버파크", address: "서울 송파구 잠실동 78", builtYear: 2015, households: 1200, buildings: 10, parking: 1800, heating: "지역난방", builder: "롯데건설" },
  { id: 4, name: "판교 테크노밸리타워", address: "경기 성남시 분당구 판교동 99", builtYear: 2019, households: 0, buildings: 1, parking: 600, heating: "중앙난방", builder: "현대건설" },
];

export const INITIAL_COMPLEX_ICONS: ComplexIcon[] = [
  { id: 1, name: "CCTV", category: "보안", active: true },
  { id: 2, name: "공동현관", category: "보안", active: true },
  { id: 3, name: "경비실", category: "보안", active: true },
  { id: 4, name: "주차장", category: "편의", active: true },
  { id: 5, name: "전기차충전", category: "편의", active: true },
  { id: 6, name: "택배보관함", category: "편의", active: true },
  { id: 7, name: "헬스장", category: "커뮤니티", active: true },
  { id: 8, name: "커뮤니티룸", category: "커뮤니티", active: false },
  { id: 9, name: "어린이집", category: "커뮤니티", active: true },
  { id: 10, name: "놀이터", category: "커뮤니티", active: true },
];

export const INITIAL_COMPLEX_SYSTEMS: ComplexSystem[] = [
  { id: 1, name: "CCTV", complexes: [1, 2, 3] },
  { id: 2, name: "공동현관", complexes: [1, 2, 3, 4] },
  { id: 3, name: "경비실", complexes: [1, 3] },
  { id: 4, name: "전기차충전", complexes: [2, 4] },
  { id: 5, name: "헬스장", complexes: [1, 3] },
  { id: 6, name: "어린이집", complexes: [1] },
];

export const INITIAL_PROPERTY_LOGS: PropertyLogEntry[] = [
  { id: 1, propertyTitle: "역세권 신축 아파트", manager: "김민수", type: "집주인 연락", content: "월세 5만원 조정 가능하다는 답변 받음", createdAt: "2026-08-29 10:20" },
  { id: 2, propertyTitle: "깨끗한 리모델링 오피스텔", manager: "박정민", type: "고객 안내", content: "고객에게 매물 소개, 다음주 방문 예정", createdAt: "2026-08-29 09:40" },
  { id: 3, propertyTitle: "역세권 신축 아파트", manager: "김민수", type: "가격변경", content: "매매가 150 → 145만원 조정", createdAt: "2026-08-28 16:10" },
  { id: 4, propertyTitle: "청담동 럭셔리 오피스텔", manager: "이지은", type: "전화", content: "고객 문의 전화 응대, 관심 매물 안내", createdAt: "2026-08-28 14:05" },
  { id: 5, propertyTitle: "망원동 신축 빌라", manager: "박정민", type: "현장방문", content: "매물 상태 재확인차 방문", createdAt: "2026-08-27 11:30" },
];

export const INITIAL_FIELD_VISITS: FieldVisit[] = [
  { id: 1, propertyTitle: "역세권 신축 아파트", manager: "김민수", visitDate: "2026-08-29", address: "서울 강남구 대치동", owner: "정○○", ownerPhone: "010-****-1111", status: "예정", memo: "", pros: "", cons: "", reaction: "" },
  { id: 2, propertyTitle: "깨끗한 리모델링 오피스텔", manager: "박정민", visitDate: "2026-08-29", address: "서울 마포구 합정동", owner: "최○○", ownerPhone: "010-****-2222", status: "진행중", memo: "", pros: "", cons: "", reaction: "" },
  { id: 3, propertyTitle: "채광 좋은 원룸", manager: "이지은", visitDate: "2026-08-27", address: "서울 광진구 능동", owner: "한○○", ownerPhone: "010-****-3333", status: "완료", memo: "채광 매우 좋음, 즉시입주 가능", pros: "채광, 역세권", cons: "주차 불가", reaction: "긍정적, 계약 검토중" },
  { id: 4, propertyTitle: "역삼동 투룸 전세", manager: "설재성", visitDate: "2026-08-26", address: "서울 강남구 역삼동", owner: "윤○○", ownerPhone: "010-****-4444", status: "완료", memo: "구조 양호, 수납 부족", pros: "역세권, 신축급", cons: "수납공간 부족", reaction: "재방문 희망" },
  { id: 5, propertyTitle: "망원동 신축 빌라", manager: "박정민", visitDate: "2026-08-24", address: "서울 마포구 망원동", owner: "장○○", ownerPhone: "010-****-5555", status: "완료", memo: "신축 상태 양호", pros: "신축, 채광", cons: "골목 안쪽", reaction: "긍정적" },
];

export const INITIAL_CUSTOMERS: Customer[] = [
  { id: 1, name: "김민수", phone: "010-****-1234", manager: "박정민", interestRegion: "강남구 대치동", dealType: "매매", budget: "9억~10억", status: "상담중", lastConsultAt: "2026-08-28", activities: [
    { id: 1, type: "상담", content: "대치동 아파트 매매 상담 진행", at: "2026-08-28 14:00" },
    { id: 2, type: "추천매물", content: "역세권 신축 아파트 추천", at: "2026-08-28 14:20" },
  ]},
  { id: 2, name: "이지은", phone: "010-****-5678", manager: "김민수", interestRegion: "마포구 합정동", dealType: "전세", budget: "3억 이하", status: "계약완료", lastConsultAt: "2026-08-25", activities: [
    { id: 1, type: "상담", content: "합정동 오피스텔 전세 문의", at: "2026-08-25 11:00" },
    { id: 2, type: "계약", content: "계약 완료", at: "2026-08-25 16:00" },
  ]},
  { id: 3, name: "박준영", phone: "010-****-9012", manager: "이지은", interestRegion: "광진구 능동", dealType: "월세", budget: "보 3천 / 월 55 이하", status: "매물추천", lastConsultAt: "2026-08-27", activities: [
    { id: 1, type: "문의", content: "능동 원룸 매물 문의", at: "2026-08-27 10:00" },
  ]},
  { id: 4, name: "최수진", phone: "010-****-3344", manager: "설재성", interestRegion: "강남구 역삼동", dealType: "전세", budget: "4억~5억", status: "방문예정", lastConsultAt: "2026-08-26", activities: [
    { id: 1, type: "상담", content: "역삼동 투룸 전세 상담", at: "2026-08-26 15:00" },
    { id: 2, type: "방문", content: "8/29 방문 예정 확정", at: "2026-08-26 15:30" },
  ]},
  { id: 5, name: "정하늘", phone: "010-****-7788", manager: "박정민", interestRegion: "마포구 망원동", dealType: "매매", budget: "3억~3억5천", status: "협의중", lastConsultAt: "2026-08-24", activities: [
    { id: 1, type: "상담", content: "망원동 빌라 매매 상담", at: "2026-08-20 13:00" },
    { id: 2, type: "임장", content: "현장 방문 완료", at: "2026-08-24 10:00" },
    { id: 3, type: "메모", content: "가격 협의 진행중, 500만원 조정 요청", at: "2026-08-24 17:00" },
  ]},
  { id: 6, name: "한지훈", phone: "010-****-2233", manager: "김민수", interestRegion: "성동구 성수동", dealType: "월세", budget: "보 3천 / 월 200 이하", status: "신규", lastConsultAt: "2026-08-29", activities: [
    { id: 1, type: "문의", content: "홈페이지 문의폼으로 신규 접수", at: "2026-08-29 09:00" },
  ]},
  { id: 7, name: "오세영", phone: "010-****-4455", manager: "이지은", interestRegion: "송파구 잠실동", dealType: "매매", budget: "17억~19억", status: "보류", lastConsultAt: "2026-08-18", activities: [
    { id: 1, type: "상담", content: "잠실 아파트 매매 상담, 예산 재검토 중", at: "2026-08-18 11:00" },
  ]},
  { id: 8, name: "윤아름", phone: "010-****-6677", manager: "설재성", interestRegion: "강남구 청담동", dealType: "월세", budget: "보 2억 / 월 130 이하", status: "상담중", lastConsultAt: "2026-08-27", activities: [
    { id: 1, type: "상담", content: "청담동 오피스텔 월세 상담", at: "2026-08-27 16:00" },
  ]},
];

export const INITIAL_INQUIRIES: Inquiry[] = [
  { id: 1, name: "김민수", phone: "010-****-1234", content: "대치동 아파트 매매 문의드립니다.", status: "상담중" },
  { id: 2, name: "이지은", phone: "010-****-5678", content: "합정동 오피스텔 전세 가능한가요?", status: "완료" },
  { id: 3, name: "박준영", phone: "010-****-9012", content: "능동 원룸 매물 더 있나요?", status: "상담중" },
];

export const INITIAL_HOME_REQUESTS: HomeRequest[] = [
  { id: 1, customer: "김민수", region: "강남 / 역삼", dealType: "월세", propertyType: "투룸", budget: "보증금 3,000 / 월 150", rooms: "2개", moveInDate: "즉시", matchCount: 7 },
  { id: 2, customer: "이지은", region: "마포 / 합정", dealType: "전세", propertyType: "오피스텔", budget: "3억 이하", rooms: "1개", moveInDate: "1개월내", matchCount: 4 },
  { id: 3, customer: "박준영", region: "광진 / 능동", dealType: "월세", propertyType: "원룸", budget: "보 3천 / 월 55 이하", rooms: "1개", moveInDate: "즉시", matchCount: 3 },
  { id: 4, customer: "최수진", region: "강남 / 역삼", dealType: "전세", propertyType: "투룸", budget: "4억~5억", rooms: "2개", moveInDate: "2개월내", matchCount: 5 },
  { id: 5, customer: "정하늘", region: "마포 / 망원", dealType: "매매", propertyType: "빌라", budget: "3억~3억5천", rooms: "3개", moveInDate: "협의", matchCount: 2 },
  { id: 6, customer: "한지훈", region: "성동 / 성수", dealType: "월세", propertyType: "사무실", budget: "보 3천 / 월 200 이하", rooms: "무관", moveInDate: "1개월내", matchCount: 6 },
];

export const INITIAL_SCHEDULES: Schedule[] = [
  { id: 1, date: "2026-08-29", title: "대치동 아파트 임장", type: "임장", customer: "김민수", manager: "김민수", done: false },
  { id: 2, date: "2026-08-29", title: "합정동 오피스텔 계약", type: "계약", customer: "이지은", manager: "박정민", done: false },
  { id: 3, date: "2026-08-27", title: "능동 원룸 안내", type: "상담", customer: "박준영", manager: "이지은", done: true },
  { id: 4, date: "2026-08-30", title: "역삼동 투룸 재방문", type: "임장", customer: "최수진", manager: "설재성", done: false },
  { id: 5, date: "2026-08-31", title: "망원동 빌라 가격협의 전화", type: "전화", customer: "정하늘", manager: "박정민", done: false },
  { id: 6, date: "2026-09-01", title: "성수 사무실 상담", type: "상담", customer: "한지훈", manager: "김민수", done: false },
  { id: 7, date: "2026-08-25", title: "합정 오피스텔 입주", type: "입주", customer: "이지은", manager: "박정민", done: true },
  { id: 8, date: "2026-09-02", title: "잠실 아파트 예산 재상담", type: "상담", customer: "오세영", manager: "이지은", done: false },
  { id: 9, date: "2026-08-28", title: "청담 오피스텔 안내", type: "상담", customer: "윤아름", manager: "설재성", done: true },
  { id: 10, date: "2026-09-03", title: "팀 내부 회의", type: "기타", customer: "-", manager: "설재성", done: false },
];

export const INITIAL_MESSAGES: Message[] = [
  { id: 1, from: "설재성", to: "김민수", title: "대치동 매물 가격 확인 요청", content: "역세권 신축 아파트 가격 재확인 부탁드립니다.", read: false, sentAt: "2026-08-29 09:10", box: "받은쪽지" },
  { id: 2, from: "박정민", to: "김민수", title: "고객 방문 일정 조율", content: "최수진 고객님 방문 일정 30일로 조율됐습니다.", read: true, sentAt: "2026-08-28 17:30", box: "받은쪽지" },
  { id: 3, from: "김민수", to: "이지은", title: "능동 원룸 문의 인계", content: "박준영 고객님 문의 인계드립니다. 확인 부탁드려요.", read: true, sentAt: "2026-08-27 13:00", box: "보낸쪽지" },
];

export const INITIAL_STAFF: Staff[] = [
  { id: 1, name: "설재성", role: "관리자", position: "대표", email: "admin@mintcl-demo.co.kr", phone: "010-0000-0001", status: "재직", propertyCount: 4, lastLoginAt: "2026-08-29 08:50" },
  { id: 2, name: "김민수", role: "직원", position: "팀장", email: "kim@mintcl-demo.co.kr", phone: "010-0000-0002", status: "재직", propertyCount: 6, lastLoginAt: "2026-08-29 09:00" },
  { id: 3, name: "박정민", role: "직원", position: "대리", email: "park@mintcl-demo.co.kr", phone: "010-0000-0003", status: "재직", propertyCount: 5, lastLoginAt: "2026-08-28 18:20" },
  { id: 4, name: "이지은", role: "직원", position: "대리", email: "lee@mintcl-demo.co.kr", phone: "010-0000-0004", status: "재직", propertyCount: 3, lastLoginAt: "2026-08-29 08:40" },
  { id: 5, name: "정하나", role: "직원", position: "사원", email: "jung@mintcl-demo.co.kr", phone: "010-0000-0005", status: "비활성", propertyCount: 0, lastLoginAt: "2026-07-15 10:00" },
];

export const INITIAL_DEAL_CASES: DealCase[] = [
  { id: 1, address: "서울 강남구 대치동", complex: "대치 래미안", dealDate: "2026-08-20", amount: "8억 9천", dealType: "매매", area: 84, floor: "5/15", manager: "김민수" },
  { id: 2, address: "서울 마포구 합정동", complex: "합정 파크뷰", dealDate: "2026-08-18", amount: "3억 2천", dealType: "전세", area: 59, floor: "3/12", manager: "박정민" },
  { id: 3, address: "서울 송파구 잠실동", complex: "잠실 리버파크", dealDate: "2026-08-15", amount: "17억 5천", dealType: "매매", area: 114, floor: "12/25", manager: "이지은" },
  { id: 4, address: "서울 강남구 역삼동", complex: "-", dealDate: "2026-08-12", amount: "4억 3천", dealType: "전세", area: 55, floor: "2/5", manager: "설재성" },
  { id: 5, address: "서울 마포구 망원동", complex: "-", dealDate: "2026-08-10", amount: "3억 1천", dealType: "매매", area: 72, floor: "4/4", manager: "박정민" },
  { id: 6, address: "경기 성남시 분당구", complex: "판교 테크노밸리타워", dealDate: "2026-08-05", amount: "14억 8천", dealType: "매매", area: 165, floor: "8/20", manager: "김민수" },
  { id: 7, address: "서울 강남구 청담동", complex: "-", dealDate: "2026-08-02", amount: "2억 / 월 118", dealType: "월세", area: 35, floor: "3/8", manager: "이지은" },
  { id: 8, address: "서울 송파구 잠실동", complex: "잠실 리버파크", dealDate: "2026-07-28", amount: "16억 9천", dealType: "매매", area: 110, floor: "9/25", manager: "설재성" },
  { id: 9, address: "경기 화성시 동탄", complex: "-", dealDate: "2026-07-22", amount: "7억 3천", dealType: "매매", area: 84, floor: "11/18", manager: "김민수" },
  { id: 10, address: "서울 영등포구 여의도동", complex: "-", dealDate: "2026-07-18", amount: "4억 8천", dealType: "전세", area: 60, floor: "6/15", manager: "박정민" },
];

export const INITIAL_PAYMENTS: Payment[] = [
  { id: 1, contractNo: "C-2026-0031", customer: "이지은", property: "깨끗한 리모델링 오피스텔", kind: "계약금", amount: "3,000만원", paidAt: "2026-08-25", status: "입금완료" },
  { id: 2, contractNo: "C-2026-0031", customer: "이지은", property: "깨끗한 리모델링 오피스텔", kind: "잔금", amount: "2억 7,000만원", paidAt: "2026-09-15", status: "입금대기" },
  { id: 3, contractNo: "C-2026-0028", customer: "정하늘", property: "망원동 신축 빌라", kind: "계약금", amount: "3,300만원", paidAt: "2026-08-24", status: "입금완료" },
  { id: 4, contractNo: "C-2026-0028", customer: "정하늘", property: "망원동 신축 빌라", kind: "중개보수", amount: "132만원", paidAt: "2026-08-24", status: "입금완료" },
  { id: 5, contractNo: "C-2026-0025", customer: "최수진", property: "역삼동 투룸 전세", kind: "중도금", amount: "1억원", paidAt: "2026-09-05", status: "입금대기" },
];

export const INITIAL_PAYROLL: Payroll[] = [
  { id: 1, staff: "김민수", month: "2026-08", base: "300만원", incentive: "85만원", allowance: "20만원", deduction: "35만원", total: "370만원" },
  { id: 2, staff: "박정민", month: "2026-08", base: "280만원", incentive: "60만원", allowance: "20만원", deduction: "31만원", total: "329만원" },
  { id: 3, staff: "이지은", month: "2026-08", base: "280만원", incentive: "45만원", allowance: "20만원", deduction: "29만원", total: "316만원" },
  { id: 4, staff: "설재성", month: "2026-08", base: "400만원", incentive: "120만원", allowance: "30만원", deduction: "48만원", total: "502만원" },
];

export const INITIAL_PROVISIONAL_CONTRACTS: ProvisionalContract[] = [
  { id: 1, property: "역세권 신축 아파트", customer: "김민수", landlord: "정○○", manager: "김민수", contractDate: "2026-08-28", deposit: "9,000만원", scheduledDate: "2026-09-10", status: "본계약예정", note: "잔금일 협의중" },
  { id: 2, property: "망원동 신축 빌라", customer: "정하늘", landlord: "장○○", manager: "박정민", contractDate: "2026-08-24", deposit: "3,300만원", scheduledDate: "2026-09-05", status: "본계약완료", note: "" },
  { id: 3, property: "역삼동 투룸 전세", customer: "최수진", landlord: "윤○○", manager: "설재성", contractDate: "2026-08-29", deposit: "4,300만원", scheduledDate: "2026-09-12", status: "가계약", note: "특약: 반려동물 협의" },
];

export const INITIAL_MOVE_IN_OUT: MoveInOut[] = [
  { id: 1, property: "깨끗한 리모델링 오피스텔", customer: "이지은", moveInDate: "2026-08-25", moveOutDate: "", actualMoveOutDate: "", deposit: "3억", settled: true, manager: "박정민" },
  { id: 2, property: "합정 파크뷰 예전 세입자", customer: "최○○", moveInDate: "2024-03-01", moveOutDate: "2026-08-25", actualMoveOutDate: "2026-08-24", deposit: "2억 8천", settled: true, manager: "박정민" },
  { id: 3, property: "역삼동 투룸 전세", customer: "최수진", moveInDate: "2026-09-15", moveOutDate: "", actualMoveOutDate: "", deposit: "4억 3천", settled: false, manager: "설재성" },
];

export const INITIAL_NOTICES: Notice[] = [
  { id: 1, title: "추석 연휴 임시 휴무 안내", published: true },
  { id: 2, title: "신규 매물 등록 이벤트", published: true },
  { id: 3, title: "시스템 점검 안내 (작성중)", published: false },
];

export const INITIAL_PARTNERS: Partner[] = [
  { id: 1, name: "믿을만한 이사", category: "이사업체", manager: "정대표", phone: "010-1111-2222", rating: 4.8, active: true },
  { id: 2, name: "깨끗한 입주청소", category: "청소업체", manager: "이대표", phone: "010-2222-3333", rating: 4.6, active: true },
  { id: 3, name: "강남 법무법인", category: "법무사", manager: "김법무", phone: "02-333-4444", rating: 4.9, active: true },
  { id: 4, name: "모던 인테리어", category: "인테리어", manager: "박실장", phone: "010-4444-5555", rating: 4.5, active: true },
  { id: 5, name: "빠른 대출상담", category: "대출상담", manager: "최상담", phone: "010-5555-6666", rating: 4.3, active: true },
  { id: 6, name: "든든 화재보험", category: "보험", manager: "한설계사", phone: "010-6666-7777", rating: 4.4, active: false },
  { id: 7, name: "24시 관리업체", category: "관리업체", manager: "윤대표", phone: "010-7777-8888", rating: 4.7, active: true },
  { id: 8, name: "신속 열쇠수리", category: "기타", manager: "장기사", phone: "010-8888-9999", rating: 4.2, active: true },
];
