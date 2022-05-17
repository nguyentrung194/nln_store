import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Admin } from "../components/admin";

import { Customer } from "../components/admin/customers/customer";
import { AddCustomer } from "../components/admin/customers/add-customer";
import { EditCustomer } from "../components/admin/customers/edit-customer";

import { Products } from "../components/admin/products/products";
import { AddProduct } from "../components/admin/products/add-product";
import { EditProduct } from "../components/admin/products/edit-product";

import { Categories } from "../components/admin/categories/categories";
import { AddCategory } from "../components/admin/categories/add-category";
import { EditCategory } from "../components/admin/categories/edit-category";

import { Orders } from "../components/admin/orders/orders";
import { AddOrder } from "../components/admin/orders/add-order";
import { EditOrder } from "../components/admin/orders/edit-order";

export const AdminRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Admin />} />

      {/* orders */}
      <Route path="orders" element={<Orders />} />
      <Route path="orders/add-order" element={<AddOrder />} />
      <Route path="orders/edit-order/:id" element={<EditOrder />} />

      {/* products */}
      <Route path="products" element={<Products />} />
      <Route path="products/add-product" element={<AddProduct />} />
      <Route path="products/edit-product/:id" element={<EditProduct />} />

      {/* categories */}
      <Route path="categories" element={<Categories />} />
      <Route path="categories/add-category" element={<AddCategory />} />
      <Route path="categories/edit-category/:id" element={<EditCategory />} />

      {/* customers */}
      <Route path="customers" element={<Customer />} />
      <Route path="customers/add-customer" element={<AddCustomer />} />
      <Route path="customers/edit-customer/:id" element={<EditCustomer />} />

      {/* <Route path="/*" element={<Navigate to="/admin" replace={true} />} /> */}
    </Routes>
  );
};
