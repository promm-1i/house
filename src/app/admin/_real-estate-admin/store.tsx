import { createContext, useContext, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { useLocalStorageState } from "@/lib/useLocalStorageState";
import * as M from "./mockData";

const NS = "officelink-real-estate";
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
  ActivityLog,
} from "./types";

type Ctx = {
  listings: Listing[];
  setListings: React.Dispatch<React.SetStateAction<Listing[]>>;
  deletedListings: DeletedListing[];
  setDeletedListings: React.Dispatch<React.SetStateAction<DeletedListing[]>>;
  categories: PropertyCategory[];
  setCategories: React.Dispatch<React.SetStateAction<PropertyCategory[]>>;
  complexes: Complex[];
  complexIcons: ComplexIcon[];
  setComplexIcons: React.Dispatch<React.SetStateAction<ComplexIcon[]>>;
  complexSystems: ComplexSystem[];
  propertyLogs: PropertyLogEntry[];
  fieldVisits: FieldVisit[];
  setFieldVisits: React.Dispatch<React.SetStateAction<FieldVisit[]>>;
  customers: Customer[];
  setCustomers: React.Dispatch<React.SetStateAction<Customer[]>>;
  inquiries: Inquiry[];
  setInquiries: React.Dispatch<React.SetStateAction<Inquiry[]>>;
  homeRequests: HomeRequest[];
  schedules: Schedule[];
  setSchedules: React.Dispatch<React.SetStateAction<Schedule[]>>;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  staff: Staff[];
  setStaff: React.Dispatch<React.SetStateAction<Staff[]>>;
  dealCases: DealCase[];
  payments: Payment[];
  payroll: Payroll[];
  provisionalContracts: ProvisionalContract[];
  moveInOut: MoveInOut[];
  notices: Notice[];
  setNotices: React.Dispatch<React.SetStateAction<Notice[]>>;
  partners: Partner[];
  setPartners: React.Dispatch<React.SetStateAction<Partner[]>>;
  activityLog: ActivityLog[];
  logActivity: (action: string, target: string) => void;
  deleteListing: (id: number, reason: string) => void;
  restoreListing: (id: number) => void;
  purgeListing: (id: number) => void;
};

const RealEstateAdminContext = createContext<Ctx | null>(null);

export function RealEstateAdminProvider({ children }: { children: ReactNode }) {
  const [listings, setListings] = useLocalStorageState<Listing[]>(`${NS}:listings`, M.INITIAL_LISTINGS);
  const [deletedListings, setDeletedListings] = useLocalStorageState<DeletedListing[]>(`${NS}:deletedListings`, M.INITIAL_DELETED_LISTINGS);
  const [categories, setCategories] = useLocalStorageState<PropertyCategory[]>(`${NS}:categories`, M.INITIAL_CATEGORIES);
  const [complexes] = useState<Complex[]>(M.INITIAL_COMPLEXES);
  const [complexIcons, setComplexIcons] = useLocalStorageState<ComplexIcon[]>(`${NS}:complexIcons`, M.INITIAL_COMPLEX_ICONS);
  const [complexSystems] = useState<ComplexSystem[]>(M.INITIAL_COMPLEX_SYSTEMS);
  const [propertyLogs] = useState<PropertyLogEntry[]>(M.INITIAL_PROPERTY_LOGS);
  const [fieldVisits, setFieldVisits] = useLocalStorageState<FieldVisit[]>(`${NS}:fieldVisits`, M.INITIAL_FIELD_VISITS);
  const [customers, setCustomers] = useLocalStorageState<Customer[]>(`${NS}:customers`, M.INITIAL_CUSTOMERS);
  const [inquiries, setInquiries] = useLocalStorageState<Inquiry[]>(`${NS}:inquiries`, M.INITIAL_INQUIRIES);
  const [homeRequests] = useState<HomeRequest[]>(M.INITIAL_HOME_REQUESTS);
  const [schedules, setSchedules] = useLocalStorageState<Schedule[]>(`${NS}:schedules`, M.INITIAL_SCHEDULES);
  const [messages, setMessages] = useLocalStorageState<Message[]>(`${NS}:messages`, M.INITIAL_MESSAGES);
  const [staff, setStaff] = useLocalStorageState<Staff[]>(`${NS}:staff`, M.INITIAL_STAFF);
  const [dealCases] = useState<DealCase[]>(M.INITIAL_DEAL_CASES);
  const [payments] = useState<Payment[]>(M.INITIAL_PAYMENTS);
  const [payroll] = useState<Payroll[]>(M.INITIAL_PAYROLL);
  const [provisionalContracts] = useState<ProvisionalContract[]>(M.INITIAL_PROVISIONAL_CONTRACTS);
  const [moveInOut] = useState<MoveInOut[]>(M.INITIAL_MOVE_IN_OUT);
  const [notices, setNotices] = useLocalStorageState<Notice[]>(`${NS}:notices`, M.INITIAL_NOTICES);
  const [partners, setPartners] = useLocalStorageState<Partner[]>(`${NS}:partners`, M.INITIAL_PARTNERS);
  const [activityLog, setActivityLog] = useLocalStorageState<ActivityLog[]>(`${NS}:activityLog`, []);

  const logActivity = (action: string, target: string) => {
    setActivityLog((prev) =>
      [
        {
          id: Date.now(),
          time: new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" }),
          action,
          target,
        },
        ...prev,
      ].slice(0, 20),
    );
  };

  const deleteListing = (id: number, reason: string) => {
    const target = listings.find((l) => l.id === id);
    if (!target) return;
    setListings((prev) => prev.filter((l) => l.id !== id));
    setDeletedListings((prev) => [
      { ...target, status: "비공개", deletedAt: new Date().toISOString().slice(0, 10), deletedBy: "나 (데모 사용자)", deletedReason: reason || "사유 미입력" },
      ...prev,
    ]);
    toast.success("매물이 삭제되었습니다.");
    logActivity("매물 삭제", target.title);
  };

  const restoreListing = (id: number) => {
    const target = deletedListings.find((l) => l.id === id);
    if (!target) return;
    setDeletedListings((prev) => prev.filter((l) => l.id !== id));
    const { deletedAt: _deletedAt, deletedBy: _deletedBy, deletedReason: _deletedReason, ...restored } = target;
    setListings((prev) => [restored, ...prev]);
    toast.success("매물이 복구되었습니다.");
    logActivity("매물 복구", target.title);
  };

  const purgeListing = (id: number) => {
    const target = deletedListings.find((l) => l.id === id);
    setDeletedListings((prev) => prev.filter((l) => l.id !== id));
    toast.success("매물이 영구삭제되었습니다.");
    if (target) logActivity("매물 영구삭제", target.title);
  };

  return (
    <RealEstateAdminContext.Provider
      value={{
        listings,
        setListings,
        deletedListings,
        setDeletedListings,
        categories,
        setCategories,
        complexes,
        complexIcons,
        setComplexIcons,
        complexSystems,
        propertyLogs,
        fieldVisits,
        setFieldVisits,
        customers,
        setCustomers,
        inquiries,
        setInquiries,
        homeRequests,
        schedules,
        setSchedules,
        messages,
        setMessages,
        staff,
        setStaff,
        dealCases,
        payments,
        payroll,
        provisionalContracts,
        moveInOut,
        notices,
        setNotices,
        partners,
        setPartners,
        activityLog,
        logActivity,
        deleteListing,
        restoreListing,
        purgeListing,
      }}
    >
      {children}
    </RealEstateAdminContext.Provider>
  );
}

export function useRealEstateAdmin() {
  const ctx = useContext(RealEstateAdminContext);
  if (!ctx) throw new Error("useRealEstateAdmin must be used within RealEstateAdminProvider");
  return ctx;
}
