import uuid
from django.db import models


class Category(models.Model):
    slug = models.SlugField(unique=True, max_length=80)
    name_en = models.CharField(max_length=120)
    name_ar = models.CharField(max_length=120)

    sort_order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["sort_order", "name_en"]

    def __str__(self) -> str:
        return self.name_en


class Product(models.Model):
    class ProductType(models.TextChoices):
        CLOTHES = "clothes", "Clothes"
        SHOES = "shoes", "Shoes"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    category = models.ForeignKey(Category, on_delete=models.PROTECT, related_name="products")
    sku = models.CharField(max_length=64, unique=True, null=True, blank=True)

    type = models.CharField(max_length=16, choices=ProductType.choices)

    name_en = models.CharField(max_length=160)
    name_ar = models.CharField(max_length=160)

    description_en = models.TextField(null=True, blank=True)
    description_ar = models.TextField(null=True, blank=True)

    price = models.DecimalField(max_digits=12, decimal_places=2)
    old_price = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)

    badge_en = models.CharField(max_length=40, null=True, blank=True)
    badge_ar = models.CharField(max_length=40, null=True, blank=True)

    image = models.ImageField(upload_to="products/", null=True, blank=True)

    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return self.name_en
