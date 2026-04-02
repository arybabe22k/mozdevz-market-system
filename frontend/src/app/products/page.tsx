"use client";

import { useState, useEffect } from "react";

export default function ProductsPage() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [products, setProducts] = useState<any[]>([]);

  const loadProducts = async () => {
    const res = await fetch("http://127.0.0.1:8000/products");
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

     if (!name.trim()) {
     alert("O nome do produto é obrigatório.");
      return;
        }

    if (!price || Number(price) <= 0) {
    alert("O preço deve ser maior que zero.");
    return;
        }

    try {
      const response = await fetch("http://127.0.0.1:8000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          price: Number(price),
          category: "Geral",
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao criar produto");
      }

      setName("");
      setPrice("");

      await loadProducts(); //  actualiza lista

      alert("Produto adicionado com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Erro ao adicionar produto");
    }
  };

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Produtos</h1>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <input
          type="text"
          placeholder="Nome do produto"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
           required
        />

        <input
          type="number"
          placeholder="Preço"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-2 border rounded"
           required
        />

        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Adicionar
        </button>
      </form>

      {/* LISTA */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Lista de Produtos</h2>

        <div className="border rounded">
          {products.length === 0 ? (
            <p className="p-4 text-gray-500">Nenhum produto ainda.</p>
          ) : (
            products.map((p) => (
              <div
                key={p.id}
                className="p-3 border-b flex justify-between"
              >
                <span>{p.name}</span>
                <span>{p.price} MZN</span>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}