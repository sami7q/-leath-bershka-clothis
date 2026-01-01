# backend/catalog/admin.py
from django.contrib import admin
from django.utils.html import format_html
from django.utils.translation import gettext_lazy as _
from .models import Category, Product

# ✅ Arabic titles for admin
admin.site.site_header = "لوحة إدارة ليث بيرشكا"
admin.site.site_title = "Leath Bershka Admin"
admin.site.index_title = "إدارة المحتوى"


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name_ar", "name_en", "slug", "sort_order", "is_active")
    search_fields = ("name_en", "name_ar", "slug")
    list_filter = ("is_active",)
    ordering = ("sort_order", "name_en")
    list_editable = ("sort_order", "is_active")
    prepopulated_fields = {"slug": ("name_en",)}  # ✅ auto slug from EN name (optional)


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    # ✅ Faster usage: show thumbnail + key fields
    list_display = (
        "preview",
        "name_ar",
        "name_en",
        "sku",
        "category",
        "type",
        "price",
        "old_price",
        "is_active",
        "created_at",
    )

    # ✅ Quick toggle + ordering
    list_editable = ("is_active",)

    # ✅ Filters & search
    list_filter = ("category", "type", "is_active")
    search_fields = ("name_en", "name_ar", "sku")
    ordering = ("-created_at",)

    # ✅ Better UX for FK (searchable dropdown)
    autocomplete_fields = ("category",)

    # ✅ Group fields in a clean way (Arabic labels)
    fieldsets = (
        (_("معلومات أساسية"), {
            "fields": ("category", "type", "sku", "is_active"),
        }),
        (_("المحتوى والترجمة"), {
            "fields": (
                ("name_ar", "name_en"),
                ("description_ar", "description_en"),
            )
        }),
        (_("الأسعار"), {
            "fields": (
                ("price", "old_price"),
                ("badge_ar", "badge_en"),
            )
        }),
        (_("الصورة"), {
            "fields": ("image", "image_preview"),
        }),
        (_("التواريخ"), {
            "fields": ("created_at", "updated_at"),
        }),
    )

    # ✅ Readonly timestamps + preview
    readonly_fields = ("created_at", "updated_at", "image_preview")

    # ✅ Better thumbnail in list
    @admin.display(description="صورة")
    def preview(self, obj: Product):
        if obj.image:
            return format_html(
                """
                <div style="
                    width:48px;height:48px;border-radius:14px;overflow:hidden;
                    border:1px solid rgba(255,255,255,0.16);
                    box-shadow:0 10px 25px rgba(0,0,0,0.28);
                    background:rgba(255,255,255,0.06);
                ">
                  <img src="{}" style="width:100%;height:100%;object-fit:cover;display:block;" />
                </div>
                """,
                obj.image.url,
            )
        return format_html(
            '<div style="width:48px;height:48px;border-radius:14px;'
            'border:1px dashed rgba(255,255,255,0.20);'
            'display:flex;align-items:center;justify-content:center;'
            'color:rgba(255,255,255,0.55);font-weight:800;">—</div>'
        )

    # ✅ Big preview inside product page
    @admin.display(description="معاينة الصورة")
    def image_preview(self, obj: Product):
        if obj.image:
            return format_html(
                """
                <a href="{0}" target="_blank" style="text-decoration:none;">
                  <img src="{0}" style="
                      width:180px;height:180px;object-fit:cover;border-radius:18px;
                      border:1px solid rgba(255,255,255,0.16);
                      box-shadow:0 18px 55px rgba(0,0,0,0.35);
                      display:block;
                  "/>
                  <div style="margin-top:8px;color:rgba(255,255,255,0.72);font-size:12px;font-weight:800;">
                    فتح الصورة بحجم كامل ↗
                  </div>
                </a>
                """,
                obj.image.url,
            )
        return format_html(
            '<div style="color:rgba(255,255,255,0.62);font-weight:700;">لا توجد صورة</div>'
        )
