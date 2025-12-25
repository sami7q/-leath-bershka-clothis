// components/sections/PromosSection.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Lang } from "../../lib/siteConfig";

interface PromosSectionProps {
  lang: Lang;
}

/**
 * ✅ Leath Bershka — Promos (Reels) Section (Red + Black)
 * - Same background vibe as Hero/Qr/Menu
 * - Mobile: snap carousel + arrows
 * - Desktop: clean grid (2 cols -> 3 cols)
 * - Auto pause out-of-view, resume in-view
 * - No hydration mismatch likes (seeded)
 */

const BRAND = {
  red: "#E31B23",
  redDeep: "#B80F16",
  ink: "#0B0F14",
  paper: "#F7F7F8",
  muted: "rgba(247,247,248,0.70)",
  border: "rgba(255,255,255,0.12)",
  card: "rgba(255,255,255,0.06)",
} as const;

function VolumeIcon({ muted }: { muted: boolean }) {
  return muted ? (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
      <path
        fill="currentColor"
        d="M11 5.5 7.6 8H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2.6L11 18.5a1 1 0 0 0 1.6-.8V6.3a1 1 0 0 0-1.6-.8ZM19.3 8.7l-1.4 1.4L16.5 8.7a1 1 0 1 0-1.4 1.4l1.4 1.4-1.4 1.4a1 1 0 1 0 1.4 1.4l1.4-1.4 1.4 1.4a1 1 0 0 0 1.4-1.4l-1.4-1.4 1.4-1.4a1 1 0 0 0-1.4-1.4Z"
      />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
      <path
        fill="currentColor"
        d="M11 5.5 7.6 8H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2.6L11 18.5a1 1 0 0 0 1.6-.8V6.3a1 1 0 0 0-1.6-.8Zm6.2 1.9a1 1 0 0 0-1.4 1.4A5 5 0 0 1 17 12a5 5 0 0 1-1.2 3.2 1 1 0 1 0 1.4 1.4A7 7 0 0 0 19 12a7 7 0 0 0-1.8-4.6Zm2.4-2.4a1 1 0 0 0-1.4 1.4A9 9 0 0 1 21 12a9 9 0 0 1-2.8 6.6 1 1 0 1 0 1.4 1.4A11 11 0 0 0 23 12a11 11 0 0 0-3.4-7Z"
      />
    </svg>
  );
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
      <path
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        d="M12 21s-7-4.4-9.4-8.7C.3 8.6 2.2 5.6 5.5 5.1c1.9-.3 3.7.6 4.7 2 1-1.4 2.8-2.3 4.7-2 3.3.5 5.2 3.5 2.9 7.2C19 16.6 12 21 12 21Z"
      />
    </svg>
  );
}

function PlayPauseIcon({ playing }: { playing: boolean }) {
  return playing ? (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
      <path fill="currentColor" d="M7 6h4v12H7V6Zm6 0h4v12h-4V6Z" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
      <path fill="currentColor" d="M8 5v14l12-7L8 5Z" />
    </svg>
  );
}

/** ✅ stable likes (no hydration mismatch) */
function seededNumberFromString(str: string, min: number, max: number) {
  let h = 5381;
  for (let i = 0; i < str.length; i++) h = (h * 33) ^ str.charCodeAt(i);
  const n = Math.abs(h);
  const range = max - min + 1;
  return min + (n % range);
}

/** ✅ Intersection observer helper (stable) */
function useInView<T extends HTMLElement>(threshold = 0.2) {
  const [inView, setInView] = useState(false);
  const [el, setEl] = useState<T | null>(null);

  useEffect(() => {
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => setInView(Boolean(entries[0]?.isIntersecting)),
      { threshold }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [el, threshold]);

  return { setEl, inView };
}

function Reel({
  src,
  badgeText,
  frameClassName = "",
  index = 0,
}: {
  src: string;
  badgeText: string;
  frameClassName?: string;
  index?: number;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { setEl, inView } = useInView<HTMLDivElement>(0.18);

  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0); // 0..1
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(() => seededNumberFromString(src, 180, 620));

  const [showHud, setShowHud] = useState<"play" | "pause" | null>(null);
  const [showHeartBurst, setShowHeartBurst] = useState(false);

  const tapTimer = useRef<number | null>(null);

  // time/progress
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const onTime = () => {
      const d = v.duration || 0;
      if (!d) return;
      setProgress(v.currentTime / d);
    };

    v.addEventListener("timeupdate", onTime);

    return () => {
      v.removeEventListener("timeupdate", onTime);
      if (tapTimer.current) window.clearTimeout(tapTimer.current);
    };
  }, []);

  // auto pause/resume when out/in view
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const run = async () => {
      try {
        if (!inView) {
          if (!v.paused) v.pause();
        } else {
          // resume only if muted (autoplay safe)
          if (v.paused) await v.play();
        }
      } catch {
        // ignore autoplay restrictions
      }
    };

    run();
  }, [inView]);

  const flashHud = (type: "play" | "pause") => {
    setShowHud(type);
    window.setTimeout(() => setShowHud(null), 520);
  };

  const togglePlay = async () => {
    const v = videoRef.current;
    if (!v) return;
    try {
      if (v.paused) {
        await v.play();
        flashHud("play");
      } else {
        v.pause();
        flashHud("pause");
      }
    } catch {
      // ignore
    }
  };

  const doLikeBurst = () => {
    setLiked((prev) => {
      if (!prev) setLikes((x) => x + 1);
      return true;
    });
    setShowHeartBurst(true);
    window.setTimeout(() => setShowHeartBurst(false), 420);
  };

  const onTap = () => {
    // double tap => like
    if (tapTimer.current) {
      window.clearTimeout(tapTimer.current);
      tapTimer.current = null;
      doLikeBurst();
      return;
    }
    // single tap => play/pause
    tapTimer.current = window.setTimeout(() => {
      tapTimer.current = null;
      togglePlay();
    }, 240);
  };

  const toggleLike = () => {
    setLiked((prev) => {
      const next = !prev;
      setLikes((x) => (next ? x + 1 : Math.max(0, x - 1)));
      return next;
    });
  };

  const toggleMute = async () => {
    const v = videoRef.current;
    if (!v) return;
    const next = !muted;
    setMuted(next);
    try {
      // keep playing when toggling sound
      if (v.paused) await v.play();
    } catch {}
  };

  return (
    <div
      ref={setEl}
      className={[
        "group relative overflow-hidden rounded-[26px] border transition-transform duration-300 will-change-transform",
        "hover:-translate-y-1",
        // enter animation
        "opacity-0 translate-y-4",
        inView ? "animate-[fadeUp_0.6s_ease-out_forwards]" : "",
      ].join(" ")}
      style={{
        borderColor: BRAND.border,
        backgroundColor: BRAND.card,
        boxShadow: "0 18px 60px rgba(0,0,0,0.22)",
        animationDelay: `${Math.min(index * 80, 240)}ms`,
      }}
    >
      {/* subtle red glow on hover */}
      <div className="pointer-events-none absolute -inset-24 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100">
        <div
          className="h-full w-full"
          style={{
            background: "radial-gradient(circle at 30% 30%, rgba(227,27,35,0.18), transparent 60%)",
          }}
        />
      </div>

      {/* Frame */}
      <div className={["relative w-full overflow-hidden", frameClassName].join(" ")}>
        {/* tap layer */}
        <button
          type="button"
          onClick={onTap}
          className="absolute inset-0 z-10 cursor-pointer"
          aria-label="Play/Pause or Double-tap to like"
        />

        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          src={src}
          autoPlay
          loop
          playsInline
          muted={muted}
          preload="metadata"
        />

        {/* overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/0" />

        {/* badge top */}
        <div className="pointer-events-none absolute left-3 top-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide text-white">
          <span
            className="h-1.5 w-1.5 rounded-full animate-[pulse_1.8s_ease-in-out_infinite]"
            style={{ backgroundColor: BRAND.red }}
          />
          <span
            className="rounded-full px-2 py-0.5"
            style={{
              background: `linear-gradient(90deg, ${BRAND.red}, ${BRAND.redDeep})`,
              boxShadow: "0 10px 22px rgba(227,27,35,0.22)",
            }}
          >
            {badgeText}
          </span>
        </div>

        {/* center HUD */}
        {showHud && (
          <div className="pointer-events-none absolute inset-0 z-20 grid place-items-center">
            <div className="hud-pop flex items-center justify-center rounded-full bg-black/55 px-4 py-4 text-white backdrop-blur-md shadow-2xl">
              <PlayPauseIcon playing={showHud === "play"} />
            </div>
          </div>
        )}

        {/* heart burst */}
        {showHeartBurst && (
          <div className="pointer-events-none absolute inset-0 z-20 grid place-items-center">
            <div className="heart-pop text-white drop-shadow-2xl">
              <svg viewBox="0 0 24 24" className="h-16 w-16" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M12 21s-7-4.4-9.4-8.7C.3 8.6 2.2 5.6 5.5 5.1c1.9-.3 3.7.6 4.7 2 1-1.4 2.8-2.3 4.7-2 3.3.5 5.2 3.5 2.9 7.2C19 16.6 12 21 12 21Z"
                />
              </svg>
            </div>
          </div>
        )}

        {/* progress bar */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 h-1 bg-white/10">
          <div
            className="h-full bg-white/60"
            style={{ width: `${Math.min(100, Math.max(0, progress * 100))}%` }}
          />
        </div>

        {/* bottom controls */}
        <div className="absolute bottom-3 left-3 right-3 z-30 flex items-center justify-between gap-2">
          <div className="pointer-events-none inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-[11px] font-extrabold text-white backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
            <span>{muted ? "Reel" : "Reel • Sound"}</span>
          </div>

          <div className="flex items-center gap-2">
            {/* like */}
            <button
              type="button"
              onClick={toggleLike}
              className="inline-flex items-center gap-2 rounded-full bg-black/55 px-3 py-2 text-[11px] font-extrabold text-white backdrop-blur-md transition hover:bg-black/65 focus:outline-none focus:ring-2 focus:ring-white/60 active:scale-[0.98]"
              aria-label={liked ? "Unlike" : "Like"}
              title={liked ? "Unlike" : "Like"}
            >
              <HeartIcon filled={liked} />
              <span className="hidden sm:inline">{likes}</span>
            </button>

            {/* sound */}
            <button
              type="button"
              onClick={toggleMute}
              className="inline-flex items-center gap-2 rounded-full bg-black/55 px-3 py-2 text-[11px] font-extrabold text-white backdrop-blur-md transition hover:bg-black/65 focus:outline-none focus:ring-2 focus:ring-white/60 active:scale-[0.98]"
              aria-label={muted ? "Unmute" : "Mute"}
              title={muted ? "Sound off" : "Sound on"}
            >
              <VolumeIcon muted={muted} />
              <span className="hidden sm:inline">{muted ? "Sound off" : "Sound on"}</span>
            </button>
          </div>
        </div>

        {/* shine sweep on hover */}
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="absolute -left-1/2 top-0 h-full w-1/2 -skew-x-12 bg-white/10 blur-sm animate-[shine_1.4s_ease-in-out_infinite]" />
        </div>
      </div>

      {/* local keyframes */}
      <style jsx>{`
        .hud-pop {
          animation: pop 0.52s ease-out;
        }
        .heart-pop {
          animation: heartPop 0.42s ease-out;
        }
        @keyframes pop {
          0% {
            transform: scale(0.85);
            opacity: 0;
          }
          55% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(0.98);
            opacity: 0;
          }
        }
        @keyframes heartPop {
          0% {
            transform: scale(0.7);
            opacity: 0;
          }
          40% {
            transform: scale(1.08);
            opacity: 1;
          }
          100% {
            transform: scale(0.98);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

export function PromosSection({ lang }: PromosSectionProps) {
  // ✅ your reels
  const reels = useMemo(
    () => [
      { src: "/promos/1.mp4", badge: { en: "DROP", ar: "إصدار" } },
      { src: "/promos/2.mp4", badge: { en: "STYLE", ar: "ستايل" } },
      { src: "/promos/3.mp4", badge: { en: "VIBE", ar: "فايب" } },
    ],
    []
  );

  const badgeText = (b: { en: string; ar: string }) => (lang === "ar" ? b.ar : b.en);

  // ✅ Mobile snap controls
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const scrollByCard = (dir: "prev" | "next") => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const step = (card?.offsetWidth ?? 320) + 14;
    el.scrollBy({ left: dir === "next" ? step : -step, behavior: "smooth" });
  };

  return (
    <section
      id="promos"
      className="relative overflow-hidden py-12 md:py-16"
      style={{
        background:
          "radial-gradient(1000px 520px at 18% 8%, rgba(227,27,35,0.10), transparent 62%), linear-gradient(to bottom, rgba(11,15,20,0.98), rgba(11,15,20,0.96))",
      }}
    >
      {/* soft fade edges */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full blur-3xl opacity-[0.10]"
          style={{ backgroundColor: BRAND.red }}
        />
        <div
          className="absolute -right-40 -bottom-40 h-[620px] w-[620px] rounded-full blur-3xl opacity-[0.08]"
          style={{ backgroundColor: BRAND.redDeep }}
        />
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.65) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-3 sm:px-4">
        {/* header */}
        <div className="mb-6">
          <p className="mb-2 text-[10px] font-extrabold uppercase tracking-[0.28em]" style={{ color: BRAND.muted }}>
            {lang === "en" ? "REELS" : "مقاطع"}
          </p>
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-[22px] font-extrabold sm:text-[26px] md:text-[30px]" style={{ color: BRAND.paper }}>
                {lang === "en" ? "See the details in motion" : "شوف التفاصيل بالحركة"}
              </h2>
              <p className="mt-2 max-w-2xl text-[13px] leading-relaxed sm:text-[14px]" style={{ color: "rgba(247,247,248,0.62)" }}>
                {lang === "en"
                  ? "Short reels to highlight fabric, fit, and drop vibes. Tap to pause/play, double tap to like."
                  : "مقاطع قصيرة تبيّن الخامة والقياس والستايل. اضغط إيقاف/تشغيل، دبل-تاب للإعجاب."}
              </p>
            </div>

            <div
              className="hidden md:flex items-center gap-2 rounded-full border px-4 py-2 text-[12px] font-extrabold"
              style={{
                borderColor: BRAND.border,
                backgroundColor: "rgba(255,255,255,0.05)",
                color: "rgba(247,247,248,0.70)",
              }}
            >
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: BRAND.red }} />
              <span>{lang === "en" ? "Tap to interact" : "اضغط للتفاعل"}</span>
            </div>
          </div>
        </div>

        {/* MOBILE: snap carousel */}
        <div className="md:hidden">
          <div className="relative -mx-3 px-3">
            {/* edge fades */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-[#0B0F14] to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-[#0B0F14] to-transparent" />

            <div
              ref={scrollerRef}
              className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 pt-1 [scrollbar-width:none] [-ms-overflow-style:none]"
              dir="ltr"
            >
              {reels.map((r, i) => (
                <div key={i} data-card className="shrink-0 snap-center w-[86vw] max-w-[420px]">
                  <Reel index={i} src={r.src} badgeText={badgeText(r.badge)} frameClassName="h-[72vh] max-h-[680px]" />
                </div>
              ))}
            </div>

            {/* controls */}
            <div className="mt-3 flex items-center justify-between">
              <p className="text-[11px] font-bold" style={{ color: "rgba(247,247,248,0.55)" }}>
                {lang === "en" ? "Swipe to browse reels." : "اسحب للتنقل بين المقاطع."}
              </p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => scrollByCard("prev")}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border bg-white/5 text-white shadow-sm active:scale-[0.98]"
                  style={{ borderColor: BRAND.border }}
                  aria-label="Previous"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                    <path d="M15 18L9 12l6-6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => scrollByCard("next")}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border bg-white/5 text-white shadow-sm active:scale-[0.98]"
                  style={{ borderColor: BRAND.border }}
                  aria-label="Next"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5 rotate-180" aria-hidden="true">
                    <path d="M15 18L9 12l6-6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* DESKTOP: grid */}
        <div className="hidden md:grid md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-7">
          {reels.map((r, i) => (
            <Reel key={i} index={i} src={r.src} badgeText={badgeText(r.badge)} frameClassName="aspect-[9/16]" />
          ))}
        </div>
      </div>

      {/* global keyframes */}
      <style jsx global>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes shine {
          0% {
            transform: translateX(-120%) skewX(-12deg);
            opacity: 0;
          }
          35% {
            opacity: 1;
          }
          100% {
            transform: translateX(240%) skewX(-12deg);
            opacity: 0;
          }
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
