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

const galleryImages = [
  { src: "/gallery/1.png", alt: "Coffee cherries" },
  { src: "/gallery/2.png", alt: "Red poster" },
  { src: "/gallery/3.png", alt: "Roasting" },
  { src: "/gallery/4.png", alt: "Old photo" },
  { src: "/gallery/5.png", alt: "Cafe shot" },
  { src: "/gallery/6.png", alt: "Beans closeup" },
];

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={"h-5 w-5 " + (dir === "left" ? "" : "rotate-180")}
    >
      <path
        d="M15 18L9 12l6-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function QrSection({ config, lang }: QrSectionProps) {
  const isAr = lang === "ar";

  // ✅ desktop auto-loop uses duplicated items
  const rowA = useMemo(() => [...galleryImages, ...galleryImages], []);
  const rowB = useMemo(
    () => [...galleryImages.slice().reverse(), ...galleryImages.slice().reverse()],
    []
  );

  const scrollerRef = useRef<HTMLDivElement | null>(null);

  // lightbox
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const openLightbox = (idx: number) => {
    setActiveIndex(idx);
    setOpen(true);
  };

  const closeLightbox = () => setOpen(false);

  const next = () =>
    setActiveIndex((i) => (i + 1) % galleryImages.length);
  const prev = () =>
    setActiveIndex((i) => (i - 1 + galleryImages.length) % galleryImages.length);

  // keyboard for lightbox
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // ✅ helper: scroll snap for mobile buttons (optional nice)
  const scrollByCard = (dir: "prev" | "next") => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const step = (card?.offsetWidth ?? 280) + 14;
    el.scrollBy({ left: dir === "next" ? step : -step, behavior: "smooth" });
  };

  return (
    <section
      id="qr"
      className="relative w-full overflow-hidden bg-gradient-to-b from-slate-50 via-slate-50 to-slate-100/60 py-10 md:py-14"
    >
      {/* Title */}
      <div className="mx-auto max-w-6xl px-4">
        <div className={isAr ? "text-right" : "text-left"}>
          <h2 className="mb-2 text-2xl font-extrabold text-slate-900 md:text-3xl">
            {t(config.qrSection.title, lang)}
          </h2>
          <p className="mb-6 text-sm text-slate-600 md:text-base">
            {t(config.qrSection.text, lang)}
          </p>
        </div>
      </div>

      {/* ✅ MOBILE: Snap + Drag carousel (new style) */}
      <div className="md:hidden">
        <div className="relative mx-auto max-w-6xl px-4">
          {/* edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-slate-50 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-slate-50 to-transparent" />

          {/* scroll row */}
          <div
            ref={scrollerRef}
            className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 pt-1 [scrollbar-width:none] [-ms-overflow-style:none]"
            dir="ltr"
          >
            {galleryImages.map((img, idx) => (
              <button
                key={img.src}
                type="button"
                onClick={() => openLightbox(idx)}
                className="relative shrink-0 snap-center"
                aria-label="Open image"
              >
                <div
                  data-card
                  className="relative h-[260px] w-[82vw] max-w-[360px] overflow-hidden rounded-[28px] border border-white/70 bg-slate-200 shadow-xl ring-1 ring-slate-100"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="82vw"
                    // ✅ faster: first 2 are priority, rest lazy
                    priority={idx < 2}
                    loading={idx < 2 ? "eager" : "lazy"}
                    quality={75}
                    className="object-cover transition-transform duration-500 active:scale-[0.99]"
                    unoptimized
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/18 via-black/6 to-transparent" />

                  {/* tiny hint */}
                  <div className="pointer-events-none absolute bottom-3 left-3 rounded-full bg-white/10 px-3 py-2 text-[11px] font-extrabold text-white backdrop-blur-md">
                    {lang === "ar" ? "اضغط للتكبير" : "Tap to zoom"}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* tiny controls */}
          <div className="mt-3 flex items-center justify-between">
            <p className={"text-[11px] text-slate-500 " + (isAr ? "text-right" : "text-left")}>
              {t(config.qrSection.note, lang)}
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollByCard("prev")}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-800 shadow-sm active:scale-[0.98]"
                aria-label="Previous"
              >
                <Chevron dir="left" />
              </button>
              <button
                type="button"
                onClick={() => scrollByCard("next")}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-800 shadow-sm active:scale-[0.98]"
                aria-label="Next"
              >
                <Chevron dir="right" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ DESKTOP: premium auto-moving gallery (your idea, upgraded) */}
      <div className="relative hidden md:block">
        {/* soft fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-slate-50 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-slate-50 to-transparent" />

        {/* Row 1 */}
        <div className="group overflow-hidden py-2" dir="ltr">
          <div className="marquee-ltr flex w-max gap-4 px-6 will-change-transform motion-reduce:animate-none">
            {rowA.map((img, idx) => (
              <button
                key={`a-${idx}-${img.src}`}
                type="button"
                onClick={() => openLightbox(idx % galleryImages.length)}
                className="relative"
                aria-label="Open image"
              >
                <div className="relative h-72 w-[380px] shrink-0 overflow-hidden rounded-[32px] border border-white/70 bg-slate-200 shadow-xl ring-1 ring-slate-100">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="380px"
                    loading="lazy"
                    quality={75}
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    unoptimized
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/20 via-black/6 to-transparent" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Row 2 */}
        <div className="group overflow-hidden py-2" dir="ltr">
          <div className="marquee-rtl-slow flex w-max gap-4 px-6 will-change-transform motion-reduce:animate-none">
            {rowB.map((img, idx) => (
              <button
                key={`b-${idx}-${img.src}`}
                type="button"
                onClick={() => openLightbox((galleryImages.length - 1 - (idx % galleryImages.length)))}
                className="relative"
                aria-label="Open image"
              >
                <div className="relative h-64 w-[340px] shrink-0 overflow-hidden rounded-[32px] border border-white/70 bg-slate-200 shadow-lg ring-1 ring-slate-100">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="340px"
                    loading="lazy"
                    quality={75}
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    unoptimized
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/18 via-black/6 to-transparent" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* note */}
        <div className="mx-auto mt-4 max-w-6xl px-6">
          <p className={"text-xs text-slate-500 " + (isAr ? "text-right" : "text-left")}>
            {t(config.qrSection.note, lang)}
          </p>
        </div>
      </div>

      {/* ✅ Lightbox */}
      {open && (
        <div
          className="fixed inset-0 z-[80] bg-black/75 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          onClick={closeLightbox}
        >
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div
              className="relative w-full max-w-3xl overflow-hidden rounded-3xl bg-black shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src={galleryImages[activeIndex].src}
                  alt={galleryImages[activeIndex].alt}
                  fill
                  sizes="(min-width: 1024px) 900px, 92vw"
                  quality={85}
                  className="object-contain"
                  unoptimized
                />
              </div>

              {/* controls */}
              <div className="flex items-center justify-between gap-2 border-t border-white/10 bg-black/60 px-3 py-3 text-white">
                <button
                  type="button"
                  onClick={prev}
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-extrabold hover:bg-white/15 active:scale-[0.98]"
                >
                  <Chevron dir="left" />
                  {lang === "ar" ? "السابق" : "Prev"}
                </button>

                <button
                  type="button"
                  onClick={closeLightbox}
                  className="rounded-full bg-white/10 px-4 py-2 text-sm font-extrabold hover:bg-white/15 active:scale-[0.98]"
                >
                  {lang === "ar" ? "إغلاق" : "Close"}
                </button>

                <button
                  type="button"
                  onClick={next}
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-extrabold hover:bg-white/15 active:scale-[0.98]"
                >
                  {lang === "ar" ? "التالي" : "Next"}
                  <Chevron dir="right" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ✅ keyframes for desktop marquee */}
      <style jsx global>{`
        .marquee-ltr {
          animation: marquee-ltr 22s linear infinite;
        }
        .marquee-rtl-slow {
          animation: marquee-rtl 30s linear infinite;
        }
        .group:hover .marquee-ltr,
        .group:hover .marquee-rtl-slow {
          animation-play-state: paused;
        }
        @keyframes marquee-ltr {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes marquee-rtl {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
        /* hide scrollbar */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
