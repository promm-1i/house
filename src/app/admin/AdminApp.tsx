"use client";

import Link from "next/link";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { RealEstateAdminProvider } from "./_real-estate-admin/store";
import { RealEstateAdminDemo } from "./RealEstateAdminDemo";

export default function AdminApp() {
  return (
    <RealEstateAdminProvider>
      <div className="min-h-screen bg-secondary/30">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-background px-4 py-3 sm:px-6">
          <div>
            <p className="text-xs font-mono font-semibold uppercase tracking-widest text-primary">
              ADMIN DEMO
            </p>
            <h1 className="mt-0.5 text-base font-semibold text-foreground">
              부동산 매물관리 관리자 데모
            </h1>
          </div>
          <div className="flex shrink-0 items-center gap-4">
            <Button asChild size="sm" variant="outline" className="gap-1.5">
              <Link href="/">
                <Home className="h-3.5 w-3.5" />
                홈페이지 가기
              </Link>
            </Button>
          </div>
        </header>

        <RealEstateAdminDemo />
      </div>
      <Toaster />
    </RealEstateAdminProvider>
  );
}
