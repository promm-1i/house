import { useEffect, useRef, type ReactNode } from "react";
import Image from "next/image";
import { X, Building2, Building, Store, Factory, Landmark, TreePine, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

const PROPERTY_TYPE_ICON: Record<string, LucideIcon> = {
  사무실: Building2,
  상가: Store,
  오피스텔: Building,
  지식산업센터: Factory,
  근린생활시설: Store,
  업무시설: Landmark,
  토지: TreePine,
};

export function PropertyThumb({ type, className }: { type: string; className?: string }) {
  const Icon = PROPERTY_TYPE_ICON[type] ?? Building2;
  return <Icon className={className ?? "h-4 w-4 text-muted-foreground"} aria-hidden />;
}

/** 매물 사진(정적 asset 경로)이 등록돼 있는지 — 빈 문자열/이모지 자리값이면 false. */
export function hasPhoto(image: string | undefined): boolean {
  return !!image && image.startsWith("/");
}

/**
 * 매물 사진 또는 유형 아이콘을 채워서 보여준다. 부모가 크기/모양(정사각형, 라운드 등)을
 * 잡아주고, 이 컴포넌트는 그 안을 채우기만 한다 — 목록·사진첩·모달에서 동일 매물이면
 * 항상 같은 사진을 보여주도록 image 값 하나로 통일.
 */
export function PropertyPhoto({
  image,
  type,
  title,
  iconClassName,
}: {
  image: string;
  type: string;
  title?: string;
  iconClassName?: string;
}) {
  if (hasPhoto(image)) {
    return <Image src={image} alt={title ?? ""} fill sizes="120px" className="object-cover" />;
  }
  return (
    <div className="flex h-full w-full items-center justify-center">
      <PropertyThumb type={type} className={iconClassName ?? "h-6 w-6 text-muted-foreground"} />
    </div>
  );
}

export function StatusBadge({
  label,
  tone = "neutral",
  onClick,
}: {
  label: string;
  tone?: "success" | "warning" | "danger" | "neutral" | "info";
  onClick?: () => void;
}) {
  const toneClass = {
    success: "bg-emerald-500/10 text-emerald-600",
    warning: "bg-amber-500/10 text-amber-600",
    danger: "bg-destructive/10 text-destructive",
    info: "bg-primary/10 text-primary",
    neutral: "bg-secondary text-muted-foreground",
  }[tone];

  const Comp = onClick ? "button" : "span";
  return (
    <Comp
      type={onClick ? "button" : undefined}
      onClick={onClick}
      className={cn(
        "inline-flex shrink-0 items-center rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors",
        toneClass,
        onClick && "cursor-pointer hover:opacity-80",
      )}
    >
      {label}
    </Comp>
  );
}

export function StatCard({ label, value, icon: Icon }: { label: string; value: string | number; icon: LucideIcon }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </div>
      <p className="mt-2 text-2xl font-semibold text-foreground">{value}</p>
    </div>
  );
}

export function PanelHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div className="mb-5">
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      {description && (
        <p className="mt-1 text-sm text-muted-foreground break-keep">{description}</p>
      )}
    </div>
  );
}

export function DemoNote({ children }: { children: ReactNode }) {
  return (
    <p className="mb-4 inline-flex items-center gap-1.5 rounded-md border border-primary/20 bg-primary/5 px-2.5 py-1 text-[11px] font-medium text-primary">
      {children}
    </p>
  );
}

export function EmptyResult({ message }: { message: string }) {
  return (
    <p className="py-10 text-center text-sm text-muted-foreground break-keep">{message}</p>
  );
}

export function Modal({
  open,
  onClose,
  title,
  children,
  footer,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    triggerRef.current = document.activeElement as HTMLElement;

    const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
    (focusables?.[0] ?? dialogRef.current)?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const nodes = dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
      if (!nodes || nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      triggerRef.current?.focus();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1}
        className="relative flex max-h-[85vh] w-full max-w-lg flex-col overflow-hidden rounded-xl border border-border bg-card shadow-xl outline-none"
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
          <h3 id="modal-title" className="text-sm font-semibold text-foreground">{title}</h3>
          <button type="button" onClick={onClose} aria-label="닫기">
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-5">{children}</div>
        {footer && <div className="flex justify-end gap-2 border-t border-border px-5 py-3.5">{footer}</div>}
      </div>
    </div>
  );
}

export function Row({ children, onClick }: { children: ReactNode; onClick?: () => void }) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "flex items-center justify-between gap-3 rounded-lg border border-border bg-secondary/30 p-3",
        onClick && "cursor-pointer transition-colors hover:border-primary/40",
      )}
    >
      {children}
    </div>
  );
}
