import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';

export default function AllUsersPage() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const axiosSecure = useAxiosSecure();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5); // Number of users to show per page

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosSecure.get('/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
        toast.error('Failed to fetch users');
      }
    };
    fetchUsers();
  }, [axiosSecure]);

  // Handle role change (as before)
  const handleRoleChange = async (userId, newRole) => {
    try {
      const response = await axiosSecure.patch(`/users/${userId}/role`, {
        role: newRole,
      });

      if (response.status === 200) {
        setUsers(
          users.map((user) =>
            user._id === userId ? { ...user, role: newRole } : user
          )
        );
        toast.success(`User role changed to ${newRole}`);
      }
    } catch (error) {
      console.error('Error changing user role:', error);
      toast.error('Failed to change user role');
    }
  };

  // Get current users based on page
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white ">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h1 className="text-3xl font-bold text-red-800 mb-8 border-b-2 border-red-200 pb-4">
            User Management Dashboard
          </h1>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-red-200">
              <thead>
                <tr className="bg-red-50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-red-900">Profile</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-red-900">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-red-900">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-red-900">Role</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-red-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-red-100">
                {currentUsers.map((user, index) => (
                  <tr
                    key={user._id}
                    className={`hover:bg-red-50 transition-colors duration-150 ease-in-out ${index % 2 === 0 ? 'bg-white' : 'bg-red-50/30'
                      }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={user.image || '/api/placeholder/40/40'}
                          alt={`${user.name}'s profile`}
                          className="w-10 h-10 rounded-full object-cover border-2 border-red-200"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${user.role === 'admin'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-gray-100 text-gray-800'
                          }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {user.role !== 'admin' && (
                        <button
                          onClick={() => handleRoleChange(user._id, 'admin')}
                          className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md shadow-sm transition-colors duration-200 ease-in-out mr-2"
                        >
                          Make Admin
                        </button>
                      )}
                      {user.role === 'admin' && (
                        <button
                          onClick={() => handleRoleChange(user._id, 'normal')}
                          className="inline-flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium rounded-md shadow-sm transition-colors duration-200 ease-in-out"
                        >
                          Make Normal
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-4">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 mx-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400"
            >
              Previous
            </button>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage * usersPerPage >= users.length}
              className="px-4 py-2 mx-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
