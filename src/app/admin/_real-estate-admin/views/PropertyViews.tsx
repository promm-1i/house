import { useState, type FormEvent } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { Search, MapPin, Plus, Trash2, Pencil, RotateCcw, GripVertical, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { useRealEstateAdmin } from "../store";
import { PROPERTY_TYPES, EMPTY_LISTING_FORM } from "../mockData";
import { PanelHeader, StatusBadge, Modal, Row, EmptyResult, PropertyThumb, PropertyPhoto, hasPhoto } from "../components";
import type { Listing } from "../types";

export function PropertyListView({ onNavigate }: { onNavigate: (key: string) => void }) {
  const { listings, categories, deleteListing, setListings, logActivity } = useRealEstateAdmin();
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("전체");
  const [selected, setSelected] = useState<number[]>([]);
  const [editTarget, setEditTarget] = useState<Listing | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Listing | null>(null);
  const [deleteReason, setDeleteReason] = useState("");

  const activeTypes = ["전체", ...new Set(categories.filter((c) => c.active).map((c) => c.name))];

  const filtered = listings.filter((l) => {
    const matchesType = typeFilter === "전체" || l.type === typeFilter;
    const matchesQuery =
      query.trim() === "" || l.title.includes(query) || l.region.includes(query) || l.manager.includes(query);
    return matchesType && matchesQuery;
  });

  const toggleSelect = (id: number) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  const bulkPublish = (status: "공개" | "비공개") => {
    setListings((prev) => prev.map((l) => (selected.includes(l.id) ? { ...l, status } : l)));
    logActivity(`일괄 ${status} 전환`, `${selected.length}건`);
    toast.success(`${selected.length}건을 일괄 ${status} 전환했습니다.`);
    setSelected([]);
  };

  return (
    <div>
      <PanelHeader title="전체 매물 목록" description="등록된 모든 매물을 검색·필터·일괄관리합니다." />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="매물명 · 지역 · 담당자로 검색"
            className="pl-9"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {activeTypes.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTypeFilter(t)}
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                typeFilter === t
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground",
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {selected.length > 0 && (
        <div className="mt-3 flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/5 px-3 py-2 text-xs">
          <span className="font-medium text-foreground">{selected.length}건 선택됨</span>
          <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => bulkPublish("공개")}>
            일괄 공개
          </Button>
          <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => bulkPublish("비공개")}>
            일괄 비공개
          </Button>
        </div>
      )}

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-left text-xs">
          <thead>
            <tr className="border-b border-border text-muted-foreground">
              <th className="w-8 py-2"></th>
              <th className="py-2 pr-3 font-medium">매물명</th>
              <th className="py-2 pr-3 font-medium">유형</th>
              <th className="py-2 pr-3 font-medium">지역</th>
              <th className="py-2 pr-3 font-medium">가격</th>
              <th className="py-2 pr-3 font-medium">담당자</th>
              <th className="py-2 pr-3 font-medium">상태</th>
              <th className="py-2 pr-3 font-medium">관리</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((l) => (
              <tr key={l.id} className="border-b border-border/60 hover:bg-secondary/30">
                <td className="py-2.5">
                  <input
                    type="checkbox"
                    checked={selected.includes(l.id)}
                    onChange={() => toggleSelect(l.id)}
                    className="h-3.5 w-3.5"
                  />
                </td>
                <td className="max-w-[240px] py-2.5 pr-3 font-medium text-foreground">
                  <span className="flex items-center gap-2" title={l.title}>
                    <span className="relative h-6 w-6 shrink-0 overflow-hidden rounded bg-secondary">
                      <PropertyPhoto image={l.image} type={l.type} title={l.title} iconClassName="h-3.5 w-3.5 text-muted-foreground" />
                    </span>
                    <span className="truncate">{l.title}</span>
                  </span>
                </td>
                <td className="py-2.5 pr-3 text-muted-foreground">{l.type}</td>
                <td className="max-w-[140px] truncate py-2.5 pr-3 text-muted-foreground" title={l.region}>{l.region}</td>
                <td className="max-w-[160px] truncate py-2.5 pr-3 text-muted-foreground" title={l.price}>{l.price}</td>
                <td className="py-2.5 pr-3 text-muted-foreground">{l.manager}</td>
                <td className="py-2.5 pr-3">
                  <StatusBadge
                    label={l.status}
                    tone={l.status === "공개" ? "success" : "neutral"}
                    onClick={() => {
                      setListings((prev) =>
                        prev.map((p) => (p.id === l.id ? { ...p, status: p.status === "공개" ? "비공개" : "공개" } : p)),
                      );
                      logActivity("매물 공개상태 변경", l.title);
                    }}
                  />
                </td>
                <td className="py-2.5 pr-3">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setEditTarget(l)}
                      className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                      aria-label={`${l.title} 수정`}
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setDeleteTarget(l);
                        setDeleteReason("");
                      }}
                      className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                      aria-label={`${l.title} 삭제`}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <EmptyResult message="조건에 맞는 매물이 없습니다." />}
      </div>

      <div className="mt-4">
        <Button size="sm" className="gap-1.5 font-bold" onClick={() => onNavigate("property-register")}>
          <Plus className="h-3.5 w-3.5" />
          신규 매물 등록
        </Button>
      </div>

      <ListingEditModal key={editTarget?.id ?? "none"} listing={editTarget} onClose={() => setEditTarget(null)} />

      <Modal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="매물 삭제"
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setDeleteTarget(null)}>
              취소
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => {
                if (deleteTarget) deleteListing(deleteTarget.id, deleteReason);
                setDeleteTarget(null);
              }}
            >
              삭제
            </Button>
          </>
        }
      >
        <p className="text-sm text-foreground break-keep">
          <span className="font-medium">{deleteTarget?.title}</span> 매물을 삭제합니다. 삭제된 매물은
          &quot;삭제된 매물&quot; 메뉴에서 복구할 수 있습니다.
        </p>
        <label className="mt-4 block text-xs font-medium text-muted-foreground">삭제 사유 (선택)</label>
        <Input
          className="mt-1.5"
          value={deleteReason}
          onChange={(e) => setDeleteReason(e.target.value)}
          placeholder="예: 매물 거래완료"
        />
      </Modal>
    </div>
  );
}

function ListingEditModal({ listing, onClose }: { listing: Listing | null; onClose: () => void }) {
  const { setListings, logActivity } = useRealEstateAdmin();
  const [form, setForm] = useState<Listing | null>(listing);

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    if (!form) return;
    setListings((prev) => prev.map((l) => (l.id === form.id ? form : l)));
    toast.success("매물 정보가 수정되었습니다.");
    logActivity("매물 수정", form.title);
    onClose();
  };

  return (
    <Modal open={!!listing} onClose={onClose} title="매물 수정">
      {form && (
        <form onSubmit={handleSave} className="grid gap-4 sm:grid-cols-2" id="edit-listing-form">
          <div className="sm:col-span-2">
            <label className="text-xs font-medium text-muted-foreground">매물명</label>
            <Input className="mt-1.5" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">지역</label>
            <Input className="mt-1.5" value={form.region} onChange={(e) => setForm({ ...form, region: e.target.value })} />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">가격</label>
            <Input className="mt-1.5" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
          </div>
          <div className="sm:col-span-2">
            <Button type="submit" className="gap-1.5 font-bold">
              저장
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}

export function PropertyRegisterView({ onNavigate }: { onNavigate: (key: string) => void }) {
  const { setListings, logActivity } = useRealEstateAdmin();
  const [form, setForm] = useState(EMPTY_LISTING_FORM);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.region.trim() || !form.price.trim()) {
      toast.error("모든 항목을 입력해 주세요.");
      return;
    }
    setListings((prev) => [
      { id: Date.now(), ...form, status: "공개", registeredAt: new Date().toISOString().slice(0, 10), image: "" },
      ...prev,
    ]);
    toast.success("매물이 등록되었습니다.");
    logActivity("매물 등록", form.title);
    setForm(EMPTY_LISTING_FORM);
    onNavigate("property-list");
  };

  return (
    <div>
      <PanelHeader title="매물 등록" description="새 매물의 기본 정보를 입력합니다." />
      <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="text-xs font-medium text-muted-foreground">매물명</label>
          <Input
            className="mt-1.5"
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            placeholder="예: 문정역 초역세권 신축 사무실"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground">지역</label>
          <Input
            className="mt-1.5"
            value={form.region}
            onChange={(e) => setForm((f) => ({ ...f, region: e.target.value }))}
            placeholder="예: 서울 송파구 문정동"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground">매물 종류</label>
          <Select value={form.type} onValueChange={(v) => setForm((f) => ({ ...f, type: v }))}>
            <SelectTrigger className="mt-1.5">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PROPERTY_TYPES.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground">담당자</label>
          <Input
            className="mt-1.5"
            value={form.manager}
            onChange={(e) => setForm((f) => ({ ...f, manager: e.target.value }))}
          />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground">가격</label>
          <Input
            className="mt-1.5"
            value={form.price}
            onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
            placeholder="예: 매 9억, 전 3억, 보 3천 / 월 50"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="text-xs font-medium text-muted-foreground">상세 설명</label>
          <Textarea className="mt-1.5" rows={3} placeholder="매물 특징을 입력하세요 (데모 — 저장되지 않음)" />
        </div>
        <div className="sm:col-span-2">
          <Button type="submit" className="gap-1.5 font-bold">
            <Plus className="h-3.5 w-3.5" />
            매물 등록하기
          </Button>
        </div>
      </form>
    </div>
  );
}

export function PropertyMapView() {
  const handleMapClick = () => {
    toast("데모 페이지입니다", {
      description: "실제 서비스에서는 지도 API가 연동되어 매물 위치가 표시됩니다.",
    });
  };
  return (
    <div>
      <PanelHeader title="지도" description="매물 위치를 지도에서 확인합니다." />
      <button
        type="button"
        onClick={handleMapClick}
        className="flex h-64 w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-secondary/30 text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
      >
        <MapPin className="h-8 w-8" />
        <span className="text-sm">지도에서 매물 위치 보기</span>
      </button>
    </div>
  );
}

export function PropertyPrivateView() {
  const { listings, setListings, logActivity } = useRealEstateAdmin();
  const [query, setQuery] = useState("");
  const privateListings = listings.filter(
    (l) => l.status === "비공개" && (query.trim() === "" || l.title.includes(query) || l.region.includes(query)),
  );

  return (
    <div>
      <PanelHeader title="비공개 매물" description="홈페이지에 노출되지 않는 매물만 모아봅니다." />
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="검색" className="pl-9" />
      </div>
      <div className="mt-4 space-y-2">
        {privateListings.length === 0 && <EmptyResult message="비공개 매물이 없습니다." />}
        {privateListings.map((l) => (
          <Row key={l.id}>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-foreground">{l.title}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {l.region} · {l.type} · {l.price}
              </p>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="h-7 shrink-0 text-xs"
              onClick={() => {
                setListings((prev) => prev.map((p) => (p.id === l.id ? { ...p, status: "공개" } : p)));
                logActivity("매물 공개 전환", l.title);
                toast.success("공개로 전환되었습니다.");
              }}
            >
              공개 전환
            </Button>
          </Row>
        ))}
      </div>
    </div>
  );
}

export function PropertyDeletedView() {
  const { deletedListings, restoreListing, purgeListing } = useRealEstateAdmin();
  const [confirmPurge, setConfirmPurge] = useState<number | null>(null);

  return (
    <div>
      <PanelHeader title="삭제된 매물" description="Soft Delete된 매물입니다. 복구하거나 영구삭제할 수 있습니다." />
      <div className="space-y-2">
        {deletedListings.length === 0 && <EmptyResult message="삭제된 매물이 없습니다." />}
        {deletedListings.map((l) => (
          <Row key={l.id}>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-foreground">{l.title}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                삭제일 {l.deletedAt} · 삭제자 {l.deletedBy} · {l.deletedReason}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-1.5">
              <Button size="sm" variant="outline" className="h-7 gap-1 text-xs" onClick={() => restoreListing(l.id)}>
                <RotateCcw className="h-3 w-3" />
                복구
              </Button>
              <Button
                size="sm"
                variant="destructive"
                className="h-7 text-xs"
                onClick={() => setConfirmPurge(l.id)}
              >
                영구삭제
              </Button>
            </div>
          </Row>
        ))}
      </div>

      <Modal
        open={confirmPurge !== null}
        onClose={() => setConfirmPurge(null)}
        title="영구삭제 확인"
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setConfirmPurge(null)}>
              취소
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => {
                if (confirmPurge !== null) purgeListing(confirmPurge);
                setConfirmPurge(null);
              }}
            >
              영구삭제
            </Button>
          </>
        }
      >
        <p className="text-sm text-foreground break-keep">
          영구삭제하면 복구할 수 없습니다. 계속하시겠습니까? (관리자 권한이 있는 계정만 가능합니다)
        </p>
      </Modal>
    </div>
  );
}

export function PropertyCategoryView() {
  const { categories, setCategories, logActivity } = useRealEstateAdmin();

  const groups: Array<"주거" | "상업" | "토지/건물"> = ["주거", "상업", "토지/건물"];

  return (
    <div>
      <PanelHeader title="매물 종류 관리" description="매물 Category를 그룹별로 관리합니다." />
      <div className="grid gap-6 sm:grid-cols-3">
        {groups.map((g) => (
          <div key={g}>
            <h3 className="text-sm font-semibold text-foreground">{g}</h3>
            <div className="mt-2.5 space-y-1.5">
              {categories
                .filter((c) => c.group === g)
                .sort((a, b) => a.order - b.order)
                .map((c) => (
                  <div key={c.id} className="flex items-center justify-between gap-2 rounded-lg border border-border bg-secondary/30 px-3 py-2">
                    <span className={cn("flex items-center gap-1.5 text-xs font-medium", !c.active && "text-muted-foreground line-through")}>
                      <GripVertical className="h-3 w-3 text-muted-foreground" />
                      {c.name}
                    </span>
                    <Switch
                      checked={c.active}
                      onCheckedChange={(checked) => {
                        setCategories((prev) => prev.map((p) => (p.id === c.id ? { ...p, active: checked } : p)));
                        logActivity(checked ? "카테고리 활성화" : "카테고리 비활성화", c.name);
                      }}
                    />
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PropertyGalleryView() {
  const { listings } = useRealEstateAdmin();
  const [managerFilter, setManagerFilter] = useState("전체");
  const [selectedImage, setSelectedImage] = useState<Listing | null>(null);
  const managers = ["전체", ...new Set(listings.map((l) => l.manager))];
  const filtered = listings.filter((l) => managerFilter === "전체" || l.manager === managerFilter);

  return (
    <div>
      <PanelHeader title="매물 사진첩" description="전체 매물 사진을 기준으로 조회하는 갤러리입니다." />
      <div className="flex flex-wrap gap-1.5">
        {managers.map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setManagerFilter(m)}
            className={cn(
              "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
              managerFilter === m
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border text-muted-foreground hover:border-primary/50",
            )}
          >
            {m}
          </button>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
        {filtered.map((l) => (
          <button
            key={l.id}
            type="button"
            onClick={() => setSelectedImage(l)}
            className="flex aspect-square flex-col overflow-hidden rounded-xl border border-border bg-secondary/30 transition-colors hover:border-primary/40"
          >
            <span className="relative min-h-0 flex-1 overflow-hidden">
              <PropertyPhoto image={l.image} type={l.type} title={l.title} iconClassName="h-8 w-8 text-muted-foreground" />
            </span>
            <span className="line-clamp-1 px-2 py-1.5 text-[10px] text-muted-foreground">{l.title}</span>
          </button>
        ))}
      </div>

      <Modal open={!!selectedImage} onClose={() => setSelectedImage(null)} title={selectedImage?.title ?? ""}>
        {selectedImage && (
          <div className="text-center">
            {hasPhoto(selectedImage.image) ? (
              <div className="relative mx-auto h-72 w-full overflow-hidden rounded-lg">
                <Image src={selectedImage.image} alt={selectedImage.title} fill sizes="480px" className="object-cover" />
              </div>
            ) : (
              <PropertyThumb type={selectedImage.type} className="mx-auto h-16 w-16 text-muted-foreground" />
            )}
            <p className="mt-3 text-sm text-muted-foreground">
              {selectedImage.region} · {selectedImage.manager} 담당
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
}

export function PropertyComplexView() {
  const { complexes } = useRealEstateAdmin();
  const [selected, setSelected] = useState<(typeof complexes)[number] | null>(null);

  return (
    <div>
      <PanelHeader title="단지 정보 관리" description="오피스텔/지식산업센터 등 단지 마스터 정보입니다." />
      <div className="space-y-2">
        {complexes.map((c) => (
          <Row key={c.id} onClick={() => setSelected(c)}>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground">{c.name}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {c.address} · {c.builtYear}년 준공 · {c.households}세대
              </p>
            </div>
            <ArrowUpDown className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
          </Row>
        ))}
      </div>

      <Modal open={!!selected} onClose={() => setSelected(null)} title={selected?.name ?? ""}>
        {selected && (
          <dl className="grid grid-cols-2 gap-3 text-xs">
            {[
              ["주소", selected.address],
              ["준공년도", `${selected.builtYear}년`],
              ["총 세대수", `${selected.households}세대`],
              ["총 동수", `${selected.buildings}동`],
              ["주차대수", `${selected.parking}대`],
              ["난방방식", selected.heating],
              ["건설사", selected.builder],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-muted-foreground">{k}</dt>
                <dd className="mt-0.5 font-medium text-foreground">{v}</dd>
              </div>
            ))}
          </dl>
        )}
      </Modal>
    </div>
  );
}

export function PropertyComplexIconView() {
  const { complexIcons, setComplexIcons, logActivity } = useRealEstateAdmin();
  return (
    <div>
      <PanelHeader title="단지 아이콘 관리" description="단지/매물 지도에서 사용할 아이콘을 관리합니다." />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {complexIcons.map((icon) => (
          <div
            key={icon.id}
            className={cn(
              "flex flex-col items-center gap-2 rounded-xl border p-4 text-center transition-colors",
              icon.active ? "border-border bg-card" : "border-border/60 bg-secondary/20 opacity-60",
            )}
          >
            <span className="text-2xl">🏷️</span>
            <span className="text-xs font-medium text-foreground">{icon.name}</span>
            <span className="text-[10px] text-muted-foreground">{icon.category}</span>
            <Switch
              checked={icon.active}
              onCheckedChange={(checked) => {
                setComplexIcons((prev) => prev.map((p) => (p.id === icon.id ? { ...p, active: checked } : p)));
                logActivity(checked ? "아이콘 사용 설정" : "아이콘 사용 해제", icon.name);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function PropertyComplexSystemView() {
  const { complexSystems, complexes } = useRealEstateAdmin();
  return (
    <div>
      <PanelHeader title="단지 시스템 목록" description="단지별 시설/시스템 보유 현황입니다." />
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] border-collapse text-left text-xs">
          <thead>
            <tr className="border-b border-border text-muted-foreground">
              <th className="py-2 pr-3 font-medium">시설</th>
              {complexes.map((c) => (
                <th key={c.id} className="py-2 pr-3 font-medium">
                  {c.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {complexSystems.map((sys) => (
              <tr key={sys.id} className="border-b border-border/60">
                <td className="py-2.5 pr-3 font-medium text-foreground">{sys.name}</td>
                {complexes.map((c) => (
                  <td key={c.id} className="py-2.5 pr-3">
                    {sys.complexes.includes(c.id) ? (
                      <span className="text-emerald-600">✓</span>
                    ) : (
                      <span className="text-muted-foreground">–</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function PropertyLogView() {
  const { propertyLogs } = useRealEstateAdmin();
  const [filter, setFilter] = useState("전체");
  const types = ["전체", ...new Set(propertyLogs.map((l) => l.type))];
  const filtered = propertyLogs.filter((l) => filter === "전체" || l.type === filter);

  return (
    <div>
      <PanelHeader title="매물 일지" description="매물 관련 활동 기록을 시간순으로 확인합니다." />
      <div className="flex flex-wrap gap-1.5">
        {types.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setFilter(t)}
            className={cn(
              "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
              filter === t
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border text-muted-foreground hover:border-primary/50",
            )}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="mt-4 space-y-4 border-l border-border pl-4">
        {filtered.map((log) => (
          <div key={log.id} className="relative">
            <span className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full bg-primary" />
            <p className="text-xs text-muted-foreground">
              {log.createdAt} · {log.manager}
            </p>
            <p className="mt-0.5 text-sm text-foreground">
              <span className="font-medium">[{log.type}]</span> {log.propertyTitle} — {log.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
