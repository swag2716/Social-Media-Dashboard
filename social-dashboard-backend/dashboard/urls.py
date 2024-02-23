from django.urls import path
from .views import SocialMediaPostListView, SocialMediaPostCreateView, SocialMediaPostUpdateView

urlpatterns = [
    path('posts/', SocialMediaPostListView.as_view(), name='post-list-create'),
    path('posts/create/', SocialMediaPostCreateView.as_view(), name='post-create'),
    path('posts/<int:pk>/', SocialMediaPostUpdateView.as_view(), name='post-update'),
]
