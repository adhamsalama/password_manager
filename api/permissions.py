from rest_framework import permissions

class IsOwner(permissions.BasePermission):
    """
    Custom Permission to only allow owners of an object to view/edit it.
    """
    def has_object_permission(self, request, view, obj):
        return obj.user == request.user
