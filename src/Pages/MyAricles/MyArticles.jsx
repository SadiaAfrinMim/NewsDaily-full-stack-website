import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const MyArticles = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [declineReason, setDeclineReason] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
 
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axiosSecure.get('/articlesss');
        const userArticles = response.data.filter(
          (article) => article.email === user?.email
        );
        setArticles(userArticles);
      } catch (error) {
        console.error('Error fetching articles:', error);
        setError('Failed to fetch articles. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    if (user?.email) {
      fetchArticles();
    }
  }, [user, axiosSecure]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      try {
        await axiosSecure.delete(`/articles/${id}`);
        setArticles((prev) => prev.filter((article) => article._id !== id));
      } catch (error) {
        console.error('Error deleting article:', error);
        setError('Failed to delete the article. Please try again later.');
      }
    }
  };

  const handleUpdate = (id) => {
    navigate(`/edit-article/${id}`);
  };

  const handleDetails = (id) => {
    navigate(`/article/${id}`);
  };

  const handleViewDeclineReason = (reason) => {
    setDeclineReason(reason);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setDeclineReason('');
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!articles.length) {
    return (
      <div className="text-center mt-10">
        <p className="text-gray-600">No articles found. Start creating your first article!</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">My Articles</h2>

      {/* Show error message if any */}
      {error && <div className="text-red-500 mt-4">{error}</div>}

      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">#</th>
              <th className="border border-gray-300 px-4 py-2">Title</th>
              <th className="border border-gray-300 px-4 py-2">Details</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Is Premium</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article, index) => (
              <tr key={article._id}>
                <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
                <td className="border border-gray-300 px-4 py-2">{article.title}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={() => handleDetails(article._id)}
                  >
                    View
                  </button>
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {article.status === 'Declined' ? (
                    <>
                      <span className="text-red-500">Declined</span>
                      <button
                        onClick={() => handleViewDeclineReason(article.reason)}
                        className="ml-2 text-sm text-blue-500 underline"
                      >
                        Why?
                      </button>
                    </>
                  ) : article.status === 'Approved' ? (
                    <span className="text-green-500">Approved</span>
                  ) : article.status === 'pending' ? (
                    <span className="text-yellow-500">Pending</span>
                  ) : null}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {article.isPremium ? 'Yes' : 'No'}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <button
                    onClick={() => handleUpdate(article._id)}
                    className="text-sm text-purple-500 hover:underline mr-4"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(article._id)}
                    className="text-sm text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Decline Reason Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white p-6 rounded-md shadow-md w-1/3">
            <h3 className="text-lg font-bold mb-4">Decline Reason</h3>
            <p className="text-gray-700">{declineReason || 'No reason provided'}</p>
            <button
              onClick={closeModal}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyArticles;
