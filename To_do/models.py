from django.db import models
from django.contrib.auth.models import User, AbstractUser
from django.conf import settings
from .managers import CustomUserManager


# Create your models here.
class CustomUser(AbstractUser):
    profile_picture = models.ImageField(upload_to='profile_pics/', blank=True, null=True)

    objects = CustomUserManager()
    def __str__(self):
        return self.username


class Note(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    title = models.CharField(max_length=150)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    likes = models.ManyToManyField(CustomUser, related_name='blogpost_like',blank=True)
    def number_of_likes(self):
        return self.likes.count()
    def __str__(self):
        return self.title
