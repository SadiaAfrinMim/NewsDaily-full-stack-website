import React from 'react';
import { Menu, Bell, PenSquare, BookOpen, Crown, Layout } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { user, logOut } = useAuth(); // Get user data and logout function from useAuth
  const navigate = useNavigate(); // For navigation after logout
  const [isAdmin, setIsAdmin] = React.useState(false); // For admin visibility
  const [hasSubscription, setHasSubscription] = React.useState(false); // For premium visibility
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [dropdownVisible, setDropdownVisible] = React.useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleLogout = async () => {
    try {
      await logOut();
      navigate('/login'); // Redirect to login page after logout
    } catch (error) {
      toast.error('Logout failed:', error);
    }
  };

  const handleProfileClick = () => {
    setDropdownVisible(!dropdownVisible); // Toggle dropdown visibility
  };

  return (
    <div className="relative">
      <nav className="bg-gradient-to-r from-purple-700 via-purple-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo & Brand */}
            <div className="flex-shrink-0 flex items-center">
              <BookOpen className="h-8 w-8" />
              <span className="ml-2 text-xl font-bold">ArticleHub</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <a href="/" className="hover:bg-purple-500 px-3 py-2 rounded-md">Home</a>
              <a href="/add-articles" className="hover:bg-purple-500 px-3 py-2 rounded-md flex items-center">
                <PenSquare className="w-4 h-4 mr-1" />
                Add Articles
              </a>
              <a href="/all-articles" className="hover:bg-purple-500 px-3 py-2 rounded-md">All Articles</a>
              <a href="/subscription" className="hover:bg-purple-500 px-3 py-2 rounded-md flex items-center">
                <Crown className="w-4 h-4 mr-1" />
                Subscription
              </a>

              <a href="/my-articles" className="hover:bg-purple-500 px-3 py-2 rounded-md">My Articles</a>
             
{/* 
              {isAdmin && ( */}
                <a href="/admindashboard" className="hover:bg-purple-500 px-3 py-2 rounded-md flex items-center">
                  <Layout className="w-4 h-4 mr-1" />
                  Dashboard
                </a>
              {/* )} */}

              {hasSubscription && (
                <a href="/premium" className="bg-yellow-500 text-black px-3 py-2 rounded-md flex items-center">
                  <Crown className="w-4 h-4 mr-1" />
                  Premium
                </a>
              )}
            </div>

            {/* Auth Section */}
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  <Bell className="w-5 h-5 cursor-pointer hover:text-purple-200" />
                  <div className="relative group">
                    <img
                      src={user?.photoURL || '/api/placeholder/40/40'}
                      alt="Profile"
                      className="w-10 h-10 rounded-full cursor-pointer border-2 border-purple-300 hover:border-white"
                      onClick={handleProfileClick} // Trigger dropdown on image click
                    />
                    {dropdownVisible && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                        <a href="/profile" className="block px-4 py-2 text-gray-800 hover:bg-purple-100">My Profile</a>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-gray-800 hover:bg-purple-100"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="space-x-2">
                  <Link to="/login" className="bg-purple-500 hover:bg-purple-400 px-4 py-2 rounded-md">
                    Login
                  </Link>
                  <Link to="/signup" className="bg-white text-purple-700 hover:bg-purple-100 px-4 py-2 rounded-md">
                    Register
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button onClick={toggleMobileMenu} className="inline-flex items-center justify-center p-2 rounded-md hover:bg-purple-500">
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="/" className="block px-3 py-2 rounded-md hover:bg-purple-500">Home</a>
              <a href="/add-articles" className="block px-3 py-2 rounded-md hover:bg-purple-500">Add Articles</a>
              <a href="/all-articles" className="block px-3 py-2 rounded-md hover:bg-purple-500">All Articles</a>
              <a href="/subscription" className="block px-3 py-2 rounded-md hover:bg-purple-500">Subscription</a>
              {isAdmin && (
                <a href="/dashboard" className="block px-3 py-2 rounded-md hover:bg-purple-500">Dashboard</a>
              )}
              {hasSubscription && (
                <a href="/premium" className="block px-3 py-2 rounded-md bg-yellow-500 text-black">Premium</a>
              )}
              {user ? (
                <>
                  <a href="/profile" className="block px-3 py-2 rounded-md hover:bg-purple-500">My Profile</a>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 rounded-md hover:bg-purple-500"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="space-y-1">
                  <Link to="/login" className="block w-full text-left px-3 py-2 rounded-md bg-purple-500 hover:bg-purple-400">
                    Login
                  </Link>
                  <Link to="/signup" className="block w-full text-left px-3 py-2 rounded-md bg-white text-purple-700 hover:bg-purple-100">
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
