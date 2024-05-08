from typing import TYPE_CHECKING

from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken

if TYPE_CHECKING:
    from rest_framework.request import Request


@api_view(['POST'])
def register(request: "Request"):
    email = request.data.get("email")
    password = request.data.get("password")

    username = extract_username_from_email(email)
    User.objects.create(
        email=email,
        username=username,
        password=password,
    )

    return Response({"message": "created user"})


class Login(ObtainAuthToken):
    """
    Taking email instead of username and extracting username from it
    """
    
    def post(self, request: "Request", *args, **kwargs):
        email = request.data.pop("email")
        user = User.objects.get(email=email)
        token, _ = Token.objects.get_or_create(user=user)
        return Response({'token': token.key})


def extract_username_from_email(email: "str") -> "str":
    return email.split("@", maxsplit=2)[0]
