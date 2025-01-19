import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Tag, User, Eye, ChevronLeft, Edit } from 'lucide-react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const NewsDetails = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticleAndUpdateViews = async () => {
      try {
        // Fetch the article by ID
        const response = await axiosSecure.get(`/articles/${id}`);
        const fetchedArticle = response.data;

        // Increment view count
        const newViewCount = (fetchedArticle.views || 0) + 1;
        await axiosSecure.patch(`/articles/${id}`, {
          views: newViewCount,
        });

        // Update local state
        setArticle({
          ...fetchedArticle,
          views: newViewCount,
        });
      } catch (err) {
        setError('Error fetching article');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticleAndUpdateViews();
  }, [id, axiosSecure]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-t-4 border-red-500 border-solid rounded-full animate-spin"></div>
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
        onClick={() => navigate(-1)} 
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <ChevronLeft className="w-5 h-5 mr-1" />
        Back to Articles
      </button>

      <article className={`bg-white rounded-xl shadow-lg overflow-hidden`}>
        <div className="relative h-96">
          <img 
            src={article.image} 
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-8">
          <div className="flex items-center gap-4 mb-6">
            <img 
              src={article.publisherLogo} 
              alt={article.PublisherName}
              className="w-12 h-12 rounded-full ring-2 ring-gray-200"
            />
            <div>
              <h3 className="font-semibold text-gray-900">{article.PublisherName}</h3>
              <p className="text-sm text-gray-500">
                {new Date(article.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-6">{article.title}</h1>

          <div className="flex flex-wrap gap-4 mb-8 text-sm text-gray-600">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              {new Date(article.createdAt).toLocaleDateString()}
            </div>
            <div className="flex items-center">
              <Eye className="w-4 h-4 mr-2" />
              {article.views || 0} views
            </div>
            <div className="flex items-center">
              <User className="w-4 h-4 mr-2" />
              {article.email}
            </div>
          </div>

          <div className="prose max-w-none mb-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {article.description}
            </p>
            <div className="text-gray-800 leading-relaxed">
              {article.content}
            </div>
          </div>

          <div className="border-t pt-6">
            <div className="flex items-center gap-2 flex-wrap">
              <Tag className="w-4 h-4 text-gray-600" />
              {article.tags?.map((tag, index) => (
                <span 
                  key={index}
                  className="bg-red-50 text-red-600 px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

      
           
       
        </div>
      </article>
    </div>
  );
};

export default NewsDetails;
