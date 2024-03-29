"""
URL configuration for tutorial project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, path
from rest_framework import routers
from quickstart import views

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('to-do/', views.ToDoView.as_view(), name='todo-list'),
    path('to-do/<int:pk>/', views.ToDoDetailView.as_view(), name='todo-detail'),  # Include a primary key for updating and deleting
    path('to-do/create/', views.ToDoCreateView.as_view(), name='todo-create'),
    path('to-do/update/<int:pk>', views.ToDoUpdateView.as_view(), name='todo-update'),
    path('to-do/delete/<int:pk>', views.ToDoDeleteView.as_view(), name='todo-delete'),

    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
