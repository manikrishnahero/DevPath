import re
import logging

from django.contrib.auth import authenticate, get_user_model
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from django.db import transaction
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from .models import Category, Course
from .serializers import CategorySerializer, CourseSerializer
from rest_framework import generics
from .models import ProgrammingLanguage
from .serializers import ProgrammingLanguageSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAdminUser
from rest_framework.generics import ListAPIView, CreateAPIView

from .models import Video
from .serializers import VideoSerializer, VideoUploadSerializer

# Custom user model (AUTH_USER_MODEL = "developerpath.User")
User = get_user_model()

logger = logging.getLogger(__name__)


# -------------------------
# PASSWORD VALIDATION
# -------------------------
def validate_strong_password(password):
    if len(password) < 8:
        return "Password must contain at least 8 characters."

    if not re.search(r"[A-Z]", password):
        return "Password must contain at least one uppercase letter."

    if not re.search(r"[a-z]", password):
        return "Password must contain at least one lowercase letter."

    if not re.search(r"\d", password):
        return "Password must contain at least one number."

    if not re.search(r"[^A-Za-z0-9]", password):
        return "Password must contain at least one special character."

    return None


# -------------------------
# REGISTER API
# -------------------------
@api_view(["POST"])
def register_user(request):
    username = str(request.data.get("username", "")).strip()
    email = str(request.data.get("email", "")).strip()
    password = request.data.get("password", "")
    confirm_password = request.data.get("confirm_password", "")

    # Check required fields
    if not all([username, email, password, confirm_password]):
        return Response(
            {"error": "All fields are required."},
            status=status.HTTP_400_BAD_REQUEST
        )

    # Validate username
    if User.objects.filter(username__iexact=username).exists():
        return Response(
            {"error": "Username already exists."},
            status=status.HTTP_400_BAD_REQUEST
        )

    # Validate email format
    try:
        validate_email(email)
    except ValidationError:
        return Response(
            {"error": "Please enter a valid email address."},
            status=status.HTTP_400_BAD_REQUEST
        )

    # Check duplicate email (case-insensitive)
    if User.objects.filter(email__iexact=email).exists():
        return Response(
            {"error": "Email is already registered."},
            status=status.HTTP_400_BAD_REQUEST
        )

    # Confirm password
    if password != confirm_password:
        return Response(
            {"error": "Passwords do not match."},
            status=status.HTTP_400_BAD_REQUEST
        )

    # Strong password validation
    password_error = validate_strong_password(password)

    if password_error:
        return Response(
            {"error": password_error},
            status=status.HTTP_400_BAD_REQUEST
        )

    # Create user safely
    try:
        with transaction.atomic():
            user = User.objects.create_user(
                username=username,
                email=email,
                password=password
            )
    except Exception:
        # Full error goes to the Render logs
        logger.exception("Registration failed")
        return Response(
            {"error": "Registration failed. Please try again."},
            status=status.HTTP_400_BAD_REQUEST
        )

    return Response(
        {
            "message": "Registration successful.",
            "username": user.username,
            "email": user.email
        },
        status=status.HTTP_201_CREATED
    )


# -------------------------
# LOGIN API
# -------------------------
@api_view(["POST"])
def login_user(request):
    username = request.data.get("username", "").strip()
    password = request.data.get("password", "")

    if not username or not password:
        return Response(
            {"error": "Username and password are required."},
            status=status.HTTP_400_BAD_REQUEST
        )

    user = authenticate(
        request,
        username=username,
        password=password
    )

    if user is None:
        return Response(
            {"error": "Invalid username or password."},
            status=status.HTTP_401_UNAUTHORIZED
        )

    refresh = RefreshToken.for_user(user)

    return Response(
        {
            "message": "Login successful.",
            "username": user.username,
            "email": user.email,
            "access": str(refresh.access_token),
            "refresh": str(refresh)
        },
        status=status.HTTP_200_OK
    )


# -------------------------
# LOGOUT API
# -------------------------
@api_view(["POST"])
def logout_user(request):
    refresh_token = request.data.get("refresh")

    if not refresh_token:
        return Response(
            {"error": "Refresh token is required."},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        token = RefreshToken(refresh_token)
        token.blacklist()

        return Response(
            {"message": "Logout successful."},
            status=status.HTTP_200_OK
        )

    except TokenError:
        return Response(
            {"error": "Invalid or expired refresh token."},
            status=status.HTTP_400_BAD_REQUEST
        )






class CategoryListAPIView(APIView):
    permission_classes = [AllowAny]
 
    def get(self, request):
        categories = Category.objects.all()
        return Response(CategorySerializer(categories, many=True).data)
 
 
class CourseListAPIView(APIView):
    """GET /api/courses/?category=web-dev&limit=6"""
    permission_classes = [AllowAny]
 
    def get(self, request):
        qs = (
            Course.objects.filter(is_published=True, is_featured=True)
            .select_related("category", "instructor")
        )
 
        category = request.query_params.get("category")
        if category and category.lower() != "all":
            qs = qs.filter(category__slug=category)
 
        limit = request.query_params.get("limit")
        if limit and limit.isdigit():
            qs = qs[: int(limit)]
 
        serializer = CourseSerializer(qs, many=True, context={"request": request})
        return Response(serializer.data)
 
 
class CourseDetailAPIView(APIView):
    """GET /api/courses/<slug>/"""
    permission_classes = [AllowAny]
 
    def get(self, request, slug):
        try:
            course = Course.objects.select_related("category", "instructor").get(
                slug=slug, is_published=True
            )
        except Course.DoesNotExist:
            return Response({"detail": "Course not found."}, status=status.HTTP_404_NOT_FOUND)
        return Response(CourseSerializer(course, context={"request": request}).data)




class ProgrammingLanguageListCreateAPIView(
    generics.ListCreateAPIView
):
    serializer_class = ProgrammingLanguageSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return ProgrammingLanguage.objects.filter(
            is_active=True
        )


class ProgrammingLanguageDetailAPIView(
    generics.RetrieveUpdateDestroyAPIView
):
    queryset = ProgrammingLanguage.objects.all()
    serializer_class = ProgrammingLanguageSerializer
    permission_classes = [AllowAny]





class VideoListView(ListAPIView):
    serializer_class = VideoSerializer

    def get_queryset(self):
        queryset = Video.objects.filter(is_published=True)

        course_id = self.request.query_params.get("course")
        language_id = self.request.query_params.get(
            "programming_language"
        )

        if bool(course_id) == bool(language_id):
            raise ValidationError(
                "Provide exactly one of course or programming_language."
            )

        if course_id:
            return queryset.filter(course_id=course_id)

        return queryset.filter(
            programming_language_id=language_id
        )


class VideoUploadView(CreateAPIView):
    queryset = Video.objects.all()
    serializer_class = VideoUploadSerializer
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [IsAdminUser]


 