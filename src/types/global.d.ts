export {};

declare global {
  // 1. Tipos Utilitários para a estrutura do MongoDB/API
  interface MongoDecimal {
    $numberDecimal: string;
  }

  export interface GraphData {
    quantity: number;
    month: string;
    sales: number;
  }

  // 2. Sub-interfaces para organização
  interface UserMetrics {
    currentCount: number;
    previousCount: number;
    percentage: number;
    isPositive: boolean;
  }

  interface SaleGrowthMetric {
    percentage: number;
    isPositive: boolean;
    value: number;
  }

  interface ProductSale {
    totalQuantity: number;
    totalSales: MongoDecimal;
    name: string;
  }

  interface RecentSale {
    _id: string;
    totalPrice: MongoDecimal;
    status: "pending" | "completed" | "canceled";
    saleDate: string;
    name: string;
  }

  interface GraphData {
    quantity: number;
    month: string;
    sales: number;
  }

  // 3. Interface Principal do Estado
  export interface DashboardData {
    data: {
      users_new: UserMetrics;
      sales: {
        current: {
          totalRevenue: number;
          totalSales: number;
        };
        metrics: {
          revenueGrowth: SaleGrowthMetric;
          salesGrowth: SaleGrowthMetric;
          ticketGrowth: SaleGrowthMetric;
        };
      };
      salesLast: RecentSale[];
      productSales: ProductSale[];
      graphData: GraphData[];
    };
  }

  interface Sale {
    sales: SalesData[];
    next: boolean;
    totalPages: number;
    budges: Budges;
    AUR: number;
    total: number;
  }

  interface SalesData {
    _id: string;
    productData: { name: string };
    clientData: { name: string };
    totalPrice: number;
    saleDate: string;
    status: "pending" | "completed" | "canceled";
  }

  interface Budges {
    totalRevenue: number;
    quantity: number;
  }
}
