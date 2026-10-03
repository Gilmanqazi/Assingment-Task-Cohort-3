import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import LoginPage from "../features/auth/ui/pages/LoginPage";
import RegisterPage from "../features/auth/ui/pages/RegisterPage";
import MainLayout from "./layout/MainLayout";
import HomePage from "../features/products/ui/pages/HomePage";
import MainProtected from "./routes/MainProtected";
import PublicProtected from "./routes/PublicProtected";
import RoleProtected from "../features/auth/shared/RoleProtected";
import CreateProductsPage from "../features/products/ui/SellerPages/CreateProductsPage";
import ProductDetailPage from "../features/products/ui/pages/ProductDetailPage";
import CartPage from "../features/cart/ui/pages/CartPage";
import ProductPage from "../features/products/ui/pages/ProductPage";
import SellerProducts from "../features/products/ui/SellerPages/SellerProducts";
import EditProduct from "../features/products/ui/SellerPages/EditProduct";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicProtected />,
    children: [
      {
        path: "/",
        element: <AuthLayout />,
        children: [
          {
            path: "",
            element: <LoginPage />,
          },
          {
            path: "register",
            element: <RegisterPage />,
          },
        ],
      },
    ],
  },
  {
    path: "/home",
    element: <MainProtected />,
    children: [
      {
        path: "",
        element: <MainLayout />,
        children: [
          {
            path: "",
            element: <HomePage />,
          },
          {
            path: "product/:id",
            element: <ProductDetailPage />,
          },
          {
            path: "products",
            element: <ProductPage />,
          },
          {
            path: "cart",
            element: <CartPage />,
          },

          // Sellers Routes
          {
            element: <RoleProtected allowdRoles={["seller"]} />,
            children: [
              {
                path: "create/products",
                element: <CreateProductsPage />,
              },
              {
                path: "seller/products",
                element: <SellerProducts />,
              },
              {
                path: "edit/products/:id",
                element: <EditProduct />,
              },
            ],
          },
        ],
      },
    ],
  },
]);