
import { createContext, useContext, useState, useEffect } from 'react';
import { getCart, addToCart, removeFromCart, clearCart } from '../services/cartService';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const fetchCart = async () => {
    try {
      const cartData = await getCart();
      setCart(cartData);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const addItem = async (bookId, quantity = 1) => {
    try {
      await addToCart(bookId, quantity);
      await fetchCart();
    } catch (error) {
      throw error;
    }
  };

  const removeItem = async (bookId) => {
    try {
      await removeFromCart(bookId);
      await fetchCart();
    } catch (error) {
      throw error;
    }
  };

  const emptyCart = async () => {
    try {
      await clearCart();
      await fetchCart();
    } catch (error) {
      throw error;
    }
  };

  const cartTotal = cart.reduce((total, item) => total + (item.book.price * item.quantity), 0);
  const itemCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      cart, 
      addItem, 
      removeItem, 
      emptyCart, 
      cartTotal, 
      itemCount, 
      cartOpen, 
      setCartOpen 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
