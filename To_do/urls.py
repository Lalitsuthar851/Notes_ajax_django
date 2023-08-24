from django.urls import path,include
from . import views
from django.conf import settings
from django.conf.urls.static import static
urlpatterns = [
    path('api',views.TodoView.as_view(),name="note"),
    path('api/<int:note_id>',views.TodoDetailsView.as_view(),name="note_details"),
    path('api/login',views.LoginView.as_view(),name="login_user"),
path('api/logout',views.LogoutView.as_view(),name="logout_user"),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)