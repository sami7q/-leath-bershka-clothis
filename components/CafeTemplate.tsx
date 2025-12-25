// components/CafeTemplate.tsx
"use client";

import { useState } from "react";
import type { SiteConfig, Lang } from "../lib/siteConfig";

import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

import { HeroSection } from "./sections/HeroSection";
import { QrSection } from "./sections/QrSection";
import { MenuSection } from "./sections/MenuSection";
import { PromosSection } from "./sections/PromosSection";

export function CafeTemplate({ config }: { config: SiteConfig }) {
  const [lang, setLang] = useState<Lang>("ar");
  const isAr = lang === "ar";

  return (
    <div className="flex min-h-screen flex-col bg-white" dir={isAr ? "rtl" : "ltr"}>
      <SiteHeader config={config} lang={lang} onChangeLang={setLang} />

      <main className="flex-1">
        <HeroSection config={config} lang={lang} />
        <QrSection config={config} lang={lang} />
        <MenuSection config={config} lang={lang} />
        <PromosSection lang={lang} />
      </main>

      <SiteFooter config={config} lang={lang} />
    </div>
  );
}
