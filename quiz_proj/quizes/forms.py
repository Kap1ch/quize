from django import forms
from django.contrib.auth.models import User


class LoginForm(forms.Form):
    username = forms.CharField(widget=forms.TextInput(attrs={
        "id": "inputLogin",
        " class": "form-control",
        " placeholder": "Логин",
    }))
    password = forms.CharField(widget=forms.PasswordInput(
        attrs={
            "type": "password",
            "id": "inputPassword",
            "class": "form-control",
            "placeholder": "Пароль"
        }))

class UserCreateForm(forms.ModelForm):
    password = forms.CharField(max_length=40, widget=forms.PasswordInput())

    class Meta:
        model = User
        fields = ('first_name', 'last_name',
                  'username', 'email', 'password')