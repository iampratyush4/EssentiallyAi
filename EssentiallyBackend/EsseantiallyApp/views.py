
import random
from django.http import JsonResponse
from django.shortcuts import render
from .models import Stock
from polygon import RESTClient

client = RESTClient(api_key="4FPAmNwQcdi9ErtGYTMFQop0gsvOSTY2")
       
def fetch_stocks(request, n):
    stocks = []
    for _ in range(n):
        stock_data = client.get_stock_previous_close("AAPL")
        stock = Stock(name=stock_data["symbol"],
                       previous_close=stock_data["previousClose"],
                       refresh_interval=random.randint(1, 5))
        stock.save()
        stocks.append(stock)
    return render(request, "home.html", {"stocks": stocks})

def update_prices(request):
    for stock in Stock.objects.all():
        stock.update_price()
    return JsonResponse({"message": "Prices updated successfully"})

