import random

from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.http import JsonResponse, HttpResponse
from django.shortcuts import render, redirect, get_object_or_404
from django.views import View
from django.views.generic import ListView

from .forms import LoginForm, UserCreateForm
from .models import Quiz, TopicQuiz
from questions.models import Question, Answer

from results.models import Result


# Create your views here.
class TopicQuizListView(ListView):
    model = TopicQuiz
    template_name = 'base_home.html'
    context_object_name = 'topic_list'



# class QuizListView(ListView):
#     # model = Quiz
#     template_name = 'quizes/main.html'
#
#
#     def get_context_data(self, **kwargs):
#         context = super().get_context_data(**kwargs)
#         # Добавляем параметр id в контекст пагинации, чтобы он сохранялся при переключении страниц
#         context['quize_list'] = Quiz.objects.all()
#
#         context['topic_list'] = TopicQuiz.objects.all()
#
#         print(1)
#         print(context['topic_list'])
#         print(context['quize_list'])
#         return context
class QuizListView(View):
    def get(self, request, pk):
        topic_list = TopicQuiz.objects.all()
        quize_list = Quiz.objects.filter(topic_quiz_id=pk)
        return render(request, 'quizes/main.html', {'topic_list': topic_list,
                                                                        'quize_list': quize_list})




def user_login(request):
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            cd = form.cleaned_data
            user = authenticate(request,
                                username=cd['username'],
                                password=cd['password'])
            if user is not None:
                if user.is_active:
                    login(request, user)
                    return HttpResponse('Authenticated successfully')
                else:
                    return HttpResponse('Disabled account')
            else:
                return HttpResponse('Invalid login')
    else:
        form = LoginForm()
    return render(request, 'blog/account/login.html', {'form': form})


def sign_up(request):
    user_form = UserCreateForm()
    if request.method == 'POST':
        user_form = UserCreateForm(request.POST)
        if user_form.is_valid():
            new_user = User.objects.create_user(**user_form.cleaned_data)
            new_user.save()
            login(request, authenticate(username=user_form.cleaned_data['username'],
                                        password=user_form.cleaned_data['password']))
            return redirect('quizes:main-view')
    return render(request, 'registration/sign_up.html', {'user_form': user_form})

# def topic
def quiz_view(request, **kwargs):
    quiz = Quiz.objects.get(pk=kwargs['pk_quiz'])
    # quiz = Quiz.objects.get(id=1)
    print(quiz)
    return render(request, 'quizes/quiz.html', {'obj': quiz})

def main_page(request):
    return render(request, 'base.html', {'login': 'You need loggin'})

def quiz_data_view(request, **kwargs):
    quiz = get_object_or_404(Quiz, pk=kwargs['pk_quiz'])

    # Используем prefetch_related, чтобы уменьшить количество запросов к базе данных

    questions = list(quiz.question_set.prefetch_related('answer_set'))
    random.shuffle(questions)

    questions_data = []
    for q in questions:
        # Собираем ответы в список с учетом их правильности
        answers = [{'text': a.text, 'correct': a.correct} for a in q.answer_set.all()]
        random.shuffle(answers)

        # Добавляем структурированный вопрос в итоговый список
        questions_data.append({
            'question_text': q.text,
            'answers': answers,
        })


    return JsonResponse({
        'data': questions_data,
        'time': quiz.time,
    })


def save_quiz_view(request, pk):
    if request.headers.get('x-requested-with') == 'XMLHttpRequest':
        questions = []
        data = request.POST
        data_ = dict(data.lists())

        data_.pop('csrfmiddlewaretoken')

        for k in data_.keys():
            question = Question.objects.get(text=k)
            questions.append(question)

        user = request.user
        quiz = Quiz.objects.get(pk=pk)

        score = 0
        multiplier = 100 / quiz.number_of_questions
        results = []
        correct_answer = None

        for q in questions:
            a_selected = request.POST.get(str(q.text))

            if a_selected != '':
                question_answers = Answer.objects.filter(question=q)
                for a in question_answers:
                    if a_selected == a.text:
                        if a.correct:
                            score += 1
                            correct_answer = a.text
                    else:
                        if a.correct:
                            correct_answer = a.text
                results.append({str(q): {'correct_answer': correct_answer, 'answered': a_selected}})
            else:
                results.append({str(q): 'not answered'})

        score_ = score * multiplier
        Result.objects.create(quiz=quiz, user=user, score=score_)

        if score_ >= quiz.require_score_to_pass:
            return JsonResponse({'passed': True, 'score': score_, 'results': results})
        else:
            return JsonResponse({'passed': False, 'score': score_, 'results': results})

