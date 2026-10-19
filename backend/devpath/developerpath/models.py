from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.text import slugify
from django.core.exceptions import ValidationError
from django.db.models import Q


class User(AbstractUser):
    pass



class Category(models.Model):
    name = models.CharField(max_length=60, unique=True)
    slug = models.SlugField(max_length=70, unique=True, blank=True)
    order = models.PositiveSmallIntegerField(default=0, help_text="Tab order in the filter bar")

    class Meta:
        verbose_name_plural = "categories"
        ordering = ["order", "name"]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Instructor(models.Model):
    name = models.CharField(max_length=100)
    title = models.CharField(max_length=120, help_text="e.g. Senior Staff Engineer")
    avatar = models.ImageField(upload_to="instructors/", blank=True, null=True)

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name


class Course(models.Model):
    class Badge(models.TextChoices):
        NONE = "", "None"
        BESTSELLER = "Bestseller", "Bestseller"
        TRENDING = "Trending", "Trending"
        POPULAR = "Popular", "Popular"

    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=220, unique=True, blank=True)
    category = models.ForeignKey(Category, on_delete=models.PROTECT, related_name="courses")
    instructor = models.ForeignKey(Instructor, on_delete=models.PROTECT, related_name="courses")
    thumbnail = models.ImageField(upload_to="courses/")
    badge = models.CharField(max_length=20, choices=Badge.choices, blank=True, default=Badge.NONE)

    rating = models.DecimalField(max_digits=3, decimal_places=2, default=0)
    rating_count = models.PositiveIntegerField(default=0)
    duration_hours = models.PositiveIntegerField(default=0)
    students_count = models.PositiveIntegerField(default=0)

    price = models.DecimalField(max_digits=8, decimal_places=2)
    original_price = models.DecimalField(max_digits=8, decimal_places=2, blank=True, null=True)

    is_featured = models.BooleanField(default=True)
    is_published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def save(self, *args, **kwargs):
        if not self.slug:
            base = slugify(self.title)[:200]
            slug, n = base, 1
            while Course.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                n += 1
                slug = f"{base}-{n}"
            self.slug = slug
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title



class ProgrammingLanguage(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(unique=True)
    description = models.TextField()
    logo = models.ImageField(upload_to="programming_languages/logos/", blank=True)
    difficulty = models.CharField(
        max_length=20,
        choices=[
            ("Beginner", "Beginner"),
            ("Intermediate", "Intermediate"),
            ("Advanced", "Advanced"),
        ],
        default="Beginner",
    )
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ["name"]




class Video(models.Model):
    title = models.CharField(max_length=200)

    description = models.TextField(blank=True)

    video_file = models.FileField(
        upload_to="videos/",
        help_text="Upload an MP4, WebM, or OGG video."
    )

    course = models.ForeignKey(
        "Course",
        on_delete=models.CASCADE,
        related_name="videos",
        null=True,
        blank=True,
    )

    programming_language = models.ForeignKey(
        "ProgrammingLanguage",
        on_delete=models.CASCADE,
        related_name="videos",
        null=True,
        blank=True,
    )

    position = models.PositiveIntegerField(default=0)

    is_published = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["position", "id"]
        constraints = [
            models.CheckConstraint(
                condition=(
                    (
                        Q(course__isnull=False)
                        & Q(programming_language__isnull=True)
                    )
                    |
                    (
                        Q(course__isnull=True)
                        & Q(programming_language__isnull=False)
                    )
                ),
                name="video_has_exactly_one_parent",
            ),
        ]

    def clean(self):
        super().clean()

        if (
            self.course_id is None
        ) == (
            self.programming_language_id is None
        ):
            raise ValidationError(
                "A video must belong to exactly one course "
                "or programming language."
            )

    def __str__(self):
        return self.title
