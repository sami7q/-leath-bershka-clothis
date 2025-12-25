// components/sections/QrSection.tsx
"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { SiteConfig, Lang, LocalizedText } from "../../lib/siteConfig";

function t(text: LocalizedText, lang: Lang) {
  return lang === "ar" ? text.ar : text.en;
}

interface QrSectionProps {
  config: SiteConfig;
  lang: Lang;
}

const BRAND = {
  red: "#E31B23",
  redDeep: "#B80F16",
  ink: "#0B0F14",
  paper: "#F7F7F8",
};

type ProductImage = {
  src: string;
  name: LocalizedText;
  description: LocalizedText;
  price: number;
  oldPrice?: number;
  badge?: LocalizedText;
};

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

/**
 * Floating layer (DISPLAY ONLY)
 * - Fixed images: /sho1.png .. /sho5.png
 * - Mobile improved: starts lower, better spacing, safer around header
 */
function FloatingProducts({
  lang,
  isAr,
  parallaxY,
  opacity,
}: {
  lang: Lang;
  isAr: boolean;
  parallaxY: number;
  opacity: number;
}) {
  const images: ProductImage[] = useMemo(
    () => [
      {
        src: "/sho.png",
        name: { en: "Shoe 1", ar: "حذاء 1" },
        description: { en: "", ar: "" },
        price: 0,
      },
      {
        src: "/sho2.png",
        name: { en: "Shoe 2", ar: "حذاء 2" },
        description: { en: "", ar: "" },
        price: 0,
      },
      {
        src: "/sho3.png",
        name: { en: "Shoe 3", ar: "حذاء 3" },
        description: { en: "", ar: "" },
        price: 0,
      },
      {
        src: "/sho4.png",
        name: { en: "Shoe 4", ar: "حذاء 4" },
        description: { en: "", ar: "" },
        price: 0,
      },
      {
        src: "/sho5.png",
        name: { en: "Shoe 5", ar: "حذاء 5" },
        description: { en: "", ar: "" },
        price: 0,
      },
    ],
    []
  );

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{
        transform: `translate3d(0, ${parallaxY}px, 0)`,
        willChange: "transform, opacity",
        opacity,
      }}
      aria-hidden="true"
    >
      {/* Top-left */}
      <div className="fp-top-left absolute">
        <div className="float-a relative">
          <div className="relative h-[104px] w-[104px] sm:h-[132px] sm:w-[132px] md:h-[170px] md:w-[170px]">
            <Image
              src={images[0].src}
              alt={t(images[0].name, lang)}
              fill
              className="object-contain drop-shadow-[0_26px_44px_rgba(0,0,0,0.32)]"
              sizes="(min-width: 768px) 170px, 132px"
              unoptimized
              priority
            />
          </div>
        </div>
      </div>

      {/* Top-right */}
      <div className="fp-top-right absolute">
        <div className="float-b relative">
          <div className="relative h-[100px] w-[100px] sm:h-[132px] sm:w-[132px] md:h-[180px] md:w-[180px]">
            <Image
              src={images[1].src}
              alt={t(images[1].name, lang)}
              fill
              className="object-contain drop-shadow-[0_26px_44px_rgba(0,0,0,0.32)]"
              sizes="(min-width: 768px) 180px, 132px"
              unoptimized
              priority
            />
          </div>
        </div>
      </div>

      {/* Bottom-left */}
      <div className="fp-bottom-left absolute">
        <div className="float-c relative">
          <div className="relative h-[118px] w-[118px] sm:h-[148px] sm:w-[148px] md:h-[190px] md:w-[190px]">
            <Image
              src={images[2].src}
              alt={t(images[2].name, lang)}
              fill
              className="object-contain drop-shadow-[0_30px_54px_rgba(0,0,0,0.34)]"
              sizes="(min-width: 768px) 190px, 148px"
              unoptimized
              priority
            />
          </div>
        </div>
      </div>

      {/* Bottom-right */}
      <div className="fp-bottom-right absolute hidden sm:block">
        <div className="float-d relative">
          <div className="relative h-[126px] w-[126px] sm:h-[156px] sm:w-[156px] md:h-[205px] md:w-[205px]">
            <Image
              src={images[3].src}
              alt={t(images[3].name, lang)}
              fill
              className="object-contain drop-shadow-[0_32px_60px_rgba(0,0,0,0.36)]"
              sizes="(min-width: 768px) 205px, 156px"
              unoptimized
              priority
            />
          </div>
        </div>
      </div>

      {/* Center */}
      <div
        className={
          "fp-center absolute hidden md:block " +
          (isAr ? "left-1/2" : "right-1/2")
        }
        style={{ transform: isAr ? "translateX(-30%)" : "translateX(30%)" }}
      >
        <div className="float-e relative">
          <div className="relative h-[230px] w-[230px]">
            <Image
              src={images[4].src}
              alt={t(images[4].name, lang)}
              fill
              className="object-contain opacity-[0.94] drop-shadow-[0_36px_72px_rgba(0,0,0,0.40)]"
              sizes="230px"
              unoptimized
              priority
            />
          </div>
        </div>
      </div>

      {/* Brand glows */}
      <div
        className="absolute -left-32 -top-28 h-[320px] w-[320px] rounded-full blur-3xl opacity-[0.22]"
        style={{ backgroundColor: BRAND.red }}
      />
      <div
        className="absolute -right-28 -bottom-32 h-[380px] w-[380px] rounded-full blur-3xl opacity-[0.18]"
        style={{ backgroundColor: BRAND.redDeep }}
      />

      {/* vignette */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.42]"
        style={{
          background:
            "radial-gradient(900px 520px at 50% 38%, transparent 0%, transparent 54%, rgba(0,0,0,0.62) 100%)",
        }}
      />

      <style jsx>{`
        /* MOBILE (improved): start lower + center-friendly spacing */
        .fp-top-left {
          left: 12px;
          top: calc(240px + env(safe-area-inset-top));
        }
        .fp-top-right {
          right: 12px;
          top: calc(262px + env(safe-area-inset-top));
        }

        .fp-bottom-left {
          left: 14px;
          bottom: 132px;
        }

        .fp-bottom-right {
          right: 14px;
          bottom: 164px;
        }

        /* sm */
        @media (min-width: 640px) {
          .fp-top-left {
            left: 32px;
            top: 170px;
          }
          .fp-top-right {
            right: 40px;
            top: 184px;
          }
          .fp-bottom-left {
            left: 40px;
            bottom: 120px;
          }
          .fp-bottom-right {
            right: 40px;
            bottom: 144px;
          }
        }

        /* md */
        @media (min-width: 768px) {
          .fp-top-left {
            left: 48px;
            top: 72px;
          }
          .fp-top-right {
            right: 56px;
            top: 76px;
          }
          .fp-bottom-left {
            left: 64px;
            bottom: 96px;
          }
          .fp-bottom-right {
            right: 64px;
            bottom: 112px;
          }
          .fp-center {
            top: 44%;
          }
        }

        .float-a {
          animation: floatY 8.2s ease-in-out infinite,
            driftX 13s ease-in-out infinite;
        }
        .float-b {
          animation: floatY 10.4s ease-in-out infinite,
            driftX 16s ease-in-out infinite;
          animation-delay: -1.1s;
        }
        .float-c {
          animation: floatY 9.2s ease-in-out infinite,
            driftX 18s ease-in-out infinite;
          animation-delay: -2s;
        }
        .float-d {
          animation: floatY 11.2s ease-in-out infinite,
            driftX 20s ease-in-out infinite;
          animation-delay: -0.9s;
        }
        .float-e {
          animation: floatY 12.4s ease-in-out infinite,
            driftX 22s ease-in-out infinite;
          animation-delay: -1.6s;
        }

        @keyframes floatY {
          0% {
            transform: translateY(0px) rotate(-0.8deg);
          }
          50% {
            transform: translateY(-18px) rotate(0.8deg);
          }
          100% {
            transform: translateY(0px) rotate(-0.8deg);
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

export function QrSection({ config, lang }: QrSectionProps) {
  const isAr = lang === "ar";
  const sectionRef = useRef<HTMLElement | null>(null);

  const [parallaxY, setParallaxY] = useState(0);
  const [layerOpacity, setLayerOpacity] = useState(1);

  useEffect(() => {
    let raf = 0;

    const calc = () => {
      const el = sectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;

      const start = vh * 0.92;
      const end = -vh * 0.55;
      const p = clamp((start - rect.top) / (start - end), 0, 1);

      const maxUp = window.innerWidth >= 768 ? 320 : 240;
      setParallaxY(-p * maxUp);

      const fade = clamp(1 - Math.abs(p - 0.55) * 0.9, 0.35, 1);
      setLayerOpacity(fade);
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(calc);
    };

    calc();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      ref={(node) => {
        sectionRef.current = node;
      }}
      id="qr"
      className="relative w-full overflow-hidden"
    >
      <div className="relative w-full pt-[76px] md:pt-0">
        {/* MOBILE */}
        <div className="relative md:hidden h-[calc(100svh-76px)] min-h-[580px] w-full">
          {/* ✅ Background => bg2 */}
          <div className="absolute inset-0">
            <Image
              src="/bg2.svg"
              alt="Background"
              fill
              priority
              className="object-cover object-[50%_35%]"
            />
          </div>

          {/* ✅ Overlay */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(11,15,20,0.08), rgba(11,15,20,0.52), rgba(11,15,20,0.90)), radial-gradient(900px 520px at 18% 18%, rgba(227,27,35,0.16), transparent 60%)",
            }}
          />

          {/* Floating shoes */}
          <FloatingProducts
            lang={lang}
            isAr={isAr}
            parallaxY={parallaxY}
            opacity={layerOpacity}
          />

          {/* CLEAN text (small) */}
          <div className="absolute inset-x-0 bottom-0 px-4 pb-[max(16px,env(safe-area-inset-bottom))]">
            <div className={"mx-auto max-w-[520px] " + (isAr ? "text-right" : "text-left")}>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.28em] text-white/55">
                {lang === "en" ? "GALLERY" : "الصور"}
              </p>
              <h2 className="mt-1 text-[22px] font-extrabold leading-tight text-white">
                {t(config.qrSection.title, lang)}
              </h2>
              <p className="mt-1.5 text-[13px] text-white/70 line-clamp-2">
                {t(config.qrSection.text, lang)}
              </p>
              <p className="mt-2 text-[11px] font-bold text-white/55">
                {t(config.qrSection.note, lang)}
              </p>
            </div>
          </div>
        </div>

        {/* DESKTOP */}
        <div className="relative hidden md:block h-[70vh] lg:h-[88vh] min-h-[680px] w-full">
          <div className="absolute inset-0">
            <Image src="/bg2.svg" alt="Background" fill priority className="object-cover" />
          </div>

          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(11,15,20,0.18), rgba(11,15,20,0.46)), radial-gradient(1100px 600px at 18% 20%, rgba(227,27,35,0.14), transparent 62%)",
            }}
          />

          <FloatingProducts
            lang={lang}
            isAr={isAr}
            parallaxY={parallaxY}
            opacity={layerOpacity}
          />

          <div className={"absolute left-7 top-7 " + (isAr ? "text-right" : "text-left")}>
            <p className="mb-2 text-[10px] font-extrabold uppercase tracking-[0.28em] text-white/60">
              {lang === "en" ? "GALLERY" : "الصور"}
            </p>
            <h2 className="text-[24px] font-extrabold text-white">
              {t(config.qrSection.title, lang)}
            </h2>
            <p className="mt-2 max-w-[560px] text-[13px] text-white/70 line-clamp-2">
              {t(config.qrSection.text, lang)}
            </p>
          </div>

          <div className="absolute bottom-7 left-7 text-[11px] font-bold text-white/55">
            {t(config.qrSection.note, lang)}
          </div>
        </div>
      </div>
    </section>
  );
}
