import { BookAIcon, BookOpen, Building2, Home, Users } from 'lucide-react';
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

// const [isAdmin,setIsAdmin] = useState('null')
// const DashBoard

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-64 bg-white shadow-lg">
        <div className="p-4">
          <h2 className="text-xl font-bold text-red-600 mb-6">Admin Dashboard</h2>
          <nav className="space-y-2">
         
            <NavLink
              to="admin/users"
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded text-gray-700 ${
                  isActive ? 'bg-red-50 text-red-600' : 'hover:bg-red-50 hover:text-red-600'
                }`
              }
            >
              <Users size={20} />
              All Users
            </NavLink>
            <NavLink
              to="admin/articles"
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded text-gray-700 ${
                  isActive ? 'bg-red-50 text-red-600' : 'hover:bg-red-50 hover:text-red-600'
                }`
              }
            >
              <BookOpen size={20} />
              All Articles
            </NavLink>
            <NavLink
              to="admin/publishers"
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded text-gray-700 ${
                  isActive ? 'bg-red-50 text-red-600' : 'hover:bg-red-50 hover:text-red-600'
                }`
              }
            >
              <Building2 size={20} />
              Add Publisher
            </NavLink>
            <NavLink
              to="admin/all-publisher"
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded text-gray-700 ${
                  isActive ? 'bg-red-50 text-red-600' : 'hover:bg-red-50 hover:text-red-600'
                }`
              }
            >
              <BookAIcon size={20} />
             All Publisher
            </NavLink>
          </nav>

 <div className="divider"></div>

          <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded text-gray-700 ${
                  isActive ? 'bg-red-50 text-red-600' : 'hover:bg-red-50 hover:text-red-600'
                }`
              }
            >
              <Home size={20} />
              Home
            </NavLink>
            <NavLink
              to="/all-articles"
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded text-gray-700 ${
                  isActive ? 'bg-red-50 text-red-600' : 'hover:bg-red-50 hover:text-red-600'
                }`
              }
            >
              <BookAIcon size={20} />
             All Articles
            </NavLink>
          
            <NavLink
              to="/my-articles"
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded text-gray-700 ${
                  isActive ? 'bg-red-50 text-red-600' : 'hover:bg-red-50 hover:text-red-600'
                }`
              }
            >
              <BookAIcon size={20} />
             My Article
            </NavLink>
        </div>
      </div>
      {/* user data */}
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
