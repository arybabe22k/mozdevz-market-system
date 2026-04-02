import { fetchDashboardOverview } from "../lib/api";

export default async function DashboardPage() {
  const data = await fetchDashboardOverview();

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold">Dashboard MOZDEVZ</h1>
      <p className="mt-2 text-gray-600">
        Sistema de previsão de procura para mercados informais.
      </p>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="p-4 rounded bg-gray-100">
          <p className="text-sm text-gray-500">Total Produtos</p>
          <p className="text-2xl font-bold">{data.total_products}</p>
        </div>

        <div className="p-4 rounded bg-gray-100">
          <p className="text-sm text-gray-500">Total Vendas</p>
          <p className="text-2xl font-bold">{data.total_sales_quantity}</p>
        </div>

        <div className="p-4 rounded bg-gray-100">
          <p className="text-sm text-gray-500">Stock Actual</p>
          <p className="text-2xl font-bold">{data.current_stock_quantity}</p>
        </div>

        <div className="p-4 rounded bg-gray-100">
          <p className="text-sm text-gray-500">Alertas</p>
          <p className="text-2xl font-bold">{data.alerts_count}</p>
        </div>
      </div>
    </main>
  );
}