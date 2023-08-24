from django.shortcuts import render, HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import *
from .serializer import To_doNote_Seriralizer
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate, login
from django.http import HttpResponse
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from django.contrib.auth import get_user_model
User=get_user_model


# Create your views here.
class TodoView(APIView):
    def get(self, request):
        print(request.session.get("user_details"),",,,,,")
        # print(request.session["token"])
        data = Note.objects.all()
        serializer = To_doNote_Seriralizer(data, many=True)
        return Response(serializer.data)

    def post(self, request):
        data = {'title': request.data.get("title"), "content": request.data.get("content"), "user": request.user.id}
        # data=Note.objects.create()
        ser = To_doNote_Seriralizer(data=data)
        if ser.is_valid():
            ser.save()
            return Response("data saved")
        return Response("not saved")


class TodoDetailsView(APIView):
    permission_classes = [IsAuthenticated]


    def get(self, request, note_id):
        print(request.session['auth_token'])
        print(Note.objects.get(id=note_id))
        serd = To_doNote_Seriralizer(Note.objects.get(id=note_id))
        return Response(serd.data)

    def put(self, request, note_id):
        data = {'title': request.data.get("title"), "content": request.data.get("content")}
        print(request.user.id)
        instanc = Note.objects.get(id=note_id, user=request.user.id)
        ser = To_doNote_Seriralizer(instance=instanc, data=data, partial=True)
        if ser.is_valid():
            ser.save()
            return Response("data update")

        return Response("not updated")

    def delete(self, request, note_id):
        '''
        Deletes the todo item with given todo_id if exists
        '''
        print(request.user.id)
        todo_instance = Note.objects.get(id=note_id, user=request.user.id)
        print(todo_instance)
        if not todo_instance:
            return Response(
                {"res": "Object with todo id does not exists"},
                status=status.HTTP_400_BAD_REQUEST
            )
        todo_instance.delete()
        return Response(
            {"res": "Object deleted!"},
            status=status.HTTP_200_OK
        )


class LoginView(APIView):
    def post(self, request):

        username = request.data.get('username')
        password = request.data.get('password')

        if username is None or password is None:
            return Response({'error': 'Please provide both username and password'},
                            status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(username=username, password=password)

        if user:
            login(request, user)
        else:
            return Response({'error': 'Invalid credentials'},
                            status=status.HTTP_401_UNAUTHORIZED)
        token, created = Token.objects.get_or_create(user=user)
        return Response({"authorized":True,'token': token.key,'user':request.user.username,"photo":str(request.user.profile_picture)})



class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # Get the user's token
        user_token = Token.objects.get(user=request.user)

        # Delete the token
        user_token.delete()

        return Response({'message': 'Logged out successfully'})




