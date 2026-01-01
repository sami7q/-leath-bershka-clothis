from django.contrib import admin
from django.utils.html import format_html

from .models import Category, Product


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name_en", "name_ar", "slug", "sort_order", "is_active")
    search_fields = ("name_en", "name_ar", "slug")
    list_filter = ("is_active",)
    ordering = ("sort_order", "name_en")
    list_editable = ("sort_order", "is_active")


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = (
        "preview",
        "name_en",
        "sku",
        "category",
        "type",
        "price",
        "old_price",
        "is_active",
        "created_at",
    )
    list_filter = ("category", "type", "is_active")
    search_fields = ("name_en", "name_ar", "sku")
    ordering = ("-created_at",)
    list_editable = ("is_active",)
    autocomplete_fields = ("category",)

    fieldsets = (
        ("Basic", {
            "fields": ("category", "type", "sku", "is_active")
        }),
        ("Content (EN/AR)", {
            "fields": ("name_en", "name_ar", "description_en", "description_ar")
        }),
        ("Pricing", {
            "fields": ("price", "old_price", "badge_en", "badge_ar")
        }),
        ("Image", {
            "fields": ("image",)
        }),
        ("Timestamps", {
            "fields": ("created_at", "updated_at"),
        }),
    )

    readonly_fields = ("created_at", "updated_at")

    def preview(self, obj: Product):
        if obj.image:
            return format_html(
                '<img src="{}" style="width:44px;height:44px;object-fit:cover;border-radius:10px;border:1px solid rgba(255,255,255,0.18);" />',
                obj.image.url,
            )
        return "—"

    preview.short_description = "Image"
