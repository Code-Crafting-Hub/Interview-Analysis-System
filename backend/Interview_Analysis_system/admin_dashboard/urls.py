# admin_dashboard/urls.py

from django.urls import path,include
from rest_framework.routers import DefaultRouter
# Import our new LoginAPIView
from .views import (
    AdminRegistrationView,
    EmployeeCreateByAdminView,
    LoginAPIView,
    DepartmentViewSet,
    LogoutAPIView,
    EmployeeListView,
    EmployeeViewSet 
)
from rest_framework_simplejwt.views import TokenRefreshView

router = DefaultRouter()
router.register(r'departments', DepartmentViewSet, basename='department')
router.register(r'admin/employees', EmployeeViewSet, basename='employee')

urlpatterns = [
    path('admin/register/', AdminRegistrationView.as_view(), name='admin-register'),
    path('admin/create-employee/', EmployeeCreateByAdminView.as_view(), name='create-employee'),

    # THIS IS THE FIX: Point 'login/' to our new, fully custom view
    path('login/', LoginAPIView.as_view(), name='login'),

    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', LogoutAPIView.as_view(), name='logout'),
    path('admin/employees/', EmployeeListView.as_view(), name='employee-list'),
    path('', include(router.urls)),
]