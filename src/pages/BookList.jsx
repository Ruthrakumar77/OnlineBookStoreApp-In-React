import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import BookCard from '../components/Book/BookCard';
import SearchBar from '../components/Search/SearchBar';
import Filters from '../components/Search/Filters';
import { getBooks } from '../services/bookService';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const searchQuery = searchParams.get('search');
        const minPrice = searchParams.get('minPrice');
        const maxPrice = searchParams.get('maxPrice');
        
        const filters = {};
        if (searchQuery) filters.search = searchQuery;
        if (minPrice) filters.minPrice = minPrice;
        if (maxPrice) filters.maxPrice = maxPrice;
        
        const booksData = await getBooks(filters);
        setBooks(booksData);
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <SearchBar initialQuery={searchParams.get('search') || ''} />
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/4">
            <Filters />
          </div>

          <div className="md:w-3/4">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
              </div>
            ) : books.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">No books found</h3>
                <p className="text-gray-400">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {books.map(book => (
                  <BookCard key={book._id} book={book} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookList;