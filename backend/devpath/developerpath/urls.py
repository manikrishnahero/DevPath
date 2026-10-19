
from django.urls import path
from . import views
from .views import CategoryListAPIView, CourseListAPIView, CourseDetailAPIView
from .views import *

urlpatterns = [
    path(
        "register/", 
        views.register_user, 
        name="register"
    ),
    path(
        "login/", 
        views.login_user, 
        name="login"
    ),
    path(
        "logout/", 
        views.logout_user, 
        name="logout"
    ),
    path(
        "categories/", 
         CategoryListAPIView.as_view(), 
         name="category-list"
    ),
    path(
        "courses/", 
        CourseListAPIView.as_view(), 
        name="course-list"
    ),
    path("courses/<slug:slug>/", 
         CourseDetailAPIView.as_view(), 
         name="course-detail"
    ),
    path(
        "programming-languages/",
        ProgrammingLanguageListCreateAPIView.as_view(),
        name="programming-language-list",
    ),
    path(
        "programming-languages/<int:pk>/",
        ProgrammingLanguageDetailAPIView.as_view(),
        name="programming-language-detail",
    ),
     path(
         "videos/", 
         VideoListView.as_view(), 
         name="video-list"
    ),
    path(
        "videos/upload/",
        VideoUploadView.as_view(),
        name="video-upload",
    ),
]
