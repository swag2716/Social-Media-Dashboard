from django.http import JsonResponse
from django.views import View
from rest_framework import generics
from .models import SocialMediaPost
from .serializers import SocialMediaPostSerializer

# mock_data = [
#     {
#         "id": 1,
#         "title": "Post 1",
#         "description": "Description for post 1.",
#         "likes": 15,
#         "shares": 8,
#         "comments": 5,
#     },
#     {
#         "id": 2,
#         "title": "Post 2",
#         "description": "Description for post 2.",
#         "likes": 25,
#         "shares": 12,
#         "comments": 8,
#     },
#     # Add more posts as needed
# ]

class SocialMediaPostListView(View):
    def get(self, request, *args, **kwargs):
        # Query all SocialMediaPost objects from the database
        posts = SocialMediaPost.objects.all()

        # Convert queryset to a list of dictionaries
        post_list = [{'id': post.id, 'title': post.title, 'description': post.description,
                      'likes': post.likes, 'shares': post.shares, 'comments': post.comments,
                      }
                     for post in posts]

        return JsonResponse(post_list, safe=False)
    
class SocialMediaPostCreateView(generics.CreateAPIView):
    queryset = SocialMediaPost.objects.all()
    serializer_class = SocialMediaPostSerializer

class SocialMediaPostUpdateView(generics.UpdateAPIView):
    queryset = SocialMediaPost.objects.all()
    serializer_class = SocialMediaPostSerializer
