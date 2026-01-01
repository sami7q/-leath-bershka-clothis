from rest_framework.generics import ListAPIView
from rest_framework.exceptions import ValidationError

from .models import Category, Product
from .serializers import CategoryListSerializer, ProductListSerializer


class CategoryListView(ListAPIView):
    serializer_class = CategoryListSerializer

    def get_queryset(self):
        return Category.objects.filter(is_active=True).order_by("sort_order", "name_en")


class ProductListView(ListAPIView):
    serializer_class = ProductListSerializer

    def get_queryset(self):
        qs = (
            Product.objects.select_related("category")
            .filter(is_active=True, category__is_active=True)
        )

        category = self.request.query_params.get("category")
        ptype = self.request.query_params.get("type")

        if category:
            # allow slug OR numeric id
            if category.isdigit():
                qs = qs.filter(category_id=int(category))
            else:
                qs = qs.filter(category__slug=category)

        if ptype:
            if ptype not in (Product.ProductType.CLOTHES, Product.ProductType.SHOES):
                raise ValidationError({"type": "type must be clothes or shoes"})
            qs = qs.filter(type=ptype)

        return qs.order_by("-created_at")

    def get_serializer_context(self):
        ctx = super().get_serializer_context()
        ctx["request"] = self.request
        return ctx
