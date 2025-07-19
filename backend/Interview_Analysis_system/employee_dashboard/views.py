# employee_dashboard/views.py

from rest_framework import viewsets, permissions
from .models import Department, Employee
from .serializers import DepartmentSerializer, EmployeeSerializer

# Custom Permission to check if the user is HR (e.g., a staff user)
