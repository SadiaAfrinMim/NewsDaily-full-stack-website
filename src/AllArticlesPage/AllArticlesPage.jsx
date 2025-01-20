import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { Search, Filter, X } from 'lucide-react';


const AllArticlesPage = () => {
  const axiosSecure = useAxiosSecure();
  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPublisher, setSelectedPublisher] = useState('');
  const [publishers, setPublishers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    const fetchPublishers = async () => {
      try {
        const publisherResponse = await axiosSecure.get('/publishers');
        setPublishers(publisherResponse.data);
      } catch (error) {
        setError('Failed to load filters. Please try again later.');
        console.error('Failed to fetch publishers', error);
      }
    };

    fetchPublishers();
  }, []);

  const fetchArticles = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axiosSecure.get('/articles', {
        params: {
          search: searchQuery,
          publisher: selectedPublisher,
        },
      });
      const approvedArticles = response.data.filter(
        (article) => article.status === 'Approved'
      );
      setArticles(approvedArticles);
    } catch (error) {
      setError('Failed to load articles. Please try again later.');
      console.error('Error fetching articles:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [searchQuery, selectedPublisher]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedPublisher('');
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 border-b-4 border-red-500 pb-4 inline-block">
          All Articles
        </h1>

        {/* Enhanced Search Bar and Filters */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
              />
            </div>

            {/* Filter Section */}
            <div className="flex gap-4">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  onChange={(e) => setSelectedPublisher(e.target.value)}
                  value={selectedPublisher}
                  className="pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 bg-white"
                >
                  <option value="">All Publishers</option>
                  {publishers.map((publisher) => (
                    <option key={publisher._id} value={publisher._id}>
                      {publisher.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Clear Filters Button */}
              {(searchQuery || selectedPublisher) && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-red-500 transition-colors duration-300"
                >
                  <X size={16} />
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-center mb-8 p-4 bg-red-100 text-red-600 rounded-lg">
            {error}
          </div>
        )}

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            <div className="text-center col-span-3 py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-500 border-t-transparent mx-auto"></div>
            </div>
          ) : articles.length === 0 ? (
            <div className="text-center col-span-3 py-20 text-xl text-gray-600">
              No articles found matching your criteria.
            </div>
          ) : (
            articles.map((article) => (
              <div
                key={article._id}
                className={`bg-white rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300 ${
                  article.plan ? 'ring-2 ring-red-500' : ''
                }`}
              >
                <div className="relative">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-56 object-cover"
                  />
                  {article.plan && (
                    <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Premium
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      className="w-10 h-10 rounded-full ring-2 ring-gray-200"
                      src={article.publisherLogo || '/default-logo.png'}
                      alt={article.PublisherName || 'Publisher'}
                    />
                    <p className="font-medium text-gray-700">
                      {article.PublisherName || 'Unknown Publisher'}
                    </p>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-gray-800 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {article.description}
                  </p>

                  <Link
                    to={`/article/${article._id}`}
                    className={`w-full block text-center py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                      article.plan && !article.isSubscribed
                        ? 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                        : 'bg-red-500 text-white hover:bg-red-600'
                    }`}
                  >
                    {article.plan && !article.isSubscribed
                      ? 'Subscribe to View'
                      : 'Read Article'}
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AllArticlesPage;
