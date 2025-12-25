// components/sections/HeroSection.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { SiteConfig, Lang, LocalizedText } from "../../lib/siteConfig";

function t(text: LocalizedText, lang: Lang) {
  return lang === "ar" ? text.ar : text.en;
}

interface HeroSectionProps {
  config: SiteConfig;
  lang: Lang;
}

/**
 * ✅ New Brand (Leath / Streetwear)
 */
const BRAND = {
  ink: "#0B0F14",
  paper: "#F7F5F2",
  accent: "#C08A4B",
  accentDeep: "#8A5A2B",
};

const FLOATING_IMAGES = [
  { src: "/floating/1.png", alt: { en: "Product shot 1", ar: "صورة منتج 1" } },
  { src: "/floating/2.png", alt: { en: "Product shot 2", ar: "صورة منتج 2" } },
  { src: "/floating/3.png", alt: { en: "Product shot 3", ar: "صورة منتج 3" } },
  { src: "/floating/4.png", alt: { en: "Product shot 4", ar: "صورة منتج 4" } },
  { src: "/floating/5.png", alt: { en: "Product shot 5", ar: "صورة منتج 5" } },
];

function FloatingImages({ lang }: { lang: Lang }) {
  const isAr = lang === "ar";

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* 1 */}
      <div className="absolute left-4 top-16 sm:left-8 sm:top-20 md:left-10 md:top-28">
        <div className="float-a">
          <Image
            src={FLOATING_IMAGES[0].src}
            alt={t(FLOATING_IMAGES[0].alt, lang)}
            width={170}
            height={170}
            className="h-[96px] w-[96px] sm:h-[120px] sm:w-[120px] md:h-[150px] md:w-[150px] object-contain drop-shadow-[0_24px_40px_rgba(0,0,0,0.25)]"
          />
        </div>
      </div>

      {/* 2 */}
      <div className="absolute right-4 top-20 sm:right-10 sm:top-16 md:right-12 md:top-24">
        <div className="float-b">
          <Image
            src={FLOATING_IMAGES[1].src}
            alt={t(FLOATING_IMAGES[1].alt, lang)}
            width={190}
            height={190}
            className="h-[92px] w-[92px] sm:h-[120px] sm:w-[120px] md:h-[160px] md:w-[160px] object-contain drop-shadow-[0_24px_40px_rgba(0,0,0,0.25)]"
          />
        </div>
      </div>

      {/* 3 */}
      <div className="absolute left-6 bottom-28 sm:left-10 sm:bottom-32 md:left-16 md:bottom-36">
        <div className="float-c">
          <Image
            src={FLOATING_IMAGES[2].src}
            alt={t(FLOATING_IMAGES[2].alt, lang)}
            width={210}
            height={210}
            className="h-[104px] w-[104px] sm:h-[135px] sm:w-[135px] md:h-[170px] md:w-[170px] object-contain drop-shadow-[0_24px_40px_rgba(0,0,0,0.25)]"
          />
        </div>
      </div>

      {/* 4 */}
      <div className="absolute right-6 bottom-40 hidden sm:block sm:right-10 sm:bottom-44 md:right-16 md:bottom-52">
        <div className="float-d">
          <Image
            src={FLOATING_IMAGES[3].src}
            alt={t(FLOATING_IMAGES[3].alt, lang)}
            width={210}
            height={210}
            className="h-[120px] w-[120px] md:h-[175px] md:w-[175px] object-contain drop-shadow-[0_24px_40px_rgba(0,0,0,0.25)]"
          />
        </div>
      </div>

      {/* 5 */}
      <div className={`absolute ${isAr ? "left-1/2" : "right-1/2"} top-[44%] hidden md:block`}>
        <div className="float-e">
          <Image
            src={FLOATING_IMAGES[4].src}
            alt={t(FLOATING_IMAGES[4].alt, lang)}
            width={220}
            height={220}
            className="h-[175px] w-[175px] object-contain opacity-[0.92] drop-shadow-[0_28px_50px_rgba(0,0,0,0.26)]"
          />
        </div>
      </div>

      {/* subtle accent glows */}
      <div
        className="absolute -left-24 -top-24 h-[280px] w-[280px] rounded-full blur-3xl opacity-[0.22]"
        style={{ backgroundColor: BRAND.accent }}
      />
      <div
        className="absolute -right-24 -bottom-28 h-[340px] w-[340px] rounded-full blur-3xl opacity-[0.16]"
        style={{ backgroundColor: BRAND.accentDeep }}
      />

      {/* keyframes */}
      <style jsx>{`
        .float-a {
          animation: floatY 7.8s ease-in-out infinite, driftX 12s ease-in-out infinite;
        }
        .float-b {
          animation: floatY 9.6s ease-in-out infinite, driftX 14s ease-in-out infinite;
          animation-delay: -1.2s;
        }
        .float-c {
          animation: floatY 8.9s ease-in-out infinite, driftX 16s ease-in-out infinite;
          animation-delay: -2.1s;
        }
        .float-d {
          animation: floatY 10.4s ease-in-out infinite, driftX 18s ease-in-out infinite;
          animation-delay: -0.8s;
        }
        .float-e {
          animation: floatY 11.2s ease-in-out infinite, driftX 20s ease-in-out infinite;
          animation-delay: -1.6s;
        }

        @keyframes floatY {
          0% {
            transform: translateY(0px) rotate(-1deg);
          }
          50% {
            transform: translateY(-18px) rotate(1deg);
          }
          100% {
            transform: translateY(0px) rotate(-1deg);
          }
        }
        @keyframes driftX {
          0% {
            margin-left: 0px;
          }
          50% {
            margin-left: 14px;
          }
          100% {
            margin-left: 0px;
          }
        }
      `}</style>
    </div>
  );
}

export function HeroSection({ config, lang }: HeroSectionProps) {
  const isAr = lang === "ar";

  const handleMenuClick = () => {
    const menuSection = document.getElementById("menu");
    if (menuSection) menuSection.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="hero" className="relative w-full overflow-hidden">
      <div className="relative w-full pt-[76px] md:pt-0">
        {/* ===================== MOBILE ===================== */}
        <div className="relative md:hidden h-[calc(100svh-76px)] min-h-[520px] w-full">
          {/* ✅ Background SVG (instead of video) */}
          <div className="absolute inset-0">
            <Image
              src="/bg.svg"
              alt="Background"
              fill
              priority
              className="object-cover"
            />
          </div>

          {/* ✅ Dark / premium overlay on SVG */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(11,15,20,0.18), rgba(11,15,20,0.42)), radial-gradient(900px 520px at 20% 18%, rgba(192,138,75,0.18), transparent 60%)",
            }}
          />

          {/* ✅ Strong bottom gradient for CTA */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[56%]"
            style={{
              background:
                "linear-gradient(to top, rgba(11,15,20,0.86), rgba(11,15,20,0.45), transparent)",
            }}
          />

          {/* ✅ Floating products فوق bg.svg */}
          <FloatingImages lang={lang} />

          {/* ✅ Mobile CTA */}
          <div className="absolute inset-x-0 bottom-5 flex justify-center px-4 pb-[env(safe-area-inset-bottom)]">
            <button
              type="button"
              onClick={handleMenuClick}
              className="group relative inline-flex w-full max-w-[420px] items-center justify-center gap-2 rounded-full px-6 py-3 text-[15px] font-extrabold active:scale-[0.98]"
              style={{
                backgroundColor: BRAND.accent,
                color: BRAND.ink,
                boxShadow: "0 18px 44px rgba(0,0,0,0.28)",
              }}
            >
              <span
                className="pointer-events-none absolute -inset-1 rounded-full blur-md opacity-40 transition-opacity duration-200 group-hover:opacity-55"
                style={{ backgroundColor: BRAND.accentDeep }}
              />
              <span className="pointer-events-none absolute inset-0 rounded-full bg-[linear-gradient(120deg,rgba(255,255,255,0.40),transparent_40%,transparent_60%,rgba(255,255,255,0.16))] opacity-80" />

              <span className="relative">{isAr ? "عرض المنتجات" : "View Collection"}</span>

              <span
                className={
                  "relative inline-flex h-8 w-8 items-center justify-center rounded-full ring-1 " +
                  "transition-transform duration-200 " +
                  (isAr ? "group-hover:-translate-x-0.5" : "group-hover:translate-x-0.5")
                }
                style={{
                  backgroundColor: "rgba(11,15,20,0.14)",
                  borderColor: "rgba(11,15,20,0.24)",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={isAr ? "rotate-180" : ""}
                >
                  <path
                    d="M9 18L15 12L9 6"
                    stroke={BRAND.ink}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>

              <span
                className="pointer-events-none absolute inset-0 rounded-full animate-[pulse_2.8s_ease-in-out_infinite] opacity-[0.10]"
                style={{ backgroundColor: BRAND.paper }}
              />
            </button>
          </div>
        </div>

        {/* ===================== DESKTOP ===================== */}
        <div className="relative hidden md:block h-[70vh] lg:h-[88vh] min-h-[680px] w-full">
          {/* ✅ Background SVG */}
          <div className="absolute inset-0">
            <Image
              src="/bg.svg"
              alt="Background"
              fill
              priority
              className="object-cover"
            />
          </div>

          {/* ✅ Premium overlay */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(11,15,20,0.12), rgba(11,15,20,0.32)), radial-gradient(1100px 600px at 18% 20%, rgba(192,138,75,0.16), transparent 62%)",
            }}
          />

          {/* ✅ Floating products فوق bg.svg */}
          <FloatingImages lang={lang} />

          {/* ✅ Desktop CTA */}
          <div className="absolute bottom-7 right-7">
            <button
              type="button"
              onClick={handleMenuClick}
              className="group relative inline-flex items-center gap-3 rounded-full border px-5 py-3 text-sm font-extrabold backdrop-blur-md transition-transform duration-200 hover:scale-[1.01] active:scale-[0.98]"
              style={{
                borderColor: "rgba(247,245,242,0.22)",
                backgroundColor: "rgba(11,15,20,0.28)",
                color: BRAND.paper,
                boxShadow: "0 22px 55px rgba(0,0,0,0.28)",
              }}
            >
              <span className="relative">{isAr ? "عرض المنتجات" : "View Collection"}</span>

              <span
                className="relative inline-flex h-9 w-9 items-center justify-center rounded-full"
                style={{
                  backgroundColor: BRAND.accent,
                  boxShadow: "0 14px 30px rgba(0,0,0,0.22)",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={
                    "transition-transform duration-200 " +
                    (isAr ? "rotate-180 group-hover:-translate-x-0.5" : "group-hover:translate-x-0.5")
                  }
                >
                  <path
                    d="M9 18L15 12L9 6"
                    stroke={BRAND.ink}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>

              <span
                className="pointer-events-none absolute -inset-1 rounded-full opacity-0 blur-xl transition-opacity duration-200 group-hover:opacity-[0.20]"
                style={{ backgroundColor: BRAND.accentDeep }}
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
