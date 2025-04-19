
import { useCart } from '../../context/CartContext';
import { MinusIcon, PlusIcon, TrashIcon } from '../Icons';

const CartItem = ({ item }) => {
  const { addItem, removeItem } = useCart();

  const handleIncrease = () => {
    addItem(item.book._id, 1);
  };

  const handleDecrease = () => {
    if (item.quantity > 1) {
      addItem(item.book._id, -1);
    } else {
      removeItem(item.book._id);
    }
  };

  const handleRemove = () => {
    removeItem(item.book._id);
  };

  return (
    <div className="flex items-center py-4 border-b border-gray-700">
      <div className="flex-shrink-0 h-16 w-16 bg-gray-700 rounded-md overflow-hidden mr-4">
        {item.book.image ? (
          <img
            src={item.book.image}
            alt={item.book.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-gray-500">
            <span>No Image</span>
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-white truncate">
          {item.book.title}
        </h3>
        <p className="text-xs text-gray-400">by {item.book.author}</p>
        <p className="text-sm text-purple-400 mt-1">
          ${item.book.price.toFixed(2)}
        </p>
      </div>

      <div className="flex items-center space-x-2 ml-4">
        <button
          onClick={handleDecrease}
          className="text-gray-400 hover:text-white p-1 rounded hover:bg-gray-700"
          aria-label="Decrease quantity"
        >
          {item.quantity === 1 ? (
            <TrashIcon className="h-4 w-4" />
          ) : (
            <MinusIcon className="h-4 w-4" />
          )}
        </button>

        <span className="text-white w-6 text-center">{item.quantity}</span>

        <button
          onClick={handleIncrease}
          className="text-gray-400 hover:text-white p-1 rounded hover:bg-gray-700"
          aria-label="Increase quantity"
          disabled={item.quantity >= item.book.stock}
        >
          <PlusIcon className="h-4 w-4" />
        </button>
      </div>

      <div className="ml-4 text-right">
        <p className="text-sm font-medium text-white">
          ${(item.book.price * item.quantity).toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default CartItem;
