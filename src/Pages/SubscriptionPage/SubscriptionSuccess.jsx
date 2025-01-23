import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';

const SubscriptionSuccess = () => {
  const { user, logout } = useAuth(); // Get the logged-in user's data from the auth context
  const [users, setUsers] = useState([]); // Store multiple users, hence an array
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosSecure.get('/users'); // Replace with your API endpoint to fetch user profile
        setUsers(response.data); // Assuming the response contains an array of user data
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, [axiosSecure]);

  if (!users.length) {
    return <span className="loading text-center loading-spinner text-error"></span>; // Show a loading state until user data is fetched
  }

  // Find the user matching the logged-in user's email
  const loggedInUser = users.find((userData) => userData.email === user?.email);

  if (!loggedInUser) {
    return <span>No user found with the email {user?.email}</span>; // If no matching user found, show an error message
  }

  return (
    <div className="container lg:max-w-2xl mx-auto p-4">
      <h1 className="text-3xl border-b-4 pb-2 border-red-600 font-bold text-center mb-6">Subscription Successful!</h1>

      {/* Display logged-in user details */}
      <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-md mb-6">
        <div className="flex items-center mb-4">
          <img 
            src={loggedInUser.image ? loggedInUser.image : '/default-avatar.png'} 
            alt={loggedInUser.name ? loggedInUser.name : 'User'} 
            className="w-16 h-16 border border-red-900 rounded-full mr-4" 
          />
          <div>
            <h2 className="text-xl font-semibold">{loggedInUser.name ? loggedInUser.name : 'Unknown User'}</h2>
            <p className="text-gray-500">{loggedInUser.email}</p>
          </div>
        </div>

        {/* Subscription details table */}
        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <tbody>
            <tr>
              <td className="px-4 py-2 font-medium">Plan</td>
              <td className="px-4 py-2">{loggedInUser.plan ? loggedInUser.plan : 'N/A'}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-medium">Premium Taken</td>
              <td className="px-4 py-2">{loggedInUser.premiumTaken ? new Date(loggedInUser.premiumTaken).toLocaleString() : 'N/A'}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-medium">Subscription End</td>
              <td className="px-4 py-2">{loggedInUser.subscriptionEnd ? new Date(loggedInUser.subscriptionEnd).toLocaleString() : 'N/A'}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubscriptionSuccess;
