import random

from django.db import models

# Create your models here.
DIFF_CHOICES = (
    ('easy', 'easy'),
    ('medium', 'medium'),
    ('hard', 'hard'),
)


class TopicQuiz(models.Model):
    name = models.CharField(max_length=20)

    def __str__(self):
        return f'{self.name}'

    class Meta:
        verbose_name_plural = 'TopicQuizes'


class Quiz(models.Model):
    name = models.CharField(max_length=120)
    topic = models.CharField(max_length=120)
    number_of_questions = models.IntegerField(default=None)
    time = models.IntegerField(help_text='duration of the quize in minutes')
    require_score_to_pass = models.IntegerField(help_text='required score in %')
    difficluty = models.CharField(max_length=6, choices=DIFF_CHOICES)
    topic_quiz_id = models.ForeignKey(TopicQuiz, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return f'{self.name}-{self.topic}'

    def get_questions(self):
        questions = list(self.question_set.all())
        random.shuffle(questions)
        return questions[:self.number_of_questions]

    class Meta:
        verbose_name_plural = 'Quizes'
