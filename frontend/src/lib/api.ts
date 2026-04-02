const API_BASE_URL = "http://127.0.0.1:8000";

export async function fetchDashboardOverview() {
  const response = await fetch(`${API_BASE_URL}/dashboard/overview`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar dashboard overview");
  }

  return response.json();
}

export async function fetchTopProducts() {
  const response = await fetch(`${API_BASE_URL}/dashboard/top-products`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar top products");
  }

  return response.json();
}

export async function fetchStockStatus() {
  const response = await fetch(`${API_BASE_URL}/dashboard/stock-status`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar stock status");
  }

  return response.json();
}

export async function fetchAlerts() {
  const response = await fetch(`${API_BASE_URL}/alerts`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar alerts");
  }

  return response.json();
}

export async function fetchRecommendations() {
  const response = await fetch(`${API_BASE_URL}/forecast/recommendation`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar recommendations");
  }

  return response.json();
}

export async function fetchProducts() {
  const response = await fetch("http://127.0.0.1:8000/products", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar produtos");
  }

  return response.json();
}