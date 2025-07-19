from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        if not extra_fields.get('role'):
            raise ValueError('The Role field must be set')
            
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password) # Handles password hashing
        user.save(using=self._db)
        return user

class User(AbstractBaseUser):
    class Role(models.TextChoices):
        ADMIN = "admin", "Admin"
        EMPLOYEE = "employee", "Employee"

    # --- SHARED FIELDS ---
    full_name = models.CharField(max_length=255) # Replaced first_name and last_name
    email = models.EmailField(unique=True) # The user's unique identifier
    role = models.CharField(max_length=50, choices=Role.choices)
    is_active = models.BooleanField(default=True)
    
    # --- ADMIN-SPECIFIC FIELDS ---
    admin_phone = models.CharField(max_length=20, blank=True, null=True)
    admin_address = models.TextField(blank=True, null=True)
    admin_image = models.ImageField(upload_to='admin_images/', blank=True, null=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['full_name', 'role']
    
    # We are not using Django's built-in permissions
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    
    def __str__(self):
        return f"{self.email} ({self.get_role_display()})"
    
    def has_perm(self, perm, obj=None):
        return False

    def has_module_perms(self, app_label):
        return False