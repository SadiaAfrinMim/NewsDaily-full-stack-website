import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { Edit2, Save, X, User } from 'lucide-react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';

const UserProfiles = () => {
  const axiosSecure = useAxiosSecure();
  const {user} = useAuth()
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingState, setEditingState] = useState({});
  const [editForms, setEditForms] = useState({});

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axiosSecure.get('/users');
        console.log('Fetched users:', response.data);  // Add this to check the response
  
        const matchedUser = response.data.find((usr) => usr.email === user.email);
  
        if (matchedUser) {
          setUsers([matchedUser]);
        } else {
          setUsers([]);
        }
  
        const initialEditState = {};
        if (matchedUser) {
          initialEditState[matchedUser._id] = false;
          setEditingState(initialEditState);
  
          const initialForms = {};
          initialForms[matchedUser._id] = {
            name: matchedUser.name,
            email: matchedUser.email,
            image: matchedUser.image,
            role: matchedUser.role,
            plan: matchedUser.plan,
            isSubscribed: matchedUser.isSubscribed,
          };
          setEditForms(initialForms);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        toast.error('Failed to load users data');
      } finally {
        setLoading(false);
      }
    };
  
    // Log the `user` from useAuth to check if it's available
    console.log('Current user:', user);
  
    if (user?.email) {
      fetchUsers();
    } else {
      console.log('User email not available.');
    }
  }, [axiosSecure, user]);  // Re-run when user or axiosSecure changes
  
  const handleEditToggle = (userId) => {
    setEditingState(prev => {
      const newState = { ...prev };
      if (newState[userId]) {
        // Reset form to original values if canceling
        setEditForms(prevForms => ({
          ...prevForms,
          [userId]: {
            name: users.find(u => u._id === userId).name,
            email: users.find(u => u._id === userId).email,
            image: users.find(u => u._id === userId).image,
            role: users.find(u => u._id === userId).role,
            plan: users.find(u => u._id === userId).plan,
            isSubscribed: users.find(u => u._id === userId).isSubscribed
          }
        }));
      }
      newState[userId] = !newState[userId];
      return newState;
    });
  };

  const handleInputChange = (userId, e) => {
    const { name, value, type, checked } = e.target;
    setEditForms(prev => ({
      ...prev,
      [userId]: {
        ...prev[userId],
        [name]: type === 'checkbox' ? checked : value
      }
    }));
  };

  const handleSubmit = async (e, id) => {
    e.preventDefault();
    
    // Ensure editForms has data for the user we want to update
    const userToUpdate = editForms[id];
    
    if (!userToUpdate) {
      toast.error('User not found');
      return;
    }
  
    try {
      // Perform the PATCH request with the user's ID and updated data
      const response = await axiosSecure.patch(`/users/${id}`, userToUpdate);
      
      // Update the state with the modified user data
      setUsers(prev =>
        prev.map(user =>
          user._id === id ? { ...user, ...response.data } : user
        )
      );
  
      // Close the edit mode for the user
      setEditingState(prev => ({ ...prev, [id]: false }));
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Failed to update profile');
    }
  };
  


  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!users.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No users found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">User Management</h1>
        
        {users.map(user => (
          <div key={user._id} className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
            <div className="p-6 sm:p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">User Profile</h2>
                <button
                  onClick={() => handleEditToggle(user._id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium ${
                    editingState[user._id]
                      ? 'text-red-600 hover:bg-red-50'
                      : 'text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  {editingState[user._id] ? (
                    <>
                      <X className="w-4 h-4" />
                      <span>Cancel</span>
                    </>
                  ) : (
                    <>
                      <Edit2 className="w-4 h-4" />
                      <span>Edit Profile</span>
                    </>
                  )}
                </button>
              </div>

              <form onSubmit={(e) => handleSubmit(e, user._id)}>
                <div className="space-y-6">
                  {/* Profile Image */}
                  <div className="flex justify-center">
                    <div className="relative">
                      {editForms[user._id]?.image ? (
                        <img
                          src={editForms[user._id].image}
                          alt={editForms[user._id].name}
                          className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                        />
                      ) : (
                        <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
                          <User className="w-16 h-16 text-gray-400" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Name
                      </label>
                      {editingState[user._id] ? (
                        <input
                          type="text"
                          name="name"
                          value={editForms[user._id]?.name || ''}
                          onChange={(e) => handleInputChange(user._id, e)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      ) : (
                        <p className="p-3 bg-gray-50 rounded-lg text-gray-800">{user.name}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <p className="p-3 bg-gray-50 rounded-lg text-gray-800">{user.email}</p>
                    </div>

                    {/* Role */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Role
                      </label>
                      <p className="p-3 bg-gray-50 rounded-lg text-gray-800 capitalize">{user.role}</p>
                    </div>

                    {/* Plan */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Plan
                      </label>
                      <p className="p-3 bg-gray-50 rounded-lg text-gray-800 capitalize">{user.plan}</p>
                    </div>

                    {/* Image URL */}
                    {editingState[user._id] && (
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Profile Image URL
                        </label>
                        <input
                          type="text"
                          name="image"
                          value={editForms[user._id]?.image || ''}
                          onChange={(e) => handleInputChange(user._id, e)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    )}

                    {/* Subscription Status */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subscription Status
                      </label>
                      <p className="p-3 bg-gray-50 rounded-lg text-gray-800">
                        {user.isSubscribed ? 'Subscribed' : 'Not Subscribed'}
                      </p>
                    </div>

                    {/* Premium Taken Date */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Premium Taken
                      </label>
                      <p className="p-3 bg-gray-50 rounded-lg text-gray-800">
                        {user.premiumTaken
                          ? new Date(user.premiumTaken).toLocaleDateString()
                          : 'Not taken'}
                      </p>
                    </div>
                  </div>

                  {/* Submit Button */}
                  {editingState[user._id] && (
                    <div className="flex justify-end mt-6">
                      <button
                        type="submit"
                        className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save Changes</span>
                      </button>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfiles;