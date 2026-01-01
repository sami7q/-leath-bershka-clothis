// components/sections/HeroSection.tsx
"use client";

import Image from "next/image";
import { SiteConfig, Lang, LocalizedText } from "../../lib/siteConfig";

function t(text: LocalizedText, lang: Lang) {
  return lang === "ar" ? text.ar : text.en;
}

interface HeroSectionProps {
  config: SiteConfig;
  lang: Lang;
}

const BRAND = {
  red: "#E31B23",
  redDeep: "#B80F16",
  ink: "#0B0F14",
  paper: "#F7F7F8",
};

export function HeroSection({ config, lang }: HeroSectionProps) {
  const isAr = lang === "ar";

  const handleMenuClick = () => {
    const menuSection = document.getElementById("menu");
    if (menuSection)
      menuSection.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="hero" className="relative w-full overflow-hidden">
      <div className="relative w-full pt-[76px] md:pt-0">
        {/* ===================== MOBILE (CLEAN) ===================== */}
        <div className="relative md:hidden h-[calc(100svh-76px)] min-h-[560px] w-full">
          {/* Background */}
          <div className="absolute inset-0">
            <Image
              src="/bgs1.svg"
              alt="Banner"
              fill
              priority
              className="object-cover object-[50%_35%]"
            />
          </div>

          {/* Overlay */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(11,15,20,0.06), rgba(11,15,20,0.52), rgba(11,15,20,0.88)), radial-gradient(900px 520px at 18% 18%, rgba(227,27,35,0.18), transparent 60%)",
            }}
          />

          {/* Vignette */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.42]"
            style={{
              background:
                "radial-gradient(900px 520px at 50% 36%, transparent 0%, transparent 54%, rgba(0,0,0,0.62) 100%)",
            }}
          />

          {/* Small title only */}
          <div className="absolute inset-x-0 top-0 px-4 pt-6">
            <div className={"mx-auto max-w-[520px] " + (isAr ? "text-right" : "text-left")}>
              <h1 className="text-[26px] font-extrabold leading-[1.12] text-white">
                {isAr ? "تشكيلة فاخرة" : "Premium Collection"}
              </h1>
              <p className="mt-1 text-[13px] text-white/70">
                {isAr ? "ستايل أنيق بجودة عالية" : "Bold style. High quality."}
              </p>
            </div>
          </div>

          {/* CTA only (clean) */}
          <div className="absolute inset-x-0 bottom-0 px-4 pb-[max(16px,env(safe-area-inset-bottom))]">
            <div className="mx-auto max-w-[520px]">
              <button
                type="button"
                onClick={handleMenuClick}
                className="group relative inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-extrabold text-white active:scale-[0.98]"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(227,27,35,1), rgba(184,15,22,1))",
                  boxShadow: "0 22px 60px rgba(0,0,0,0.36)",
                }}
              >
                <span
                  className="pointer-events-none absolute -inset-1 rounded-full blur-md opacity-40 transition-opacity duration-200 group-hover:opacity-55"
                  style={{ backgroundColor: BRAND.redDeep }}
                />
                <span className="pointer-events-none absolute inset-0 rounded-full bg-[linear-gradient(120deg,rgba(255,255,255,0.34),transparent_42%,transparent_58%,rgba(255,255,255,0.14))] opacity-85" />

                <span className="relative">
                  {isAr ? "عرض المنتجات" : "View Collection"}
                </span>

                <span
                  className={
                    "relative inline-flex h-9 w-9 items-center justify-center rounded-full ring-1 ring-white/25 " +
                    "transition-transform duration-200 " +
                    (isAr ? "group-hover:-translate-x-0.5" : "group-hover:translate-x-0.5")
                  }
                  style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
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
                      stroke="white"
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
        </div>

        {/* ===================== DESKTOP (UNCHANGED) ===================== */}
        <div className="relative hidden md:block h-[70vh] lg:h-[88vh] min-h-[680px] w-full">
          <div className="absolute inset-0">
            <Image src="/bgs1.svg" alt="Banner" fill priority className="object-cover" />
          </div>

          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(11,15,20,0.18), rgba(11,15,20,0.48)), radial-gradient(1100px 600px at 18% 20%, rgba(227,27,35,0.14), transparent 62%)",
            }}
          />

          <div
            className="pointer-events-none absolute inset-0 opacity-[0.40]"
            style={{
              background:
                "radial-gradient(1100px 620px at 50% 38%, transparent 0%, transparent 55%, rgba(0,0,0,0.58) 100%)",
            }}
          />

          <div className="absolute bottom-7 right-7">
            <button
              type="button"
              onClick={handleMenuClick}
              className="group relative inline-flex items-center gap-3 rounded-full border px-5 py-3 text-sm font-extrabold backdrop-blur-md transition-transform duration-200 hover:scale-[1.01] active:scale-[0.98]"
              style={{
                borderColor: "rgba(255,255,255,0.16)",
                backgroundColor: "rgba(11,15,20,0.35)",
                color: BRAND.paper,
                boxShadow: "0 24px 60px rgba(0,0,0,0.32)",
              }}
            >
              <span className="relative">{isAr ? "عرض المنتجات" : "View Collection"}</span>

              <span
                className="relative inline-flex h-9 w-9 items-center justify-center rounded-full"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(227,27,35,1), rgba(184,15,22,1))",
                  boxShadow: "0 14px 30px rgba(0,0,0,0.26)",
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
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>

              <span
                className="pointer-events-none absolute -inset-1 rounded-full opacity-0 blur-xl transition-opacity duration-200 group-hover:opacity-[0.20]"
                style={{ backgroundColor: BRAND.redDeep }}
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
