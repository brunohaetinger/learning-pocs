from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import permissions
from quickstart.serializers import UserSerializer, GroupSerializer
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse, reverse_lazy
from django.views import View
from django.views.generic import ListView
from django.views.generic.edit import DeleteView
from .models import ToDo
from .forms import ToDoForm
from django.shortcuts import render, get_object_or_404

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]

# My Views

class ToDoView(View):
    template_name = 'todo_list.html'  # Template for listing ToDos

    def get(self, request, *args):
        print("GET BEING CALLED")
        todos = ToDo.objects.all()
        return render(request, self.template_name, {'todos': todos})

class ToDoDeleteView(View):
    def post(self, request, pk):
        print("DELETE BEING CALLED")
        todo = get_object_or_404(ToDo, pk=pk)
        todo.delete()
        return HttpResponseRedirect(reverse_lazy('todo-list'))

class ToDoDetailView(View):
    template_name = 'todo_detail.html'

    def get(self, request, pk):
        todo = get_object_or_404(ToDo, pk=pk)
        return render(request, self.template_name, {'todo': todo})


class ToDoUpdateView(View):
    template_name = 'todo_form.html'

    def get(self, request, pk):
        todo = get_object_or_404(ToDo, pk=pk)
        form = ToDoForm(instance=todo)
        return render(request, self.template_name, {'form': form, 'todo': todo})


    def post(self, request, pk):
        todo = get_object_or_404(ToDo, pk=pk)
        form = ToDoForm(request.POST, instance=todo)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect(reverse('todo-list'))
        return render(request, self.template_name, {'form': form, 'todo': todo})


class ToDoCreateView(View):
    template_name = 'todo_form.html'

    def get(self, request):
        form = ToDoForm()
        return render(request, self.template_name, {'form': form})

    def post(self, request):
        form = ToDoForm(request.POST)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect(reverse('todo-list'))  # Redirect to the list view
        return render(request, self.template_name, {'form': form, 'error': True})
