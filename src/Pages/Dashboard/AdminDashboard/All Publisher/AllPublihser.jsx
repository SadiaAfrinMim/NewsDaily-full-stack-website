import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';

const AllPublishers = () => {
  const [publishers, setPublishers] = useState([]);
  const axiosSecure = useAxiosSecure()

  // Fetch all publishers
  useEffect(() => {
    const fetchPublishers = async () => {
      try {
        const response = await axiosSecure.get('/publishers'); // Replace with your API endpoint
        setPublishers(response.data);
      } catch (error) {
        console.error('Error fetching publishers:', error);
      }
    };

    fetchPublishers();
  }, []);

  // Remove a publisher
  const handleRemove = async (id) => {
    try {
      await axios.delete(`/api/publishers/${id}`); // Replace with your DELETE API endpoint
      setPublishers((prevPublishers) =>
        prevPublishers.filter((publisher) => publisher.id !== id)
      );
    } catch (error) {
      console.error('Error removing publisher:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">All Publishers</h1>
        {publishers.length === 0 ? (
          <p className="text-gray-500">No publishers found.</p>
        ) : (
          <ul className="space-y-4">
            {publishers.map((publisher) => (
              <li
                key={publisher.id}
                className="flex justify-between items-center p-4 border border-gray-300 rounded-md"
              >
                <div>
                    <div className='flex justify-center items-center gap-4'>
                    <img className='w-20 h-20 rounded-full  border-red-600 border' src={publisher.logo} alt="" />
                    <h2 className="text-lg font-semibold text-gray-800">
                    {publisher.name}
                  </h2>
                  
                    </div>

                
                </div>
                <button
                  onClick={() => handleRemove(publisher.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AllPublishers;
