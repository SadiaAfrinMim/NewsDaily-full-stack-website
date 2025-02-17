import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { Loader2, Upload } from 'lucide-react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { imageUpload } from '../../../Api/utils';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast'; // Import toast

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

const UpdateDetails = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    publisher: null,
    tags: [],
    description: '',
    image: null,
  });
  const [publisherOptions, setPublisherOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const publisherResponse = await axiosSecure.get('/publishers');
        setPublisherOptions(
          publisherResponse.data.map((pub) => ({
            value: pub._id,
            label: pub.name,
          }))
        );

        const articleResponse = await axiosSecure.get(`/articles/${id}`);
        const article = articleResponse.data;

        setFormData({
          title: article.title,
          publisher: {
            value: article.publisher,
            label: article.publisherName,
          },
          tags: article.tags.map((tag) => ({ value: tag, label: tag })),
          description: article.description,
          image: article.imageUrl,
        });

        if (article.imageUrl) {
          setImagePreview(article.imageUrl);
        }
      } catch (error) {
        toast.error('Failed to load data. Please try again.'); // Toast for errors
      }
    };

    fetchData();
  }, [id, axiosSecure]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setIsSubmitting(true);
  
  //   try {
     
  //     const articleData = {
  //       title: formData.title,
  //       publisher: formData.publisher?.value,
  //       tags: formData.tags.map((tag) => tag.value),
  //       description: formData.description,
  //       image: formData.image, // Save the uploaded or existing image URL
  //       status: 'pending',
  //     };
  
  //     await axiosSecure.put(`/articles/${id}`, articleData);
  
  //     toast.success('Article updated successfully!');
      
  //     setFormData({
  //       title: '',
  //       publisher: null,
  //       tags: [],
  //       description: '',
  //       image: '',
  //     });
  //     setImagePreview(null);
  //   } catch (error) {
  //     toast.error('Failed to update the article. Please try again.');
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    try {
      let imageUrl = formData.image;
  
      // Check if the image is a new file
      if (formData.image && formData.image instanceof File) {
        const uploadedImageUrl = await imageUpload(formData.image); // Upload the image
        imageUrl = uploadedImageUrl;
      }
  
      const articleData = {
        title: formData.title,
        publisher: formData.publisher?.value,
        tags: formData.tags.map((tag) => tag.value),
        description: formData.description,
        image: imageUrl, // Set the uploaded or existing image URL
        status: 'pending',
      };
  
      await axiosSecure.put(`/articles/${id}`, articleData);
  
      toast.success('Article updated successfully!');
      setFormData({
        title: '',
        publisher: null,
        tags: [],
        description: '',
        image: '',
      });
      setImagePreview(null);
    } catch (error) {
      toast.error('Failed to update the article. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Update Article</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Publisher</label>
          <Select
            value={formData.publisher}
            onChange={(selected) => setFormData({ ...formData, publisher: selected })}
            options={publisherOptions}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Tags</label>
          <Select
            isMulti
            value={formData.tags}
            onChange={(selected) => setFormData({ ...formData, tags: selected })}
            options={tagOptions}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={6}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Article Image</label>
          <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="text-center">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="mx-auto h-32 w-auto rounded-md" />
              ) : (
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
              )}
              <div className="mt-2">
                <input type="file" accept="image/*" onChange={handleImageChange} required />
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center py-3 px-4 border rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:ring-2 focus:ring-purple-500"
        >
          {isSubmitting ? (
            <Loader2 className="animate-spin h-5 w-5 mr-2" />
          ) : (
            'Update Article'
          )}
        </button>
      </form>
    </div>
  );
};

export default UpdateDetails;
