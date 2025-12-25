// components/SiteFooter.tsx
import Image from "next/image";
import { Lang, LocalizedText, SiteConfig } from "../lib/siteConfig";

function t(text: LocalizedText, lang: Lang) {
  return lang === "ar" ? text.ar : text.en;
}

interface SiteFooterProps {
  config: SiteConfig;
  lang: Lang;
}

function extractLatLngFromGoogleMapsUrl(url: string): { lat: number; lng: number } | null {
  if (!url) return null;

  // 1) .../@lat,lng,17z...
  let m = url.match(/@(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?),/);
  if (m?.[1] && m?.[2]) {
    const lat = Number(m[1]);
    const lng = Number(m[2]);
    if (!Number.isNaN(lat) && !Number.isNaN(lng)) return { lat, lng };
  }

  // 2) ...!3dlat!4dlng...
  m = url.match(/!3d(-?\d+(?:\.\d+)?)!4d(-?\d+(?:\.\d+)?)/);
  if (m?.[1] && m?.[2]) {
    const lat = Number(m[1]);
    const lng = Number(m[2]);
    if (!Number.isNaN(lat) && !Number.isNaN(lng)) return { lat, lng };
  }

  // 3) q=lat,lng
  m = url.match(/[?&]q=(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)/);
  if (m?.[1] && m?.[2]) {
    const lat = Number(m[1]);
    const lng = Number(m[2]);
    if (!Number.isNaN(lat) && !Number.isNaN(lng)) return { lat, lng };
  }

  return null;
}

function buildGoogleMapsEmbedSrc(mapsLink: string, fallback: { lat: number; lng: number }) {
  const coords = extractLatLngFromGoogleMapsUrl(mapsLink) ?? fallback;
  const q = `${coords.lat},${coords.lng}`;
  // ✅ reliable embed
  return `https://www.google.com/maps?output=embed&q=${encodeURIComponent(q)}&z=17`;
}

export function SiteFooter({ config, lang }: SiteFooterProps) {
  const isAr = lang === "ar";

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

  const accent = config.primaryColor ?? BRAND.primary;

  // ✅ Pull links from config (so changing siteConfig updates footer automatically)
  const instagramLink =
    config.footer.contacts.find((c) => c.includes("instagram.com")) ??
    "https://www.instagram.com/kavun.eg";

  const mapsLink =
    config.footer.contacts.find((c) => c.includes("google.com/maps") || c.includes("maps.app.goo.gl")) ??
    "https://www.google.com/maps";

  // ✅ Fallback coords (only used if link doesn't contain coords)
  const FALLBACK = { lat: 30.0652355, lng: 31.2176574 };

  const mapsEmbedSrc = buildGoogleMapsEmbedSrc(mapsLink, FALLBACK);

  return (
    <footer
      id="contact"
      className="mt-10 border-t pt-10 md:pt-12"
      style={{
        borderColor: BRAND.border,
        backgroundImage: `linear-gradient(to bottom, ${BRAND.paper}, rgba(26,133,151,0.07))`,
        color: BRAND.text,
      }}
    >
      <div
        className="mx-auto flex max-w-5xl flex-col gap-8 px-4 pb-9 md:gap-10"
        dir={isAr ? "rtl" : "ltr"}
      >
        {/* TOP GRID */}
        <div className="grid gap-8 md:grid-cols-3 md:items-start">
          {/* Column 1 – Brand */}
          <div className={isAr ? "text-right" : "text-left"}>
            <div className={"mb-3 flex items-center gap-2 " + (isAr ? "flex-row-reverse" : "flex-row")}>
              <div
                className="relative h-10 w-10 overflow-hidden rounded-full bg-white ring-1"
                style={{
                  borderColor: BRAND.border,
                  boxShadow: "0 10px 24px rgba(15,94,107,0.10)",
                }}
              >
                <Image
                  src="/logo/logo1.png"
                  alt={t(config.brandName, lang)}
                  fill
                  sizes="40px"
                  className="object-cover"
                  priority
                />
              </div>

              {/* ✅ RTL alignment fix */}
              <div className={"flex flex-col " + (isAr ? "items-end" : "items-start")}>
                <span className="text-lg font-extrabold tracking-wide">{t(config.brandName, lang)}</span>
                <span className="text-xs" style={{ color: BRAND.muted }}>
                  {lang === "en" ? "Cafe culture with a modern twist." : "ثقافة قهوة بلمسة عصرية."}
                </span>
              </div>
            </div>

            <p className="mb-3 text-sm" style={{ color: BRAND.muted }}>
              {t(config.footer.about, lang)}
            </p>

            {/* Opening hours */}
            {config.footer.openings?.length ? (
              <>
                <p
                  className="mb-2 text-xs font-semibold uppercase tracking-[0.16em]"
                  style={{ color: "rgba(15,94,107,0.55)" }}
                >
                  {t(config.footer.openingTitle, lang)}
                </p>
                <div className="space-y-1 text-xs" style={{ color: BRAND.muted }}>
                  {config.footer.openings.map((row, i) => (
                    <p key={i}>
                      {t(row.label, lang)} · {t(row.time, lang)}
                    </p>
                  ))}
                </div>
              </>
            ) : null}

            {/* small badge */}
            <div
              className="mt-4 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-extrabold"
              style={{
                borderColor: BRAND.border,
                backgroundColor: "rgba(255,255,255,0.80)",
                color: BRAND.deep,
              }}
            >
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: BRAND.primary }} />
              {lang === "en" ? "Fresh daily" : "طازج يوميًا"}
            </div>
          </div>

          {/* Column 2 – Contact */}
          <div className={isAr ? "text-right" : "text-left"}>
            <p className="mb-2 text-sm font-extrabold" style={{ color: BRAND.text }}>
              {lang === "en" ? "Contact" : "التواصل"}
            </p>

            <ul className="space-y-2 text-sm" style={{ color: BRAND.muted }}>
              <li>
                <a
                  href={instagramLink}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="hover:underline"
                  style={{ color: accent }}
                >
                  Instagram: @kavun.eg
                </a>
              </li>

              <li>
                <a
                  href={mapsLink}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="hover:underline"
                  style={{ color: accent }}
                >
                  {lang === "en" ? "Open Location" : "افتح الموقع"}
                </a>
              </li>
            </ul>

            <p className="mt-4 text-xs" style={{ color: "rgba(15,94,107,0.55)" }}>
              {lang === "en" ? "Follow us on Instagram for updates." : "تابعنا على إنستغرام لآخر التحديثات."}
            </p>
          </div>

          {/* Column 3 – Follow */}
          <div className={isAr ? "text-right" : "text-left"}>
            <p className="mb-2 text-sm font-extrabold" style={{ color: BRAND.text }}>
              {lang === "en" ? "Follow us" : "تابعنا"}
            </p>

            {/* ✅ FIX: make row full width so justify works + RTL order */}
            <ul className={"mt-3 flex w-full items-center gap-2 " + (isAr ? "justify-end flex-row-reverse" : "justify-start")}>
              {/* Instagram */}
              <li>
                <a
                  href={instagramLink}
                  aria-label="Instagram"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border bg-white transition hover:-translate-y-0.5"
                  style={{
                    borderColor: BRAND.border,
                    color: BRAND.deep,
                    boxShadow: "0 10px 24px rgba(15,94,107,0.10)",
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17" cy="7" r="1.1" fill="currentColor" />
                  </svg>
                </a>
              </li>

              {/* Map */}
              <li>
                <a
                  href={mapsLink}
                  aria-label="Location"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border bg-white transition hover:-translate-y-0.5"
                  style={{
                    borderColor: BRAND.border,
                    color: BRAND.deep,
                    boxShadow: "0 10px 24px rgba(15,94,107,0.10)",
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M12 21s7-4.4 7-11a7 7 0 0 0-14 0c0 6.6 7 11 7 11z" />
                    <circle cx="12" cy="10" r="2.4" />
                  </svg>
                </a>
              </li>
            </ul>

            {/* ✅ FIX: align strip/text correctly in RTL */}
            <div className={"mt-4 flex flex-col " + (isAr ? "items-end" : "items-start")}>
              <div
                className="h-[3px] w-28 rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${BRAND.primary}, ${BRAND.soft}, ${BRAND.light})`,
                  opacity: 0.9,
                }}
              />
              <p className="mt-2 text-[11px] font-semibold" style={{ color: "rgba(15,94,107,0.55)" }}>
                {lang === "en" ? "Clean vibe — quality coffee" : "أجواء نظيفة — قهوة بجودة عالية"}
              </p>
            </div>
          </div>
        </div>

        {/* MAP BLOCK */}
        <div className="space-y-3" dir={isAr ? "rtl" : "ltr"}>
          <p
            className={"text-xs font-semibold uppercase tracking-[0.18em] " + (isAr ? "text-right" : "text-left")}
            style={{ color: accent }}
          >
            {lang === "en" ? "Find us on the map" : "موقعنا على الخريطة"}
          </p>

          <div
            className="relative overflow-hidden rounded-2xl border bg-white"
            style={{
              borderColor: BRAND.border,
              boxShadow: "0 18px 45px rgba(15,94,107,0.10)",
            }}
          >
            <a
              href={mapsLink}
              target="_blank"
              rel="noreferrer noopener"
              className={
                "absolute z-10 top-3 rounded-full border px-3 py-2 text-[12px] font-extrabold shadow-lg backdrop-blur " +
                (isAr ? "left-3" : "right-3")
              }
              style={{
                borderColor: BRAND.border,
                backgroundColor: "rgba(255,255,255,0.88)",
                color: accent,
              }}
            >
              {lang === "en" ? "Open in Google Maps" : "افتح على Google Maps"}
            </a>

            <iframe
              title="KAVUN location"
              src={mapsEmbedSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-64 w-full border-0 md:h-80"
            />
          </div>

          <div
            className={"flex w-full items-center gap-2 text-[11px] " + (isAr ? "justify-end" : "justify-start")}
            style={{ color: "rgba(15,94,107,0.55)" }}
          >
            <span>
              {lang === "en" ? "Open the pinned location in Google Maps." : "افتح الموقع المثبت على Google Maps."}
            </span>

            <a
              href={mapsLink}
              target="_blank"
              rel="noreferrer noopener"
              className="font-semibold hover:underline"
              style={{ color: accent }}
            >
              {lang === "en" ? "Open in Google Maps" : "افتح على Google Maps"}
            </a>
          </div>
        </div>
      </div>

      {/* ✅ BOTTOM BAR (Centered + prettier) */}
      <div
        className="border-t py-6"
        style={{
          borderColor: BRAND.border,
          backgroundColor: "rgba(247,250,251,0.92)",
          color: "rgba(15,94,107,0.62)",
        }}
      >
        <div className="mx-auto max-w-5xl px-4">
          <div
            className="rounded-3xl border px-4 py-5 text-center shadow-sm"
            style={{
              borderColor: "rgba(229,238,241,0.95)",
              backgroundColor: "rgba(255,255,255,0.72)",
              backdropFilter: "blur(10px)",
              boxShadow: "0 18px 45px rgba(15,94,107,0.10)",
            }}
          >
            {/* SoftoDev button centered */}
            <a
              href="https://softodev.net"
              target="_blank"
              rel="noreferrer noopener"
              className="group inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-[13px] font-extrabold transition active:scale-[0.99]"
              style={{
                color: "white",
                background: `linear-gradient(90deg, ${BRAND.primary}, ${BRAND.soft}, ${BRAND.primary})`,
                boxShadow: "0 18px 44px rgba(15,94,107,0.22)",
              }}
            >
              <span className="opacity-95">
                {lang === "en" ? "Developed by SoftoDev" : "تم التطوير بواسطة SoftoDev"}
              </span>
              <span className="opacity-90">•</span>
              <span className="font-black">softodev.net</span>

              {/* small arrow */}
              <span
                className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/15 transition group-hover:translate-x-0.5"
                aria-hidden="true"
              >
                ↗
              </span>
            </a>

            {/* Divider */}
            <div className="mx-auto mt-4 h-px w-28" style={{ backgroundColor: "rgba(15,94,107,0.14)" }} />

            {/* Rights centered */}
            <div className="mt-3 text-[11px]" style={{ color: "rgba(15,94,107,0.62)" }}>
              © {new Date().getFullYear()} {t(config.brandName, lang)} •{" "}
              {lang === "en" ? "All rights reserved." : "جميع الحقوق محفوظة."}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
