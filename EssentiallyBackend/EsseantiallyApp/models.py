import random
from django.db import models


class Stock(models.Model):
    name = models.CharField(max_length=255)
    previous_close = models.FloatField()
    refresh_interval = models.IntegerField(default=1)

    def update_price(self):
        # Update price with random value
        self.previous_close += random.uniform(-0.1, 0.1) * self.previous_close
        self.save()

