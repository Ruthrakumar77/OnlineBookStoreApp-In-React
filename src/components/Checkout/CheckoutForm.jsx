import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import PaymentModal from '../Checkout/PaymentModel';

const CheckoutForm = () => {
  const { cart, cartTotal, emptyCart } = useCart();
  const { user } = useAuth();
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [shippingInfo, setShippingInfo] = useState({
    address: user?.address || '',
    city: user?.city || '',
    postalCode: user?.postalCode || '',
    country: user?.country || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPaymentModalOpen(true);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-white mb-6">Checkout</h2>
      
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-white mb-4">Shipping Information</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">First Name</label>
                  <input
                    type="text"
                    value={user?.name.split(' ')[0] || ''}
                    readOnly
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white opacity-70"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Last Name</label>
                  <input
                    type="text"
                    value={user?.name.split(' ')[1] || ''}
                    readOnly
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white opacity-70"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                <input
                  type="email"
                  value={user?.email || ''}
                  readOnly
                  className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white opacity-70"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Address</label>
                <input
                  type="text"
                  name="address"
                  value={shippingInfo.address}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">City</label>
                  <input
                    type="text"
                    name="city"
                    value={shippingInfo.city}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Postal Code</label>
                  <input
                    type="text"
                    name="postalCode"
                    value={shippingInfo.postalCode}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Country</label>
                <input
                  type="text"
                  name="country"
                  value={shippingInfo.country}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded"
              >
                Proceed to Payment
              </button>
            </form>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-white mb-4">Order Summary</h3>
            <div className="space-y-4">
              {cart.map(item => (
                <div key={item.book._id} className="flex justify-between">
                  <div className="flex items-center">
                    <div className="h-10 w-10 bg-gray-700 rounded mr-3 overflow-hidden">
                      {item.book.image && (
                        <img 
                          src={item.book.image} 
                          alt={item.book.title} 
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-white">{item.book.title}</p>
                      <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="text-sm text-purple-400">${(item.book.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-700 mt-4 pt-4 space-y-2">
              <div className="flex justify-between">
                <p className="text-gray-300">Subtotal</p>
                <p className="text-white">${cartTotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-300">Shipping</p>
                <p className="text-white">$0.00</p>
              </div>
              <div className="flex justify-between font-medium text-lg pt-2">
                <p className="text-gray-300">Total</p>
                <p className="text-purple-400">${cartTotal.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PaymentModal 
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        amount={cartTotal}
        shippingInfo={shippingInfo}
        onSuccess={() => {
          emptyCart();
          // Navigate to order confirmation
        }}
      />
    </div>
  );
};

export default CheckoutForm;