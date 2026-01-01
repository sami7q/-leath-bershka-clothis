from rest_framework import serializers
from .models import Category, Product


class CategoryListSerializer(serializers.ModelSerializer):
    label = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ["id", "slug", "label"]

    def get_label(self, obj: Category):
        return {"en": obj.name_en, "ar": obj.name_ar}


class ProductListSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()
    badge = serializers.SerializerMethodField()
    priceFull = serializers.SerializerMethodField()
    oldPrice = serializers.SerializerMethodField()
    image = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ["id", "type", "name", "description", "priceFull", "oldPrice", "badge", "image"]

    def get_name(self, obj: Product):
        return {"en": obj.name_en, "ar": obj.name_ar}

    def get_description(self, obj: Product):
        return {"en": obj.description_en or "", "ar": obj.description_ar or ""}

    def get_badge(self, obj: Product):
        if not obj.badge_en and not obj.badge_ar:
            return None
        return {"en": obj.badge_en or "", "ar": obj.badge_ar or ""}

    def get_priceFull(self, obj: Product):
        return float(obj.price)

    def get_oldPrice(self, obj: Product):
        return float(obj.old_price) if obj.old_price is not None else None

    def get_image(self, obj: Product):
        if not obj.image:
            return None
        request = self.context.get("request")
        return request.build_absolute_uri(obj.image.url) if request else obj.image.url
