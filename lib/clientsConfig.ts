// lib/clientsConfig.ts
import { SiteConfig } from "./siteConfig";
import { defaultSiteConfig } from "./siteConfig";

export const clientsConfigs: Record<string, SiteConfig> = {
  "soho-cafe": {
    ...defaultSiteConfig,
    brandName: { en: "Soho Cafe", ar: "كافيه سوهو" },
    primaryColor: "#0f766e",
    hero: {
      ...defaultSiteConfig.hero,
      titleLine1: { en: "SPECIALTY COFFEE", ar: "قهوة مختصة" },
      titleLine2: {
        en: "PASTRIES · SANDWICHES · BRUNCH",
        ar: "معجنات · ساندويتشات · برنش",
      },
    },
  },

  "burger-house": {
    ...defaultSiteConfig,
    brandName: { en: "Burger House", ar: "برجر هاوس" },
    primaryColor: "#b91c1c",
    hero: {
      ...defaultSiteConfig.hero,
      titleLine1: { en: "SMASH BURGERS", ar: "برجر سماش" },
      titleLine2: {
        en: "FRIES · SAUCES · COMBOS",
        ar: "بطاطا · صوصات · وجبات",
      },
    },
  },

  "italian-bistro": {
    ...defaultSiteConfig,
    brandName: { en: "Italian Bistro", ar: "مطعم إيطالي" },
    primaryColor: "#15803d",
    hero: {
      ...defaultSiteConfig.hero,
      titleLine1: { en: "AUTHENTIC PASTA", ar: "باستا إيطالية أصلية" },
      titleLine2: {
        en: "PIZZA · RISOTTO · SPECIALS",
        ar: "بيتزا · ريزوتو · أطباق خاصة",
      },
    },
  },
};

export function getClientConfig(slug: string): SiteConfig {
  return clientsConfigs[slug] ?? defaultSiteConfig;
}
