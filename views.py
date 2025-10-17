from django.shortcuts import render, redirect
from .forms import CVForm
from .models import CV
from django.http import HttpResponse
from django.template.loader import get_template
from xhtml2pdf import pisa
import os
from django.conf import settings

def home(request):
    return render(request, 'home.html')

def create_cv(request):
    form = CVForm()
    if request.method == 'POST':
        form = CVForm(request.POST, request.FILES)
        if form.is_valid():
            cv = form.save()
            return redirect('preview_cv', cv.id)
    return render(request, 'create_cv.html', {'form': form})

def preview_cv(request, id):
    cv = CV.objects.get(pk=id)
    return render(request, 'download_cv.html', {'cv': cv})

def link_callback(uri, rel):
    """
    Convert HTML URIs to absolute system paths so xhtml2pdf can access those resources
    """
    result = os.path.join(settings.MEDIA_ROOT, uri.replace(settings.MEDIA_URL, ""))
    if os.path.exists(result):
        return result
    return uri

def download_pdf(request, id):
    cv = CV.objects.get(pk=id)
    template_path = 'pdf_template.html'
    context = {'cv': cv}
    
    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = f'attachment; filename="{cv.full_name}_CV.pdf"'
    
    template = get_template(template_path)
    html = template.render(context)
    
    # Create PDF with link_callback to handle images
    pisa_status = pisa.CreatePDF(
        html, 
        dest=response,
        link_callback=link_callback
    )
    
    if pisa_status.err:
        return HttpResponse('We had some errors <pre>' + html + '</pre>')
    
    return response