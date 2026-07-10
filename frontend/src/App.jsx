import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { OrderProvider } from "./context/OrderContext";
import { ProductProvider } from "./context/ProductContext";
import { UserProvider } from "./context/UserContext";
import CartDrawer from "./components/cart/CartDrawer";
import Home from "./components/layout/userlayout";
import ProductPage from "./pages/productpage";
import Login from "./pages/loginpage";
import Register from "./pages/registerpage";
import CollectionPage from "./pages/collectionpage";
import CheckoutPage from "./pages/checkout/CheckoutPage";
import PaymentPage from "./pages/checkout/PaymentPage";
import OrderConfirmationPage from "./pages/checkout/OrderConfirmationPage";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminUsersPage from "./pages/admin/AdminUsersPage";
import AdminProductsPage from "./pages/admin/AdminProductsPage";
import AdminProductEditPage from "./pages/admin/AdminProductEditPage";
import AdminOrdersPage from "./pages/admin/AdminOrdersPage";
import AdminSubscribersPage from "./pages/admin/AdminSubscribersPage";

function App() {
  return (
    <ProductProvider>
      <AuthProvider>
        <UserProvider>
          <CartProvider>
            <OrderProvider>
              <BrowserRouter basename={import.meta.env.BASE_URL}>
                <CartDrawer />
                <Routes>
                  <Route path="/"                    element={<Home />} />
                  <Route path="/product/:id"         element={<ProductPage />} />
                  <Route path="/login"               element={<Login />} />
                  <Route path="/register"            element={<Register />} />
                  <Route path="/collection/:filter"  element={<CollectionPage />} />
                  <Route path="/collection"          element={<CollectionPage />} />
                  <Route path="/checkout"            element={<CheckoutPage />} />
                  <Route path="/checkout/payment"    element={<PaymentPage />} />
                  <Route path="/order-confirmation"  element={<OrderConfirmationPage />} />

                  {/* Admin */}
                  <Route path="/admin/login"         element={<AdminLoginPage />} />
                  <Route path="/admin" element={<AdminLayout />}>
                    <Route index                     element={<AdminDashboardPage />} />
                    <Route path="users"               element={<AdminUsersPage />} />
                    <Route path="products"            element={<AdminProductsPage />} />
                    <Route path="products/new"        element={<AdminProductEditPage />} />
                    <Route path="products/edit/:id"   element={<AdminProductEditPage />} />
                    <Route path="orders"              element={<AdminOrdersPage />} />
                    <Route path="newsletter"          element={<AdminSubscribersPage />} />
                  </Route>
                </Routes>
              </BrowserRouter>
            </OrderProvider>
          </CartProvider>
        </UserProvider>
      </AuthProvider>
    </ProductProvider>
  );
}

export default App;
