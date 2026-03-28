from fastapi import APIRouter

router = APIRouter()

products_db = [
    {"id": 1, "name": "Tomate", "price": 50, "category": "Hortícolas"},
    {"id": 2, "name": "Cebola", "price": 40, "category": "Hortícolas"},
]

# GET - listar produtos
@router.get("/products")
def get_products():
    return products_db


# POST - criar produto
@router.post("/products")
def create_product(product: dict):
    new_id = len(products_db) + 1

    product["id"] = new_id
    products_db.append(product)

    return {
        "message": "Produto criado com sucesso",
        "product": product
    }