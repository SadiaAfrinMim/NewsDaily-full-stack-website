import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { Loader2, Upload } from 'lucide-react';
import toast from 'react-hot-toast';
import useAxiosSecure from '../Hooks/useAxiosSecure';
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
  const [userData, setUserData] = useState([]);
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
    content: '',
    image: null,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosSecure.get('/users');
        console.log('All Users:', response.data);
  
        const currentUser = response.data.find((u) => u.email === user?.email); // Use find for single match
        console.log('Current User:', currentUser);
  
        if (currentUser) {
          setUserData(currentUser); // Directly set the user object
        } else {
          console.log('User not found in database');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error('Error loading user data');
      }
    };
  
    if (user?.email) {
      fetchUserData();
    }
  }, [user, axiosSecure]);
  

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
        imageUrl = await imageUpload(formData.image);
      }

      const articleData = {
        title: formData.title,
        publisher: formData.publisher?.value,
        PublisherName: formData.publisher?.label,
        publisherLogo: formData.publisher?.logo,
        tags: formData.tags.map((tag) => tag.value),
        description: formData.description,
        content: formData.content,
        image: imageUrl,
        status: 'pending',
        isPremium: false,
        authorId: userData[0]?._id,
        views: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        email: user?.email,
        AuthorImage: user?.photoURL,
       
        
           role: userData?.role, // From fetched userData
        plan: userData?.plan, // From fetched userData
        
isSubscribed:userData?.isSubscribed
      



      };

      await axiosSecure.post('/articles', articleData);

      // Success toast
      toast.success('Article submitted successfully!');

      setFormData({
        title: '',
        publisher: null,
        tags: [],
        description: '',
        content: '',
        image: null,
      });
      setImagePreview(null);
    } catch (error) {
      // Error toast
      toast.error('Submission failed. Please try again.');
      console.error('Submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-red-800">Add New Article</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
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
              theme={(theme) => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  primary: '#ef4444',
                  primary25: '#fee2e2',
                  primary50: '#fecaca',
                },
              })}
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
              theme={(theme) => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  primary: '#ef4444',
                  primary25: '#fee2e2',
                  primary50: '#fecaca',
                },
              })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={6}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={8}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Article Image</label>
            <div className="flex items-center">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="h-20 w-auto mr-4 rounded-md" />
              ) : (
                <Upload className="h-12 w-12 text-red-400" />
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
            className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none disabled:bg-red-400"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
                <span>Submitting...</span>
              </div>
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
