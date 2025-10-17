from django import forms
from .models import CV

class CVForm(forms.ModelForm):
    class Meta:
        model = CV
        fields = '__all__'
        widgets = {
            'skills': forms.TextInput(attrs={'placeholder': 'e.g. HTML, CSS, Python, Django, JavaScript'}),
        }
