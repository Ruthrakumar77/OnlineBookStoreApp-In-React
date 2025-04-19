const API_URL ='http://localhost:5000/api';

// Mock data for orders
const mockOrders = [
  {
    _id: '1',
    userId: '2',
    items: [
      {
        book: {
          _id: '1',
          title: 'The Great Gatsby',
          image: 'https://m.media-amazon.com/images/I/71FTb9X6wsL._AC_UF1000,1000_QL80_.jpg'
        },
        quantity: 1,
        priceAtPurchase: 12.99
      },
      {
        book: {
          _id: '3',
          title: '1984',
          image: 'https://m.media-amazon.com/images/I/61ZewDE3beL._AC_UF1000,1000_QL80_.jpg'
        },
        quantity: 2,
        priceAtPurchase: 9.99
      }
    ],
    totalAmount: 32.97,
    status: 'delivered',
    createdAt: '2023-05-15T10:00:00Z',
    shippingAddress: '456 Main St, Anytown, USA 67890'
  },
  {
    _id: '2',
    userId: '2',
    items: [
      {
        book: {
          _id: '2',
          title: 'To Kill a Mockingbird',
          image: 'https://m.media-amazon.com/images/I/71FxgtFKcQL._AC_UF1000,1000_QL80_.jpg'
        },
        quantity: 1,
        priceAtPurchase: 10.50
      }
    ],
    totalAmount: 10.50,
    status: 'shipped',
    createdAt: '2023-06-20T14:30:00Z',
    shippingAddress: '456 Main St, Anytown, USA 67890'
  }
];

export const getOrdersByUser = async (userId) => {
  // In a real app, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const userOrders = mockOrders.filter(order => order.userId === userId);
      resolve(userOrders);
    }, 500);
  });
};

export const createOrder = async (orderData) => {
  // In a real app, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const newOrder = {
        _id: `${mockOrders.length + 1}`,
        ...orderData,
        status: 'processing',
        createdAt: new Date().toISOString()
      };
      mockOrders.unshift(newOrder);
      resolve(newOrder);
    }, 500);
  });
};

export const getOrderById = async (orderId) => {
  // In a real app, this would be an API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const order = mockOrders.find(o => o._id === orderId);
      if (order) {
        resolve(order);
      } else {
        reject(new Error('Order not found'));
      }
    }, 300);
  });
};