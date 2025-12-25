// components/sections/MenuSection.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { SiteConfig, Lang, LocalizedText } from "../../lib/siteConfig";

function t(text: LocalizedText, lang: Lang) {
  return lang === "ar" ? text.ar : text.en;
}

interface MenuSectionProps {
  config: SiteConfig;
  lang: Lang;
}

export function MenuSection({ config, lang }: MenuSectionProps) {
  const [activeCategoryId, setActiveCategoryId] =
    useState<SiteConfig["menuSection"]["categories"][number]["id"]>("main");

  const activeCategory =
    config.menuSection.categories.find((c) => c.id === activeCategoryId) ??
    config.menuSection.categories[0];

  const currency = config.footer.currencySymbol;
  const isAr = lang === "ar";

  // ✅ Fried Chicken palette
  const accent = config.primaryColor ?? "#E81B24";
  const accentDeep = "#AD1E1F";
  const paper = "#F8F7F8";
  const cocoa = "#651810";

  return (
    <section
      id="menu"
      className="py-12 md:py-16"
      style={{
        backgroundImage: `linear-gradient(to bottom, ${paper}, ${paper}, rgba(237,208,164,0.35))`,
      }}
    >
      <div className="mx-auto max-w-6xl px-3 sm:px-4">
        {/* ✅ MAKE BANNER WIDER on desktop */}
        <div className="lg:grid lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-10 lg:items-start">
          {/* ===== LEFT: BIG MENU BANNER (WIDER) ===== */}
          <div className="mb-10 lg:mb-0">
            <div
              className="relative overflow-hidden rounded-[36px] shadow-xl ring-1"
              style={{
                backgroundColor: "#111",
                boxShadow: "0 22px 55px rgba(0,0,0,0.18)",
                borderColor: "rgba(101,24,16,0.10)",
              }}
            >
              {/* ✅ keep height similar, focus on wider column */}
              <div className="relative h-56 sm:h-64 md:h-72 lg:h-[420px]">
                <Image
                  src="/cafe/menu-banner.svg"
                  alt={t(config.menuSection.title, lang)}
                  fill
                  className="object-cover"
                  // ✅ banner is now wider, so give it more pixels on desktop
                  sizes="(min-width: 1024px) 720px, 100vw"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/35 via-black/10 to-black/0" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/35 to-transparent" />
              </div>
            </div>
          </div>

          {/* ===== RIGHT: HEADER + TABS + MENU LIST ===== */}
          <div>
            {/* HEADER */}
            <div className="mb-6">
              <div className={isAr ? "text-right" : "text-left"}>
                <p
                  className="mb-1 text-[11px] font-semibold uppercase tracking-[0.2em]"
                  style={{ color: accent }}
                >
                  {t(config.menuSection.label, lang)}
                </p>

                <h2
                  className="text-2xl font-extrabold sm:text-3xl md:text-[32px]"
                  style={{ color: cocoa }}
                >
                  {t(config.menuSection.title, lang)}
                </h2>
              </div>
            </div>

            {/* CATEGORY TABS */}
            <div className="mb-7">
              {/* MOBILE GRID */}
              <div className="grid max-w-md grid-cols-2 gap-3 md:hidden">
                {config.menuSection.categories.map((cat) => {
                  const isActive = cat.id === activeCategoryId;

                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategoryId(cat.id)}
                      className="w-full rounded-xl border px-4 py-2 text-sm font-extrabold transition active:scale-[0.99]"
                      style={{
                        borderColor: isActive ? accent : "rgba(101,24,16,0.14)",
                        backgroundColor: isActive ? accent : "rgba(255,255,255,0.75)",
                        color: isActive ? "white" : cocoa,
                        boxShadow: isActive
                          ? "0 14px 30px rgba(232,27,36,0.22)"
                          : "0 10px 26px rgba(0,0,0,0.06)",
                      }}
                    >
                      {t(cat.label, lang)}
                    </button>
                  );
                })}
              </div>

              {/* DESKTOP/TABLET TABS */}
              <div className="hidden md:flex md:flex-wrap md:gap-3">
                {config.menuSection.categories.map((cat) => {
                  const isActive = cat.id === activeCategoryId;

                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategoryId(cat.id)}
                      className="rounded-full border px-5 py-2 text-sm font-extrabold transition hover:translate-y-[-1px] active:translate-y-0"
                      style={{
                        borderColor: isActive ? accent : "rgba(101,24,16,0.14)",
                        backgroundColor: isActive ? accent : "rgba(255,255,255,0.75)",
                        color: isActive ? "white" : cocoa,
                        boxShadow: isActive
                          ? "0 14px 30px rgba(232,27,36,0.22)"
                          : "0 10px 26px rgba(0,0,0,0.06)",
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.borderColor = "rgba(101,24,16,0.22)";
                          e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.90)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.borderColor = "rgba(101,24,16,0.14)";
                          e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.75)";
                        }
                      }}
                    >
                      {t(cat.label, lang)}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* MENU LIST */}
            <div className="space-y-4">
              {activeCategory.items.map((item) => {
                const itemImage = (item as any).image as string | undefined;

                return (
                  <div
                    key={item.id}
                    className="group rounded-2xl px-3 py-3 transition sm:px-4 sm:py-4"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.92)",
                      boxShadow: "0 10px 26px rgba(0,0,0,0.06)",
                      border: "1px solid rgba(101,24,16,0.08)",
                    }}
                  >
                    <div
                      className={
                        "flex items-start gap-3 sm:gap-4 " +
                        (isAr ? "flex-row-reverse" : "flex-row")
                      }
                    >
                      {/* dish image */}
                      <div
                        className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl sm:h-20 sm:w-20"
                        style={{
                          backgroundColor: "rgba(101,24,16,0.08)",
                          border: "1px solid rgba(101,24,16,0.10)",
                        }}
                      >
                        {itemImage ? (
                          <Image
                            src={itemImage}
                            alt={t(item.name, lang)}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-105"
                            sizes="80px"
                          />
                        ) : (
                          <div
                            className="flex h-full w-full items-center justify-center text-[11px]"
                            style={{ color: "rgba(101,24,16,0.55)" }}
                          >
                            {lang === "en" ? "Dish" : "طبق"}
                          </div>
                        )}
                        <div className="pointer-events-none absolute inset-0 bg-black/0 transition group-hover:bg-black/5" />
                      </div>

                      {/* name + desc + price */}
                      <div className="flex-1">
                        <div
                          className={
                            "flex items-baseline gap-3 " +
                            (isAr ? "flex-row-reverse" : "flex-row")
                          }
                        >
                          <p className="text-base font-extrabold sm:text-lg" style={{ color: cocoa }}>
                            {t(item.name, lang)}
                          </p>

                          <span
                            className="mt-2 flex-1 border-b border-dashed"
                            style={{ borderColor: "rgba(101,24,16,0.22)" }}
                          />

                          <div
                            className="whitespace-nowrap text-right text-sm font-extrabold sm:text-base"
                            style={{ color: accent }}
                          >
                            <span>
                              {currency}
                              {item.priceFull.toFixed(0)}
                            </span>
                          </div>
                        </div>

                        <p
                          className={
                            "mt-1 text-xs sm:text-[13px] " +
                            (isAr ? "text-right" : "text-left")
                          }
                          style={{ color: "rgba(101,24,16,0.62)" }}
                        >
                          {t(item.description, lang)}
                        </p>

                        <div
                          className="mt-2 h-[2px] w-0 rounded-full transition-all duration-300 group-hover:w-24"
                          style={{ backgroundColor: accentDeep, opacity: 0.35 }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* footer note */}
            <div
              className={"mt-8 text-[12px] " + (isAr ? "text-right" : "text-left")}
              style={{ color: "rgba(101,24,16,0.55)" }}
            >
              {lang === "en"
                ? "Prices may change based on offers."
                : "الأسعار قد تتغير حسب العروض."}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
