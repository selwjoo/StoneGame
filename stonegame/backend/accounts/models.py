from django.conf import settings
from django.db import models


class GameProgress(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="game_progress")
    total_money = models.BigIntegerField(default=0)
    unlocked_crystals = models.JSONField(default=list)
    selected_crystal = models.PositiveIntegerField(default=0)
    potion_price = models.BigIntegerField(default=30000)

    def save(self, *args, **kwargs):
        unlocked = [int(index) for index in self.unlocked_crystals if isinstance(index, int) or str(index).isdigit()]
        if 0 not in unlocked:
            unlocked.insert(0, 0)
        self.unlocked_crystals = sorted(set(unlocked))
        super().save(*args, **kwargs)
