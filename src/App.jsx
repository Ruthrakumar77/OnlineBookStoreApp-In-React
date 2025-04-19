import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import CartSidebar from './components/Cart/CartSidebar';
import Home from './pages/Home';
import BookList from './pages/BookList';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Admin from './pages/Admin';
import Profile from './pages/Profile';
import BookDetails from './components/Book/BookDetails';
import CheckoutForm from './components/Checkout/CheckoutForm';
import PrivateRoute from './components/Common/PrivateRoute';
import AdminRoute from './components/Common/AdminRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="min-h-screen bg-gray-900 text-white flex flex-col">
            <Navbar />
            <CartSidebar />
            
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/books" element={<BookList />} />
                <Route path="/books/:id" element={<BookDetails />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
                <Route path="/checkout" element={<PrivateRoute><CheckoutForm /></PrivateRoute>} />
                <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} />
              </Routes>
            </main>
            
            <Footer />
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;