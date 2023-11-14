from collections.abc import Iterable
from django.db import models
from string import ascii_letters
import random

class Link(models.Model):
    code = models.CharField(max_length=10)
    url = models.TextField()

    def __str__(self):
        return self.code
    
    def create_random(self, n):
        counter = 0
        while counter < 3:
            s = ""
            for i in range(n):
                s+= random.choice(ascii_letters)
            l = Link.objects.filter(code=s).first()
            counter += 1
            if not l:
                return s
        return self.create_random(n+1)



    def save(self, force_insert=False, force_update=False, using=None, update_fields=None):
        obj = super().save(force_insert=force_insert, force_update=force_update, using=using, update_fields=update_fields)
        n = 1
        if not self.code :
            self.code = self.create_random(n)
            self.save()
        return self
    