// app/cart/page.tsx
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useCart } from "@/components/cart/CartProvider";

const BRAND = {
  red: "#E31B23",
  redDeep: "#B80F16",
  paper: "#F7F7F8",
  border: "rgba(255,255,255,0.12)",
  textMuted: "rgba(247,247,248,0.70)",
  textMuted2: "rgba(247,247,248,0.55)",
  card: "rgba(255,255,255,0.04)",
};

function Img({ src, alt }: { src?: string; alt: string }) {
  const [broken, setBroken] = useState(false);

  if (!src || broken) {
    return (
      <div className="flex h-full w-full items-center justify-center text-[10px] font-bold text-white/60">
        IMG
      </div>
    );
  }

  return (
    // ✅ native img => لا يكسر الصفحة لو 404
    <img
      src={src}
      alt={alt}
      className="h-full w-full object-cover"
      onError={() => setBroken(true)}
      loading="lazy"
    />
  );
}

export default function CartPage() {
  const { items, count, total, inc, dec, remove, clear } = useCart();

  const currency = ""; // عدلها لاحقاً اذا تريد
  const WA_PHONE_E164 = "+905015954826";
  const WA_PHONE_LABEL = "+90 501 595 4826";

  const waLink = useMemo(() => {
    const lines: string[] = [];
    lines.push("مرحبا SoftoDev، أريد تأكيد هذا الطلب:");
    lines.push("");

    items.forEach((x, i) => {
      const lineTotal = x.price * x.qty;
      lines.push(`${i + 1}) ${x.name} ×${x.qty} — ${currency}${lineTotal.toFixed(0)}`);
    });

    lines.push("");
    lines.push(`الإجمالي: ${currency}${total.toFixed(0)}`);

    const msg = items.length ? lines.join("\n") : "مرحبا SoftoDev، أريد طلب.";
    return `https://wa.me/${WA_PHONE_E164.replace("+", "")}?text=${encodeURIComponent(msg)}`;
  }, [items, total, currency]);

  return (
    <section
      className="min-h-[100svh] py-10"
      style={{
        background:
          "radial-gradient(1000px 520px at 18% 8%, rgba(227,27,35,0.10), transparent 62%), linear-gradient(to bottom, rgba(11,15,20,0.98), rgba(11,15,20,0.96))",
      }}
    >
      <div className="mx-auto max-w-5xl px-4">
        {/* TOP BAR */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.28em]" style={{ color: BRAND.textMuted2 }}>
              CART
            </p>
            <h1 className="mt-1 text-[26px] font-extrabold" style={{ color: BRAND.paper }}>
              سلة الطلب
            </h1>
            <p className="mt-2 text-[13px]" style={{ color: BRAND.textMuted }}>
              العناصر: {count} • الإجمالي: {currency}{total.toFixed(0)}
            </p>
          </div>

          <Link
            href="/#menu"
            className="inline-flex items-center justify-center rounded-full px-4 py-2 text-[13px] font-extrabold"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: `1px solid ${BRAND.border}`,
              color: BRAND.paper,
            }}
          >
            الرجوع للمنتجات
          </Link>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_360px]">
          {/* ITEMS */}
          <div className="rounded-2xl border p-4" style={{ borderColor: BRAND.border, background: BRAND.card }}>
            {items.length === 0 ? (
              <div className="py-16 text-center">
                <p className="text-[14px] font-extrabold" style={{ color: BRAND.paper }}>
                  السلة فارغة
                </p>
                <p className="mt-2 text-[12px]" style={{ color: BRAND.textMuted }}>
                  أضف منتجات من صفحة المنتجات ثم ارجع هنا.
                </p>

                <Link
                  href="/#menu"
                  className="mt-5 inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-[13px] font-extrabold"
                  style={{
                    background: `linear-gradient(135deg, ${BRAND.red}, ${BRAND.redDeep})`,
                    color: "white",
                    boxShadow: "0 14px 34px rgba(227,27,35,0.20)",
                  }}
                >
                  اذهب للمنتجات
                </Link>
              </div>
            ) : (
              <div className="grid gap-3">
                {items.map((x) => {
                  const lineTotal = x.price * x.qty;

                  return (
                    <div
                      key={x.id}
                      className="flex items-center gap-3 rounded-xl border p-3"
                      style={{ borderColor: BRAND.border, background: "rgba(255,255,255,0.03)" }}
                    >
                      <div className="h-16 w-16 overflow-hidden rounded-xl bg-white/5">
                        <Img src={x.image} alt={x.name} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[13px] font-extrabold" style={{ color: BRAND.paper }}>
                          {x.name}
                        </p>
                        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                          <p className="text-[12px]" style={{ color: BRAND.textMuted }}>
                            السعر: {currency}{x.price.toFixed(0)}
                          </p>
                          <p className="text-[12px]" style={{ color: BRAND.textMuted }}>
                            الإجمالي: {currency}{lineTotal.toFixed(0)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => dec(x.id)}
                          className="h-9 w-9 rounded-xl border text-[16px] font-extrabold"
                          style={{ borderColor: BRAND.border, background: "rgba(255,255,255,0.04)", color: BRAND.paper }}
                        >
                          −
                        </button>
                        <span className="min-w-[26px] text-center text-[13px] font-extrabold" style={{ color: BRAND.paper }}>
                          {x.qty}
                        </span>
                        <button
                          onClick={() => inc(x.id)}
                          className="h-9 w-9 rounded-xl border text-[16px] font-extrabold"
                          style={{ borderColor: BRAND.border, background: "rgba(255,255,255,0.04)", color: BRAND.paper }}
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => remove(x.id)}
                        className="hidden sm:inline-flex h-9 items-center justify-center rounded-xl border px-3 text-[12px] font-extrabold"
                        style={{ borderColor: BRAND.border, background: "rgba(255,255,255,0.04)", color: BRAND.paper }}
                      >
                        حذف
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* SUMMARY */}
          <aside className="rounded-2xl border p-4" style={{ borderColor: BRAND.border, background: BRAND.card }}>
            <p className="text-[13px] font-extrabold" style={{ color: BRAND.paper }}>
              ملخص الطلب
            </p>

            <div className="mt-3 grid gap-2">
              <div className="flex items-center justify-between text-[12px]" style={{ color: BRAND.textMuted }}>
                <span>عدد العناصر</span>
                <span className="font-extrabold" style={{ color: BRAND.paper }}>{count}</span>
              </div>

              <div className="flex items-center justify-between text-[12px]" style={{ color: BRAND.textMuted }}>
                <span>الإجمالي</span>
                <span className="font-extrabold" style={{ color: BRAND.paper }}>
                  {currency}{total.toFixed(0)}
                </span>
              </div>

              <div className="mt-2 h-px w-full" style={{ background: "rgba(255,255,255,0.10)" }} />

              <div className="flex items-center justify-between">
                <span className="text-[12px] font-extrabold" style={{ color: BRAND.paper }}>
                  المبلغ النهائي
                </span>
                <span className="text-[16px] font-extrabold" style={{ color: BRAND.paper }}>
                  {currency}{total.toFixed(0)}
                </span>
              </div>
            </div>

            <a
              href={waLink}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex w-full items-center justify-center rounded-xl px-5 py-2.5 text-[13px] font-extrabold"
              style={{
                background: `linear-gradient(135deg, ${BRAND.red}, ${BRAND.redDeep})`,
                color: "white",
                boxShadow: "0 14px 34px rgba(227,27,35,0.20)",
              }}
              title={WA_PHONE_LABEL}
            >
              إتمام الطلب عبر واتساب
            </a>

            <button
              onClick={clear}
              disabled={items.length === 0}
              className="mt-2 inline-flex w-full items-center justify-center rounded-xl px-5 py-2.5 text-[13px] font-extrabold disabled:opacity-50"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: `1px solid ${BRAND.border}`,
                color: BRAND.paper,
              }}
            >
              تفريغ السلة
            </button>

            <p className="mt-3 text-[10px] font-bold text-white/45">الدعم: {WA_PHONE_LABEL}</p>
          </aside>
        </div>
      </div>
    </section>
  );
}
