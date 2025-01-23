import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  Clock,
  TrendingUp,
  ChevronRight,
  ChevronUp
} from 'lucide-react';
import axios from 'axios';

const TrendingSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [articles, setArticles] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);

  // Fetch articles data and sort by views, limit to 6 highest-viewed articles
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('https://newsite-server.vercel.app/articles');  // Replace with your actual API endpoint
        const sortedArticles = response.data
          .sort((a, b) => b.views - a.views)  // Sort articles by views in descending order
          .slice(0, 6);  // Take only the top 6 articles
        setArticles(sortedArticles);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []);



  useEffect(() => {
    if (!isHovered && articles.length > 0) {
      const interval = setInterval(() => {
        setActiveIndex((current) => (current + 1) % articles.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isHovered, articles.length]);

  const nextSlide = () => {
    setActiveIndex((current) => (current + 1) % articles.length);
  };

  const prevSlide = () => {
    setActiveIndex((current) => (current - 1 + articles.length) % articles.length);
  };

  const ThumbnailItem = ({ article, index, isActive }) => (
    <div
      onClick={() => {
        setActiveIndex(index);
        setIsMobileExpanded(false);
      }}
      className={`group flex items-center space-x-4 p-4 rounded-xl cursor-pointer transition-all duration-300 ${isActive ? 'bg-gradient-to-r from-purple-50 to-purple-100 scale-102' : 'hover:bg-gray-50'
        }`}
    >
      <div className="relative w-20 h-20 flex-shrink-0">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover rounded-lg"
        />
        <div className={`absolute inset-0 rounded-lg transition-opacity ${isActive ? 'opacity-25 bg-red-500' : 'opacity-0 group-hover:opacity-10 bg-black'
          }`} />
      </div>
      <div className="flex-1 min-w-0">
        <h5 className={`font-semibold text-sm line-clamp-2 mb-1 transition-colors ${isActive ? 'text-red-900' : 'group-hover:text-red-700'
          }`}>
          {article.title}
        </h5>
        <div className="flex items-center text-xs text-gray-500">
          <Eye className="w-3 h-3 mr-1 flex-shrink-0" />
          {article.views.toLocaleString()} views
        </div>
      </div>
      <ChevronRight className={`w-5 h-5 flex-shrink-0 transition-all ${isActive ? 'text-red-500 opacity-100' : 'opacity-0 group-hover:opacity-50 -translate-x-2 group-hover:translate-x-0'
        }`} />
    </div>
  );

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 py-6 md:py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="absolute -inset-1 bg-red-500 rounded-full blur opacity-25" />
              <TrendingUp className="relative w-6 h-6 md:w-8 md:h-8 text-red-500" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
              Trending Now
            </h2>
          </div>
        </div>

        {articles.length > 0 && (
          <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="flex flex-col lg:grid lg:grid-cols-5">
              <div className="relative lg:col-span-3">
                <div className="aspect-video lg:aspect-auto lg:max-h-screen">
                  <img
                    src={articles[activeIndex].image}
                    alt={articles[activeIndex].title}
                    className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8">
                  <span className="inline-block px-3 py-1 bg-red-500 text-sm font-semibold rounded-full mb-3 md:mb-4 text-white">
                    {articles[activeIndex].tags}
                  </span>
                  <h3 className="text-xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-4 leading-tight text-white">
                    {articles[activeIndex].title}
                  </h3>
                  <p className="hidden md:block text-base lg:text-lg mb-4 text-gray-200">
                    {articles[activeIndex].excerpt}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-white/90">
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {new Intl.DateTimeFormat('en-US', {
                        dateStyle: 'medium',
                        timeStyle: 'short',
                      }).format(new Date(articles[activeIndex].createdAt))}
                    </span>
                    <span className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      {articles[activeIndex].views.toLocaleString()} views
                    </span>
                  </div>
                </div>
              </div>

              <div className={`lg:col-span-2 bg-gray-50 transition-all duration-300 ${isMobileExpanded ? 'max-h-screen' : 'max-h-[280px] lg:max-h-full'
                }`}>
                <div className="p-4 md:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-gray-500">More Trending</h4>
                    <button
                      onClick={() => setIsMobileExpanded(!isMobileExpanded)}
                      className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <ChevronUp className={`w-5 h-5 transition-transform duration-300 ${isMobileExpanded ? 'rotate-180' : ''
                        }`} />
                    </button>
                  </div>
                  <div className="space-y-3">
                    {articles.map((article, index) => (
                      <ThumbnailItem
                        key={article.id}
                        article={article}
                        index={index}
                        isActive={activeIndex === index}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200">
              <div
                className="h-full bg-gradient-to-r from-red-500 to-red-500 transition-all duration-500 ease-out"
                style={{ width: `${((activeIndex + 1) / articles.length) * 100}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex justify-end pt-4">
          <div className="flex space-x-3">
            <button
              onClick={prevSlide}
              className="p-2 md:p-3 rounded-full bg-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              aria-label="Previous slide"
            >
              <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="p-2 md:p-3 rounded-full bg-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              aria-label="Next slide"
            >
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingSlider;
