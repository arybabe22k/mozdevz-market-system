from fastapi import APIRouter

router = APIRouter()

stock_db = []

@router.post("/stock")
def create_stock(stock: dict):
    stock["id"] = len(stock_db) + 1
    stock_db.append(stock)

    return {
        "message": "Stock registado com sucesso",
        "stock": stock
    }

@router.get("/stock")
def get_stock():
    return stock_db


@router.get("/stock/current")
def get_current_stock():
    from app.routes.sales import sales_db

    current_stock = {}

    # somar todo stock registado
    for item in stock_db:
        product_id = item["product_id"]
        quantity = item["quantity"]

        if product_id not in current_stock:
            current_stock[product_id] = 0

        current_stock[product_id] += quantity

    # subtrair vendas
    for sale in sales_db:
        product_id = sale["product_id"]
        quantity = sale["quantity"]

        if product_id not in current_stock:
            current_stock[product_id] = 0

        current_stock[product_id] -= quantity

    return current_stock