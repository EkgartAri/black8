from typing import TYPE_CHECKING

from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response

if TYPE_CHECKING:
    from rest_framework.request import Request


@api_view(['POST'])
def register(request: "Request"):
    email = request.data.get("email")
    password = request.data.get("password")

    username = extract_username_from_email(email)
    User.objects.create(
        email=email,
        name=username,
        password=password,
    )

    return Response({"message": "created user"})

def extract_username_from_email(email: "str") -> "str":
    return email.split("@", maxsplit=2)[0]
