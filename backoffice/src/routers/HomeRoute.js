import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CategoriesScreen } from '../components/pages/home/categories/CategoriesScreen';
import { CategoryAdd } from '../components/pages/home/categories/CategoryAdd';
import { CategoryUpdate } from '../components/pages/home/categories/CategoryUpdate';
import { CompaniesScreen } from '../components/pages/home/companies/CompaniesScreen';
import { CompanyUpdate } from '../components/pages/home/companies/CompanyUpdate';
import { DashboardScreen } from '../components/pages/home/dashboard/DashboardScreen';
import { OrdersScreen } from '../components/pages/home/orders/OrdersScreen';
import { ProductsScreen } from '../components/pages/home/products/ProductsScreen';
import { ProductUpdate } from '../components/pages/home/products/ProductUpdate';
import { UserAdd } from '../components/pages/home/users/UserAdd';
import { UserResetPassword } from '../components/pages/home/users/UserResetPassword';
import { UsersScreen } from '../components/pages/home/users/UsersScreen';
import { UserUpdate } from '../components/pages/home/users/UserUpdate';

export const HomeRoute = () => {
  return (
    <Routes>
      <Route path="users" element={<UsersScreen />} />
      <Route path="users/update/:id" element={<UserUpdate />} />
      <Route path="users/add" element={<UserAdd />} />
      <Route path="users/resetpass/:id" element={<UserResetPassword />} />
      <Route path="companies" element={<CompaniesScreen />} />
      <Route path="companies/:id" element={<CompanyUpdate />} />

      <Route path="categories" element={<CategoriesScreen />} />
      <Route path="categories/update/:id" element={<CategoryUpdate />} />
      <Route path="categories/add" element={<CategoryAdd />} />

      <Route path="products" element={<ProductsScreen />} />
      <Route path="products/update/:id" element={<ProductUpdate />} />
      <Route path="orders" element={<OrdersScreen />} />

      <Route path="/" element={<DashboardScreen />} />
    </Routes>
  );
};
