module.exports = [
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
        en: "JOORY",
        ar: "جوري"
    },
    // ✅ Primary color (red)
    primaryColor: "#e61d1d",
    // ================= HERO =================
    hero: {
        badge: {
            en: "Fresh & Delicious",
            ar: "طازج ولذيذ"
        },
        titleLine1: {
            en: "JOORY",
            ar: "جوري"
        },
        titleLine2: {
            en: "MENU",
            ar: "المنيو"
        },
        description: {
            en: "Discover our meals, drinks and desserts.",
            ar: "اكتشف وجباتنا، مشروباتنا، وحلوياتنا."
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
            en: "JOORY",
            ar: "جوري"
        },
        text: {
            en: "A quick look at the vibes, coffee and place.",
            ar: "نظرة سريعة على الأجواء والقهوة والمكان."
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
            en: "Food & Drinks",
            ar: "الأطعمة والمشروبات"
        },
        categories: [
            // ===== Meals
            {
                id: "main",
                label: {
                    en: "Meals",
                    ar: "الوجبات"
                },
                items: [
                    {
                        id: "classic-burger",
                        name: {
                            en: "Classic Burger Meal",
                            ar: "وجبة كلاسيك بركر"
                        },
                        description: {
                            en: "",
                            ar: ""
                        },
                        priceFull: 7000
                    },
                    {
                        id: "cheesy-burger",
                        name: {
                            en: "Cheesy Burger Meal",
                            ar: "وجبة جيزي بركر"
                        },
                        description: {
                            en: "",
                            ar: ""
                        },
                        priceFull: 7500
                    },
                    {
                        id: "jalapeno-burger",
                        name: {
                            en: "Jalapeno Burger Meal",
                            ar: "وجبة هالبينو بركر"
                        },
                        description: {
                            en: "",
                            ar: ""
                        },
                        priceFull: 7000
                    },
                    {
                        id: "double-burger",
                        name: {
                            en: "Double Burger Meal",
                            ar: "وجبة دبل بركر"
                        },
                        description: {
                            en: "",
                            ar: ""
                        },
                        priceFull: 9000
                    },
                    {
                        id: "classic-zinger",
                        name: {
                            en: "Classic Zinger Meal",
                            ar: "وجبة كلاسيك زنكر"
                        },
                        description: {
                            en: "",
                            ar: ""
                        },
                        priceFull: 7000
                    },
                    {
                        id: "cheesy-zinger",
                        name: {
                            en: "Cheesy Zinger Meal",
                            ar: "وجبة جيزي زنكر"
                        },
                        description: {
                            en: "",
                            ar: ""
                        },
                        priceFull: 7500
                    },
                    {
                        id: "jalapeno-zinger",
                        name: {
                            en: "Jalapeno Zinger Meal",
                            ar: "وجبة هالبينو زنكر"
                        },
                        description: {
                            en: "",
                            ar: ""
                        },
                        priceFull: 7000
                    },
                    {
                        id: "double-zinger",
                        name: {
                            en: "Double Zinger Meal",
                            ar: "وجبة دبل زنكر"
                        },
                        description: {
                            en: "",
                            ar: ""
                        },
                        priceFull: 8000
                    },
                    {
                        id: "hotdog",
                        name: {
                            en: "Hot Dog Meal",
                            ar: "وجبة هوت دوك"
                        },
                        description: {
                            en: "",
                            ar: ""
                        },
                        priceFull: 6500
                    }
                ]
            },
            // ===== Desserts
            {
                id: "desserts",
                label: {
                    en: "Desserts",
                    ar: "حلويات"
                },
                items: [
                    {
                        id: "pancake-classic",
                        name: {
                            en: "Classic Pancake",
                            ar: "بان كيك كلاسيك"
                        },
                        description: {
                            en: "",
                            ar: ""
                        },
                        priceFull: 6000
                    },
                    {
                        id: "pancake-oreo",
                        name: {
                            en: "Oreo Pancake",
                            ar: "بان كيك اوريو"
                        },
                        description: {
                            en: "",
                            ar: ""
                        },
                        priceFull: 6000
                    },
                    {
                        id: "pancake-lotus",
                        name: {
                            en: "Lotus Pancake",
                            ar: "بان كيك لوتس"
                        },
                        description: {
                            en: "",
                            ar: ""
                        },
                        priceFull: 6000
                    },
                    {
                        id: "pancake-pistachio",
                        name: {
                            en: "Pistachio Pancake",
                            ar: "بان كيك بستاشيو"
                        },
                        description: {
                            en: "",
                            ar: ""
                        },
                        priceFull: 7000
                    },
                    {
                        id: "pancake-mix",
                        name: {
                            en: "Mix Pancake",
                            ar: "بان كيك مكس نكهات"
                        },
                        description: {
                            en: "",
                            ar: ""
                        },
                        priceFull: 7000
                    },
                    {
                        id: "pancake-joory",
                        name: {
                            en: "Joory Pancake",
                            ar: "بان كيك جوري"
                        },
                        description: {
                            en: "",
                            ar: ""
                        },
                        priceFull: 7000
                    }
                ]
            },
            // ===== Drinks
            {
                id: "drinks",
                label: {
                    en: "Drinks",
                    ar: "مشروبات"
                },
                items: [
                    {
                        id: "pepsi",
                        name: {
                            en: "Pepsi",
                            ar: "بيبسي"
                        },
                        description: {
                            en: "",
                            ar: ""
                        },
                        priceFull: 1000
                    },
                    {
                        id: "seven",
                        name: {
                            en: "7Up",
                            ar: "سفن"
                        },
                        description: {
                            en: "",
                            ar: ""
                        },
                        priceFull: 1000
                    },
                    {
                        id: "mirinda",
                        name: {
                            en: "Mirinda",
                            ar: "ميرندا"
                        },
                        description: {
                            en: "",
                            ar: ""
                        },
                        priceFull: 1000
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
            // ===== Breakfast
            {
                id: "breakfast",
                label: {
                    en: "Breakfast",
                    ar: "فطور"
                },
                items: []
            },
            // ===== Shisha
            {
                id: "shisha",
                label: {
                    en: "Shisha",
                    ar: "الأراكيل"
                },
                items: [
                    {
                        id: "shisha-mint",
                        name: {
                            en: "Mint",
                            ar: "نعناع"
                        },
                        description: {
                            en: "",
                            ar: ""
                        },
                        priceFull: 10000
                    },
                    {
                        id: "shisha-grape",
                        name: {
                            en: "Grape",
                            ar: "عنب"
                        },
                        description: {
                            en: "",
                            ar: ""
                        },
                        priceFull: 10000
                    },
                    {
                        id: "shisha-grape-mint",
                        name: {
                            en: "Grape & Mint",
                            ar: "عنب ونعناع"
                        },
                        description: {
                            en: "",
                            ar: ""
                        },
                        priceFull: 11000
                    },
                    {
                        id: "shisha-mix",
                        name: {
                            en: "Mix Flavor",
                            ar: "مكس نكهات"
                        },
                        description: {
                            en: "",
                            ar: ""
                        },
                        priceFull: 12000
                    }
                ]
            }
        ]
    },
    // empty (safe)
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
            en: "JOORY – food, drinks and shisha in one place.",
            ar: "جوري – أطعمة، مشروبات وأراكيل في مكان واحد."
        },
        openingTitle: {
            en: "Location",
            ar: "الموقع"
        },
        openings: [],
        exploreTitle: {
            en: "Explore",
            ar: "استكشف"
        },
        exploreLinks: [],
        contactTitle: {
            en: "Address",
            ar: "العنوان"
        },
        contacts: [
            "JOORY",
            "Iraq – Baghdad",
            "https://maps.app.goo.gl/PEkFgDe6DvoScMwU8"
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
"[project]/app/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// app/page.tsx
__turbopack_context__.s([
    "default",
    ()=>HomePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$siteConfig$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/siteConfig.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CafeTemplate$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/CafeTemplate.tsx [app-rsc] (ecmascript)");
;
;
;
function HomePage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CafeTemplate$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CafeTemplate"], {
        config: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$siteConfig$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["defaultSiteConfig"]
    }, void 0, false, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 6,
        columnNumber: 10
    }, this);
}
}),
"[project]/app/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__b8d74c68._.js.map