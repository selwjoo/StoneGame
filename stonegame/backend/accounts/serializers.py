from django.contrib.auth.models import User
from rest_framework import serializers
from .models import GameProgress

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
        )
        return user


class GameProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model = GameProgress
        fields = ["total_money", "unlocked_crystals", "selected_crystal"]
        
