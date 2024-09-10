from rest_framework import serializers

from .models import Product


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price']

    def validate_name(self, value):
        if not value.strip():
            raise serializers.ValidationError('Название продукта не может быть пустым.')
        return value

    def validate_price(self, value):
        if value <= 0:
            raise serializers.ValidationError('Цена должна быть положительным числом.')
        return value

    def validate_description(self, value):
        if len(value) < 10:
            raise serializers.ValidationError('Описание должно содержать не менее 10 символов.')
        return value
