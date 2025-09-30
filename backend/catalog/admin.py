from django.contrib import admin
from .models import Product, Order, OrderItem

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("title","price_cents","published","created_at")
    list_filter = ("published",)
    search_fields = ("title","slug")

class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ("id","customer_name","phone","status","total_cents","created_at")
    list_filter = ("status",)
    search_fields = ("customer_name","phone")
    inlines = [OrderItemInline]
