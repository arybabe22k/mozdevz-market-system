from fastapi import APIRouter
from app.routes.products import products_db
from app.routes.sales import sales_db
from app.routes.stock import stock_db

router = APIRouter()

@router.get("/alerts")
def get_alerts():
    alerts = []

    for product in products_db:
        product_id = product["id"]
        product_name = product["name"]

        total_stock = 0
        for item in stock_db:
            if item["product_id"] == product_id:
                total_stock += item["quantity"]

        total_sales = 0
        for sale in sales_db:
            if sale["product_id"] == product_id:
                total_sales += sale["quantity"]

        current_stock = total_stock - total_sales
        predicted_demand = total_sales

        # alerta de ruptura
        if current_stock < predicted_demand:
            alerts.append({
                "product_id": product_id,
                "product_name": product_name,
                "type": "Risco de ruptura",
                "message": f"O produto {product_name} pode faltar. Stock actual abaixo da procura prevista."
            })

        # alerta de sobra
        if current_stock > predicted_demand * 2 and predicted_demand > 0:
            alerts.append({
                "product_id": product_id,
                "product_name": product_name,
                "type": "Risco de sobra",
                "message": f"O produto {product_name} pode sobrar. Stock muito acima da procura prevista."
            })

        # procura elevada
        if predicted_demand >= 20:
            alerts.append({
                "product_id": product_id,
                "product_name": product_name,
                "type": "Procura elevada",
                "message": f"O produto {product_name} está com procura elevada."
            })

    return alerts