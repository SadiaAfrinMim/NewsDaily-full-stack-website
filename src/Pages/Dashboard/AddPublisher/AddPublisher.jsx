import React, { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const AddPublisher = () => {
  const [publisherName, setPublisherName] = useState('');
  const [publisherLogo, setPublisherLogo] = useState(null);
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();

  // Handle file upload to ImgBB
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    setLoading(true);
    try {
      const response = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`, formData);
      setPublisherLogo(response.data.data.url); // Get the image URL
      toast.success('Image uploaded successfully');
    } catch (error) {
      toast.error('Failed to upload image');
    }
    setLoading(false);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!publisherName || !publisherLogo) {
      toast.error('Please provide both publisher name and logo');
      return;
    }

    try {
      const response = await axiosSecure.post('/publishers', {
        name: publisherName,
        logo: publisherLogo,
      });
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
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Add Publisher</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="publisherName" className="block text-lg font-semibold">Publisher Name</label>
          <input
            type="text"
            id="publisherName"
            className="input input-bordered w-full mt-2"
            placeholder="Enter publisher name"
            value={publisherName}
            onChange={(e) => setPublisherName(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="publisherLogo" className="block text-lg font-semibold">Publisher Logo</label>
          <input
            type="file"
            id="publisherLogo"
            className="input input-bordered w-full mt-2"
            onChange={handleImageUpload}
            accept="image/*"
            required
          />
          {publisherLogo && (
            <div className="mt-4">
              <img src={publisherLogo} alt="Publisher Logo" className="w-32 h-32 object-cover rounded" />
            </div>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? 'Adding Publisher...' : 'Add Publisher'}
        </button>
      </form>
    </div>
  );
};

export default AddPublisher;
