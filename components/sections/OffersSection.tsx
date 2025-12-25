// components/sections/OffersSection.tsx
import {
  SiteConfig,
  Lang,
  LocalizedText,
} from "../../lib/siteConfig";

function t(text: LocalizedText, lang: Lang) {
  return lang === "ar" ? text.ar : text.en;
}

interface OffersSectionProps {
  config: SiteConfig;
  lang: Lang;
}

export function OffersSection({ config, lang }: OffersSectionProps) {
  const offers = config.offersSection.offers ?? [];
  const hasOffers = offers.length > 0;

  // 🔒 No offers → hide section completely
  if (!hasOffers) {
    return null;
  }

  return (
    <section id="offers" className="py-10 md:py-14">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-6">
          <p className="text-xs uppercase tracking-[0.2em] text-red-500 font-semibold mb-2">
            {lang === "en" ? "Best Deals" : "أفضل العروض"}
          </p>
          <h2 className="text-2xl md:text-3xl font-extrabold">
            {t(config.offersSection.title, lang)}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="rounded-3xl p-6 md:p-8 text-white shadow-lg relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${offer.gradientFrom}, ${offer.gradientTo})`,
              }}
            >
              <p className="text-xs mb-2 opacity-90">
                {t(offer.subtitle, lang)}
              </p>
              <h3 className="text-xl font-extrabold mb-4">
                {t(offer.title, lang)}
              </h3>
              <button className="rounded-full bg-white/90 text-slate-900 px-4 py-1.5 text-xs font-semibold">
                {lang === "en" ? "Make an order" : "اطلب الآن"}
              </button>
              <div className="absolute -top-4 -right-3 bg-white/90 text-red-500 rounded-full px-4 py-2 text-[11px] font-bold shadow">
                {t(offer.badge, lang)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
