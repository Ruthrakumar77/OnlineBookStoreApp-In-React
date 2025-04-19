import { XIcon } from '../Icons';
import { useCart } from '../../context/CartContext';
import CartItem from './CartItem';

const CartSidebar = () => {
  const { cart, cartOpen, setCartOpen, cartTotal, emptyCart } = useCart();

  return (
    <div className={`fixed inset-0 z-50 overflow-hidden ${cartOpen ? 'block' : 'hidden'}`}>
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute inset-0 bg-gray-900 bg-opacity-50 transition-opacity" 
          onClick={() => setCartOpen(false)}
        ></div>
        
        <div className="fixed inset-y-0 right-0 max-w-full flex">
          <div className="w-screen max-w-md">
            <div className="h-full flex flex-col bg-gray-800 shadow-xl">
              <div className="flex-1 overflow-y-auto">
                <div className="px-4 py-6 sm:px-6 flex justify-between items-center border-b border-gray-700">
                  <h2 className="text-lg font-medium text-white">Shopping Cart</h2>
                  <button 
                    onClick={() => setCartOpen(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <XIcon className="h-6 w-6" />
                  </button>
                </div>

                <div className="px-4 py-6 sm:px-6">
                  {cart.length === 0 ? (
                    <p className="text-gray-400">Your cart is empty</p>
                  ) : (
                    <div className="space-y-4">
                      {cart.map(item => (
                        <CartItem key={item.book._id} item={item} />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {cart.length > 0 && (
                <div className="border-t border-gray-700 px-4 py-6 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-white mb-4">
                    <p>Subtotal</p>
                    <p>${cartTotal.toFixed(2)}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={emptyCart}
                      className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded"
                    >
                      Clear Cart
                    </button>
                    <button
                      onClick={() => {
                        setCartOpen(false);
                        // Navigate to checkout
                      }}
                      className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded"
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;