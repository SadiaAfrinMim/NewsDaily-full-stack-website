import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';
import { Upload, Loader2 } from 'lucide-react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useNavigate } from 'react-router-dom'; // Add navigate for redirection

const AddArticle = () => {
  const axiosSecure = useAxiosSecure();
  const [isLoading, setIsLoading] = useState(false);
  const [publishers, setPublishers] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    publisherId: '',
    description: '',
    tags: [],
    image: '',
  });

  const navigate = useNavigate(); // Navigate to other pages after successful submission

  // Predefined tags for the article
  const tagOptions = [
    { value: 'politics', label: 'Politics' },
    { value: 'technology', label: 'Technology' },
    { value: 'sports', label: 'Sports' },
    { value: 'health', label: 'Health' },
    { value: 'business', label: 'Business' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'science', label: 'Science' },
    { value: 'education', label: 'Education' },
    { value: 'environment', label: 'Environment' },
    { value: 'lifestyle', label: 'Lifestyle' },
  ];

  // Fetch publishers on component mount
  useEffect(() => {
    const fetchPublishers = async () => {
      try {
        const response = await axiosSecure.get('/publishers');
        setPublishers(
          response.data.map((pub) => ({
            value: pub._id,  // MongoDB _id will be the value
            label: pub.name, // Publisher name will be the label
            logo: pub.logo,  // Optional, can use later
          }))
        );
      } catch (error) {
        console.error('Error fetching publishers:', error);
      }
    };

    fetchPublishers();
  }, []);

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  // Upload image to ImgBB
  const uploadImageToImgBB = async (imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile);

    try {
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
        formData
      );
      return response.data.data.url; // Return the uploaded image URL
    } catch (error) {
      console.error('Image upload failed:', error);
      throw new Error('Image upload failed');
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const imageUrl = await uploadImageToImgBB(selectedImage);

      const articleData = {
        ...formData,
        image: imageUrl, // Set uploaded image URL
        tags: formData.tags.map((tag) => tag.value), // Map tags to values
        status: 'pending', // Pending admin approval
      };

      await axiosSecure.post('/articles', articleData);

      // Reset form after submission
      setFormData({
        title: '',
        publisherId: '',
        description: '',
        tags: [],
        image: '',
      });
      setSelectedImage(null);
      setImagePreview(null);

      alert('Article submitted successfully! Waiting for admin approval.');
      navigate('/my-articles'); // Redirect to the articles page or any other desired page
    } catch (error) {
      console.error('Error submitting article:', error);
      alert('Error submitting article. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Add New Article</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Article Title</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter article title"
              />
            </div>

            {/* Publisher Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Publisher</label>
              <Select
                required
                options={publishers}
                value={publishers.find((pub) => pub.value === formData.publisherId)}
                onChange={(selected) => setFormData({ ...formData, publisherId: selected.value })}
                className="w-full"
                placeholder="Select publisher"
              />
            </div>

            {/* Tags Multi-select */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
              <Select
                isMulti
                options={tagOptions}
                value={formData.tags}
                onChange={(selected) => setFormData({ ...formData, tags: selected })}
                className="w-full"
                placeholder="Select tags"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Article Image</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                <div className="space-y-1 text-center">
                  {imagePreview ? (
                    <div className="mb-4">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="mx-auto h-32 w-auto rounded-lg"
                      />
                    </div>
                  ) : (
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  )}
                  <div className="flex text-sm text-gray-600">
                    <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                      <span>Upload a file</span>
                      <input
                        type="file"
                        required
                        className="sr-only"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                </div>
              </div>
            </div>

            {/* Description Textarea */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Article Description</label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Write your article content here..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400 flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin mr-2" />
                  Submitting...
                </>
              ) : (
                'Submit Article'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddArticle;
