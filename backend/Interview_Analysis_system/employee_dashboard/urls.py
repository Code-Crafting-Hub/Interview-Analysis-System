# employees_dashboard/urls.py
from django.urls import path
from .views import EmployeeProfileView

urlpatterns = [
    # URL for an employee to access their profile: /api/employee/profile/
    path('profile/', EmployeeProfileView.as_view(), name='employee-profile'),
]