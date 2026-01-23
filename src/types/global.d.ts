export {};

declare global {
  interface MongoDecimal {
    $numberDecimal: string;
  }

  export interface GraphData {
    quantity: number;
    month: string;
    sales: number;
  }

  interface NavItem {
    label: string;
    icon: string;
    path: string;
    active?: boolean;
  }

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

  interface DataPage {
    data: {
      totalNew: number;
      dataUsers: DataUsers;
    };
  }

  interface DataUsers {
    users: User[];
    totalUsers: number;
    totalPages: number;
    next: boolean;
  }

  interface User {
    _id: string;
    name: string;
    email: string;
    role: number;
    avatar_url: string;
    created_at: string;
  }
}
