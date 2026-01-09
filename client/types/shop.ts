export interface ShopProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "supplements" | "apparel" | "equipment" | "accessories";
  imageUrl?: string;
  stock: number;
  inStock: boolean;
  brand?: string;
  rating?: number;
  reviewCount?: number;
}

export interface ShopCategory {
  key: string;
  label: string;
  icon: string;
}

export interface CartItem {
  product: ShopProduct;
  quantity: number;
}

export interface ShopOrder {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  orderDate: string;
  deliveryDate?: string;
}
