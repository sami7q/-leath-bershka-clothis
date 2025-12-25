// components/sections/PromosSection.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Lang } from "../../lib/siteConfig";

interface PromosSectionProps {
  lang: Lang;
}

// ✅ KAVUN Brand Palette (Teal)
const BRAND = {
  primary: "#1A8597",
  deep: "#0F5E6B",
  soft: "#2A9CB0",
  light: "#7CCAD6",
  paper: "#F7FAFB",
  text: "#0F172A",
  muted: "#6B7280",
  border: "#E5EEF1",
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

/** ✅ stable likes (no Math.random => no hydration mismatch) */
function seededNumberFromString(str: string, min: number, max: number) {
  // djb2 hash
  let h = 5381;
  for (let i = 0; i < str.length; i++) h = (h * 33) ^ str.charCodeAt(i);
  const n = Math.abs(h);
  const range = max - min + 1;
  return min + (n % range);
}

/** ✅ Intersection observer helper */
function useInView<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const [inView, setInView] = useState(false);
  const [el, setEl] = useState<T | null>(null);

  useEffect(() => {
    if (!el) return;

    const obs = new IntersectionObserver((entries) => {
      const e = entries[0];
      setInView(Boolean(e?.isIntersecting));
    }, options ?? { threshold: 0.2 });

    obs.observe(el);
    return () => obs.disconnect();
  }, [el, options]);

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
  const { setEl, inView } = useInView<HTMLDivElement>({ threshold: 0.18 });

  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0); // 0..1

  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(() => seededNumberFromString(src, 120, 420));

  const [showHud, setShowHud] = useState<"play" | "pause" | null>(null);
  const [showHeartBurst, setShowHeartBurst] = useState(false);

  const tapTimer = useRef<number | null>(null);

  // time/progress + play state
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const onTime = () => {
      const d = v.duration || 0;
      if (!d) return;
      setProgress(v.currentTime / d);
    };

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);

    v.addEventListener("timeupdate", onTime);
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);

    return () => {
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
      if (tapTimer.current) window.clearTimeout(tapTimer.current);
    };
  }, []);

  // ✅ auto pause when out of view, resume when in view
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const run = async () => {
      try {
        if (!inView) {
          if (!v.paused) v.pause();
        } else {
          if (playing && v.paused) await v.play();
        }
      } catch {
        // ignore autoplay restrictions
      }
    };

    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  const flashHud = (type: "play" | "pause") => {
    setShowHud(type);
    window.setTimeout(() => setShowHud(null), 550);
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
    window.setTimeout(() => setShowHeartBurst(false), 450);
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

  return (
    <div
      ref={setEl}
      className={[
        "group relative overflow-hidden rounded-[28px] border",
        "bg-white shadow-[0_18px_60px_rgba(15,94,107,0.10)]",
        "transition-transform duration-300 will-change-transform",
        "hover:-translate-y-1 hover:shadow-[0_24px_80px_rgba(15,94,107,0.14)]",
        // enter animation
        "opacity-0 translate-y-4",
        inView ? "animate-[fadeUp_0.6s_ease-out_forwards]" : "",
      ].join(" ")}
      style={{
        borderColor: "rgba(26,133,151,0.16)",
        animationDelay: `${Math.min(index * 80, 240)}ms`,
      }}
    >
      {/* subtle teal shine */}
      <div className="pointer-events-none absolute -inset-24 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100">
        <div
          className="h-full w-full"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(26,133,151,0.18), transparent 60%)",
          }}
        />
      </div>

      {/* Frame */}
      <div
        className={[
          "relative w-full overflow-hidden",
          "before:pointer-events-none before:absolute before:inset-0 before:opacity-0 before:transition-opacity before:duration-300",
          "before:bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.20),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(255,255,255,0.12),transparent_40%)]",
          "group-hover:before:opacity-100",
          frameClassName,
        ].join(" ")}
      >
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
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-black/0" />

        {/* badge top */}
        <div className="pointer-events-none absolute left-3 top-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide text-white shadow-sm">
          <span
            className="h-1.5 w-1.5 rounded-full animate-[pulse_1.8s_ease-in-out_infinite]"
            style={{ backgroundColor: BRAND.light }}
          />
          <span
            className="rounded-full px-2 py-0.5"
            style={{
              background:
                "linear-gradient(90deg, rgba(26,133,151,0.95), rgba(15,94,107,0.95))",
              boxShadow: "0 10px 22px rgba(26,133,151,0.22)",
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
            <span>
              {muted ? "Reel" : "Reel • Sound"}
              {playing ? "" : " • Paused"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* like */}
            <button
              type="button"
              onClick={toggleLike}
              className="inline-flex items-center gap-2 rounded-full bg-black/55 px-3 py-2 text-[11px] font-extrabold text-white backdrop-blur-md transition hover:bg-black/65 focus:outline-none focus:ring-2 focus:ring-white/60 active:scale-[0.98]"
              aria-label={liked ? "Unlike" : "Like"}
            >
              <span className="text-white">
                <HeartIcon filled={liked} />
              </span>
              <span className="hidden sm:inline">{likes}</span>
            </button>

            {/* sound */}
            <button
              type="button"
              onClick={() => setMuted((m) => !m)}
              className="inline-flex items-center gap-2 rounded-full bg-black/55 px-3 py-2 text-[11px] font-extrabold text-white backdrop-blur-md transition hover:bg-black/65 focus:outline-none focus:ring-2 focus:ring-white/60 active:scale-[0.98]"
              aria-label={muted ? "Unmute" : "Mute"}
            >
              <VolumeIcon muted={muted} />
              <span className="hidden sm:inline">
                {muted ? "Sound off" : "Sound on"}
              </span>
            </button>
          </div>
        </div>

        {/* tiny shine sweep on hover */}
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="absolute -left-1/2 top-0 h-full w-1/2 -skew-x-12 bg-white/10 blur-sm animate-[shine_1.4s_ease-in-out_infinite]" />
        </div>
      </div>

      {/* local keyframes (no tailwind config needed) */}
      <style jsx>{`
        .hud-pop {
          animation: pop 0.55s ease-out;
        }
        .heart-pop {
          animation: heartPop 0.45s ease-out;
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
  const reels = useMemo(
    () => [
      { src: "/promos/1.mp4", badge: { en: "FRESH", ar: "طازج" } },
      { src: "/promos/2.mp4", badge: { en: "CREAMY", ar: "كريمي" } },
      { src: "/promos/3.mp4", badge: { en: "VIBE", ar: "أجواء" } },
    ],
    []
  );

  const badgeText = (b: { en: string; ar: string }) => (lang === "ar" ? b.ar : b.en);

  return (
    <section
      id="promos"
      className="relative overflow-hidden bg-white py-12 md:py-16"
    >
      {/* ✅ soft teal background pattern */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute -top-20 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full blur-3xl opacity-15"
          style={{ backgroundColor: BRAND.primary }}
        />
        <div
          className="absolute -bottom-24 right-[-120px] h-[520px] w-[520px] rounded-full blur-3xl opacity-12"
          style={{ backgroundColor: BRAND.light }}
        />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(15,23,42,1) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4">
        {/* ✅ title row */}
        <div className="mb-6 flex items-end justify-between gap-3">
          <div>
            <p
              className="text-[11px] font-extrabold uppercase tracking-[0.22em]"
              style={{ color: "rgba(26,133,151,0.85)" }}
            >
              {lang === "en" ? "REELS" : "مقاطع"}
            </p>
            <h2
              className="mt-1 text-2xl font-extrabold sm:text-3xl"
              style={{ color: BRAND.text }}
            >
              {lang === "en" ? "Feel the vibe" : "خلّك على الجو"}
            </h2>
          </div>

          <div
            className="hidden sm:flex items-center gap-2 rounded-full border px-3 py-2 text-[12px] font-extrabold"
            style={{
              borderColor: "rgba(26,133,151,0.16)",
              backgroundColor: "rgba(247,250,251,0.72)",
              color: "rgba(15,23,42,0.72)",
            }}
          >
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: BRAND.primary }}
            />
            <span>{lang === "en" ? "Tap to interact" : "اضغط للتفاعل"}</span>
          </div>
        </div>

        {/* ✅ PHONE: one-by-one, big reels */}
        <div className="md:hidden space-y-6">
          {reels.map((r, i) => (
            <div key={i} className="mx-auto w-full max-w-[420px]">
              <Reel
                index={i}
                src={r.src}
                badgeText={badgeText(r.badge)}
                frameClassName="h-[78vh]"
              />
            </div>
          ))}
        </div>

        {/* ✅ DESKTOP: 2 cols then 3 cols */}
        <div className="hidden md:grid md:grid-cols-2 md:gap-7 lg:grid-cols-3 lg:gap-8">
          {reels.map((r, i) => (
            <Reel
              key={i}
              index={i}
              src={r.src}
              badgeText={badgeText(r.badge)}
              frameClassName="aspect-[9/16]"
            />
          ))}
        </div>
      </div>

      {/* ✅ global keyframes (keep yours) */}
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
      `}</style>
    </section>
  );
}
