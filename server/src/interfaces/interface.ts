export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  image: string;
  verified: string;
  group: string;
  roles: Array<string>;
  created_at: Date;
  updated_at: Date;
}

export interface Review {
  id: string;
  content: string;
  star: number;
}

export interface Product {
  id: string;
  name: string;
  quantity: number;
  description: string;
  categories: Array<string>;
  unit: string;
  price: number;
  images: Array<string>;
  reviews: Array<Review>;
  status: string;
  created_at: Date;
  updated_at: Date;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  status: string;
  created_at: Date;
  updated_at: Date;
}

export interface Client {
  id: string;
}

export interface Item {
  id: string;
  quantity: number;
}

export interface Order {
  id: string;
  user: Client;
  products: Array<Item>;
  status: string;
  created_at: Date;
  updated_at: Date;
}
