import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';

export default function AllUsersPage() {
  const { user } = useAuth(); // Get current logged-in user info
  const [users, setUsers] = useState([]);
  const axiosSecure = useAxiosSecure(); // Axios hook for secure API calls

  useEffect(() => {
    // Fetch all users from the backend
    const fetchUsers = async () => {
      try {
        const response = await axiosSecure.get('/users');
        setUsers(response.data); // Set users data to state
      } catch (error) {
        console.error('Error fetching users:', error);
        toast.error('Failed to fetch users');
      }
    };
    fetchUsers(); // Call function to get users when component mounts
  }, [axiosSecure]);

  const handleRoleChange = async (userId, newRole) => {
    try {
      // API call to update user role
      const response = await axiosSecure.patch(`/users/${userId}/role`, {
        role: newRole,
      });

      if (response.status === 200) {
        // Update users state after role change
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

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">All Users</h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Profile Picture</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>
                  <img
                    src={user.image || '/placeholder.svg'} // Default image if not available
                    alt={`${user.name}'s profile`}
                    className="w-10 h-10 rounded-full"
                  />
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span
                    className={`badge ${
                      user.role === 'admin' ? 'badge-success' : 'badge-secondary'
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td>
                  {/* Allow changing roles only if the logged-in user is admin */}
                  {user.role !== 'admin' && (
                    <button
                      onClick={() => handleRoleChange(user._id, 'admin')}
                      className="btn btn-primary"
                    >
                      Make Admin
                    </button>
                  )}

                  {/* Allow changing normal role to admin only if user is admin */}
                  {user.role === 'admin' && (
                    <button
                      onClick={() => handleRoleChange(user._id, 'normal')}
                      className="btn btn-secondary"
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
    </div>
  );
}
