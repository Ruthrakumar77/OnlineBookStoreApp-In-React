import { useState, useEffect } from 'react';
import BookForm from '../components/Book/BookForm';
import { getBooks, createBook, updateBook, deleteBook } from '../services/bookService';

const Admin = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingBook, setEditingBook] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const booksData = await getBooks();
        setBooks(booksData);
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleCreate = async (bookData) => {
    try {
      const newBook = await createBook(bookData);
      setBooks([...books, newBook]);
      setShowForm(false);
    } catch (error) {
      console.error('Error creating book:', error);
    }
  };

  const handleUpdate = async (bookData) => {
    try {
      const updatedBook = await updateBook(editingBook._id, bookData);
      setBooks(books.map(book => 
        book._id === updatedBook._id ? updatedBook : book
      ));
      setEditingBook(null);
      setShowForm(false);
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  const handleDelete = async (bookId) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await deleteBook(bookId);
        setBooks(books.filter(book => book._id !== bookId));
      } catch (error) {
        console.error('Error deleting book:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <button
            onClick={() => {
              setEditingBook(null);
              setShowForm(true);
            }}
            className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded"
          >
            Add New Book
          </button>
        </div>

        {showForm && (
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
            <BookForm
              initialData={editingBook}
              onSubmit={editingBook ? handleUpdate : handleCreate}
              onCancel={() => {
                setEditingBook(null);
                setShowForm(false);
              }}
            />
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Author</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Stock</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {books.map(book => (
                  <tr key={book._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-gray-700 rounded mr-3 overflow-hidden">
                          {book.image && (
                            <img 
                              src={book.image} 
                              alt={book.title} 
                              className="h-full w-full object-cover"
                            />
                          )}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white">{book.title}</div>
                          <div className="text-sm text-gray-400 truncate max-w-xs">{book.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{book.author}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-400">${book.price.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{book.stock}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => {
                          setEditingBook(book);
                          setShowForm(true);
                        }}
                        className="text-blue-400 hover:text-blue-300 mr-3"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(book._id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;