from django.http import HttpResponse
from django.shortcuts import render
import json
from app1.models import Book, BookSerializer


def index(request):
    return render(request,'app1/index.html')

def saveBook(request):
    name = request.GET['name']
    price = request.GET['price']
    pages = request.GET['pages']
    book = Book(name=name, price = price, pages = pages)
    try:
        book.save()
        return HttpResponse('true')
    except Exception as err:
        print(err)
        return HttpResponse('false')


def getAllBooks(request):
    i = list()
    books = Book.objects.all()
    for book in books:
        ser = BookSerializer(book)
        i.append(ser.data)
    print(i)
    return HttpResponse(json.dumps(i))
