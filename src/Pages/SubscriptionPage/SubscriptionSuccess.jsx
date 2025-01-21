import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';

const SubscriptionSuccess = () => {
    const {user,logout} = useAuth()
  const [users, setUsers] = useState([]);  // Store multiple users, hence an array
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosSecure.get('/users');  // Replace with your API endpoint to fetch user profile
        setUsers(response.data);  // Assuming the response contains an array of user data
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, [axiosSecure]);

  if (!users.length) {
    return <span className="loading text-center loading-spinner text-error"></span>; // Show a loading state until user data is fetched
  }

  return (
    <div className="container lg:max-w-2xl mx-auto p-4">
      <h1 className="text-3xl border-b-4 pb-2   border-red-600 font-bold text-center mb-6">Subscription Successful!</h1>

      {users.map((user, index) => (
        <div key={index} className="bg-white border border-gray-200 p-6 rounded-lg shadow-md mb-6">
          <div className="flex items-center mb-4">
            <img src={user.image} alt={user.name} className="w-16 h-16 rounded-full mr-4" />
            <div>
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-gray-500">{user.email}</p>
            </div>
          </div>

          {/* Subscription details table */}
          <table className="min-w-full table-auto border-collapse border border-gray-200">
            <tbody>
              <tr>
                <td className="px-4 py-2 font-medium">Plan</td>
                <td className="px-4 py-2">{user.plan}</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium">Premium Taken</td>
                <td className="px-4 py-2">{new Date(user.premiumTaken).toLocaleString()}</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium">Subscription End</td>
                <td className="px-4 py-2">{new Date(user.subscriptionEnd).toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default SubscriptionSuccess;
