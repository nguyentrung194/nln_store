import { model, Schema, Document } from 'mongoose';
import { Product, Category, Order, User, Item, Review } from '@/interfaces/interface';

const userSchema: Schema<User> = new Schema({
  id: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    require,
    unique: true,
  },
  name: {
    type: String,
    require,
  },
  password: {
    type: String,
    require,
  },
  image: {
    type: String,
    require,
  },
  phone: {
    type: String,
    require,
  },
  verified: {
    type: String,
    default: 'Active',
  },
  group: {
    type: String,
    default: 'Basic',
  },
  roles: {
    type: Array<String>(),
    default: ['User'],
  },
  created_at: {
    type: Date,
    default: new Date(),
  },
  updated_at: {
    type: Date,
    default: new Date(),
  },
});

export const userModel = model<User & Document>('User', userSchema);

const productSchema: Schema<Product> = new Schema({
  id: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
    require,
  },
  quantity: {
    type: Number,
    require,
  },
  description: {
    type: String,
    require,
  },
  categories: {
    type: Array<String>(),
    default: [],
  },
  unit: {
    type: String,
    require,
  },
  price: {
    type: Number,
    require,
  },
  images: {
    type: Array<String>(),
    default: [],
  },
  reviews: {
    type: Array<Review>(),
    default: [],
  },
  status: {
    type: String,
    default: 'Active',
  },
  created_at: {
    type: Date,
    default: new Date(),
  },
  updated_at: {
    type: Date,
    default: new Date(),
  },
});

productSchema.index({
  name: 'text',
  categories: 'text',
  description: 'text',
  status: 'text',
});
export const productModel = model<Product & Document>('Product', productSchema);

const categorySchema: Schema<Category> = new Schema({
  id: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
    require,
  },
  image: {
    type: String,
  },
  status: {
    type: String,
    default: 'Active',
  },
  created_at: {
    type: Date,
    default: new Date(),
  },
  updated_at: {
    type: Date,
    default: new Date(),
  },
});

export const categoryModel = model<Category & Document>('Category', categorySchema);

const orderSchema: Schema<Order> = new Schema({
  id: {
    type: String,
    unique: true,
  },
  user: {
    id: {
      type: String,
    },
  },
  products: {
    type: Array<Item>(),
    default: [],
  },
  status: {
    type: String,
    require,
  },
  created_at: {
    type: Date,
    default: new Date(),
  },
  updated_at: {
    type: Date,
    default: new Date(),
  },
});

export const orderModel = model<Order & Document>('Order', orderSchema);
