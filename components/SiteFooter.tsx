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

function extractLatLngFromGoogleMapsUrl(
  url: string
): { lat: number; lng: number } | null {
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

function buildGoogleMapsEmbedSrc(
  mapsLink: string,
  fallback: { lat: number; lng: number }
) {
  const coords = extractLatLngFromGoogleMapsUrl(mapsLink) ?? fallback;
  const q = `${coords.lat},${coords.lng}`;
  return `https://www.google.com/maps?output=embed&q=${encodeURIComponent(q)}&z=17`;
}

export function SiteFooter({ config, lang }: SiteFooterProps) {
  const isAr = lang === "ar";

  /**
   * ✅ Leath Bershka — Brand (Red + Black)
   * - Keep it consistent with header + products section
   */
  const BRAND = {
    red: "#E31B23",
    redDeep: "#B80F16",
    ink: "#0B0F14",
    paper: "#F7F7F8",
    muted: "rgba(247,247,248,0.70)",
    textMuted: "rgba(247,247,248,0.62)",
    border: "rgba(255,255,255,0.10)",
    borderStrong: "rgba(255,255,255,0.14)",
    card: "rgba(255,255,255,0.05)",
  } as const;

  const accent = config.primaryColor ?? BRAND.red;

  // ✅ Pull links from config (so changing siteConfig updates footer automatically)
  const instagramLink =
    config.footer.contacts.find((c) => c.includes("instagram.com")) ??
    "https://www.instagram.com/";

  const mapsLink =
    config.footer.contacts.find(
      (c) => c.includes("google.com/maps") || c.includes("maps.app.goo.gl")
    ) ?? "https://www.google.com/maps";

  // ✅ Fallback coords (only used if link doesn't contain coords)
  const FALLBACK = { lat: 33.315805, lng: 44.3364189 };

  const mapsEmbedSrc = buildGoogleMapsEmbedSrc(mapsLink, FALLBACK);

  return (
    <footer
      id="contact"
      className="mt-10 border-t pt-10 md:pt-12"
      style={{
        borderColor: BRAND.border,
        background:
          "radial-gradient(900px 420px at 18% 8%, rgba(227,27,35,0.10), transparent 62%), linear-gradient(to bottom, rgba(11,15,20,0.98), rgba(11,15,20,0.96))",
        color: BRAND.paper,
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
            <div
              className={
                "mb-3 flex items-center gap-2 " +
                (isAr ? "flex-row-reverse" : "flex-row")
              }
            >
              <div
                className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full ring-1"
                style={{
                  borderColor: BRAND.borderStrong,
                  backgroundColor: "rgba(255,255,255,0.10)",
                  boxShadow: "0 14px 42px rgba(0,0,0,0.28)",
                }}
              >
                <Image
                  src="/logo/logo2.png"
                  alt={t(config.brandName, lang)}
                  fill
                  sizes="40px"
                  className="object-cover"
                  priority
                />
              </div>

              <div className={"flex flex-col " + (isAr ? "items-end" : "items-start")}>
                <span className="text-lg font-extrabold tracking-wide">
                  {t(config.brandName, lang)}
                </span>
                <span className="text-xs" style={{ color: BRAND.textMuted }}>
                  {lang === "en"
                    ? "Premium streetwear — clean & bold."
                    : "ستريت وير فاخر — ستايل نظيف وجريء."}
                </span>
              </div>
            </div>

            <p className="mb-3 text-sm leading-relaxed" style={{ color: BRAND.textMuted }}>
              {t(config.footer.about, lang)}
            </p>

            {/* small badge */}
            <div
              className="mt-3 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-extrabold"
              style={{
                borderColor: BRAND.border,
                backgroundColor: "rgba(255,255,255,0.06)",
                color: BRAND.paper,
              }}
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: BRAND.red }}
              />
              {lang === "en" ? "New drops weekly" : "نزلات جديدة أسبوعيًا"}
            </div>
          </div>

          {/* Column 2 – Contact */}
          <div className={isAr ? "text-right" : "text-left"}>
            <p className="mb-2 text-sm font-extrabold" style={{ color: BRAND.paper }}>
              {lang === "en" ? "Contact" : "التواصل"}
            </p>

            <ul className="space-y-2 text-sm" style={{ color: BRAND.textMuted }}>
              <li>
                <a
                  href={instagramLink}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="hover:underline"
                  style={{ color: accent }}
                >
                  {lang === "en" ? "Instagram" : "إنستغرام"}
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

            <p className="mt-4 text-xs" style={{ color: BRAND.muted }}>
              {lang === "en"
                ? "DM us on Instagram to order or ask about sizes."
                : "راسلنا على إنستغرام للطلب أو الاستفسار عن المقاسات."}
            </p>
          </div>

          {/* Column 3 – Social */}
          <div className={isAr ? "text-right" : "text-left"}>
            <p className="mb-2 text-sm font-extrabold" style={{ color: BRAND.paper }}>
              {lang === "en" ? "Social" : "السوشيال"}
            </p>

            <ul
              className={
                "mt-3 flex w-full items-center gap-2 " +
                (isAr ? "justify-end flex-row-reverse" : "justify-start")
              }
            >
              {/* Instagram */}
              <li>
                <a
                  href={instagramLink}
                  aria-label="Instagram"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border transition hover:-translate-y-0.5"
                  style={{
                    borderColor: BRAND.border,
                    backgroundColor: "rgba(255,255,255,0.06)",
                    color: BRAND.paper,
                    boxShadow: "0 14px 42px rgba(0,0,0,0.24)",
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
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border transition hover:-translate-y-0.5"
                  style={{
                    borderColor: BRAND.border,
                    backgroundColor: "rgba(255,255,255,0.06)",
                    color: BRAND.paper,
                    boxShadow: "0 14px 42px rgba(0,0,0,0.24)",
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

            <div className={"mt-4 flex flex-col " + (isAr ? "items-end" : "items-start")}>
              <div
                className="h-[3px] w-28 rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${BRAND.red}, ${BRAND.redDeep}, ${BRAND.red})`,
                  opacity: 0.9,
                }}
              />
              <p className="mt-2 text-[11px] font-semibold" style={{ color: BRAND.muted }}>
                {lang === "en" ? "Bold look. Clean finish." : "شكل جريء. لمسة نظيفة."}
              </p>
            </div>
          </div>
        </div>

        {/* MAP BLOCK */}
        <div className="space-y-3" dir={isAr ? "rtl" : "ltr"}>
          <p
            className={
              "text-xs font-semibold uppercase tracking-[0.18em] " +
              (isAr ? "text-right" : "text-left")
            }
            style={{ color: accent }}
          >
            {lang === "en" ? "Find us" : "موقعنا"}
          </p>

          <div
            className="relative overflow-hidden rounded-2xl border"
            style={{
              borderColor: BRAND.border,
              backgroundColor: "rgba(255,255,255,0.04)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.24)",
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
                borderColor: BRAND.borderStrong,
                backgroundColor: "rgba(11,15,20,0.55)",
                color: BRAND.paper,
              }}
            >
              {lang === "en" ? "Open in Google Maps" : "افتح على Google Maps"}
            </a>

            <iframe
              title="Location"
              src={mapsEmbedSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-64 w-full border-0 md:h-80"
            />
          </div>

          <div
            className={
              "flex w-full items-center gap-2 text-[11px] " +
              (isAr ? "justify-end" : "justify-start")
            }
            style={{ color: BRAND.muted }}
          >
            <span>
              {lang === "en"
                ? "Open the pinned location in Google Maps."
                : "افتح الموقع المثبت على Google Maps."}
            </span>

            <a
              href={mapsLink}
              target="_blank"
              rel="noreferrer noopener"
              className="font-semibold hover:underline"
              style={{ color: accent }}
            >
              {lang === "en" ? "Open" : "افتح"}
            </a>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div
        className="border-t py-6"
        style={{
          borderColor: BRAND.border,
          backgroundColor: "rgba(11,15,20,0.96)",
          color: BRAND.muted,
        }}
      >
        <div className="mx-auto max-w-5xl px-4">
          <div
            className="rounded-3xl border px-4 py-5 text-center"
            style={{
              borderColor: BRAND.border,
              backgroundColor: "rgba(255,255,255,0.04)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.22)",
              backdropFilter: "blur(10px)",
            }}
          >
            <a
              href="https://softodev.net"
              target="_blank"
              rel="noreferrer noopener"
              className="group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[13px] font-extrabold transition active:scale-[0.99]"
              style={{
                color: "white",
                background: `linear-gradient(90deg, ${BRAND.red}, ${BRAND.redDeep}, ${BRAND.red})`,
                boxShadow: "0 16px 44px rgba(227,27,35,0.18)",
              }}
            >
              <span className="opacity-95">
                {lang === "en" ? "Developed by SoftoDev" : "تم التطوير بواسطة SoftoDev"}
              </span>
              <span className="opacity-90">•</span>
              <span className="font-black">softodev.net</span>

              <span
                className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/15 transition group-hover:translate-x-0.5"
                aria-hidden="true"
              >
                ↗
              </span>
            </a>

            <div
              className="mx-auto mt-4 h-px w-28"
              style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
            />

            <div className="mt-3 text-[11px]" style={{ color: BRAND.muted }}>
              © {new Date().getFullYear()} {t(config.brandName, lang)} •{" "}
              {lang === "en" ? "All rights reserved." : "جميع الحقوق محفوظة."}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
