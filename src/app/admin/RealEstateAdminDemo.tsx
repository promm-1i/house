"use client";

import { useState, type ReactNode } from "react";
import { Menu, ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { MENU, FLAT_MENU } from "./_real-estate-admin/menu";
import { DashboardView } from "./_real-estate-admin/views/DashboardView";
import {
  PropertyListView,
  PropertyRegisterView,
  PropertyMapView,
  PropertyPrivateView,
  PropertyDeletedView,
  PropertyCategoryView,
  PropertyGalleryView,
  PropertyComplexView,
  PropertyComplexIconView,
  PropertyComplexSystemView,
  PropertyLogView,
} from "./_real-estate-admin/views/PropertyViews";
import {
  CustomerInquiryView,
  HomeRequestView,
  FieldVisitView,
  ScheduleView,
  DataSearchView,
  MessageView,
} from "./_real-estate-admin/views/CrmViews";
import {
  StaffRoleView,
  GroupPermissionView,
  DealCaseView,
  PaymentPayrollView,
  ProvisionalContractView,
  BoardView,
  EtcView,
  PartnersView,
} from "./_real-estate-admin/views/OpsViews";
import {
  SiteScreenSettingsView,
  SiteAdvancedSettingsView,
  AiSettingsView,
} from "./_real-estate-admin/views/SettingsViews";
import { AiSearchView, ChatbotView } from "./_real-estate-admin/views/AiViews";

export function RealEstateAdminDemo() {
  const [activeKey, setActiveKey] = useState("dashboard");
  const [openGroups, setOpenGroups] = useState<Set<string>>(new Set(["property"]));
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const toggleGroup = (key: string) => {
    setOpenGroups((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const selectItem = (key: string) => {
    setActiveKey(key);
    setMobileNavOpen(false);
  };

  const activeItem = FLAT_MENU.find((m) => m.key === activeKey) ?? FLAT_MENU[0];

  const renderNav = () => (
    <nav className="space-y-1 p-3">
      {MENU.map((item) => {
        const Icon = item.icon;
        if (item.children) {
          const isOpen = openGroups.has(item.key);
          return (
            <div key={item.key}>
              <button
                type="button"
                onClick={() => toggleGroup(item.key)}
                className="flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                <span className="flex items-center gap-2.5">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  {item.label}
                </span>
                <ChevronDown
                  className={cn(
                    "h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform",
                    isOpen && "rotate-180",
                  )}
                />
              </button>
              {isOpen && (
                <div className="ml-4 mt-0.5 space-y-0.5 border-l border-border pl-3">
                  {item.children.map((child) => {
                    const ChildIcon = child.icon;
                    return (
                      <button
                        key={child.key}
                        type="button"
                        onClick={() => selectItem(child.key)}
                        className={cn(
                          "flex w-full items-center gap-2.5 rounded-lg px-3 py-1.5 text-left text-xs font-medium transition-colors",
                          activeKey === child.key
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                        )}
                      >
                        <ChildIcon className="h-3.5 w-3.5 shrink-0" />
                        <span className="min-w-0 flex-1 truncate">{child.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        }
        return (
          <button
            key={item.key}
            type="button"
            onClick={() => selectItem(item.key)}
            className={cn(
              "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors",
              activeKey === item.key
                ? "bg-primary/10 text-primary"
                : "text-foreground hover:bg-secondary",
            )}
          >
            <Icon className="h-4 w-4 shrink-0" />
            <span className="min-w-0 flex-1 truncate">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );

  let content: ReactNode;
  switch (activeKey) {
    case "dashboard":
      content = <DashboardView onNavigate={selectItem} />;
      break;
    case "property-list":
      content = <PropertyListView onNavigate={selectItem} />;
      break;
    case "property-register":
      content = <PropertyRegisterView onNavigate={selectItem} />;
      break;
    case "property-map":
      content = <PropertyMapView />;
      break;
    case "property-private":
      content = <PropertyPrivateView />;
      break;
    case "property-deleted":
      content = <PropertyDeletedView />;
      break;
    case "property-category":
      content = <PropertyCategoryView />;
      break;
    case "property-gallery":
      content = <PropertyGalleryView />;
      break;
    case "property-complex":
      content = <PropertyComplexView />;
      break;
    case "property-complex-icon":
      content = <PropertyComplexIconView />;
      break;
    case "property-complex-system":
      content = <PropertyComplexSystemView />;
      break;
    case "property-log":
      content = <PropertyLogView />;
      break;
    case "field-visit":
      content = <FieldVisitView />;
      break;
    case "customer-inquiry":
      content = <CustomerInquiryView />;
      break;
    case "home-request":
      content = <HomeRequestView />;
      break;
    case "schedule":
      content = <ScheduleView />;
      break;
    case "data-search":
      content = <DataSearchView />;
      break;
    case "memo":
      content = <MessageView />;
      break;
    case "staff-role":
      content = <StaffRoleView />;
      break;
    case "group-permission":
      content = <GroupPermissionView />;
      break;
    case "deal-case":
      content = <DealCaseView />;
      break;
    case "payment-payroll":
      content = <PaymentPayrollView />;
      break;
    case "provisional-contract":
      content = <ProvisionalContractView />;
      break;
    case "board":
      content = <BoardView />;
      break;
    case "etc":
      content = <EtcView />;
      break;
    case "partners":
      content = <PartnersView />;
      break;
    case "site-screen":
      content = <SiteScreenSettingsView />;
      break;
    case "site-advanced":
      content = <SiteAdvancedSettingsView />;
      break;
    case "ai-settings":
      content = <AiSettingsView />;
      break;
    case "ai-search":
      content = <AiSearchView />;
      break;
    case "chatbot":
      content = <ChatbotView />;
      break;
    case "realestate-info":
      content = (
        <div>
          <p className="mb-4 inline-flex items-center gap-1.5 rounded-md border border-primary/20 bg-primary/5 px-2.5 py-1 text-[11px] font-medium text-primary">
            데모 데이터 — 실제 공공 API는 연동되어 있지 않습니다
          </p>
          <p className="text-sm text-muted-foreground break-keep">
            건축물 정보 · 실거래가 · 단지정보 · 토지정보는 공공데이터포털 / 국토교통부 API 연동이
            필요한 영역입니다. 실제 구축 시 서버 환경변수로 API Key를 관리하며 이 화면과 동일한
            형태의 조회 UI를 제공합니다.
          </p>
        </div>
      );
      break;
    default:
      content = null;
  }

  return (
    <div className="flex flex-col lg:flex-row">
      <aside className="hidden shrink-0 border-r border-border bg-card lg:sticky lg:top-[67px] lg:block lg:h-[calc(100vh-67px)] lg:w-64 lg:overflow-y-auto">
        {renderNav()}
      </aside>

      <div className="flex items-center justify-between border-b border-border bg-secondary/50 px-4 py-3 lg:hidden">
        <button
          type="button"
          onClick={() => setMobileNavOpen(true)}
          className="flex items-center gap-1.5 text-sm font-medium text-foreground"
        >
          <Menu className="h-4 w-4" />
          {activeItem.label}
        </button>
      </div>

      {mobileNavOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileNavOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-72 overflow-y-auto bg-card shadow-xl">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <span className="text-sm font-semibold text-foreground">관리자 메뉴</span>
              <button type="button" onClick={() => setMobileNavOpen(false)} aria-label="메뉴 닫기">
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
            {renderNav()}
          </div>
        </div>
      )}

      <main className="min-w-0 flex-1 p-5 sm:p-6">{content}</main>
    </div>
  );
}
