import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import CartPage from './pages/CartPage';
import Help from './pages/Help';
import FoodDetail from './components/foodDetails';
import RegisterPage from './pages/register';
import LoginPage from './pages/login';
import { UserProvider } from './context/UserContext';
import ProfilePage from './pages/ProfilePage';
import FoodItemForm from './components/FoodItemForm';
import { FoodProvider } from './context/FoodItemsContext';
import Layout from './components/Layout';
import OffersPage from './components/Offer';

function App() {
  return (
    <FoodProvider>
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="menu" element={<MenuPage />} />
              <Route path="help" element={<Help />} />
              <Route path="cart" element={<CartPage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="foodform" element={<FoodItemForm />} />
              <Route path="food/:id" element={<FoodDetail />} />
              <Route path="offer" element={<OffersPage />} />
            </Route>
          </Routes>
        </Router>
      </UserProvider>
    </FoodProvider>
  );
}


export default App;
