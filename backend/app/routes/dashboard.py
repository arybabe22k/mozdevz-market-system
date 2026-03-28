from fastapi import APIRouter
from app.routes.products import products_db
from app.routes.sales import sales_db
from app.routes.stock import stock_db

router = APIRouter()

@router.get("/dashboard/overview")
def get_dashboard_overview():
    total_products = len(products_db)

    total_sales_quantity = 0
    for sale in sales_db:
        total_sales_quantity += sale["quantity"]

    total_stock_quantity = 0
    for item in stock_db:
        total_stock_quantity += item["quantity"]

    current_stock_quantity = total_stock_quantity - total_sales_quantity

    alerts_count = 0

    for product in products_db:
        product_id = product["id"]

        product_stock = 0
        for item in stock_db:
            if item["product_id"] == product_id:
                product_stock += item["quantity"]

        product_sales = 0
        for sale in sales_db:
            if sale["product_id"] == product_id:
                product_sales += sale["quantity"]

        current_stock = product_stock - product_sales
        predicted_demand = product_sales

        if current_stock < predicted_demand:
            alerts_count += 1

        if current_stock > predicted_demand * 2 and predicted_demand > 0:
            alerts_count += 1

        if predicted_demand >= 20:
            alerts_count += 1

    return {
        "total_products": total_products,
        "total_sales_quantity": total_sales_quantity,
        "total_stock_quantity": total_stock_quantity,
        "current_stock_quantity": current_stock_quantity,
        "alerts_count": alerts_count
    }

@router.get("/dashboard/top-products")
def get_top_products():
    product_sales_map = {}

    # inicializar produtos com 0 vendas
    for product in products_db:
        product_sales_map[product["id"]] = {
            "product_id": product["id"],
            "product_name": product["name"],
            "total_sold": 0
        }

    # somar vendas por produto
    for sale in sales_db:
        product_id = sale["product_id"]
        quantity = sale["quantity"]

        if product_id in product_sales_map:
            product_sales_map[product_id]["total_sold"] += quantity

    # transformar em lista
    top_products = list(product_sales_map.values())

    # ordenar do mais vendido para o menos vendido
    top_products.sort(key=lambda item: item["total_sold"], reverse=True)

    return top_products
@router.get("/dashboard/stock-status")
def get_stock_status():
    stock_status = []

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

        status = "normal"
        if current_stock <= 10:
            status = "baixo"
        elif current_stock >= 50:
            status = "alto"

        stock_status.append({
            "product_id": product_id,
            "product_name": product_name,
            "total_stock": total_stock,
            "total_sales": total_sales,
            "current_stock": current_stock,
            "status": status
        })

    return stock_status

@router.get("/dashboard/sales-trend")
def get_sales_trend():
    sales_trend = []

    for product in products_db:
        product_id = product["id"]
        product_name = product["name"]

        total_sales = 0
        for sale in sales_db:
            if sale["product_id"] == product_id:
                total_sales += sale["quantity"]

        sales_trend.append({
            "product_id": product_id,
            "product_name": product_name,
            "total_sales": total_sales
        })

    return sales_trend