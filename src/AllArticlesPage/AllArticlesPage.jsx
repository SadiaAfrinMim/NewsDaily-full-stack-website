import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../Hooks/useAxiosSecure';

// Component for the "All Articles" Page
const AllArticlesPage = () => {
  const axiosSecure = useAxiosSecure();
  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPublisher, setSelectedPublisher] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPublishersAndTags = async () => {
      try {
        const publisherResponse = await axiosSecure.get('/publishers');
        const tagResponse = await axiosSecure.get('/tags');
        setPublishers(publisherResponse.data);
        setTags(tagResponse.data);
      } catch (error) {
        console.error('Failed to fetch publishers/tags', error);
      }
    };

    fetchPublishersAndTags();
  }, []);

  const fetchArticles = async () => {
    setIsLoading(true);
    try {
      const response = await axiosSecure.get('/articles', {
        params: {
          search: searchQuery,
          publisher: selectedPublisher,
          tags: selectedTags.join(','),
        },
      });
      setArticles(response.data);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [searchQuery, selectedPublisher, selectedTags]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">All Articles</h1>

      {/* Search Bar and Filters */}
      <div className="flex justify-between items-center mb-6">
        <div className="w-full max-w-md">
          <input
            type="text"
            placeholder="Search by title"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="flex space-x-4">
          {/* Publisher Filter */}
          <select
            onChange={(e) => setSelectedPublisher(e.target.value)}
            value={selectedPublisher}
            className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500"
          >
            <option value="">All Publishers</option>
            {publishers.map((publisher) => (
              <option key={publisher.id} value={publisher.id}>
                {publisher.name}
              </option>
            ))}
          </select>

          {/* Tags Filter */}
          <select
            onChange={(e) => setSelectedTags([e.target.value])}
            value={selectedTags}
            className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500"
          >
            <option value="">All Tags</option>
            {tags.map((tag) => (
              <option key={tag.id} value={tag.name}>
                {tag.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Articles Listing */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="text-center col-span-3">Loading...</div>
        ) : (
          articles.map((article) => {
            const publisher = publishers.find(
              (pub) => pub.id === article.publisher
            ); // Match publisher by ID

            return (
              <div
                key={article._id}
                className={`p-6 border rounded-lg shadow-md ${article.isPremium ? 'bg-yellow-100' : 'bg-white'}`}
              >
                <img src={article.imageUrl} alt={article.title} className="w-full h-48 object-cover rounded-md mb-4" />
                <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{article.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{publisher?.name}</span>
                  <span
                    className={`text-sm font-semibold ${article.isPremium ? 'text-red-500' : 'text-gray-500'}`}
                  >
                    {article.isPremium ? 'Premium' : 'Normal'}
                  </span>
                </div>

                {/* Details Button */}
                <Link
                  to={`/article/${article._id}`}
                  className={`mt-4 inline-block py-2 px-4 text-white rounded-md ${
                    article.isPremium && !article.isSubscribed
                      ? 'bg-gray-500 cursor-not-allowed'
                      : 'bg-purple-600 hover:bg-purple-700'
                  }`}
                  disabled={article.isPremium && !article.isSubscribed}
                >
                  {article.isPremium && !article.isSubscribed ? 'Subscribe to View' : 'View Details'}
                </Link>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default AllArticlesPage;
