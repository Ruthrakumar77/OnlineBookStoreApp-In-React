import { useState } from 'react';

const PaymentModal = ({ isOpen, onClose, amount, shippingInfo, onSuccess }) => {
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: ''
  });
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setError('');
    
    // Simulate payment processing
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Randomly fail 10% of the time for demo purposes
      if (Math.random() < 0.1) {
        throw new Error('Payment failed. Please try again or use a different payment method.');
      }
      
      onSuccess();
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" onClick={onClose}>
          <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

        <div className="inline-block align-bottom bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h3 className="text-lg leading-6 font-medium text-white mb-4">
              Complete Your Payment
            </h3>

            <div className="mb-6">
              <div className="flex justify-between items-center bg-gray-700 p-3 rounded">
                <span className="text-gray-300">Total Amount:</span>
                <span className="text-xl font-bold text-purple-400">${amount.toFixed(2)}</span>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex space-x-2 mb-4">
                <button
                  onClick={() => setPaymentMethod('credit')}
                  className={`flex-1 py-2 px-4 rounded ${paymentMethod === 'credit' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300'}`}
                >
                  Credit Card
                </button>
                <button
                  onClick={() => setPaymentMethod('paypal')}
                  className={`flex-1 py-2 px-4 rounded ${paymentMethod === 'paypal' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300'}`}
                >
                  PayPal
                </button>
              </div>

              {paymentMethod === 'credit' ? (
                <form onSubmit={handlePayment} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Card Number</label>
                    <input
                      type="text"
                      name="number"
                      value={cardDetails.number}
                      onChange={handleCardChange}
                      placeholder="1234 5678 9012 3456"
                      required
                      className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Expiry Date</label>
                      <input
                        type="text"
                        name="expiry"
                        value={cardDetails.expiry}
                        onChange={handleCardChange}
                        placeholder="MM/YY"
                        required
                        className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">CVC</label>
                      <input
                        type="text"
                        name="cvc"
                        value={cardDetails.cvc}
                        onChange={handleCardChange}
                        placeholder="123"
                        required
                        className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Name on Card</label>
                    <input
                      type="text"
                      name="name"
                      value={cardDetails.name}
                      onChange={handleCardChange}
                      required
                      className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                    />
                  </div>

                  {error && (
                    <div className="text-red-400 text-sm mt-2">{error}</div>
                  )}

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={processing}
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded disabled:opacity-70"
                    >
                      {processing ? 'Processing...' : 'Pay Now'}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-300 mb-4">You will be redirected to PayPal to complete your payment.</p>
                  <button
                    onClick={handlePayment}
                    disabled={processing}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded disabled:opacity-70"
                  >
                    {processing ? 'Redirecting...' : 'Continue to PayPal'}
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={onClose}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-600 text-base font-medium text-white hover:bg-gray-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;