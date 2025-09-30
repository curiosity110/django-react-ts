from rest_framework import viewsets, mixins, permissions
from rest_framework.response import Response
from .models import Product, Order
from .serializers import ProductSerializer, OrderCreateSerializer
from rest_framework.decorators import action

class ProductViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    queryset = Product.objects.filter(published=True).order_by("-created_at")
    serializer_class = ProductSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = "slug"

class OrderViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    queryset = Order.objects.all().order_by("-created_at")
    serializer_class = OrderCreateSerializer
    permission_classes = [permissions.AllowAny]  # create is public (COD)
