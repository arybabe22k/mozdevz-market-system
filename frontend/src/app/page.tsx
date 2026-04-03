import Link from "next/link";

export default function HomePage() {
  return (
    <main className="space-y-10">
      {/* HEADER */}
      <section className="bg-white p-10 rounded-2xl shadow-md border">
        <h1 className="text-5xl font-bold text-gray-900">
         TirhaTech
        </h1>
        <p className="mt-4 text-gray-600 text-lg max-w-2xl">
          Plataforma inteligente para gestão de produtos, vendas, stock e previsão de procura em mercados informais.
        </p>
      </section>

      {/* CARDS */}
      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {[
          {
            title: "Dashboard",
            desc: "Métricas, alertas e previsões do sistema.",
            link: "/dashboard",
            color: "bg-blue-500",
          },
          {
            title: "Products",
            desc: "Adicionar e visualizar produtos.",
            link: "/products",
            color: "bg-indigo-500",
          },
          {
            title: "Sales",
            desc: "Registar vendas do dia a dia.",
            link: "/sales",
            color: "bg-green-500",
          },
          {
            title: "Stock",
            desc: "Gerir quantidades e abastecimento.",
            link: "/stock",
            color: "bg-purple-500",
          },
        ].map((item) => (
          <Link
            key={item.title}
            href={item.link}
            className="group rounded-2xl bg-white border shadow-sm p-6 hover:shadow-lg transition"
          >
            <div
              className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center text-white font-bold text-lg`}
            >
              {item.title[0]}
            </div>

            <h2 className="mt-4 text-xl font-semibold group-hover:text-black">
              {item.title}
            </h2>

            <p className="mt-2 text-sm text-gray-600">{item.desc}</p>
          </Link>
        ))}
      </section>

      {/* INFO */}
      <section className="bg-white p-8 rounded-2xl border shadow-sm">
        <h2 className="text-2xl font-semibold">Resumo da solução</h2>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <div className="p-4 rounded-xl bg-gray-50">
            <h3 className="font-semibold">Gestão simples</h3>
            <p className="text-sm text-gray-600 mt-2">
              Registo rápido de produtos, vendas e stock.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-gray-50">
            <h3 className="font-semibold">Análise inteligente</h3>
            <p className="text-sm text-gray-600 mt-2">
              Dashboard com insights e alertas automáticos.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-gray-50">
            <h3 className="font-semibold">Decisão orientada</h3>
            <p className="text-sm text-gray-600 mt-2">
              Ajuda a evitar perdas e optimizar compras.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}