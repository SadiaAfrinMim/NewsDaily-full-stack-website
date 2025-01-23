import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { Search, Filter, X } from 'lucide-react';

const AllArticlesPage = () => {
  const axiosSecure = useAxiosSecure();
  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPublisher, setSelectedPublisher] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);  // State for selected tags
  const [publishers, setPublishers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [availableTags, setAvailableTags] = useState([]); // State for available tags
    const [isSubscription, setIsSubscription] = useState(false);

    useEffect(() => {
      const isSubscribedStorage = localStorage.getItem('is_subscribed');
      if (isSubscribedStorage ==='true') {
        console.log("isSubscribedStorage:", typeof isSubscribedStorage, isSubscribedStorage === 'true');
        setIsSubscription(true);
      }
  }, []); // Empty dependency array ensures this runs once after the component mounts.

  useEffect(() => {
     
  }, [isSubscription]); // Logs only when isSubscription changes.

  console.log('Updated isSubscription:', isSubscription);
  useEffect(() => {
    
    const fetchUserData = async () => {
      try {
        const userResponse = await axiosSecure.get('/users'); // API endpoint to get user data
      
// Assuming the API response contains `isSubscription`
      } catch (error) {
        console.error('Failed to fetch user data', error);
        setError('Failed to fetch user data. Please try again later.');
      }
    };

    fetchUserData();
  }, []);

  // Fetch publishers and articles
  useEffect(() => {
    const fetchPublishersAndArticles = async () => {
      try {
        const publisherResponse = await axiosSecure.get('/publishers');
        setPublishers(publisherResponse.data);

        // Fetch articles
        const articleResponse = await axiosSecure.get('/articles', {
          params: {
            search: searchQuery,
            publisher: selectedPublisher,
          },
        });
        
        // Extract tags from articles
        const tags = articleResponse.data
          .flatMap((article) => article.tags) // Flatten the tags from each article
          .filter((tag, index, self) => self.indexOf(tag) === index); // Remove duplicates

        setAvailableTags(tags);
        setArticles(articleResponse.data);
      } catch (error) {
        setError('Failed to load data. Please try again later.');
        console.error('Failed to fetch publishers or articles', error);
      }
    };

    fetchPublishersAndArticles();
  }, [searchQuery, selectedPublisher]);

  // Filter articles based on selected tags and other filters
  const filteredArticles = articles.filter((article) => {
    const isMatchingTags = selectedTags.every((tag) =>
      article.tags.includes(tag) // Check if article's tags include selected tags
    );

    return (
      article.status === 'Approved' &&
      article.isPremium === false &&
      isMatchingTags
    );
  });

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedPublisher('');
    setSelectedTags([]);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 border-b-4 border-red-500 pb-4 inline-block">
          All Articles
        </h1>

        {/* Enhanced Search Bar and Filters */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
          <div className="flex flex-wrap items-center gap-4">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-red-500" />
              <input
                type="text"
                placeholder="Search articles..."
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-6 py-3 border-2 border-gray-200 rounded-full focus:ring-4 focus:ring-red-300 focus:border-red-500 placeholder-gray-500 text-gray-800 transition-all duration-300"
              />
            </div>

            {/* Filter Dropdown for Publisher */}
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-red-500" />
              <select
                onChange={(e) => setSelectedPublisher(e.target.value)}
                value={selectedPublisher}
                className="pl-12 pr-4 py-3 border-2 border-gray-200 rounded-full bg-white focus:ring-4 focus:ring-red-300 focus:border-red-500 placeholder-gray-500 text-gray-800 transition-all duration-300"
              >
                <option value="">All Publishers</option>
                {publishers.map((publisher) => (
                  <option key={publisher._id} value={publisher._id}>
                    {publisher.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Filter Dropdown for Tags */}
            <div className="relative">
              <select
                onChange={(e) => {
                  const value = e.target.value;
                  setSelectedTags(
                    value && !selectedTags.includes(value)
                      ? [...selectedTags, value]
                      : selectedTags.filter(tag => tag !== value)
                  );
                }}
                value=""
                className="pl-4 pr-4 py-3 border-2 border-gray-200 rounded-full bg-white focus:ring-4 focus:ring-red-300 focus:border-red-500 placeholder-gray-500 text-gray-800 transition-all duration-300"
              >
                <option value="">Select Tags</option>
                {availableTags.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
            </div>

            {/* Clear Filters Button */}
            {(searchQuery || selectedPublisher || selectedTags.length > 0) && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-2 px-6 py-3 text-red-600 bg-red-100 rounded-full hover:bg-red-200 transition-all duration-300 shadow-sm"
              >
                <X size={18} className="text-red-600" />
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Error Message */}
     

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {isLoading ? (
    <div className="text-center col-span-3 py-20">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-500 border-t-transparent mx-auto"></div>
    </div>
  ) : filteredArticles.length === 0 ? (
    <div className="text-center col-span-3 py-20 text-xl text-gray-600">
      <span className="loading loading-spinner text-error"></span>
    </div>
  ) : (
    filteredArticles.map((article) => (
      <div
        key={article._id}
        className={`relative bg-white rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300 ${
          isSubscription
            ? 'border-2 border-red-500 shadow-red-200'
            : 'border-2 border-gray-200'
        }`}
      >
        <div className="relative">
          <img
            src={article.image}
            alt={article.title}
            className={`w-full h-56 object-cover rounded-t-xl ${
              isSubscription ? 'opacity-100' : 'opacity-75'
            }`}
          />
          {isSubscription && (
            <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
              Premium
            </div>
          )}
          {!isSubscription && (
            <div className="absolute top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
              <p className="text-white text-lg font-semibold">
                Subscribe to Access
              </p>
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
          <p className="text-gray-600 mb-4 line-clamp-3">{article.description}</p>

          <div className="flex items-center justify-between text-gray-500 text-sm mb-4">
            <span className="flex items-center gap-1">
              <i className="icon-eye"></i> {article.views || 0} views
            </span>
            <span className="flex items-center px-3 py-1 rounded-full text-sm font-semibold text-white bg-red-600 gap-1">
            
              {(article.tags)}
            </span>
          </div>

          {isSubscription === true ? (
            <Link
              to={`/article/${article._id}`}
              className="w-full block text-center py-3 px-6 rounded-lg font-semibold bg-red-600 text-white hover:bg-red-700 transition-colors"
            >
              <span className="inline-flex items-center gap-2">
                <i className="icon-premium"></i> Read Article
              </span>
            </Link>
          ) : (
            <div className="w-full block text-center py-3 px-6 rounded-lg font-semibold bg-gray-300 text-gray-500 cursor-not-allowed">
              Subscribe to Read
            </div>
          )}
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
