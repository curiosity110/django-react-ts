from rest_framework import serializers
from .models import Product, Order, OrderItem

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ("id","slug","title","description","price_cents", "created_at")

class OrderItemCreateSerializer(serializers.ModelSerializer):
    product = serializers.UUIDField()
    class Meta:
        model = OrderItem
        fields = ("product","quantity")

class OrderCreateSerializer(serializers.ModelSerializer):
    items = OrderItemCreateSerializer(many=True)

    class Meta:
        model = Order
        fields = ("customer_name","phone","address","note","items")

    def create(self, validated_data):
        items = validated_data.pop("items")
        order = Order.objects.create(**validated_data, payment_method="COD", status="new")
        total = 0
        # snapshot current price at order time
        from .models import Product
        for it in items:
            p = Product.objects.get(id=it["product"], published=True)
            qty = int(it.get("quantity", 1))
            line = p.price_cents * qty
            total += line
            OrderItem.objects.create(order=order, product=p, quantity=qty, price_cents=p.price_cents)
        order.total_cents = total
        order.save()
        return order
