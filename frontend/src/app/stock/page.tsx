"use client";

import { useEffect, useState } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
};

type StockItem = {
  id: number;
  product_id: number;
  quantity: number;
};

export default function StockPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [stockItems, setStockItems] = useState<StockItem[]>([]);
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");

  const loadProducts = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/products");
      if (!res.ok) throw new Error("Erro ao buscar produtos");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
    }
  };

  const loadStock = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/stock");
      if (!res.ok) throw new Error("Erro ao buscar stock");
      const data = await res.json();
      setStockItems(data);
    } catch (error) {
      console.error("Erro ao carregar stock:", error);
    }
  };

  useEffect(() => {
    loadProducts();
    loadStock();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!productId) {
      alert("Seleciona um produto.");
      return;
    }

    if (!quantity || Number(quantity) <= 0) {
      alert("A quantidade deve ser maior que zero.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/stock", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_id: Number(productId),
          quantity: Number(quantity),
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao registar stock");
      }

      setProductId("");
      setQuantity("");

      await loadStock();

      alert("Stock registado com sucesso!");
    } catch (error) {
      console.error("Erro ao registar stock:", error);
      alert("Erro ao registar stock");
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Gestão de Stock</h1>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <select
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          className="w-full p-2 border rounded"
          required
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
          required
        />

        <button className="bg-purple-600 text-white px-4 py-2 rounded">
          Adicionar Stock
        </button>
      </form>

      <div>
        <h2 className="text-xl font-semibold mb-2">Lista de Stock</h2>

        <div className="border rounded bg-white">
          {stockItems.length === 0 ? (
            <p className="p-4 text-gray-500">Nenhum stock registado ainda.</p>
          ) : (
            stockItems.map((item) => {
              const product = products.find((p) => p.id === item.product_id);

              return (
                <div
                  key={item.id}
                  className="p-3 border-b flex justify-between"
                >
                  <span>{product ? product.name : `Produto ${item.product_id}`}</span>
                  <span>Quantidade: {item.quantity}</span>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}