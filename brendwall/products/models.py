from django.core.exceptions import ValidationError
from django.db import models


class Product(models.Model):
    """Модель продукта."""
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.name

    def clean(self):
        if not self.name.strip():
            raise ValidationError('Название продукта не может быть пустым.')

        if self.price <= 0:
            raise ValidationError('Цена продукта должна быть положительным числом.')

        if len(self.description) < 10:
            raise ValidationError('Описание продукта должно содержать не менее 10 символов.')
