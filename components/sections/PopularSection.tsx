// components/sections/PopularSection.tsx
import {
  SiteConfig,
  Lang,
  LocalizedText,
} from "../../lib/siteConfig";

function t(text: LocalizedText, lang: Lang) {
  return lang === "ar" ? text.ar : text.en;
}

interface PopularSectionProps {
  config: SiteConfig;
  lang: Lang;
}

export function PopularSection({ config, lang }: PopularSectionProps) {
  const items = config.popularSection.items ?? [];
  const hasItems = items.length > 0;

  // 🔒 No popular items → hide section completely
  if (!hasItems) {
    return null;
  }

  return (
    <section id="popular" className="py-10 md:py-14">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-6">
          <p className="text-xs uppercase tracking-[0.2em] text-red-500 font-semibold mb-2">
            {lang === "en" ? "Popular" : "الأكثر طلبًا"}
          </p>
          <h2 className="text-2xl md:text-3xl font-extrabold">
            {t(config.popularSection.title, lang)}
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
          {items.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl border border-slate-100 bg-white p-4 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="h-24 w-24 rounded-full bg-slate-100 flex items-center justify-center text-3xl mb-3">
                🍽️
              </div>
              <p className="text-[11px] uppercase tracking-[0.15em] text-slate-400 mb-1">
                {t(item.category, lang)}
              </p>
              <h3 className="font-semibold text-sm mb-2">
                {t(item.name, lang)}
              </h3>
              <p className="text-red-500 font-bold text-sm">
                {config.footer.currencySymbol}
                {item.price.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
