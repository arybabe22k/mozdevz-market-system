from fastapi import APIRouter

router = APIRouter()

sales_db = []

@router.post("/sales")
def create_sale(sale: dict):
    sale["id"] = len(sales_db) + 1
    sales_db.append(sale)

    return {
        "message": "Venda registada com sucesso",
        "sale": sale
    }

@router.get("/sales")
def get_sales():
    return sales_db