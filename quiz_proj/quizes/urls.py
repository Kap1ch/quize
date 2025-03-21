from django.contrib.auth import views
from django.urls import path

from quizes.views import (QuizListView, quiz_view, quiz_data_view,
                          save_quiz_view, user_login, main_page, sign_up, TopicQuizListView)


app_name = 'quizes'
urlpatterns = [
    path('', TopicQuizListView.as_view(), name='pages'),
    path('quize/<pk>/', QuizListView.as_view(), name='main-view'),
    path('quize/<pk>/<pk_quiz>/', quiz_view, name='quiz-view'),
    path('login/', views.LoginView.as_view(), name='login'),
    path('logout/', views.LogoutView.as_view(), name='logout'),
    path('quize/<pk>/save/', save_quiz_view, name='save-view'),
    path('quize/<pk>/<pk_quiz>/data/', quiz_data_view, name='quiz-data-view'),
    path('sign-up/', sign_up, name='sign-up'),
]