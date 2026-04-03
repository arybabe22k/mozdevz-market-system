import {
  fetchDashboardOverview,
  fetchTopProducts,
  fetchStockStatus,
  fetchAlerts,
  fetchRecommendations,
} from "../../lib/api";

export default async function DashboardPage() {
  const overview = await fetchDashboardOverview();
  const topProducts = await fetchTopProducts();
  const stockStatus = await fetchStockStatus();
  const alerts = await fetchAlerts();
  const recommendations = await fetchRecommendations();

  return (
    <main className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">TirhaTech</h1>
        <p className="mt-2 text-gray-600">
           Plataforma inteligente para gestão de produtos, vendas, stock e previsão de procura em mercados informais.
        </p>
      </div>

      <section>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="p-4 rounded bg-white border shadow-sm">
            <p className="text-sm text-gray-500">Total Produtos</p>
            <p className="text-2xl font-bold">{overview.total_products}</p>
          </div>

          <div className="p-4 rounded bg-white border shadow-sm">
            <p className="text-sm text-gray-500">Total Vendas</p>
            <p className="text-2xl font-bold">{overview.total_sales_quantity}</p>
          </div>

          <div className="p-4 rounded bg-white border shadow-sm">
            <p className="text-sm text-gray-500">Stock Actual</p>
            <p className="text-2xl font-bold">{overview.current_stock_quantity}</p>
          </div>

          <div className="p-4 rounded bg-white border shadow-sm">
            <p className="text-sm text-gray-500">Alertas</p>
            <p className="text-2xl font-bold">{overview.alerts_count}</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Top Products</h2>
        <div className="overflow-x-auto rounded border bg-white">
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Produto</th>
                <th className="p-3 text-left">Total Vendido</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((product: any) => (
                <tr key={product.product_id} className="border-t">
                  <td className="p-3">{product.product_name}</td>
                  <td className="p-3">{product.total_sold}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Stock Status</h2>
        <div className="overflow-x-auto rounded border bg-white">
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Produto</th>
                <th className="p-3 text-left">Stock Total</th>
                <th className="p-3 text-left">Vendas</th>
                <th className="p-3 text-left">Stock Actual</th>
                <th className="p-3 text-left">Estado</th>
              </tr>
            </thead>
            <tbody>
              {stockStatus.map((item: any) => (
                <tr key={item.product_id} className="border-t">
                  <td className="p-3">{item.product_name}</td>
                  <td className="p-3">{item.total_stock}</td>
                  <td className="p-3">{item.total_sales}</td>
                  <td className="p-3">{item.current_stock}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        item.status === "baixo"
                          ? "bg-red-100 text-red-700"
                          : item.status === "alto"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Alerts</h2>
        <div className="space-y-3">
          {alerts.length === 0 ? (
            <p className="text-gray-500">Sem alertas no momento.</p>
          ) : (
            alerts.map((alert: any, index: number) => (
              <div key={index} className="p-4 rounded border bg-red-50">
                <p className="font-semibold">{alert.type}</p>
                <p className="text-sm text-gray-700">{alert.message}</p>
              </div>
            ))
          )}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Recommendations</h2>
        <div className="overflow-x-auto rounded border bg-white">
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Produto</th>
                <th className="p-3 text-left">Stock Actual</th>
                <th className="p-3 text-left">Procura Prevista</th>
                <th className="p-3 text-left">Comprar</th>
              </tr>
            </thead>
            <tbody>
              {recommendations.map((item: any) => (
                <tr key={item.product_id} className="border-t">
                  <td className="p-3">{item.product_name}</td>
                  <td className="p-3">{item.current_stock}</td>
                  <td className="p-3">{item.predicted_demand}</td>
                  <td className="p-3 font-semibold">{item.recommended_purchase}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}