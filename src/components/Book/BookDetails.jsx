import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { ShoppingCartIcon, ArrowLeftIcon, StarIcon, EditIcon } from '../Icons';
import { getBookById } from '../../services/bookService';

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { user } = useAuth();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const bookData = await getBookById(id);
        setBook(bookData);
      } catch (err) {
        setError(err.message || 'Failed to load book details');
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleAddToCart = () => {
    addItem(book._id, quantity);
    navigate('/cart');
  };

  const handleEditBook = () => {
    navigate(`/admin/books/edit/${book._id}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full text-center">
          <h2 className="text-xl font-bold text-red-400 mb-4">Error</h2>
          <p className="text-gray-300 mb-6">{error}</p>
          <button
            onClick={() => navigate('/books')}
            className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded"
          >
            Back to Books
          </button>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full text-center">
          <h2 className="text-xl font-bold text-white mb-4">Book Not Found</h2>
          <p className="text-gray-300 mb-6">The requested book could not be found.</p>
          <button
            onClick={() => navigate('/books')}
            className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded"
          >
            Browse All Books
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-400 hover:text-white mb-6"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back
        </button>

        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3 p-6 flex justify-center bg-gray-700">
              {book.image ? (
                <img
                  src={book.image}
                  alt={book.title}
                  className="h-80 w-full object-contain rounded"
                />
              ) : (
                <div className="h-80 w-full flex items-center justify-center bg-gray-600 rounded text-gray-400">
                  No Image Available
                </div>
              )}
            </div>

            <div className="md:w-2/3 p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold mb-2">{book.title}</h1>
                  <p className="text-lg text-gray-400 mb-4">by {book.author}</p>
                </div>
                {user?.isAdmin && (
                  <button
                    onClick={handleEditBook}
                    className="text-blue-400 hover:text-blue-300 flex items-center"
                    title="Edit Book"
                  >
                    <EditIcon className="h-5 w-5 mr-1" />
                    Edit
                  </button>
                )}
              </div>

              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`h-5 w-5 ${i < 4 ? 'fill-current' : ''}`}
                    />
                  ))}
                </div>
                <span className="text-gray-400 text-sm ml-2">(24 reviews)</span>
              </div>

              <div className="mb-6">
                <span className={`text-lg font-bold ${book.stock > 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {book.stock > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
                {book.stock > 0 && (
                  <span className="text-gray-400 text-sm ml-2">{book.stock} available</span>
                )}
              </div>

              <div className="mb-6">
                <span className="text-3xl font-bold text-purple-400">
                  ${book.price.toFixed(2)}
                </span>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-gray-300">{book.description || 'No description available.'}</p>
              </div>

              {book.stock > 0 && (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border border-gray-600 rounded">
                    <button
                      onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                      className="px-3 py-1 text-gray-400 hover:text-white hover:bg-gray-700"
                      disabled={quantity <= 1}
                    >
                      <MinusIcon className="h-4 w-4" />
                    </button>
                    <span className="px-4 py-1 text-white">{quantity}</span>
                    <button
                      onClick={() => setQuantity(prev => Math.min(book.stock, prev + 1))}
                      className="px-3 py-1 text-gray-400 hover:text-white hover:bg-gray-700"
                      disabled={quantity >= book.stock}
                    >
                      <PlusIcon className="h-4 w-4" />
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded flex items-center justify-center"
                  >
                    <ShoppingCartIcon className="h-5 w-5 mr-2" />
                    Add to Cart
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="p-6 border-t border-gray-700">
            <h3 className="text-lg font-semibold mb-4">Details</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-400">Publisher</p>
                <p className="text-white">BookVerse Publishing</p>
              </div>
              <div>
                <p className="text-gray-400">Language</p>
                <p className="text-white">English</p>
              </div>
              <div>
                <p className="text-gray-400">Pages</p>
                <p className="text-white">320</p>
              </div>
              <div>
                <p className="text-gray-400">ISBN</p>
                <p className="text-white">978-3-16-148410-0</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;