import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { Link } from 'react-router-dom';

const Premium = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  // Fetch premium articles
  useEffect(() => {
    const fetchPremiumArticles = async () => {
      try {
        setLoading(true);

        // Send request to fetch articles
        const response = await axiosSecure.get('/articles');

        // Filter premium articles from the response data
        const premiumArticles = response.data.filter((article) => article.isPremium === true);
        console.log(premiumArticles);
        setArticles(premiumArticles);
      } catch (error) {
        console.error('Error fetching premium articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPremiumArticles();
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
    {loading ? (
      <span className="loading loading-spinner w-full mx-auto block text-error"></span>
    ) : articles.length > 0 ? (
      articles.map((article) => (
        <div
          key={article._id}
          className="relative bg-white shadow-lg rounded-lg overflow-hidden border-2 border-gray-200 hover:scale-105 transition-transform duration-300"
        >
          {/* Premium Badge */}
          <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-1 px-4 rounded-full text-sm font-bold shadow-lg">
            PREMIUM
          </div>
  
          {/* Image */}
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-56 object-cover"
          />
  
          <div className="p-4">
            {/* Title */}
            <h2 className="text-lg font-semibold text-gray-900">
              {article.title.length > 50
                ? article.title.slice(0, 50) + "..."
                : article.title}
            </h2>
  
            {/* Description */}
            <p className="mt-2 text-gray-700">
              {article.description.length > 100
                ? article.description.slice(0, 100) + "..."
                : article.description}
            </p>
  
            {/* Publisher Info */}
            <div className="flex items-center mt-4">
              <img
                src={article.publisherLogo}
                alt="Publisher"
                className="w-10 h-10 rounded-full border-2 border-gray-200"
              />
              <span className="ml-2 text-sm font-medium text-gray-800">
                {article.PublisherName}
              </span>
            </div>
  
            {/* Content */}
            <p className="mt-4 text-gray-600">
              {article.content.length > 150
                ? article.content.slice(0, 150) + "..."
                : article.content}
            </p>
  
            {/* Read Article Button */}
            <Link
               to={`/articles/${article._id}`}
              className="mt-4 inline-block bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors duration-200"
            >
              Read Article
            </Link>
          </div>
        </div>
      ))
    ) : (
      <p className="text-center text-xl font-semibold">
        No premium articles available.
      </p>
    )}
  </div>
  
  );
};

export default Premium;
