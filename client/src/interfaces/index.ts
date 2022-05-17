export interface DataCustomer {
  id: string;
  name: string;
  email: string;
  phone: string;
  image: string;
  password: string;
  verified: string;
  group: string;
  roles: string;
  created_at: string;
  updated_at: string;
}

export interface DataProduct {
  id: string;
  name: string;
  quantity: number;
  description: string;
  categories: string;
  unit: string;
  price: number;
  images: string;
  reviews: string;
  countReviews: number;
  avgStar: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface DataCategory {
  id: string;
  name: string;
  image: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface Client {
  id: string;
}

export interface Item {
  id: string;
  quantity: number;
}

export interface DataOrder {
  id: string;
  user: string;
  products: string;
  status: string;
  created_at: string;
  updated_at: string;
}
