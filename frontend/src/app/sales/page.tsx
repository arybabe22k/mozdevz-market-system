"use client";

import { useEffect, useState } from "react";

export default function SalesPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [sales, setSales] = useState<any[]>([]);
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  const loadProducts = async () => {
    const res = await fetch("http://127.0.0.1:8000/products");
    const data = await res.json();
    setProducts(data);
  };

  const loadSales = async () => {
    const res = await fetch("http://127.0.0.1:8000/sales");
    const data = await res.json();
    setSales(data);
  };

  useEffect(() => {
    loadProducts();
    loadSales();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/sales", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_id: Number(productId),
          quantity: Number(quantity),
          price: Number(price),
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao registar venda");
      }

      setProductId("");
      setQuantity("");
      setPrice("");

      await loadSales();

      alert("Venda registada com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Erro ao registar venda");
    }
  };

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Registar Vendas</h1>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <select
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">Seleciona um produto</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Quantidade"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <input
          type="number"
          placeholder="Preço"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Registar Venda
        </button>
      </form>

      <div>
        <h2 className="text-xl font-semibold mb-2">Lista de Vendas</h2>

        <div className="border rounded">
          {sales.length === 0 ? (
            <p className="p-4 text-gray-500">Nenhuma venda registada ainda.</p>
          ) : (
            sales.map((sale) => (
              <div
                key={sale.id}
                className="p-3 border-b flex justify-between"
              >
                <span>Produto ID: {sale.product_id}</span>
                <span>Qtd: {sale.quantity}</span>
                <span>Preço: {sale.price} MZN</span>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}