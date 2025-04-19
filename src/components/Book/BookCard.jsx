import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { ShoppingCartIcon } from '../Icons';

const BookCard = ({ book }) => {
  const { addItem } = useCart();

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <Link to={`/books/${book._id}`} className="block">
        <div className="h-48 bg-gray-700 flex items-center justify-center">
          {book.image ? (
            <img 
              src={book.image} 
              alt={book.title} 
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-gray-500">No Image</span>
          )}
        </div>
      </Link>
      
      <div className="p-4">
        <Link to={`/books/${book._id}`} className="block">
          <h3 className="text-lg font-semibold text-white mb-1 truncate">{book.title}</h3>
          <p className="text-gray-400 text-sm mb-2">by {book.author}</p>
        </Link>
        
        <div className="flex justify-between items-center mt-3">
          <span className="text-purple-400 font-bold">${book.price.toFixed(2)}</span>
          {book.stock > 0 ? (
            <button 
              onClick={() => addItem(book._id)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded flex items-center"
            >
              <ShoppingCartIcon className="h-4 w-4 mr-1" />
              Add
            </button>
          ) : (
            <span className="text-red-400 text-sm">Out of Stock</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookCard;