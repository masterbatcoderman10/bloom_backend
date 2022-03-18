from rest_framework import permissions


class IsOwner(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """


    def has_object_permission(self, request, view, obj):
        print(obj.user, "Object user")
        print(request.user, "Request user")
        if obj.user == request.user:
            return True
        return False