import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const OrderItem = ({ order }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-4 mb-4">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
        <div className="mb-2 md:mb-0">
          <h3 className="font-medium text-white">Order #{order._id.slice(0, 8).toUpperCase()}</h3>
          <p className="text-sm text-gray-400">
            {format(new Date(order.createdAt), 'MMMM d, yyyy')}
          </p>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-purple-400">
            ${order.totalAmount.toFixed(2)}
          </p>
          <span className={`px-2 py-1 text-xs rounded-full ${
            order.status === 'delivered' 
              ? 'bg-green-900 text-green-300' 
              : order.status === 'shipped' 
                ? 'bg-blue-900 text-blue-300' 
                : 'bg-yellow-900 text-yellow-300'
          }`}>
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </span>
        </div>
      </div>
      
      <div className="border-t border-gray-700 pt-4">
        {order.items.slice(0, 2).map((item, index) => (
          <div key={index} className="flex items-center mb-3">
            <div className="w-12 h-12 bg-gray-700 rounded mr-3 overflow-hidden">
              {item.book.image && (
                <img 
                  src={item.book.image} 
                  alt={item.book.title} 
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-medium text-white">{item.book.title}</h4>
              <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
            </div>
            <p className="text-sm text-purple-400">
              ${(item.priceAtPurchase * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}
        
        {order.items.length > 2 && (
          <p className="text-sm text-gray-400 mt-2">
            + {order.items.length - 2} more item{order.items.length - 2 !== 1 ? 's' : ''}
          </p>
        )}
      </div>
      
      <div className="mt-4 flex justify-end">
        <Link
          to={`/orders/${order._id}`}
          className="text-purple-400 hover:text-purple-300 text-sm font-medium"
        >
          View Order Details
        </Link>
      </div>
    </div>
  );
};

export default OrderItem;