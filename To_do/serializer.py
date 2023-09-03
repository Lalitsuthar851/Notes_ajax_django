from rest_framework import serializers
from rest_framework.parsers import FileUploadParser, MultiPartParser, FormParser

from . models import Note,CustomUser

class Profile_Seriralizer(serializers.ModelSerializer):
    profile_picture = serializers.ImageField(required=False)
    # parser_classes = (FileUploadParser, MultiPartParser, FormParser)
    class Meta:
        model=CustomUser
        fields =["id","profile_picture"]
        # fields ="__all__"

class To_doNote_Seriralizer(serializers.ModelSerializer):
    username = serializers.SerializerMethodField()  # Add this line

    def get_username(self, obj):
        return obj.user.username
    class Meta:
        model=Note
        # fields="__all__"
        fields =['id', 'title', 'content', 'username','user','created_at']