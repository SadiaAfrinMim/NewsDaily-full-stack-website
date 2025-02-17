


import React, { useEffect, useState } from 'react';
import { Menu, Bell, PenSquare, BookOpen, Crown, Layout, Newspaper } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [hasSubscription, setHasSubscription] = useState(false);

 
 

  const checkAdminStatus = () => {
    const isAdminFromStorage = localStorage.getItem("user_is_admin");
    setIsAdmin(isAdminFromStorage === "admin"); // Set true only if value is "admin"
   
  };

  const checkSubscriptionStatus = () => {
    const isSubscribedStorage = localStorage.getItem("is_subscribed");
    if(isSubscribedStorage === "true") {
      setHasSubscription(true);
      console.log("has Subscription is now  true")
    } else {
      console.log("has subscription still false")
    }
   
  };

  useEffect(() => {
    checkAdminStatus(); // Check initially on mount
    checkSubscriptionStatus();
  }, []);

  useEffect(() => {
    checkAdminStatus(); // Check on every navigation
    checkSubscriptionStatus();
  }, [location]);
  

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleLogout = async () => {
    try {
      await logOut();
      navigate('/login');
    } catch (error) {
      toast.error('Logout failed:', error);
    }
  };

  const handleProfileClick = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className="relative">
      <nav className="bg-gradient-to-r from-red-800 via-red-600 to-red-800 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            {/* Logo & Brand */}
            <div className="flex-shrink-0 flex items-center bg-red-900 p-3 rounded-b-lg shadow-md transform hover:scale-105 transition-transform duration-200">
              <Newspaper className="h-8 w-8" />
              <span className="ml-2 text-2xl font-bold bg-gradient-to-r from-red-100 to-white bg-clip-text text-transparent">
              NewsDaily
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2">
            {[
  { href: "/", text: "Home" },
 user && { href: "/add-articles", text: "Add Articles", icon: <PenSquare className="w-4 h-4" /> },
  { href: "/all-articles", text: "All Articles" },
  user && { href: "/subscription", text: "Subscription", icon: <Crown className="w-4 h-4" /> },
  user && { href: "/my-articles", text: "My Articles" },
  isAdmin && { href: "/dashboard", text: "Dashboard", icon: <Layout className="w-4 h-4" /> },
  { href: "/about", text: "About", icon: <Layout className="w-4 h-4" /> }
  
]
  .filter(Boolean) 
                //.filter(item => !(item.hideIfAdmin && isAdmin))
                .map(item => (
                  <a
                    key={item.text}
                    href={item.href}
                    className="relative group px-4 py-2 rounded-md hover:bg-red-700 transition-all duration-200"
                  >
                    <div className="flex items-center space-x-1">
                      {item.icon && <span>{item.icon}</span>}
                      <span>{item.text}</span>
                    </div>
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
                  </a>
                ))}
              {!hasSubscription ||  isAdmin && (
                <a
                  href="/premium"
                  className="bg-yellow-500 text-black px-4 py-2 rounded-md flex items-center hover:bg-yellow-400 transition-colors duration-200"
                >
                  <Crown className="w-4 h-4 mr-1" />
                  Premium
                </a>
              )}
            </div>

            {/* Auth Section */}
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Bell className="w-5 h-5 cursor-pointer hover:text-red-200 transition-colors duration-200" />
                    <span className="absolute -top-1 -right-1 h-3 w-3 bg-yellow-500 rounded-full"></span>
                  </div>
                  <div className="relative group">
                    <img
                      src={user?.photoURL || '/api/placeholder/40/40'}
                      alt="Profile"
                      className="w-12 h-12 rounded-full cursor-pointer border-2 border-red-300 hover:border-white transition-all duration-200 transform hover:scale-105"
                      onClick={handleProfileClick}
                    />
                    {dropdownVisible && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-1 z-10">
                        <a
                          href="/profile"
                          className="block px-4 py-2 text-gray-800 hover:bg-red-50 transition-colors duration-200"
                        >
                          My Profile
                        </a>
                    {
                        user &&   <a
                        href="/subscription-success"
                        className="block px-4 py-2 text-gray-800 hover:bg-red-50 transition-colors duration-200"
                      >
                        Payment Details
                      </a>
                    }
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-gray-800 hover:bg-red-50 transition-colors duration-200"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="space-x-3">
                  <Link
                    to="/login"
                    className="bg-red-700 hover:bg-red-600 px-6 py-2 rounded-md transition-colors duration-200 shadow-md"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-white text-red-700 hover:bg-red-50 px-6 py-2 rounded-md transition-colors duration-200 shadow-md"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMobileMenu}
                className="inline-flex items-center justify-center p-2 rounded-md hover:bg-red-700 transition-colors duration-200"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden animate-fadeIn">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {[
                { href: "/", text: "Home" },
                user && { href: "/add-articles", text: "Add Articles" },
                { href: "/all-articles", text: "All Articles" },
                user && { href: "/subscription", text: "Subscription" },
                user && { href: "/my-articles", text: "My Articles" },
                isAdmin &&{
                   href: "/dashboard", text: "Dashboard", 
                }
              ]
              .filter(Boolean) 
                // .filter(item => !(item.hideIfAdmin && isAdmin))
                .map(item => (
                  <a
                    key={item.text}
                    href={item.href}
                    className="block px-3 py-2 rounded-md hover:bg-red-700 transition-colors duration-200"
                  >
                    {item.text}
                  </a>
                ))}
              {!hasSubscription ||  isAdmin || (
                <a
                  href="/premium"
                  className="block px-3 py-2 rounded-md bg-yellow-500 text-black hover:bg-yellow-400 transition-colors duration-200"
                >
                  Premium
                </a>
              )}
              {user ? (
                <>
                  <a
                    href="/profile"
                    className="block px-3 py-2 rounded-md hover:bg-red-700 transition-colors duration-200"
                  >
                    My Profile
                  </a>
                  <a
                    href="/subscription-success"
                    className="block px-3 py-2 rounded-md hover:bg-red-700 transition-colors duration-200"
                  >
                    Account
                  </a>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 rounded-md hover:bg-red-700 transition-colors duration-200"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="space-y-2">
                  <Link
                    to="/login"
                    className="block w-full text-left px-3 py-2 rounded-md bg-red-700 hover:bg-red-600 transition-colors duration-200"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="block w-full text-left px-3 py-2 rounded-md bg-white text-red-700 hover:bg-red-50 transition-colors duration-200"
                  >
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
