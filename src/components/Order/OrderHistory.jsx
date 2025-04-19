
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import OrderItem from './OrderItem';
import { getOrdersByUser } from '../../services/orderService';

const OrderHistory = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (user) {
          const ordersData = await getOrdersByUser(user.id);
          setOrders(ordersData);
        }
      } catch (err) {
        setError(err.message || 'Failed to load orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 text-center">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 text-center">
        <h3 className="text-lg font-medium text-white mb-2">No orders yet</h3>
        <p className="text-gray-400 mb-4">You haven't placed any orders with us yet.</p>
        <Link
          to="/books"
          className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
        >
          Browse Books
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-xl font-bold mb-6">Order History</h2>
      <div className="space-y-4">
        {orders.map(order => (
          <OrderItem key={order._id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
