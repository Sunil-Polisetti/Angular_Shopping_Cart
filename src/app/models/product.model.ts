export interface Product {
  _id?: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  category: string;
  image: string;
  images?: string[];
  rating?: number;
  reviewCount?: number;
  stock?: number;
  discount?: number;
  seller?: string;
  quantity?: number;
  specifications?: {
    brand?: string;
    model?: string;
    warranty?: string;
    deliveryTime?: string;
  };
  createdAt?: string;
}
