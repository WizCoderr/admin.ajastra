import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "../layout/admin.layout";
import DashboardPage from "../pages/admin/DashboardPage";
import SliderPage from "../pages/admin/sliderPage";
import OrdersPage from "../pages/admin/OrdersPage";
import CustomersPage from "../pages/admin/CustomersPage";
import CategoriesPage from "../pages/admin/CategoriesPage";
import ProductsPage from "../pages/admin/ProductsPage";
import AllProductPage from "../pages/admin/AllProductPage";
import Login from "../pages/Login";

export default function AdminRoutes() {
    return (
        <Routes>
            <Route path="/" element={<AdminLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="slider" element={<SliderPage/>} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="customers" element={<CustomersPage />} />
            <Route path="categories" element={<CategoriesPage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="allProducts" element={<AllProductPage />} />
            <Route path="login" element={<Login />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Route>
        </Routes>
    );
}