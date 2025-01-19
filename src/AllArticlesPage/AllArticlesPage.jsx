import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../Hooks/useAxiosSecure';

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
      const approvedArticles = response.data.filter(
        (article) => article.status === 'Approved'
      );
      setArticles(approvedArticles);
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
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 border-b-4 border-red-500 pb-4 inline-block">
          All Articles
        </h1>

        {/* Search Bar and Filters */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-stretch">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by title"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300"
              />
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <select
                onChange={(e) => setSelectedPublisher(e.target.value)}
                value={selectedPublisher}
                className="px-6 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 bg-white"
              >
                <option value="">All Publishers</option>
                {publishers.map((publisher) => (
                  <option key={publisher._id} value={publisher._id}>
                    {publisher.name}
                  </option>
                ))}
              </select>

              <select
                onChange={(e) => setSelectedTags([e.target.value])}
                value={selectedTags}
                className="px-6 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 bg-white"
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
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            <div className="text-center col-span-3 py-20 text-xl text-gray-600">
              Loading...
            </div>
          ) : articles.length === 0 ? (
            <div className="text-center col-span-3 py-20 text-xl text-gray-600">
              No approved articles found.
            </div>
          ) : (
            articles.map((article) => {
              const publisher = publishers.find(
                (pub) => pub._id === article.publisher
              );

              return (
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
                      <p className="font-medium text-gray-700">{article.PublisherName || 'Unknown Publisher'}</p>
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
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default AllArticlesPage;