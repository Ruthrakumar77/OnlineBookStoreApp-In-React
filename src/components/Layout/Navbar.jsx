import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { ShoppingCartIcon, UserIcon, LoginIcon, LogoutIcon, BookOpenIcon } from '../Icons';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { itemCount, setCartOpen } = useCart();

  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <BookOpenIcon className="h-6 w-6 text-purple-400" />
          <span className="text-xl font-bold">BookVerse</span>
        </Link>

        <div className="hidden md:flex space-x-6">
          <NavLink to="/" className="hover:text-purple-300">Home</NavLink>
          <NavLink to="/books" className="hover:text-purple-300">Books</NavLink>
          {user?.isAdmin && (
            <NavLink to="/admin" className="hover:text-purple-300">Admin</NavLink>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setCartOpen(true)}
            className="relative p-2 hover:bg-gray-800 rounded-full"
          >
            <ShoppingCartIcon className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-purple-600 text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>

          {user ? (
            <div className="flex items-center space-x-2">
              <Link to="/profile" className="flex items-center space-x-1 hover:text-purple-300">
                <UserIcon className="h-5 w-5" />
                <span>{user.name}</span>
              </Link>
              <button 
                onClick={logout}
                className="p-2 hover:bg-gray-800 rounded-full"
                title="Logout"
              >
                <LogoutIcon className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <Link to="/login" className="flex items-center space-x-1 hover:text-purple-300">
              <LoginIcon className="h-5 w-5" />
              <span>Login</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;