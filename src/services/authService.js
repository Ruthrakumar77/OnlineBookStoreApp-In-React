
const API_URL = 'http://localhost:5000/api';

// Mock user data for demonstration
const mockUsers = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    isAdmin: true,
    address: '123 Admin St',
    city: 'Adminville',
    postalCode: '12345',
    country: 'Adminland'
  },
  {
    id: '2',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'john123',
    isAdmin: false,
    address: '456 Main St',
    city: 'Anytown',
    postalCode: '67890',
    country: 'USA'
  }
];

export const loginUser = async (credentials) => {
  // In a real app, this would be an API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = mockUsers.find(
        u => u.email === credentials.email && u.password === credentials.password
      );
      
      if (user) {
        // Remove password before returning
        const { password, ...userData } = user;
        localStorage.setItem('user', JSON.stringify(userData));
        resolve(userData);
      } else {
        reject(new Error('Invalid email or password'));
      }
    }, 500);
  });
};

export const registerUser = async (userData) => {
  // In a real app, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const newUser = {
        id: `${mockUsers.length + 1}`,
        ...userData,
        isAdmin: false
      };
      mockUsers.push(newUser);
      
      // Remove password before returning
      const { password, ...userToReturn } = newUser;
      localStorage.setItem('user', JSON.stringify(userToReturn));
      resolve(userToReturn);
    }, 500);
  });
};

export const logoutUser = async () => {
  // In a real app, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      localStorage.removeItem('user');
      resolve();
    }, 200);
  });
};

export const getCurrentUser = async () => {
  // In a real app, this might verify the token with the server
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = JSON.parse(localStorage.getItem('user'));
      resolve(user || null);
    }, 200);
  });
};
