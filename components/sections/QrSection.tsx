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
};

type ProductImage = {
  src: string;
  name: LocalizedText;
  badge?: LocalizedText;
  depth: number; // parallax depth for drift
  size: { w: string; h: string };
  cls: string; // position class
  floatCls: string; // animation class
  priority?: boolean;
};

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

/**
 * Floating layer (DISPLAY ONLY)
 * ✅ No nested styled-jsx (single <style jsx> only)
 * ✅ Premium on mobile:
 * - Center hero + orbit rings
 * - Sparkles + mesh glow
 * - Drift reacts to finger/mouse movement (subtle)
 * - Better positions (avoids bottom text)
 */
function FloatingProducts({
  lang,
  isAr,
  parallaxY,
  opacity,
  driftX,
  driftY,
}: {
  lang: Lang;
  isAr: boolean;
  parallaxY: number;
  opacity: number;
  driftX: number;
  driftY: number;
}) {
  const images: ProductImage[] = useMemo(
    () => [
      {
        src: "/sho.png",
        name: { en: "Shoe 1", ar: "حذاء 1" },
        badge: { en: "NEW", ar: "جديد" },
        depth: 0.75,
        size: { w: "clamp(82px, 22vw, 150px)", h: "clamp(82px, 22vw, 150px)" },
        cls: "fp-i1",
        floatCls: "float-a",
        priority: true,
      },
      {
        src: "/sho2.png",
        name: { en: "Shoe 2", ar: "حذاء 2" },
        badge: { en: "LIMITED", ar: "محدود" },
        depth: 0.85,
        size: { w: "clamp(78px, 21vw, 160px)", h: "clamp(78px, 21vw, 160px)" },
        cls: "fp-i2",
        floatCls: "float-b",
        priority: true,
      },
      {
        src: "/sho3.png",
        name: { en: "Shoe 3", ar: "حذاء 3" },
        badge: { en: "TREND", ar: "ترند" },
        depth: 0.95,
        size: { w: "clamp(88px, 24vw, 175px)", h: "clamp(88px, 24vw, 175px)" },
        cls: "fp-i3",
        floatCls: "float-c",
      },
      {
        src: "/sho4.png",
        name: { en: "Shoe 4", ar: "حذاء 4" },
        badge: { en: "HOT", ar: "مميز" },
        depth: 0.9,
        size: { w: "clamp(74px, 20vw, 165px)", h: "clamp(74px, 20vw, 165px)" },
        cls: "fp-i4",
        floatCls: "float-d",
      },
      {
        src: "/sho5.png",
        name: { en: "Shoe 5", ar: "حذاء 5" },
        badge: { en: "FEATURED", ar: "الأفضل" },
        depth: 1.15,
        size: { w: "clamp(168px, 46vw, 290px)", h: "clamp(168px, 46vw, 290px)" },
        cls: "fp-i5",
        floatCls: "float-e",
        priority: true,
      },
    ],
    []
  );

  // ✅ we avoid nested <style jsx> by using inline style for the center shift
  const centerShiftTransform = isAr
    ? "translate(-50%, -50%) translateX(-16%)"
    : "translate(-50%, -50%) translateX(16%)";

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      data-dir={isAr ? "rtl" : "ltr"}
      style={{
        transform: `translate3d(0, ${parallaxY}px, 0)`,
        willChange: "transform, opacity",
        opacity,
      }}
      aria-hidden="true"
    >
      {/* mesh glow (behind) */}
      <div className="fp-mesh absolute inset-0" />

      {/* Items */}
      {images.map((img) => {
        const dx = driftX * img.depth;
        const dy = driftY * img.depth;

        return (
          <div
            key={img.src}
            className={"fp-item absolute " + img.cls}
            style={img.cls === "fp-i5" ? { transform: centerShiftTransform } : undefined}
          >
            <div
              className={img.floatCls + " relative"}
              style={{
                transform: `translate3d(${dx}px, ${dy}px, 0)`,
                willChange: "transform",
              }}
            >
              <div
                className="fp-card relative"
                style={{
                  width: img.size.w,
                  height: img.size.h,
                }}
              >
                {/* glass halo */}
                <div className="fp-halo absolute inset-0 rounded-full" />

                {/* orbit rings only for center hero */}
                {img.cls === "fp-i5" && (
                  <div className="fp-orbit pointer-events-none absolute inset-[-18px]">
                    <div className="fp-ring fp-ring1" />
                    <div className="fp-ring fp-ring2" />
                  </div>
                )}

                <Image
                  src={img.src}
                  alt={t(img.name, lang)}
                  fill
                  className="object-contain drop-shadow-[0_26px_44px_rgba(0,0,0,0.34)]"
                  sizes={
                    img.cls === "fp-i5"
                      ? "(min-width: 768px) 290px, 46vw"
                      : "(min-width: 768px) 175px, 24vw"
                  }
                  unoptimized
                  priority={!!img.priority}
                />

                {/* shine sweep */}
                <div className="fp-shine absolute inset-0 rounded-full" />
              </div>

              {/* badge pill */}
              {img.badge && (
                <div className="fp-badgeWrap absolute -bottom-3 left-1/2 -translate-x-1/2">
                  <div className="fp-badge inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-extrabold tracking-[0.18em] uppercase">
                    {t(img.badge, lang)}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* brand glows */}
      <div
        className="absolute -left-36 -top-28 h-[360px] w-[360px] rounded-full blur-3xl opacity-[0.20]"
        style={{ backgroundColor: BRAND.red }}
      />
      <div
        className="absolute -right-32 -bottom-36 h-[420px] w-[420px] rounded-full blur-3xl opacity-[0.16]"
        style={{ backgroundColor: BRAND.redDeep }}
      />

      {/* sparkles */}
      <div className="fp-spark fp-s1" />
      <div className="fp-spark fp-s2" />
      <div className="fp-spark fp-s3" />
      <div className="fp-spark fp-s4" />
      <div className="fp-spark fp-s5" />

      {/* vignette (top layer) */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.44]"
        style={{
          background:
            "radial-gradient(980px 560px at 50% 38%, transparent 0%, transparent 54%, rgba(0,0,0,0.64) 100%)",
        }}
      />

      <style jsx>{`
        /* ===== Positions (XS mobile first) ===== */
        .fp-i1 {
          top: 18px;
          left: 12px;
        }
        .fp-i2 {
          top: 34px;
          right: 12px;
        }
        /* keep them above the bottom text block */
        .fp-i3 {
          left: 6px;
          bottom: 220px;
        }
        .fp-i4 {
          right: 8px;
          bottom: 236px;
        }
        /* center hero */
        .fp-i5 {
          top: 44%;
          left: 50%;
        }

        /* RTL mirroring */
        [data-dir="rtl"] .fp-i1 {
          left: auto;
          right: 12px;
        }
        [data-dir="rtl"] .fp-i2 {
          right: auto;
          left: 12px;
        }
        [data-dir="rtl"] .fp-i3 {
          left: auto;
          right: 6px;
        }
        [data-dir="rtl"] .fp-i4 {
          right: auto;
          left: 8px;
        }
        [data-dir="rtl"] .fp-i5 {
          left: 50%;
          right: auto;
        }

        /* sm */
        @media (min-width: 640px) {
          .fp-i1 {
            top: 22px;
            left: 34px;
          }
          .fp-i2 {
            top: 42px;
            right: 34px;
          }
          .fp-i3 {
            left: 26px;
            bottom: 190px;
          }
          .fp-i4 {
            right: 26px;
            bottom: 210px;
          }
          .fp-i5 {
            top: 48%;
          }

          [data-dir="rtl"] .fp-i1 {
            left: auto;
            right: 34px;
          }
          [data-dir="rtl"] .fp-i2 {
            right: auto;
            left: 34px;
          }
          [data-dir="rtl"] .fp-i3 {
            left: auto;
            right: 26px;
          }
          [data-dir="rtl"] .fp-i4 {
            right: auto;
            left: 26px;
          }
        }

        /* md+ */
        @media (min-width: 768px) {
          .fp-i1 {
            top: 72px;
            left: 52px;
          }
          .fp-i2 {
            top: 76px;
            right: 58px;
          }
          .fp-i3 {
            left: 70px;
            bottom: 110px;
          }
          .fp-i4 {
            right: 74px;
            bottom: 126px;
          }
          .fp-i5 {
            top: 46%;
          }

          [data-dir="rtl"] .fp-i1 {
            left: auto;
            right: 52px;
          }
          [data-dir="rtl"] .fp-i2 {
            right: auto;
            left: 58px;
          }
          [data-dir="rtl"] .fp-i3 {
            left: auto;
            right: 70px;
          }
          [data-dir="rtl"] .fp-i4 {
            right: auto;
            left: 74px;
          }
        }

        /* ===== Premium card effects ===== */
        .fp-card {
          border-radius: 9999px;
          transform: translateZ(0);
          will-change: transform, filter, opacity;
        }

        .fp-halo {
          background: radial-gradient(
              closest-side,
              rgba(246, 246, 248, 0.12),
              rgba(246, 246, 248, 0.06),
              transparent 72%
            ),
            radial-gradient(closest-side, rgba(227, 27, 35, 0.12), transparent 70%);
        }

        .fp-shine {
          background: radial-gradient(
              140px 90px at 30% 22%,
              rgba(255, 255, 255, 0.22),
              transparent 60%
            ),
            radial-gradient(120px 80px at 68% 78%, rgba(255, 255, 255, 0.10), transparent 60%);
          opacity: 0.85;
          mix-blend-mode: screen;
          animation: shineSweep 5.8s ease-in-out infinite;
        }

        @keyframes shineSweep {
          0% {
            transform: translateX(-10px) translateY(6px);
            opacity: 0.72;
          }
          50% {
            transform: translateX(10px) translateY(-6px);
            opacity: 0.95;
          }
          100% {
            transform: translateX(-10px) translateY(6px);
            opacity: 0.72;
          }
        }

        /* ===== Orbit rings (center hero) ===== */
        .fp-orbit {
          border-radius: 9999px;
          opacity: 0.95;
          z-index: 0;
        }

        .fp-ring {
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          background: conic-gradient(
            from 180deg,
            rgba(227, 27, 35, 0),
            rgba(227, 27, 35, 0.22),
            rgba(246, 246, 248, 0.16),
            rgba(227, 27, 35, 0)
          );
          -webkit-mask: radial-gradient(transparent 62%, #000 64%);
          mask: radial-gradient(transparent 62%, #000 64%);
          filter: blur(0.2px);
        }

        .fp-ring1 {
          animation: orbitSpin 14s linear infinite;
          opacity: 0.7;
        }
        .fp-ring2 {
          inset: 10px;
          animation: orbitSpin 19s linear infinite reverse;
          opacity: 0.55;
        }

        @keyframes orbitSpin {
          to {
            transform: rotate(360deg);
          }
        }

        /* ===== Mesh background ===== */
        .fp-mesh {
          opacity: 0.22;
          background: radial-gradient(520px 320px at 18% 16%, rgba(227, 27, 35, 0.22), transparent 60%),
            radial-gradient(560px 360px at 82% 40%, rgba(179, 15, 22, 0.18), transparent 60%),
            radial-gradient(520px 360px at 48% 72%, rgba(255, 255, 255, 0.10), transparent 62%);
          animation: meshMove 9.5s ease-in-out infinite;
          will-change: transform, opacity;
        }

        @keyframes meshMove {
          0% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(10px, -10px, 0) scale(1.02);
          }
          100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
        }

        /* ===== Badge ===== */
        .fp-badge {
          background: rgba(11, 15, 20, 0.56);
          border: 1px solid rgba(246, 246, 248, 0.18);
          color: rgba(246, 246, 248, 0.86);
          backdrop-filter: blur(10px);
          box-shadow: 0 14px 34px rgba(0, 0, 0, 0.34);
        }

        /* ===== Float animations (richer) ===== */
        .float-a {
          animation: floatY 8.4s ease-in-out infinite, driftX 13.8s ease-in-out infinite, pulse 6.2s ease-in-out infinite;
        }
        .float-b {
          animation: floatY 10.2s ease-in-out infinite, driftX 16.2s ease-in-out infinite, pulse 7.1s ease-in-out infinite;
          animation-delay: -1.1s;
        }
        .float-c {
          animation: floatY 9.4s ease-in-out infinite, driftX 18.4s ease-in-out infinite, pulse 6.8s ease-in-out infinite;
          animation-delay: -2s;
        }
        .float-d {
          animation: floatY 11.1s ease-in-out infinite, driftX 20.2s ease-in-out infinite, pulse 7.4s ease-in-out infinite;
          animation-delay: -0.9s;
        }
        .float-e {
          animation: floatY 12.2s ease-in-out infinite, driftX 22.4s ease-in-out infinite, pulse 7.8s ease-in-out infinite;
          animation-delay: -1.6s;
        }

        @keyframes floatY {
          0% {
            transform: translateY(0px) rotate(-1.1deg);
          }
          50% {
            transform: translateY(-20px) rotate(1.1deg);
          }
          100% {
            transform: translateY(0px) rotate(-1.1deg);
          }
        }
        @keyframes driftX {
          0% {
            margin-left: 0px;
          }
          50% {
            margin-left: 16px;
          }
          100% {
            margin-left: 0px;
          }
        }
        @keyframes pulse {
          0% {
            filter: saturate(1) brightness(1);
          }
          50% {
            filter: saturate(1.06) brightness(1.03);
          }
          100% {
            filter: saturate(1) brightness(1);
          }
        }

        /* ===== Sparkles ===== */
        .fp-spark {
          position: absolute;
          width: 6px;
          height: 6px;
          border-radius: 9999px;
          background: rgba(246, 246, 248, 0.75);
          box-shadow: 0 0 18px rgba(246, 246, 248, 0.55);
          opacity: 0;
          animation: twinkle 3.6s ease-in-out infinite;
        }
        .fp-s1 {
          left: 18%;
          top: 22%;
          animation-delay: -0.2s;
        }
        .fp-s2 {
          left: 78%;
          top: 18%;
          animation-delay: -1.4s;
        }
        .fp-s3 {
          left: 14%;
          top: 62%;
          animation-delay: -2.1s;
        }
        .fp-s4 {
          left: 86%;
          top: 58%;
          animation-delay: -0.9s;
        }
        .fp-s5 {
          left: 52%;
          top: 28%;
          animation-delay: -2.8s;
        }

        @keyframes twinkle {
          0% {
            transform: scale(0.6);
            opacity: 0;
          }
          40% {
            transform: scale(1);
            opacity: 0.75;
          }
          70% {
            transform: scale(0.85);
            opacity: 0.25;
          }
          100% {
            transform: scale(0.6);
            opacity: 0;
          }
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .fp-mesh,
          .fp-shine,
          .fp-ring1,
          .fp-ring2,
          .float-a,
          .float-b,
          .float-c,
          .float-d,
          .float-e,
          .fp-spark {
            animation: none !important;
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

  const [drift, setDrift] = useState({ x: 0, y: 0 });
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(!!mq?.matches);
    sync();
    mq?.addEventListener?.("change", sync);
    return () => mq?.removeEventListener?.("change", sync);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;

    let raf = 0;
    const update = (clientX: number, clientY: number) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const vw = window.innerWidth || 1;
        const vh = window.innerHeight || 1;

        const nx = clamp((clientX - vw / 2) / (vw / 2), -1, 1);
        const ny = clamp((clientY - vh / 2) / (vh / 2), -1, 1);

        const amp = vw >= 768 ? 18 : 12;
        setDrift({ x: nx * amp, y: ny * amp });
      });
    };

    const onPointer = (e: PointerEvent) => update(e.clientX, e.clientY);
    const onTouch = (e: TouchEvent) => {
      if (!e.touches?.[0]) return;
      update(e.touches[0].clientX, e.touches[0].clientY);
    };

    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("touchmove", onTouch);
    };
  }, [reduceMotion]);

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

  const driftX = reduceMotion ? 0 : drift.x;
  const driftY = reduceMotion ? 0 : drift.y;

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
          <div className="absolute inset-0">
            <Image
              src="/bgs2.svg"
              alt="Background"
              fill
              priority
              className="object-cover object-[50%_35%]"
            />
          </div>

          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(11,15,20,0.10), rgba(11,15,20,0.52), rgba(11,15,20,0.90)), radial-gradient(900px 520px at 18% 18%, rgba(227,27,35,0.16), transparent 60%)",
            }}
          />

          <FloatingProducts
            lang={lang}
            isAr={isAr}
            parallaxY={parallaxY}
            opacity={layerOpacity}
            driftX={driftX}
            driftY={driftY}
          />

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
            <Image src="/bgs2.svg" alt="Background" fill priority className="object-cover" />
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
            driftX={driftX}
            driftY={driftY}
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
