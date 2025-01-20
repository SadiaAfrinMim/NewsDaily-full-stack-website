import React, { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const AddPublisher = () => {
  const [publisherName, setPublisherName] = useState('');
  const [publisherLogo, setPublisherLogo] = useState(null);
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      toast.error('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    setLoading(true);
    try {
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
        formData
      );

      const imageUrl = response.data?.data?.url;
      if (imageUrl) {
        setPublisherLogo(imageUrl);
        toast.success('Image uploaded successfully');
      } else {
        throw new Error('No URL returned from the image upload API');
      }
    } catch (error) {
      console.error('Image upload error:', error);
      toast.error('Failed to upload image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!publisherName || !publisherLogo) {
      toast.error('Please provide both publisher name and logo');
      return;
    }

    const publisherData = {
      name: publisherName,
      logo: publisherLogo,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    try {
      const response = await axiosSecure.post('/publishers', publisherData);
      if (response.status === 200) {
        toast.success('Publisher added successfully');
        setPublisherName('');
        setPublisherLogo(null);
      }
    } catch (error) {
      toast.error('Failed to add publisher');
    }
  };


  return (
    <div className="container mx-auto py-12 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl max-w-lg mx-auto"
      >
        <div className="py-8 border-b rounded-t-xl border-gray-200 bg-red-700">
          <h1 className="text-3xl font-bold text-center text-white">
            Articles Management
          </h1>
        </div>

        <div className="p-8">
          {/* Publisher Name */}
          <div className="mb-6">
            <label
              htmlFor="publisherName"
              className="block text-lg font-semibold text-gray-800 mb-2"
            >
              Publisher Name
            </label>
            <input
              type="text"
              id="publisherName"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-red-500 focus:outline-none transition"
              placeholder="Enter publisher name"
              value={publisherName}
              onChange={(e) => setPublisherName(e.target.value)}
              required
            />
          </div>

          {/* Publisher Logo */}
          <div className="mb-6">
            <label
              htmlFor="publisherLogo"
              className="block text-lg font-semibold text-gray-800 mb-2"
            >
              Publisher Logo
            </label>
            <input
              type="file"
              id="publisherLogo"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-red-500 focus:outline-none transition"
              onChange={handleImageUpload}
              accept="image/*"
              required
            />
            {publisherLogo && (
              <div className="mt-4 flex justify-center">
                <img
                  src={publisherLogo}
                  alt="Publisher Logo"
                  className="w-32 h-32 object-cover rounded-full border border-gray-300 shadow-md"
                />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-3 text-white font-semibold rounded-lg shadow-md bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-500 focus:outline-none transition ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={loading}
          >
            {loading ? 'Adding Publisher...' : 'Add Publisher'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPublisher;
