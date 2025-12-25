module.exports = [
"[project]/app/favicon.ico.mjs { IMAGE => \"[project]/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/favicon.ico.mjs { IMAGE => \"[project]/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript)"));
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/lib/siteConfig.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// lib/siteConfig.ts
__turbopack_context__.s([
    "defaultSiteConfig",
    ()=>defaultSiteConfig
]);
const defaultSiteConfig = {
    // ================= BRAND =================
    brandName: {
        en: "Chocolate Sarayi",
        ar: "شوكليت سراي"
    },
    // ✅ Primary color (caramel / orange)
    primaryColor: "#E28A3A",
    // ================= HERO =================
    hero: {
        badge: {
            en: "Chocolate Sweets & Coffee House",
            ar: "حلويات وشوكولاتة وقهوة"
        },
        titleLine1: {
            en: "Chocolate",
            ar: "شوكليت"
        },
        titleLine2: {
            en: "Sarayi",
            ar: "سراي"
        },
        description: {
            en: "Warm vibes, Turkish sweets, rich chocolate, crepes, pancakes and coffee — all in one place.",
            ar: "أجواء دافئة، حلويات تركية، شوكولاتة غنية، كريب وبانكيك وقهوة — كلها بمكان واحد."
        },
        cta: {
            en: "View Menu",
            ar: "عرض المنيو"
        },
        discountBadge: {
            en: "",
            ar: ""
        }
    },
    // ================= GALLERY (was QR) =================
    qrSection: {
        title: {
            en: "Gallery",
            ar: "الصور"
        },
        text: {
            en: "A quick look at the desserts, chocolate and the cozy vibes.",
            ar: "نظرة سريعة على الحلويات والشوكولاتة والأجواء."
        },
        note: {
            en: "",
            ar: ""
        }
    },
    // ================= MENU =================
    menuSection: {
        label: {
            en: "Menu",
            ar: "المنيو"
        },
        title: {
            en: "Desserts & Drinks",
            ar: "حلويات ومشروبات"
        },
        // ⚠️ Placeholder items — replace with your real menu/prices
        categories: [
            {
                id: "desserts",
                label: {
                    en: "Desserts",
                    ar: "حلويات"
                },
                items: [
                    {
                        id: "crepe-lotus",
                        name: {
                            en: "Lotus Crepe",
                            ar: "كريب لوتس"
                        },
                        description: {
                            en: "Creamy lotus + rich chocolate.",
                            ar: "لوتس كريمي مع شوكولاتة."
                        },
                        priceFull: 9000
                    },
                    {
                        id: "crepe-oreo",
                        name: {
                            en: "Oreo Crepe",
                            ar: "كريب أوريو"
                        },
                        description: {
                            en: "Oreo crumble + chocolate sauce.",
                            ar: "أوريو مع صوص شوكولاتة."
                        },
                        priceFull: 9000
                    },
                    {
                        id: "pancake-classic",
                        name: {
                            en: "Classic Pancake",
                            ar: "بانكيك كلاسيك"
                        },
                        description: {
                            en: "Soft pancakes + chocolate.",
                            ar: "بانكيك طري مع شوكولاتة."
                        },
                        priceFull: 8500
                    },
                    {
                        id: "brownie-special",
                        name: {
                            en: "Chocolate Brownie",
                            ar: "براوني شوكولاتة"
                        },
                        description: {
                            en: "Rich brownie with sauce.",
                            ar: "براوني غني مع صوص."
                        },
                        priceFull: 9500
                    }
                ]
            },
            {
                id: "drinks",
                label: {
                    en: "Drinks",
                    ar: "مشروبات"
                },
                items: [
                    {
                        id: "hot-chocolate",
                        name: {
                            en: "Hot Chocolate",
                            ar: "هوت شوكليت"
                        },
                        description: {
                            en: "Classic rich cocoa.",
                            ar: "كاكاو غني كلاسيكي."
                        },
                        priceFull: 5000
                    },
                    {
                        id: "iced-coffee",
                        name: {
                            en: "Iced Coffee",
                            ar: "آيس كوفي"
                        },
                        description: {
                            en: "Smooth & refreshing.",
                            ar: "منعش وناعم."
                        },
                        priceFull: 6000
                    },
                    {
                        id: "water",
                        name: {
                            en: "Water",
                            ar: "ماء"
                        },
                        description: {
                            en: "",
                            ar: ""
                        },
                        priceFull: 1000
                    }
                ]
            },
            {
                id: "breakfast",
                label: {
                    en: "Breakfast",
                    ar: "فطور"
                },
                items: []
            },
            // keep for compatibility (if other UI expects it)
            {
                id: "main",
                label: {
                    en: "Meals",
                    ar: "وجبات"
                },
                items: []
            },
            {
                id: "shisha",
                label: {
                    en: "Shisha",
                    ar: "الأراكيل"
                },
                items: []
            }
        ]
    },
    // optional sections
    offersSection: {
        title: {
            en: "",
            ar: ""
        },
        offers: []
    },
    popularSection: {
        title: {
            en: "",
            ar: ""
        },
        items: []
    },
    // ================= FOOTER =================
    footer: {
        about: {
            en: "Chocolate Sarayi — Turkish sweets, rich chocolate and coffee with warm vibes.",
            ar: "شوكليت سراي — حلويات تركية، شوكولاتة غنية وقهوة مع أجواء دافئة."
        },
        openingTitle: {
            en: "Working Hours",
            ar: "أوقات العمل"
        },
        openings: [
            {
                label: {
                    en: "Daily",
                    ar: "يوميًا"
                },
                time: {
                    en: "10:00 AM – 02:00 AM",
                    ar: "10:00 صباحًا – 02:00 فجرًا"
                }
            }
        ],
        exploreTitle: {
            en: "Explore",
            ar: "استكشف"
        },
        exploreLinks: [],
        contactTitle: {
            en: "Contact",
            ar: "التواصل"
        },
        contacts: [
            "Chocolate Sarayi Iraq",
            "Baghdad – Iraq",
            "0770 936 1111",
            "+964 770 133 2595",
            // Replace with your exact Google Maps link when ready:
            "https://www.waze.com/live-map/directions/iq/baghdad-governorate/baghdad/chocolate-sarayishwklyt-sray?to=place.ChIJq8YqWxJ_VxURjYRnu55GbmY"
        ],
        newsletterTitle: {
            en: "",
            ar: ""
        },
        newsletterText: {
            en: "",
            ar: ""
        },
        newsletterPlaceholder: {
            en: "",
            ar: ""
        },
        newsletterButton: {
            en: "",
            ar: ""
        },
        socialLabel: {
            en: "",
            ar: ""
        },
        currencySymbol: "IQD "
    }
};
}),
"[project]/lib/clientsConfig.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// lib/clientsConfig.ts
__turbopack_context__.s([
    "clientsConfigs",
    ()=>clientsConfigs,
    "getClientConfig",
    ()=>getClientConfig
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$siteConfig$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/siteConfig.ts [app-rsc] (ecmascript)");
;
const clientsConfigs = {
    "soho-cafe": {
        ...__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$siteConfig$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["defaultSiteConfig"],
        brandName: {
            en: "Soho Cafe",
            ar: "كافيه سوهو"
        },
        primaryColor: "#0f766e",
        hero: {
            ...__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$siteConfig$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["defaultSiteConfig"].hero,
            titleLine1: {
                en: "SPECIALTY COFFEE",
                ar: "قهوة مختصة"
            },
            titleLine2: {
                en: "PASTRIES · SANDWICHES · BRUNCH",
                ar: "معجنات · ساندويتشات · برنش"
            }
        }
    },
    "burger-house": {
        ...__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$siteConfig$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["defaultSiteConfig"],
        brandName: {
            en: "Burger House",
            ar: "برجر هاوس"
        },
        primaryColor: "#b91c1c",
        hero: {
            ...__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$siteConfig$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["defaultSiteConfig"].hero,
            titleLine1: {
                en: "SMASH BURGERS",
                ar: "برجر سماش"
            },
            titleLine2: {
                en: "FRIES · SAUCES · COMBOS",
                ar: "بطاطا · صوصات · وجبات"
            }
        }
    },
    "italian-bistro": {
        ...__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$siteConfig$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["defaultSiteConfig"],
        brandName: {
            en: "Italian Bistro",
            ar: "مطعم إيطالي"
        },
        primaryColor: "#15803d",
        hero: {
            ...__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$siteConfig$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["defaultSiteConfig"].hero,
            titleLine1: {
                en: "AUTHENTIC PASTA",
                ar: "باستا إيطالية أصلية"
            },
            titleLine2: {
                en: "PIZZA · RISOTTO · SPECIALS",
                ar: "بيتزا · ريزوتو · أطباق خاصة"
            }
        }
    }
};
function getClientConfig(slug) {
    return clientsConfigs[slug] ?? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$siteConfig$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["defaultSiteConfig"];
}
}),
"[project]/components/CafeTemplate.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "CafeTemplate",
    ()=>CafeTemplate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const CafeTemplate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call CafeTemplate() from the server but CafeTemplate is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/CafeTemplate.tsx <module evaluation>", "CafeTemplate");
}),
"[project]/components/CafeTemplate.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "CafeTemplate",
    ()=>CafeTemplate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const CafeTemplate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call CafeTemplate() from the server but CafeTemplate is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/CafeTemplate.tsx", "CafeTemplate");
}),
"[project]/components/CafeTemplate.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CafeTemplate$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/CafeTemplate.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CafeTemplate$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/components/CafeTemplate.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CafeTemplate$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/app/[client]/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// app/[client]/page.tsx
__turbopack_context__.s([
    "default",
    ()=>ClientPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$clientsConfig$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/clientsConfig.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CafeTemplate$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/CafeTemplate.tsx [app-rsc] (ecmascript)");
;
;
;
async function ClientPage({ params }) {
    const { client } = await params; // 👈 لازم await هنا
    const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$clientsConfig$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getClientConfig"])(client);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CafeTemplate$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CafeTemplate"], {
        config: config
    }, void 0, false, {
        fileName: "[project]/app/[client]/page.tsx",
        lineNumber: 16,
        columnNumber: 10
    }, this);
}
}),
"[project]/app/[client]/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/[client]/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__12f32ec4._.js.map