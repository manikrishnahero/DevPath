# courses/serializers.py
from rest_framework import serializers
from .models import Category, Instructor, Course
from .models import ProgrammingLanguage
from .models import Video


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ("id", "name", "slug")


class InstructorSerializer(serializers.ModelSerializer):
    avatar = serializers.SerializerMethodField()

    class Meta:
        model = Instructor
        fields = ("id", "name", "title", "avatar")

    def get_avatar(self, obj):
        if not obj.avatar:
            return None
        request = self.context.get("request")
        return request.build_absolute_uri(obj.avatar.url) if request else obj.avatar.url


class CourseSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    instructor = InstructorSerializer(read_only=True)
    thumbnail = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = (
            "id", "title", "slug", "category", "instructor", "thumbnail", "badge",
            "rating", "rating_count", "duration_hours", "students_count",
            "price", "original_price",
        )

    def get_thumbnail(self, obj):
        request = self.context.get("request")
        return request.build_absolute_uri(obj.thumbnail.url) if request else obj.thumbnail.url


class ProgrammingLanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProgrammingLanguage
        fields = [
            "id",
            "name",
            "slug",
            "description",
            "logo",
            "difficulty",
            "is_active",
            "created_at",
        ]
        read_only_fields = ["id", "created_at"]




class VideoSerializer(serializers.ModelSerializer):
    video_file = serializers.FileField(use_url=True, read_only=True)

    class Meta:
        model = Video
        fields = (
            "id",
            "title",
            "description",
            "video_file",
            "course",
            "programming_language",
            "position",
            "is_published",
            "created_at",
        )


class VideoUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = (
            "id",
            "title",
            "description",
            "video_file",
            "course",
            "programming_language",
            "position",
            "is_published",
        )

    def validate(self, attrs):
        course = attrs.get(
            "course",
            getattr(self.instance, "course", None),
        )

        language = attrs.get(
            "programming_language",
            getattr(self.instance, "programming_language", None),
        )

        if (course is None) == (language is None):
            raise serializers.ValidationError(
                "Select exactly one course or programming language."
            )

        return attrs

    def validate_video_file(self, value):
        allowed_extensions = (".mp4", ".webm", ".ogg")

        filename = value.name.lower()

        if not filename.endswith(allowed_extensions):
            raise serializers.ValidationError(
                "Only MP4, WebM, and OGG video files are allowed."
            )

        return value
