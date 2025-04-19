const API_URL ='http://localhost:5000/api';

// Mock data for books
const mockBooks = [
  {
    _id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    description: 'A story of wealth, love, and the American Dream in the 1920s.',
    price: 12.99,
    stock: 15,
    image: 'https://m.media-amazon.com/images/I/71FTb9X6wsL._AC_UF1000,1000_QL80_.jpg'
  },
  {
    _id: '2',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    description: 'A powerful story of racial injustice and moral growth in the American South.',
    price: 10.50,
    stock: 8,
    image: 'https://m.media-amazon.com/images/I/71FxgtFKcQL._AC_UF1000,1000_QL80_.jpg'
  },
  {
    _id: '3',
    title: '1984',
    author: 'George Orwell',
    description: 'A dystopian novel about totalitarianism and surveillance.',
    price: 9.99,
    stock: 20,
    image: 'https://m.media-amazon.com/images/I/61ZewDE3beL._AC_UF1000,1000_QL80_.jpg'
  }
];

// Get all books with optional filters
export const getBooks = async (filters = {}) => {
  // In a real app, this would be an API call with query parameters
  return new Promise((resolve) => {
    setTimeout(() => {
      let filteredBooks = [...mockBooks];
      
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        filteredBooks = filteredBooks.filter(
          book => book.title.toLowerCase().includes(searchTerm) || 
                 book.author.toLowerCase().includes(searchTerm)
        );
      }
      
      if (filters.minPrice) {
        filteredBooks = filteredBooks.filter(
          book => book.price >= parseFloat(filters.minPrice)
        );
      }
      
      if (filters.maxPrice) {
        filteredBooks = filteredBooks.filter(
          book => book.price <= parseFloat(filters.maxPrice)
        );
      }
      
      resolve(filteredBooks);
    }, 500);
  });
};

// Get a single book by ID
export const getBookById = async (id) => {
  // In a real app, this would be an API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const book = mockBooks.find(book => book._id === id);
      if (book) {
        resolve(book);
      } else {
        reject(new Error('Book not found'));
      }
    }, 300);
  });
};

// Create a new book (admin only)
export const createBook = async (bookData) => {
  // In a real app, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const newBook = {
        _id: `${mockBooks.length + 1}`,
        ...bookData,
        price: parseFloat(bookData.price),
        stock: parseInt(bookData.stock)
      };
      mockBooks.push(newBook);
      resolve(newBook);
    }, 500);
  });
};

// Update an existing book (admin only)
export const updateBook = async (id, bookData) => {
  // In a real app, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = mockBooks.findIndex(book => book._id === id);
      if (index !== -1) {
        const updatedBook = {
          ...mockBooks[index],
          ...bookData,
          price: parseFloat(bookData.price),
          stock: parseInt(bookData.stock)
        };
        mockBooks[index] = updatedBook;
        resolve(updatedBook);
      }
    }, 500);
  });
};

// Delete a book (admin only)
export const deleteBook = async (id) => {
  // In a real app, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = mockBooks.findIndex(book => book._id === id);
      if (index !== -1) {
        mockBooks.splice(index, 1);
      }
      resolve();
    }, 500);
  });
};