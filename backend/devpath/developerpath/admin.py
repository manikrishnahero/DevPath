

# Register your models here.

from django.contrib import admin
from django.contrib.auth.models import User
from .models import Category, Instructor, Course
from .models import ProgrammingLanguage
from .models import Video



# Register the User model
admin.site.register(User)



@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "slug", "order")
    list_editable = ("order",)
    prepopulated_fields = {"slug": ("name",)}
    search_fields = ("name",)
 
 
@admin.register(Instructor)
class InstructorAdmin(admin.ModelAdmin):
    list_display = ("name", "title")
    search_fields = ("name", "title")
 
 
@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = (
        "title", "category", "instructor", "badge", "rating",
        "price", "original_price", "is_featured", "is_published",
    )
    list_filter = ("category", "badge", "is_featured", "is_published")
    list_editable = ("is_featured", "is_published")
    search_fields = ("title", "instructor__name")
    prepopulated_fields = {"slug": ("title",)}
    autocomplete_fields = ("instructor",)
    readonly_fields = ("created_at", "updated_at")
    fieldsets = (
        ("Basic", {"fields": ("title", "slug", "category", "instructor", "thumbnail", "badge")}),
        ("Stats", {"fields": ("rating", "rating_count", "duration_hours", "students_count")}),
        ("Pricing", {"fields": ("price", "original_price")}),
        ("Visibility", {"fields": ("is_featured", "is_published")}),
        ("Timestamps", {"fields": ("created_at", "updated_at")}),
    )


@admin.register(ProgrammingLanguage)
class ProgrammingLanguageAdmin(admin.ModelAdmin):
    list_display = ("name", "difficulty", "is_active")
    list_filter = ("difficulty", "is_active")
    search_fields = ("name",)
    prepopulated_fields = {"slug": ("name",)}




@admin.register(Video)
class VideoAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "title",
        "course",
        "programming_language",
        "position",
        "is_published",
        "created_at",
    )

    list_display_links = ("id", "title")

    list_filter = (
        "is_published",
        "course",
        "programming_language",
        "created_at",
    )

    search_fields = (
        "title",
        "description",
        "course__title",
        "programming_language__name",
    )

    list_editable = (
        "position",
        "is_published",
    )

    ordering = ("position", "id")

    readonly_fields = ("created_at",)

    fieldsets = (
        (
            "Video Information",
            {
                "fields": (
                    "title",
                    "description",
                    "video_file",
                )
            },
        ),
        (
            "Course / Programming Language",
            {
                "fields": (
                    "course",
                    "programming_language",
                )
            },
        ),
        (
            "Publishing Settings",
            {
                "fields": (
                    "position",
                    "is_published",
                    "created_at",
                )
            },
        ),
    )

    def save_model(self, request, obj, form, change):
        obj.full_clean()
        super().save_model(request, obj, form, change)

 
