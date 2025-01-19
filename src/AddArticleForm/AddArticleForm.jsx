import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { Loader2, Upload } from 'lucide-react';
import { imageUpload } from '../Api/utils';
import useAuth from '../Hooks/useAuth';

const tagOptions = [
  { value: 'technology', label: 'Technology' },
  { value: 'science', label: 'Science' },
  { value: 'health', label: 'Health' },
  { value: 'business', label: 'Business' },
  { value: 'entertainment', label: 'Entertainment' },
  { value: 'sports', label: 'Sports' },
  { value: 'politics', label: 'Politics' },
  { value: 'education', label: 'Education' },
];

const AddArticleForm = () => {
  const [userData, setUserData] = useState([]); // ইউজারের ডাটা সেভ করতে স্টেট
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [publishers, setPublishers] = useState([]);
  const axiosSecure = useAxiosSecure();
  const [formData, setFormData] = useState({
    title: '',
    publisher: null,
    tags: [],
    description: '',
    content: '', // New field for full article content
    image: null,
  });

  // ইউজারের তথ্য ফেচ করার জন্য useEffect
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosSecure.get('/users'); // এখানে ইউজারের API URL
        const filteredData = response.data.filter((use) => use.email === user.email);

        if (filteredData.length > 0) {
          setUserData(filteredData.map((use) => ({
            email: use.email,   // ইউজারের ইমেইল
            role: use.role,     // ইউজারের রোল
            plan: use.plan,
            timestamp: use.timestamp // Added timestamp
          })));
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []); // This will run once when the component mounts

  // API থেকে publishers ডাটা ফেচ করা
  useEffect(() => {
    const fetchPublishers = async () => {
      try {
        const response = await axiosSecure.get('/publishers'); // API URL
        setPublishers(
          response.data.map((pub) => ({
            value: pub._id,
            label: pub.name,
            logo: pub.logo,
          }))
        );
      } catch (error) {
        console.error('Error fetching publishers:', error);
      }
    };

    fetchPublishers();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let imageUrl = '';
      if (formData.image) {
        imageUrl = await imageUpload(formData.image); // Image upload function
      }

      const articleData = {
        title: formData.title,
        publisher: formData.publisher?.value,
        PublisherName: formData.publisher?.label,
        publisherLogo: formData.publisher?.logo,
        tags: formData.tags.map((tag) => tag.value),
        description: formData.description,
        content: formData.content, // Full content of the article
        image: imageUrl,
        status: 'pending',
        isPremium: false,
        authorId: userData[0]?._id, // User ID for the article author
        views: 0, // Set initial views to 0
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(), // Set initial updatedAt to current time
        email: user?.email,
        AuthorImage: user?.photoURL
      };

      await axiosSecure.post('/articles', articleData); // Submit article

      setFormData({
        title: '',
        publisher: null,
        tags: [],
        description: '',
        content: '', // Reset content
        image: null,
      });
      setImagePreview(null);
    } catch (error) {
      console.error('Submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Add New Article</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>

          {/* Publisher Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Publisher</label>
            <Select
              value={formData.publisher}
              onChange={(selected) => setFormData({ ...formData, publisher: selected })}
              options={publishers}
              required
            />
          </div>

          {/* Tags Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
            <Select
              isMulti
              value={formData.tags}
              onChange={(selected) => setFormData({ ...formData, tags: selected })}
              options={tagOptions}
              required
            />
          </div>

          {/* Description Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={6}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>

          {/* Content Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={8}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Article Image</label>
            <div className="flex items-center">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="h-20 w-auto mr-4 rounded-md" />
              ) : (
                <Upload className="h-12 w-12 text-gray-400" />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="text-sm"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none disabled:bg-purple-400"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
                Submitting...
              </>
            ) : (
              'Submit Article'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddArticleForm;
