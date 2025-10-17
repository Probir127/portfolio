from django.db import models

class CV(models.Model):
    full_name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    address = models.CharField(max_length=200)

    institution = models.CharField(max_length=100)
    degree = models.CharField(max_length=100)
    passing_year = models.CharField(max_length=10)

    company = models.CharField(max_length=100)
    role = models.CharField(max_length=100)
    duration = models.CharField(max_length=50)
    description = models.TextField()

    skills = models.CharField(max_length=200)
    profile_picture = models.ImageField(upload_to='profile_pics/', blank=True, null=True)

    def __str__(self):
        return self.full_name
