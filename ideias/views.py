from rest_framework import viewsets
from ideias.models import Ideia
from ideias.serializers import IdeiaSerializer

class IdeiasViewSet(viewsets.ModelViewSet):
    queryset = Ideia.objects.all()
    serializer_class = IdeiaSerializer