import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import Help from './pages/Help';
import RegisterPage from './pages/register';
import LoginPage from './pages/login';
import { UserProvider } from './context/UserContext';
import ProfilePage from './pages/ProfilePage';
import FoodItemForm from './components/FoodItemForm';
import { FoodProvider } from './context/FoodItemsContext';
import Layout from './components/Layout';
import OffersPage from './components/Offer';
import OrderPage from './pages/OrderPage';
import FoodItemUpdateForm from './components/FoodItemUpdateForm';
import { PriceProvider } from './context/PriceContext';
import AdminOrderTable from './pages/AdminDashboard';
import FoodDetail from './components/FoodDetails';
import { NavSearchProvider } from './context/NavSearchContext';
import { DarkModeProvider } from './context/DarkMode';

function App() {
  return (
    <DarkModeProvider>
      <NavSearchProvider>
        <FoodProvider>
          <PriceProvider>
            <UserProvider>
              <Router>
                <Routes>
                  <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path="help" element={<Help />} />
                    <Route path="cart" element={<CartPage />} />
                    <Route path="register" element={<RegisterPage />} />
                    <Route path="login" element={<LoginPage />} />
                    <Route path="profile" element={<ProfilePage />} />
                    <Route path="foodform" element={<FoodItemForm />} />
                    <Route path="food/:id" element={<FoodDetail />} />
                    <Route path="offer" element={<OffersPage />} />
                    <Route path="cart/order" element={<OrderPage />} />
                    <Route path="food/update/:id" element={<FoodItemUpdateForm />} />
                    <Route path="admin/customerorders" element={<AdminOrderTable />} />
                  </Route>
                </Routes>
              </Router>
            </UserProvider>
          </PriceProvider>
        </FoodProvider>
      </NavSearchProvider>
    </DarkModeProvider>
  );
}


export default App;
