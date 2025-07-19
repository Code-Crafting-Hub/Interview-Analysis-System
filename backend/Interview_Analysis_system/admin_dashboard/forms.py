# admin_dashboard/forms.py

from django import forms
from django.contrib.auth.forms import ReadOnlyPasswordHashField
from .models import User

class UserCreationForm(forms.ModelForm):
    """
    A custom form for creating new users in the Django admin.
    This form includes password confirmation to prevent typos.
    """
    # Define password fields explicitly so we can use a password widget
    # and add a confirmation field.
    password = forms.CharField(label='Password', widget=forms.PasswordInput)
    password2 = forms.CharField(label='Password confirmation', widget=forms.PasswordInput)

    class Meta:
        model = User
        # List the fields that will appear on the "Add user" form.
        fields = ('email', 'full_name', 'role')

    def clean_password2(self):
        # This special method validates a single field.
        # Here, we check that the two password fields match.
        password = self.cleaned_data.get("password")
        password2 = self.cleaned_data.get("password2")
        if password and password2 and password != password2:
            raise forms.ValidationError("Passwords don't match.")
        return password2

    def save(self, commit=True):
        # Override the default save method to handle password hashing.
        # Get the user object from the form but don't save it to the DB yet.
        user = super().save(commit=False)
        
        # Take the plain-text password from the form and set it on the user
        # object. The set_password() method handles the secure hashing.
        user.set_password(self.cleaned_data["password"])
        
        if commit:
            user.save()
            
        return user


class UserChangeForm(forms.ModelForm):
    """
    A custom form for updating an existing user in the Django admin.
    """
    # This special field from Django displays the hashed password in a
    # read-only format and provides a link to a separate password change form.
    # This is a critical security and usability feature.
    password = ReadOnlyPasswordHashField(
        help_text=(
            "Raw passwords are not stored, so there is no way to see this "
            "user's password, but you can change the password using "
            '<a href="../password/">this form</a>.'
        )
    )

    class Meta:
        model = User
        # Include all fields from the User model on the edit page.
        fields = '__all__'