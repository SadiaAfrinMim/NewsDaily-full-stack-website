import { BookAIcon, BookOpen, Building2, Home, PilcrowLeftIcon, Users, Menu } from 'lucide-react';
import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import useAuth from '../../../Hooks/useAuth';

const Dashboard = () => {
  const { user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`w-64 bg-white shadow-lg fixed md:relative transition-all duration-300 ${isSidebarOpen ? 'left-0' : '-left-64'} md:left-0`}> 
        <div className="p-4">
          <h2 className="text-xl font-bold text-red-600 mb-6">Admin Dashboard</h2>
          <div className='flex items-center justify-center'>
            <img src={user?.photoURL} className='w-20 h-20 border-red-600 border rounded-full' alt="User" />
          </div>
          <h2 className='text-center text-red-600 mt-4 text-xl font-bold'>{user?.displayName}</h2>
          
          <nav className="space-y-2 mt-4">
            <NavLink to="admin/users" className={({ isActive }) => `flex items-center gap-2 p-2 rounded ${isActive ? 'bg-red-50 text-red-600' : 'hover:bg-red-50 hover:text-red-600'}` }>
              <Users size={20} /> All Users
            </NavLink>
            <NavLink to="admin/articles" className={({ isActive }) => `flex items-center gap-2 p-2 rounded ${isActive ? 'bg-red-50 text-red-600' : 'hover:bg-red-50 hover:text-red-600'}` }>
              <BookOpen size={20} /> All Articles
            </NavLink>
            <NavLink to="admin/publishers" className={({ isActive }) => `flex items-center gap-2 p-2 rounded ${isActive ? 'bg-red-50 text-red-600' : 'hover:bg-red-50 hover:text-red-600'}` }>
              <Building2 size={20} /> Add Publisher
            </NavLink>
            <NavLink to="admin/all-publisher" className={({ isActive }) => `flex items-center gap-2 p-2 rounded ${isActive ? 'bg-red-50 text-red-600' : 'hover:bg-red-50 hover:text-red-600'}` }>
              <BookAIcon size={20} /> All Publisher
            </NavLink>
          </nav>

          <div className="divider my-4"></div>
          <NavLink to="/" className="flex items-center gap-2 p-2 rounded hover:bg-red-50 hover:text-red-600">
            <Home size={20} /> Home
          </NavLink>
          <NavLink to="/all-articles" className="flex items-center gap-2 p-2 rounded hover:bg-red-50 hover:text-red-600">
            <BookAIcon size={20} /> All Articles
          </NavLink>
          <NavLink to="/my-articles" className="flex items-center gap-2 p-2 rounded hover:bg-red-50 hover:text-red-600">
            <BookAIcon size={20} /> My Articles
          </NavLink>
          <NavLink to="/profile" className="flex items-center gap-2 p-2 rounded hover:bg-red-50 hover:text-red-600">
            <PilcrowLeftIcon size={20} /> My Profile
          </NavLink>
        </div>
      </div>
      
      {/* Toggle Button */}
      <button className="absolute top-4 left-4 md:hidden p-2 bg-red-600 text-white rounded-full" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        <Menu size={24} />
      </button>
      
      {/* Main Content */}
      <div className="flex-1 md:ml-64 p-4 transition-all duration-300">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;