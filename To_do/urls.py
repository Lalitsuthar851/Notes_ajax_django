from django.urls import path,include
from . import views
from django.conf import settings
from django.conf.urls.static import static
urlpatterns = [
    path('api',views.TodoView.as_view(),name="note"),
    path('api/<int:note_id>',views.TodoDetailsView.as_view(),name="note_details"),
    path('api/login',views.LoginView.as_view(),name="login_user"),
path('api/logout',views.LogoutView.as_view(),name="logout_user"),
path('api/search/<str:query>',views.SearchitemView.as_view(),name="search item"),
path('api/profile',views.Profile_Update.as_view(),name="Profile"),
path('api/likes/<int:note_id>',views.Likes.as_view(),name="likes")
]
