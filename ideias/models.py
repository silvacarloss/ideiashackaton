from django.db import models

# Create your models here.
class Ideia(models.Model):
    titulo = models.CharField(max_length=30)
    descricao = models.CharField(max_length=1000)

    def __str__(self):
        return self.titulo
