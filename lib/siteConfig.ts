// lib/siteConfig.ts

export type Lang = "en" | "ar";

export type LocalizedText = {
  en: string;
  ar: string;
};

export type MenuItem = {
  id: string;
  name: LocalizedText;
  description: LocalizedText;
  priceHalf?: number;
  priceFull: number;
  image?: string;
};

export type MenuCategoryId =
  | "main"
  | "desserts"
  | "drinks"
  | "breakfast"
  | "shisha";

export type MenuCategory = {
  id: MenuCategoryId;
  label: LocalizedText;
  items: MenuItem[];
};

export type OpeningRow = {
  label: LocalizedText;
  time: LocalizedText;
};

export type Offer = {
  id: string;
  title: LocalizedText;
  subtitle: LocalizedText;
  badge: LocalizedText;
  gradientFrom: string;
  gradientTo: string;
};

export type PopularItem = {
  id: string;
  name: LocalizedText;
  category: LocalizedText;
  price: number;
};

export interface SiteConfig {
  brandName: LocalizedText;

  // ✅ make it optional (your components use ?? fallback)
  primaryColor?: string;

  hero: {
    badge: LocalizedText;
    titleLine1: LocalizedText;
    titleLine2: LocalizedText;
    description: LocalizedText;
    cta: LocalizedText;
    discountBadge: LocalizedText;
  };

  qrSection: {
    title: LocalizedText;
    text: LocalizedText;
    note: LocalizedText;
  };

  menuSection: {
    label: LocalizedText;
    title: LocalizedText;
    categories: MenuCategory[];
  };

  offersSection: {
    title: LocalizedText;
    offers: Offer[];
  };

  popularSection: {
    title: LocalizedText;
    items: PopularItem[];
  };

  footer: {
    about: LocalizedText;
    openingTitle: LocalizedText;
    openings: OpeningRow[];
    exploreTitle: LocalizedText;
    exploreLinks: LocalizedText[];
    contactTitle: LocalizedText;
    contacts: string[];
    newsletterTitle: LocalizedText;
    newsletterText: LocalizedText;
    newsletterPlaceholder: LocalizedText;
    newsletterButton: LocalizedText;
    socialLabel: LocalizedText;
    currencySymbol: string;
  };
}

// ✅ Brand Palette (KAVUN - Teal)
const BRAND = {
  primary: "#1A8597", // Teal
  deep: "#0F5E6B",
  soft: "#2A9CB0",
  light: "#7CCAD6",
  paper: "#F7FAFB",
  text: "#0F172A",
  muted: "#6B7280",
  border: "#E5EEF1",
} as const;

export const defaultSiteConfig: SiteConfig = {
  // ================= BRAND =================
  brandName: { en: "KAVUN", ar: "KAVUN" },

  // ✅ Primary color (TEAL) — used across UI
  primaryColor: BRAND.primary,

  // ================= HERO =================
  hero: {
    badge: { en: "Cafe culture • Modern twist", ar: "ثقافة قهوة • لمسة عصرية" },
    titleLine1: { en: "KAVUN", ar: "KAVUN" },
    titleLine2: { en: "MENU", ar: "MENU" },
    description: {
      en: "Specialty coffee, signature lattes, and refreshing drinks — crafted with a clean modern style.",
      ar: "قهوة مختصة، لاتيهات مميزة، ومشروبات منعشة — بأسلوب عصري ونظيف.",
    },
    cta: { en: "View Menu", ar: "عرض المنيو" },
    discountBadge: { en: "", ar: "" },
  },

  // ================= GALLERY (QR Section) =================
  qrSection: {
    title: { en: "Gallery", ar: "الصور" },
    text: {
      en: "A quick look at our space and signature drinks.",
      ar: "نظرة سريعة على أجوائنا ومشروباتنا المميزة.",
    },
    note: { en: "", ar: "" },
  },

  // ================= MENU =================
  menuSection: {
    label: { en: "Menu", ar: "المنيو" },
    title: { en: "Coffee & Drinks", ar: "القهوة والمشروبات" },

    // ✅ KEEP SAME IDs to avoid breaking your UI
    categories: [
      {
        // main -> Hot Drinks
        id: "main",
        label: { en: "Hot Drinks", ar: "مشروبات ساخنة" },
        items: [
          {
            id: "kv-espresso",
            name: { en: "Espresso", ar: "إسبريسو" },
            description: { en: "Single / Double.", ar: "سينغل / دبل." },
            priceHalf: 55,
            priceFull: 70,
          },
          {
            id: "kv-americano",
            name: { en: "Americano", ar: "أمريكانو" },
            description: {
              en: "Classic black coffee.",
              ar: "قهوة سوداء كلاسيكية.",
            },
            priceFull: 65,
          },
          {
            id: "kv-macchiato",
            name: { en: "Macchiato", ar: "مكياتو" },
            description: {
              en: "Espresso with a touch of milk.",
              ar: "إسبريسو مع لمسة حليب.",
            },
            priceFull: 60,
          },
          {
            id: "kv-cortado",
            name: { en: "Cortado", ar: "كورتادو" },
            description: {
              en: "Balanced espresso and milk.",
              ar: "توازن إسبريسو وحليب.",
            },
            priceFull: 65,
          },
          {
            id: "kv-cappuccino",
            name: { en: "Cappuccino", ar: "كابتشينو" },
            description: { en: "Foamy and smooth.", ar: "رغوي وناعم." },
            priceFull: 80,
          },
          {
            id: "kv-flat-white",
            name: { en: "Flat white", ar: "فلات وايت" },
            description: { en: "Silky milk texture.", ar: "حليب ناعم القوام." },
            priceFull: 75,
          },
          {
            id: "kv-latte",
            name: { en: "Latte", ar: "لاتيه" },
            description: { en: "Creamy and comforting.", ar: "كريمي ومريح." },
            priceFull: 85,
          },
          {
            id: "kv-salted-caramel-latte",
            name: { en: "Salted caramel latte", ar: "لاتيه كراميل مملّح" },
            description: { en: "Sweet-salty caramel.", ar: "كراميل حلو مالح." },
            priceFull: 95,
          },
          {
            id: "kv-dark-mocha",
            name: { en: "Dark mocha", ar: "موكا غامقة" },
            description: { en: "Rich cocoa mocha.", ar: "موكا غنية بالكاكاو." },
            priceFull: 95,
          },
          {
            id: "kv-white-mocha",
            name: { en: "White mocha", ar: "موكا بيضاء" },
            description: {
              en: "Smooth white chocolate.",
              ar: "شوكولاتة بيضاء ناعمة.",
            },
            priceFull: 95,
          },
          {
            id: "kv-spanish-latte-hot",
            name: { en: "Spanish Latte", ar: "سبانش لاتيه" },
            description: { en: "Sweet & creamy.", ar: "حلو وكريمي." },
            priceFull: 95,
          },
          {
            id: "kv-honey-latte",
            name: { en: "Honey Latte", ar: "لاتيه عسل" },
            description: { en: "Natural honey note.", ar: "نكهة عسل طبيعية." },
            priceFull: 95,
          },
          {
            id: "kv-pistachio-latte-hot",
            name: { en: "Pistachio Latte", ar: "لاتيه فستق" },
            description: { en: "Signature pistachio.", ar: "فستق مميز." },
            priceFull: 140,
          },
          {
            id: "kv-kardamom",
            name: { en: "Kardamom", ar: "هيل" },
            description: { en: "Warm cardamom taste.", ar: "نكهة هيل دافئة." },
            priceFull: 95,
          },
          {
            id: "kv-hot-chocolate",
            name: { en: "Hot chocolate", ar: "شوكولاتة ساخنة" },
            description: {
              en: "Classic hot chocolate.",
              ar: "شوكولاتة ساخنة كلاسيكية.",
            },
            priceFull: 90,
          },
          {
            id: "kv-matcha-hot",
            name: { en: "Matcha", ar: "ماتشا" },
            description: { en: "Premium matcha latte.", ar: "لاتيه ماتشا مميز." },
            priceFull: 120,
          },
        ],
      },

      {
        // breakfast -> Cold Drinks
        id: "breakfast",
        label: { en: "Cold Drinks", ar: "مشروبات باردة" },
        items: [
          {
            id: "kv-iced-americano",
            name: { en: "Iced Americano", ar: "أمريكانو مثلّج" },
            description: { en: "Cold and bold.", ar: "بارد وقوي." },
            priceFull: 70,
          },
          {
            id: "kv-iced-latte",
            name: { en: "Iced Latte", ar: "لاتيه مثلّج" },
            description: { en: "Iced creamy latte.", ar: "لاتيه بارد كريمي." },
            priceFull: 90,
          },
          {
            id: "kv-iced-spanish-latte",
            name: { en: "Iced spanish latte", ar: "سبانش لاتيه مثلّج" },
            description: { en: "Sweet iced latte.", ar: "لاتيه بارد حلو." },
            priceFull: 95,
          },
          {
            id: "kv-iced-pistachio-latte",
            name: { en: "Iced pistachio latte", ar: "لاتيه فستق مثلّج" },
            description: { en: "Pistachio over ice.", ar: "فستق على الثلج." },
            priceFull: 140,
          },
          {
            id: "kv-iced-shaken-mocha",
            name: {
              en: "Iced shaken white/dark mocha",
              ar: "موكا شيكن أبيض/غامق مثلّج",
            },
            description: { en: "Shaken mocha style.", ar: "موكا بطريقة شيكن." },
            priceFull: 95,
          },
          {
            id: "kv-hibiscus",
            name: { en: "Hibiscus", ar: "كركديه" },
            description: { en: "Refreshing hibiscus.", ar: "كركديه منعش." },
            priceFull: 90,
          },
          {
            id: "kv-iced-matcha",
            name: { en: "Iced matcha", ar: "ماتشا مثلّجة" },
            description: { en: "Matcha over ice.", ar: "ماتشا على الثلج." },
            priceFull: 120,
          },
        ],
      },

      {
        // desserts -> Fresh / Juices
        id: "desserts",
        label: { en: "Fresh & Juices", ar: "عصائر ومنعشات" },
        items: [
          {
            id: "kv-orange-juice",
            name: { en: "Orange juice", ar: "عصير برتقال" },
            description: { en: "Fresh orange juice.", ar: "عصير برتقال طازج." },
            priceFull: 60,
          },
          {
            id: "kv-mango-juice",
            name: { en: "Mango juice", ar: "عصير مانجو" },
            description: { en: "Smooth mango juice.", ar: "عصير مانجو ناعم." },
            priceFull: 75,
          },
          {
            id: "kv-mojito",
            name: { en: "Mojito", ar: "موهيتو" },
            description: { en: "Minty refresher.", ar: "منعش بالنعناع." },
            priceFull: 100,
          },
        ],
      },

      {
        // drinks -> Water / Brew
        id: "drinks",
        label: { en: "Brew & Water", ar: "مشروبات ومياه" },
        items: [
          {
            id: "kv-cold-brew",
            name: { en: "Cold brew", ar: "كولد برو" },
            description: {
              en: "Slow brewed coffee.",
              ar: "قهوة مخمرة على البارد.",
            },
            priceFull: 100,
          },
          {
            id: "kv-water",
            name: { en: "Water", ar: "ماء" },
            description: { en: "Still water.", ar: "ماء." },
            priceFull: 15,
          },
          {
            id: "kv-sparkling-water",
            name: { en: "Sparkling water", ar: "ماء غازي" },
            description: { en: "Sparkling water.", ar: "ماء غازي." },
            priceFull: 45,
          },
        ],
      },

      {
        // shisha -> Signatures (keep id to not break UI)
        id: "shisha",
        label: { en: "Signature", ar: "مميز" },
        items: [
          {
            id: "kv-spanish-latte-cold",
            name: { en: "Spanish latte", ar: "سبانش لاتيه" },
            description: { en: "Our signature style.", ar: "بطريقتنا المميزة." },
            priceFull: 120,
          },
          {
            id: "kv-matcha-signature",
            name: { en: "Matcha", ar: "ماتشا" },
            description: { en: "Premium matcha.", ar: "ماتشا مميزة." },
            priceFull: 120,
          },
        ],
      },
    ],
  },

  // ================= OFFERS =================
  offersSection: {
    title: { en: "Offers", ar: "العروض" },
    offers: [
      {
        id: "offer-1",
        title: { en: "Coffee Moment", ar: "لحظة قهوة" },
        subtitle: { en: "Choose your favorite latte", ar: "اختَر اللاتيه المفضل" },
        badge: { en: "Signature", ar: "مميز" },
        gradientFrom: BRAND.primary,
        gradientTo: BRAND.soft,
      },
      {
        id: "offer-2",
        title: { en: "Refresh & Chill", ar: "انتعاش وبرودة" },
        subtitle: {
          en: "Cold drinks and refreshers",
          ar: "مشروبات باردة ومنعشات",
        },
        badge: { en: "Cold", ar: "بارد" },
        gradientFrom: BRAND.deep,
        gradientTo: BRAND.primary,
      },
    ],
  },

  // ================= POPULAR =================
  popularSection: {
    title: { en: "Popular", ar: "الأكثر طلبًا" },
    items: [
      {
        id: "pop-1",
        name: { en: "Spanish Latte", ar: "سبانش لاتيه" },
        category: { en: "Hot Drinks", ar: "مشروبات ساخنة" },
        price: 95,
      },
      {
        id: "pop-2",
        name: { en: "Pistachio Latte", ar: "لاتيه فستق" },
        category: { en: "Hot Drinks", ar: "مشروبات ساخنة" },
        price: 140,
      },
      {
        id: "pop-3",
        name: { en: "Cold Brew", ar: "كولد برو" },
        category: { en: "Brew & Water", ar: "مشروبات ومياه" },
        price: 100,
      },
    ],
  },

  // ================= FOOTER =================
  footer: {
    about: {
      en: "KAVUN — cafe culture with a modern twist. Specialty coffee and refreshing drinks in a clean minimalist vibe.",
      ar: "KAVUN — ثقافة قهوة بلمسة عصرية. قهوة مختصة ومشروبات منعشة بأجواء نظيفة ومينيمال.",
    },

    openingTitle: { en: "Working Hours", ar: "أوقات العمل" },
    openings: [
      {
        label: { en: "Daily", ar: "يوميًا" },
        time: { en: "08:00 AM – 12:00 AM", ar: "08:00 صباحًا – 12:00 ليلًا" },
      },
    ],

    exploreTitle: { en: "Explore", ar: "استكشف" },
    exploreLinks: [],

    contactTitle: { en: "Contact", ar: "التواصل" },

    // ✅ Updated contacts for Kavun (Instagram + Maps only)
    contacts: [
      "https://www.instagram.com/kavun.eg?igsh=MXM1cDhhbGN2anl5Mg%3D%3D",
      "https://maps.app.goo.gl/ooqTjMoAZuaX9PXv6",
    ],

    newsletterTitle: { en: "", ar: "" },
    newsletterText: { en: "", ar: "" },
    newsletterPlaceholder: { en: "", ar: "" },
    newsletterButton: { en: "", ar: "" },

    socialLabel: { en: "", ar: "" },

    currencySymbol: "",
  },
};
