// lib/siteConfig.ts

export type Lang = "en" | "ar";

export type LocalizedText = {
  en: string;
  ar: string;
};

/**
 * ✅ Products (replaces cafe menu items)
 * - priceFull: required
 * - image: product image path in /public (recommended)
 * - badge: optional (New / Sale / Limited)
 * - oldPrice: optional (for discount UI)
 */
export type ProductItem = {
  id: string;
  name: LocalizedText;
  description: LocalizedText;
  priceFull: number;
  image?: string;

  // optional (safe)
  badge?: LocalizedText;
  oldPrice?: number;
};

/**
 * ✅ Keep SAME category IDs to not break existing UI logic
 * (we just change labels + items to clothing)
 */
export type MenuCategoryId = "main" | "desserts" | "drinks" | "breakfast" | "shisha";

export type ProductCategory = {
  id: MenuCategoryId;
  label: LocalizedText;
  items: ProductItem[];
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
  image?: string;
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

  // ✅ still called menuSection in code, but it's "Products" now
  menuSection: {
    label: LocalizedText;
    title: LocalizedText;
    categories: ProductCategory[];
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
    newsletterButton2?: LocalizedText;
    socialLabel: LocalizedText;
    currencySymbol: string;
  };
}

/**
 * ✅ Leath Bershka Brand (Red + Black)
 */
const BRAND = {
  red: "#E31B23",
  redDeep: "#B80F16",
  ink: "#0B0F14",
  paper: "#F7F7F8",
  muted: "#9CA3AF",
} as const;

export const defaultSiteConfig: SiteConfig = {
  // ================= BRAND =================
  brandName: { en: "LEATH BERSHKA", ar: "ليث بيرشكا" },

  // ✅ Primary color (RED)
  primaryColor: BRAND.red,

  // ================= HERO =================
  hero: {
    badge: { en: "Streetwear • Premium drops", ar: "ستريت وير • تشكيلة مميزة" },
    titleLine1: { en: "LEATH", ar: "ليث" },
    titleLine2: { en: "BERSHKA", ar: "بيرشكا" },
    description: {
      en: "Modern streetwear essentials — clean fits, premium fabrics, and limited drops.",
      ar: "أساسيات ستريت وير عصرية — قصّات نظيفة، خامات ممتازة، وقطع محدودة.",
    },
    cta: { en: "View Collection", ar: "عرض المنتجات" },
    discountBadge: { en: "New Drop", ar: "وصل حديثاً" },
  },

  // ================= GALLERY (optional) =================
  // إذا ما تريد قسم Gallery خلي النصوص فاضية أو احذف السكشن من الصفحة
  qrSection: {
    title: { en: "Gallery", ar: "الصور" },
    text: {
      en: "A quick look at our latest fits & drops.",
      ar: "نظرة سريعة على أحدث الإطلالات والقطع.",
    },
    note: { en: "", ar: "" },
  },

  // ================= PRODUCTS (was MENU) =================
  menuSection: {
    label: { en: "Products", ar: "المنتجات" },
    title: { en: "Shop the Collection", ar: "تسوق التشكيلة" },

    // ✅ KEEP SAME IDs to avoid breaking your UI
    categories: [
      {
        id: "main",
        label: { en: "T-Shirts", ar: "تيشيرتات" },
        items: [
          {
            id: "lb-tee-oversize-black",
            name: { en: "Oversized Tee — Black", ar: "تيشيرت أوفرسايز — أسود" },
            description: {
              en: "Heavy cotton, relaxed fit, premium feel.",
              ar: "قطن ثقيل، قصّة مريحة، خامة فخمة.",
            },
            priceFull: 25000,
            oldPrice: 30000,
            badge: { en: "Sale", ar: "تخفيض" },
            image: "/products/tee1.jpg",
          },
          {
            id: "lb-tee-oversize-white",
            name: { en: "Oversized Tee — White", ar: "تيشيرت أوفرسايز — أبيض" },
            description: {
              en: "Clean minimal look, breathable fabric.",
              ar: "ستايل مينيمال نظيف، خامة مريحة.",
            },
            priceFull: 24000,
            badge: { en: "New", ar: "جديد" },
            image: "/products/tee2.jpg",
          },
          {
            id: "lb-tee-graphic-red",
            name: { en: "Graphic Tee — Red Print", ar: "تيشيرت جرافيك — طباعة حمراء" },
            description: {
              en: "Statement graphic with soft-touch print.",
              ar: "جرافيك بارز بطباعة ناعمة.",
            },
            priceFull: 27000,
            image: "/products/tee3.jpg",
          },
        ],
      },

      {
        id: "breakfast",
        label: { en: "Hoodies", ar: "هوديات" },
        items: [
          {
            id: "lb-hoodie-black",
            name: { en: "Hoodie — Black", ar: "هودي — أسود" },
            description: {
              en: "Warm fleece, structured hood, daily essential.",
              ar: "فليس دافي، هود ثابت، قطعة يومية.",
            },
            priceFull: 55000,
            badge: { en: "Best Seller", ar: "الأكثر مبيعاً" },
            image: "/products/hoodie1.jpg",
          },
          {
            id: "lb-hoodie-ash",
            name: { en: "Hoodie — Ash Grey", ar: "هودي — رمادي" },
            description: {
              en: "Soft fleece with clean logo detail.",
              ar: "فليس ناعم مع تفصيلة لوغو.",
            },
            priceFull: 52000,
            image: "/products/hoodie2.jpg",
          },
        ],
      },

      {
        id: "desserts",
        label: { en: "Jackets", ar: "جاكيتات" },
        items: [
          {
            id: "lb-jacket-bomber-black",
            name: { en: "Bomber Jacket — Black", ar: "جاكيت بومبر — أسود" },
            description: {
              en: "Lightweight bomber, premium zipper, street-ready.",
              ar: "بومبر خفيف، سحاب ممتاز، ستريت جاهز.",
            },
            priceFull: 85000,
            badge: { en: "Limited", ar: "محدود" },
            image: "/products/jacket1.jpg",
          },
          {
            id: "lb-jacket-denim",
            name: { en: "Denim Jacket — Blue", ar: "جاكيت جينز — أزرق" },
            description: {
              en: "Classic denim with modern fit.",
              ar: "جينز كلاسيكي بقصّة عصرية.",
            },
            priceFull: 78000,
            image: "/products/jacket2.jpg",
          },
        ],
      },

      {
        id: "drinks",
        label: { en: "Pants", ar: "بناطيل" },
        items: [
          {
            id: "lb-pants-cargo-black",
            name: { en: "Cargo Pants — Black", ar: "بنطلون كارجو — أسود" },
            description: {
              en: "Utility pockets, tapered fit, durable fabric.",
              ar: "جيوب عملية، قصّة مميزة، خامة قوية.",
            },
            priceFull: 60000,
            badge: { en: "New", ar: "جديد" },
            image: "/products/pants1.jpg",
          },
          {
            id: "lb-pants-jeans-black",
            name: { en: "Jeans — Washed Black", ar: "جينز — أسود مغسول" },
            description: {
              en: "Straight fit, washed finish, everyday wear.",
              ar: "قصّة مستقيمة، لون مغسول، مناسب يومياً.",
            },
            priceFull: 65000,
            image: "/products/pants2.jpg",
          },
        ],
      },

      {
        id: "shisha",
        label: { en: "Shoes", ar: "أحذية" },
        items: [
          {
            id: "lb-shoes-sneakers-white",
            name: { en: "Sneakers — White", ar: "سنيكرز — أبيض" },
            description: {
              en: "Clean silhouette with comfy sole.",
              ar: "تصميم نظيف مع نعل مريح.",
            },
            priceFull: 90000,
            badge: { en: "Best Seller", ar: "الأكثر مبيعاً" },
            image: "/products/shoes1.jpg",
          },
          {
            id: "lb-shoes-sneakers-black",
            name: { en: "Sneakers — Black", ar: "سنيكرز — أسود" },
            description: {
              en: "All-black street look, durable upper.",
              ar: "ستايل ستريت أسود كامل، خامة قوية.",
            },
            priceFull: 92000,
            image: "/products/shoes2.jpg",
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
        title: { en: "Winter Drop", ar: "تشكيلة الشتاء" },
        subtitle: { en: "Hoodies & jackets available now", ar: "هوديات وجاكيتات متوفرة الآن" },
        badge: { en: "Limited", ar: "محدود" },
        gradientFrom: BRAND.ink,
        gradientTo: BRAND.redDeep,
      },
      {
        id: "offer-2",
        title: { en: "Best Sellers", ar: "الأكثر مبيعاً" },
        subtitle: { en: "Top picks of the week", ar: "أفضل اختيارات الأسبوع" },
        badge: { en: "Hot", ar: "رائج" },
        gradientFrom: BRAND.red,
        gradientTo: BRAND.ink,
      },
    ],
  },

  // ================= POPULAR =================
  popularSection: {
    title: { en: "Best Sellers", ar: "الأكثر مبيعاً" },
    items: [
      {
        id: "pop-1",
        name: { en: "Hoodie — Black", ar: "هودي — أسود" },
        category: { en: "Hoodies", ar: "هوديات" },
        price: 55000,
        image: "/products/hoodie1.jpg",
      },
      {
        id: "pop-2",
        name: { en: "Cargo Pants — Black", ar: "بنطلون كارجو — أسود" },
        category: { en: "Pants", ar: "بناطيل" },
        price: 60000,
        image: "/products/pants1.jpg",
      },
      {
        id: "pop-3",
        name: { en: "Sneakers — White", ar: "سنيكرز — أبيض" },
        category: { en: "Shoes", ar: "أحذية" },
        price: 90000,
        image: "/products/shoes1.jpg",
      },
    ],
  },

  // ================= FOOTER =================
  footer: {
    about: {
      en: "Leath Bershka — premium streetwear essentials with clean fits and limited drops.",
      ar: "ليث بيرشكا — ستريت وير بخامات ممتازة، قصّات نظيفة، وقطع محدودة.",
    },

    openingTitle: { en: "Working Hours", ar: "أوقات العمل" },
    openings: [
      {
        label: { en: "Daily", ar: "يوميًا" },
        time: { en: "10:00 AM – 10:00 PM", ar: "10:00 صباحًا – 10:00 مساءً" },
      },
    ],

    exploreTitle: { en: "Explore", ar: "استكشف" },
    exploreLinks: [],

    contactTitle: { en: "Contact", ar: "التواصل" },

    // ✅ ضع روابطك الحقيقية هنا
    contacts: [
      "https://www.instagram.com/",
      "https://wa.me/",
      "https://maps.app.goo.gl/",
    ],

    newsletterTitle: { en: "", ar: "" },
    newsletterText: { en: "", ar: "" },
    newsletterPlaceholder: { en: "", ar: "" },
    newsletterButton: { en: "", ar: "" },

    socialLabel: { en: "", ar: "" },

    // ✅ IQD example (غيرها حسب ما تريد)
    currencySymbol: "IQD ",
  },
};
