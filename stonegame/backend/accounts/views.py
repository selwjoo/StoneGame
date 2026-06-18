from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.models import User
from .models import GameProgress
from .serializers import GameProgressSerializer, RegisterSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer


class GameProgressView(APIView):
    permission_classes = [IsAuthenticated]

    def get_progress(self, user):
        progress, _ = GameProgress.objects.get_or_create(
            user=user,
            defaults={"unlocked_crystals": [0]},
        )
        return progress

    def get(self, request):
        progress = self.get_progress(request.user)
        serializer = GameProgressSerializer(progress)
        return Response(serializer.data)

    def put(self, request):
        progress = self.get_progress(request.user)
        serializer = GameProgressSerializer(progress, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
