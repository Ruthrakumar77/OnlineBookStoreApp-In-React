// Mock cart data
let mockCart = [
    { book: { _id: '1' }, quantity: 2 },
    { book: { _id: '3' }, quantity: 1 }
  ];
  
  // Helper to populate book details
  const populateCart = async () => {
    const { getBooks } = await import('./bookService');
    const books = await getBooks();
    
    return mockCart.map(item => {
      const book = books.find(b => b._id === item.book._id);
      return { ...item, book };
    }).filter(item => item.book); // Remove items if book not found
  };
  
  export const getCart = async () => {
    // In a real app, this would be an API call
    return new Promise(async (resolve) => {
      setTimeout(async () => {
        const populatedCart = await populateCart();
        resolve(populatedCart);
      }, 300);
    });
  };
  
  export const addToCart = async (bookId, quantity = 1) => {
    // In a real app, this would be an API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const existingItem = mockCart.find(item => item.book._id === bookId);
        
        if (existingItem) {
          existingItem.quantity += quantity;
        } else {
          mockCart.push({ book: { _id: bookId }, quantity });
        }
        
        resolve();
      }, 300);
    });
  };
  
  export const removeFromCart = async (bookId) => {
    // In a real app, this would be an API call
    return new Promise((resolve) => {
      setTimeout(() => {
        mockCart = mockCart.filter(item => item.book._id !== bookId);
        resolve();
      }, 300);
    });
  };
  
  export const clearCart = async () => {
    // In a real app, this would be an API call
    return new Promise((resolve) => {
      setTimeout(() => {
        mockCart = [];
        resolve();
      }, 300);
    });
  };