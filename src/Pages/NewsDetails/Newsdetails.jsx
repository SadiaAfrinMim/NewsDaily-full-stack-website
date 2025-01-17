import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Tag, User, Clock, ChevronLeft, Crown, Edit } from 'lucide-react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const NewsDetails = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate(); // For navigation
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axiosSecure.get(`/articles/${id}`);
        setArticle(response.data);
      } catch (err) {
        setError('Error fetching article');
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 p-6 rounded-lg">
          <h2 className="text-red-800 text-xl font-semibold">{error}</h2>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-gray-800 text-xl font-semibold">Article not found</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button 
        onClick={() => window.history.back()} 
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <ChevronLeft className="w-5 h-5 mr-1" />
        Back to Articles
      </button>

      <div 
        className={`rounded-xl shadow-lg overflow-hidden ${
          article.isPremium ? 'border-4 border-yellow-500' : 'bg-white'
        }`}
      >
        <div className="relative h-96">
          <img 
            src={article.imageUrl} 
            alt={article.title}
            className="w-full h-full object-cover"
          />

<div className='flex gap-2 items-center'>
                  <img className='w-10 h-10 rounded-full' src={article.
publisherLogo} alt="" />
                  <p>{article.
PublisherName}</p>
                </div>
          <div className={`absolute bottom-0 left-0 right-0 ${
            article.isPremium ? 'bg-gradient-to-t from-yellow-900/70 to-transparent' : 'bg-gradient-to-t from-black/70 to-transparent'
          } p-6`}>
            <h1 className="text-4xl font-bold text-white mb-2">{article.title}</h1>
            {article.isPremium && (
              <div className="flex items-center gap-2">
                <Crown className="w-6 h-6 text-yellow-400" />
                <span className="text-yellow-400 font-semibold uppercase">Premium Content</span>
              </div>
            )}
          </div>
        </div>

        <div className="p-6">
          <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-600">
            <div className="flex items-center">
              <User className="w-4 h-4 mr-2" />
              {article.publisher}
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              {new Date(article.createdAt).toLocaleDateString()}
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              <span className={`px-2 py-1 rounded-full text-xs ${
                article.status === 'published' ? 'bg-green-100 text-green-800' :
                article.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {article.status}
              </span>
            </div>
          </div>

          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed mb-6">
              {article.description}
            </p>
          </div>

          <div className="border-t pt-6 mt-6">
            <div className="flex items-center gap-2 flex-wrap">
              <Tag className="w-4 h-4 text-gray-600" />
              {article.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Edit Button */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={() => navigate(`/edit-article/${id}`)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Edit className="w-5 h-5 mr-2" />
              Edit Article
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetails;
