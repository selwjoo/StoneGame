from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("accounts", "0001_gameprogress"),
    ]

    operations = [
        migrations.AddField(
            model_name="gameprogress",
            name="potion_price",
            field=models.BigIntegerField(default=30000),
        ),
    ]
