from rest_framework import serializers
from ideias.models import Ideia

class IdeiaSerializer(serializers.ModelSerializer):
    class Meta():
        fields = ['id', 'titulo', 'descricao']
        model = Ideia