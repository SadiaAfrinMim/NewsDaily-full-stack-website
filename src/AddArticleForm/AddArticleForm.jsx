import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { Upload, Loader2 } from 'lucide-react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import useAuth from '../Hooks/useAuth';
import { imageUpload } from '../Api/utils';

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
  const axiosSecure = useAxiosSecure();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [publishers, setPublishers] = useState([]);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    publisher: null,
    tags: [],
    description: '',
    image: null,
    user: null,
  });

  // Fetch publishers on component mount
  useEffect(() => {
    const fetchPublishers = async () => {
      try {
        const response = await axiosSecure.get('/publishers');
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
  }, [axiosSecure]);

  // Fetch users and their roles/plans
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosSecure.get('/users'); // Endpoint to fetch users
        const mappedUsers = response.data.map((user) => ({
          value: user._id,
          label: `${user.name} (${user.email})`,
          role: user.role,
          plan: user.plan,
        }));
        setUsers(mappedUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [axiosSecure]);

  const handleImageChange = async (e) => {
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
        imageUrl = await imageUpload(formData.image);
      }

      const selectedUser = users.find((user) => user.value === formData.user?.value);

      const articleData = {
        title: formData.title,
        publisher: formData.publisher?.value,
        PublisherName: formData.publisher?.label,
        publisherLogo: formData.publisher?.logo,
        tags: formData.tags.map((tag) => tag.value),
        description: formData.description,
        imageUrl,
        status: 'pending',
        createdAt: new Date().toISOString(),
        name: selectedUser?.label || '',
        email: selectedUser?.email || '',
        role: selectedUser?.role || '',
        plan: selectedUser?.plan || '',
      };

      await axiosSecure.post('/articles', articleData);

      setFormData({
        title: '',
        publisher: null,
        tags: [],
        description: '',
        image: null,
        user: null,
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Publisher</label>
            <Select
              value={formData.publisher}
              onChange={(selected) => setFormData({ ...formData, publisher: selected })}
              options={publishers}
              required
            />
          </div>

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
