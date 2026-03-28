from fastapi import APIRouter
from app.routes.products import products_db
from app.routes.sales import sales_db
from app.routes.stock import stock_db

router = APIRouter()

@router.get("/forecast/recommendation")
def get_recommendation():
    recommendations = []

    for product in products_db:
        product_id = product["id"]

        # calcular stock total
        total_stock = 0
        for item in stock_db:
            if item["product_id"] == product_id:
                total_stock += item["quantity"]

        # calcular total vendido
        total_sales = 0
        for sale in sales_db:
            if sale["product_id"] == product_id:
                total_sales += sale["quantity"]

        # stock actual
        current_stock = total_stock - total_sales

        # previsão simples baseada nas vendas
        predicted_demand = total_sales

        # recomendação de compra
        recommended_purchase = 0
        if predicted_demand > current_stock:
            recommended_purchase = predicted_demand - current_stock

        recommendations.append({
            "product_id": product_id,
            "product_name": product["name"],
            "current_stock": current_stock,
            "predicted_demand": predicted_demand,
            "recommended_purchase": recommended_purchase
        })

    return recommendations