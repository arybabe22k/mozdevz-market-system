from fastapi import FastAPI
from app.routes.products import router as products_router
from app.routes.sales import router as sales_router
from app.routes.stock import router as stock_router
from app.routes.forecast import router as forecast_router
from app.routes.alerts import router as alerts_router
from app.routes.dashboard import router as dashboard_router

app = FastAPI()

app.include_router(products_router)
app.include_router(sales_router)
app.include_router(stock_router)
app.include_router(forecast_router)
app.include_router(alerts_router)
app.include_router(dashboard_router)


@app.get("/")
def root():
    return {"message": "API a funcionar!"}

@app.get("/health")
def health():
    return {"status": "ok"}