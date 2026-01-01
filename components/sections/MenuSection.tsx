// components/sections/MenuSection.tsx
"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { SiteConfig, Lang, LocalizedText } from "../../lib/siteConfig";

function t(text: LocalizedText, lang: Lang) {
  return lang === "ar" ? text.ar : text.en;
}

interface MenuSectionProps {
  config: SiteConfig;
  lang: Lang;
}

/**
 * ✅ Leath Bershka — Products Section (Compact Grid)
 * - Mobile: 2 columns (so 8 items => 4 rows "4 تحت 4" بشكل عملي)
 * - Tablet: 3 columns
 * - Desktop: 4 columns (شبكي أنيق)
 * - Smaller cards + smaller image ratio + tighter paddings
 */
export function MenuSection({ config, lang }: MenuSectionProps) {
  const isAr = lang === "ar";

  const BRAND = useMemo(
    () => ({
      red: "#E31B23",
      redDeep: "#B80F16",
      ink: "#0B0F14",
      paper: "#F7F7F8",
      muted: "rgba(247,247,248,0.70)",
      textMuted: "rgba(247,247,248,0.62)",
      border: "rgba(255,255,255,0.10)",
      borderStrong: "rgba(255,255,255,0.14)",
      card: "rgba(255,255,255,0.04)",
      cardHover: "rgba(255,255,255,0.06)",
    }),
    []
  );

  const currency = config.footer.currencySymbol ?? "";
  const categories = config.menuSection?.categories ?? [];

  const [activeCategoryId, setActiveCategoryId] = useState<
    SiteConfig["menuSection"]["categories"][number]["id"]
  >(categories?.[0]?.id ?? "main");

  const activeCategory =
    categories.find((c) => c.id === activeCategoryId) ?? categories[0];

  const items = useMemo(() => {
    const list = (activeCategory?.items ?? []) as any[];
    return [...list].sort(
      (a, b) => Number(Boolean(b?.image)) - Number(Boolean(a?.image))
    );
  }, [activeCategory]);

  const handleScrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="menu"
      className="py-10 md:py-14"
      style={{
        background:
          "radial-gradient(1000px 520px at 18% 8%, rgba(227,27,35,0.10), transparent 62%), linear-gradient(to bottom, rgba(11,15,20,0.98), rgba(11,15,20,0.96))",
      }}
    >
      <div className="mx-auto max-w-6xl px-3 sm:px-4">
        {/* ===================== HEADER ===================== */}
        <div className={"mb-5 " + (isAr ? "text-right" : "text-left")}>
          <p
            className="mb-2 text-[10px] font-extrabold uppercase tracking-[0.28em]"
            style={{ color: BRAND.muted }}
          >
            {lang === "en" ? "PRODUCTS" : "المنتجات"}
          </p>

          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2
                className="text-[20px] font-extrabold sm:text-[24px] md:text-[28px]"
                style={{ color: BRAND.paper }}
              >
                {lang === "en" ? "Leath Bershka Collection" : "تشكيلة ليث بيرشكا"}
              </h2>
              <p
                className="mt-2 max-w-2xl text-[13px] leading-relaxed sm:text-[14px]"
                style={{ color: BRAND.textMuted }}
              >
                {lang === "en"
                  ? ""
                  : ""}
              </p>
            </div>

            <button
              type="button"
              onClick={handleScrollToContact}
              className="inline-flex items-center justify-center rounded-full px-4 py-2 text-[13px] font-extrabold transition active:scale-[0.98]"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: `1px solid ${BRAND.border}`,
                color: BRAND.paper,
                boxShadow: "0 14px 40px rgba(0,0,0,0.22)",
              }}
            >
              {lang === "en" ? "Order via WhatsApp" : "اطلب عبر واتساب"}
              <span
                className={
                  "ml-2 inline-flex h-7 w-7 items-center justify-center rounded-full " +
                  (isAr ? "mr-2 ml-0" : "")
                }
                style={{
                  background: `linear-gradient(135deg, ${BRAND.red}, ${BRAND.redDeep})`,
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9 18L15 12L9 6"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>

        {/* ===================== CATEGORY FILTERS ===================== */}
        {categories.length > 1 && (
          <div className="mb-5">
            {/* Mobile chips */}
            <div className="md:hidden -mx-3 px-3 overflow-x-auto">
              <div className="flex w-max gap-2 pb-2">
                {categories.map((cat) => {
                  const isActive = cat.id === activeCategoryId;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setActiveCategoryId(cat.id)}
                      className="whitespace-nowrap rounded-full px-4 py-2 text-[13px] font-extrabold transition active:scale-[0.99]"
                      style={{
                        background: isActive
                          ? `linear-gradient(135deg, ${BRAND.red}, ${BRAND.redDeep})`
                          : "rgba(255,255,255,0.05)",
                        color: BRAND.paper,
                        border: `1px solid ${
                          isActive ? "rgba(227,27,35,0.34)" : BRAND.border
                        }`,
                        boxShadow: isActive
                          ? "0 14px 40px rgba(227,27,35,0.16)"
                          : "0 14px 40px rgba(0,0,0,0.18)",
                      }}
                    >
                      {t(cat.label, lang)}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Desktop */}
            <div className="hidden md:flex md:flex-wrap md:gap-2.5">
              {categories.map((cat) => {
                const isActive = cat.id === activeCategoryId;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategoryId(cat.id)}
                    className="rounded-full px-4 py-2 text-[13px] font-extrabold transition hover:translate-y-[-1px] active:translate-y-0"
                    style={{
                      background: isActive
                        ? `linear-gradient(135deg, ${BRAND.red}, ${BRAND.redDeep})`
                        : "rgba(255,255,255,0.05)",
                      color: BRAND.paper,
                      border: `1px solid ${
                        isActive ? "rgba(227,27,35,0.34)" : BRAND.border
                      }`,
                      boxShadow: isActive
                        ? "0 14px 40px rgba(227,27,35,0.14)"
                        : "0 14px 40px rgba(0,0,0,0.16)",
                    }}
                  >
                    {t(cat.label, lang)}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ===================== PRODUCTS GRID (SMALLER) ===================== */}
        {/* ✅ Mobile: 2 cols (4 rows for 8 items) — practical & readable */}
        {/* ✅ Desktop: 4 cols, XL: 5 cols for ultra-grid look */}
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {items.map((item: any) => {
            const itemImage = item?.image as string | undefined;
            const badge = item?.badge as LocalizedText | undefined;
            const oldPrice = item?.oldPrice as number | undefined;

            const price = Number(item?.priceFull ?? 0);
            const hasDiscount = typeof oldPrice === "number" && oldPrice > price;

            return (
              <article
                key={item?.id}
                className="group relative overflow-hidden rounded-2xl border transition"
                style={{
                  backgroundColor: BRAND.card,
                  borderColor: BRAND.border,
                  boxShadow: "0 14px 40px rgba(0,0,0,0.16)",
                }}
              >
                {/* subtle hover */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(380px 200px at 20% 0%, rgba(227,27,35,0.12), transparent 60%)",
                  }}
                />

                {/* ✅ Smaller image area */}
                <div className="relative aspect-[1/1.12] w-full overflow-hidden">
                  {itemImage ? (
                    <>
                      <Image
                        src={itemImage}
                        alt={t(item?.name, lang)}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                        sizes="(min-width: 1280px) 220px, (min-width: 1024px) 240px, (min-width: 768px) 33vw, 50vw"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                    </>
                  ) : (
                    <div className="flex h-full items-center justify-center bg-white/5 text-[12px] font-bold text-white/70">
                      {lang === "en" ? "No image" : "لا توجد صورة"}
                    </div>
                  )}

                  {/* ✅ Smaller badge */}
                  <div className="absolute left-2 top-2">
                    <div
                      className="inline-flex items-center rounded-full px-2 py-0.5 text-[9.5px] font-extrabold"
                      style={{
                        background: "rgba(11,15,20,0.55)",
                        border: `1px solid ${BRAND.borderStrong}`,
                        color: BRAND.paper,
                        backdropFilter: "blur(10px)",
                      }}
                    >
                      <span
                        className="mr-1.5 inline-flex h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: BRAND.red }}
                      />
                      {badge ? t(badge, lang) : lang === "en" ? "New" : "جديد"}
                    </div>
                  </div>

                  {/* ✅ Smaller price pill */}
                  <div className="absolute bottom-2 right-2">
                    <div
                      className="inline-flex items-baseline gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-extrabold"
                      style={{
                        background: `linear-gradient(135deg, ${BRAND.red}, ${BRAND.redDeep})`,
                        color: "white",
                        boxShadow: "0 12px 30px rgba(0,0,0,0.24)",
                      }}
                    >
                      <span>
                        {currency}
                        {price.toFixed(0)}
                      </span>
                      {hasDiscount && (
                        <span className="text-[10px] font-bold text-white/75 line-through">
                          {currency}
                          {Number(oldPrice).toFixed(0)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* ✅ Compact content */}
                <div
                  className={
                    "p-2.5 sm:p-3 " + (isAr ? "text-right" : "text-left")
                  }
                >
                  <h3
                    className="text-[12.5px] font-extrabold sm:text-[13.5px]"
                    style={{ color: BRAND.paper }}
                  >
                    {t(item?.name, lang)}
                  </h3>

                  <p
                    className="mt-1 line-clamp-2 text-[11px] leading-relaxed sm:text-[12px]"
                    style={{ color: BRAND.textMuted }}
                  >
                    {t(item?.description, lang)}
                  </p>

                  {/* ✅ Tiny actions (mobile-friendly) */}
                  <div
                    className={
                      "mt-2 flex items-center gap-2 " +
                      (isAr ? "justify-end" : "")
                    }
                  >
                    <a
                      href="#contact"
                      className="inline-flex flex-1 items-center justify-center rounded-xl px-2.5 py-2 text-[12px] font-extrabold transition active:scale-[0.99]"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: `1px solid ${BRAND.border}`,
                        color: BRAND.paper,
                      }}
                    >
                      {lang === "en" ? "Order" : "اطلب"}
                    </a>

                    <button
                      type="button"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-xl border transition active:scale-[0.99]"
                      style={{
                        borderColor: BRAND.border,
                        background: "rgba(255,255,255,0.04)",
                        color: BRAND.paper,
                      }}
                      aria-label={lang === "en" ? "Favorite" : "مفضلة"}
                      title={lang === "en" ? "Favorite" : "مفضلة"}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M12 21s-7-4.35-9.33-8.3C.56 9.2 2.14 6 5.6 6c1.9 0 3.13 1.01 3.9 2.02C10.27 7.01 11.5 6 13.4 6c3.46 0 5.04 3.2 2.93 6.7C19 16.65 12 21 12 21Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Footer note */}
        <div
          className={"mt-7 text-[11px] " + (isAr ? "text-right" : "text-left")}
          style={{ color: "rgba(247,247,248,0.52)" }}
        >
          {lang === "en"
            ? "Availability & prices may vary based on stock."
            : "التوفر والأسعار قد تتغير حسب المخزون."}
        </div>
      </div>
    </section>
  );
}
