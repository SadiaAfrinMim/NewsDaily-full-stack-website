import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Shield, Trash2, Star, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

const AllArticles = () => {
  const axiosSecure = useAxiosSecure();
  const [articles, setArticles] = useState([]);
  const [declineReason, setDeclineReason] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [articleToDecline, setArticleToDecline] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axiosSecure.get("/articles");
        setArticles(response.data);
      } catch (error) {
        console.error("Error fetching articles:", error);
        toast.error("Failed to fetch articles");
      }
    };
    fetchArticles();
  }, [axiosSecure]);

  const handleArticleAction = async (action, articleId, reason = "") => {
    try {
      const payload = { articleId, reason, action };
      const response = await axiosSecure.patch(`/articles/action`, payload);

      if (response.status === 200) {
        const updatedArticles = articles.map((article) =>
          article._id === articleId
            ? {
                ...article,
                previousStatus: article.status,
                status: action === "approve" ? "Approved" : action === "decline" ? "Declined" : article.status,
                declineReason: action === "decline" ? reason : article.declineReason,
              }
            : article
        );
        setArticles(updatedArticles);
        toast.success(`Article ${action}d successfully`);
        if (action === "decline") closeDeclineModal();
      }
    } catch (error) {
      console.error(`Failed to ${action} article:`, error);
      toast.error(`Failed to ${action} article`);
    }
  };

  const openDeclineModal = (articleId) => {
    setArticleToDecline(articleId);
    setIsModalOpen(true);
  };

  const closeDeclineModal = () => {
    setIsModalOpen(false);
    setDeclineReason("");
  };

  const handleDeleteArticle = async (articleId) => {
    try {
      await axiosSecure.delete(`/articles/${articleId}`);
      setArticles(articles.filter((article) => article._id !== articleId));
      toast.success("Article deleted successfully");
    } catch (error) {
      console.error("Failed to delete article:", error);
      toast.error("Failed to delete article");
    }
  };

  const handleMakePremium = async (articleId) => {
    try {
      const response = await axiosSecure.patch(`/articles/${articleId}/premium`);
      if (response.status === 200) {
        const updatedArticles = articles.map((article) =>
          article._id === articleId ? { ...article, isPremium: true } : article
        );
        setArticles(updatedArticles);
        toast.success('Article marked as premium');
      }
    } catch (error) {
      console.error('Failed to make article premium:', error);
      toast.error('Failed to mark article as premium');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-red-700 to-red-400">
          <h1 className="text-3xl font-bold text-white">Articles Management</h1>
        </div>

        <div className="overflow-x-auto p-6">
          {articles.map((article) => (
            <div key={article._id} 
                 className="mb-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center space-x-3">
                      <h2 className="text-xl font-bold text-gray-900">{article.title}</h2>
                      {article.isPremium && (
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold flex items-center">
                          <Star className="w-3 h-3 mr-1" />
                          Premium
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm">{article.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center ${
                      article.status === "Approved" 
                        ? "bg-green-100 text-green-800" 
                        : article.status === "Declined"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {article.status === "Approved" && <CheckCircle className="w-4 h-4 mr-1" />}
                      {article.status === "Declined" && <XCircle className="w-4 h-4 mr-1" />}
                      {article.status === "pending" && <AlertCircle className="w-4 h-4 mr-1" />}
                      {article.status}
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <img
                      src={article.
                        AuthorImage || "/api/placeholder/40/40"}
                      alt={article.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{article.name}</p>
                      <p className="text-sm text-gray-500">{article.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {article.status === "pending" && (
                      <>
                        <button
                          onClick={() => handleArticleAction("approve", article._id)}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center text-sm font-medium"
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Approve
                        </button>
                        <button
                          onClick={() => openDeclineModal(article._id)}
                          className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors duration-200 flex items-center text-sm font-medium"
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          Decline
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => handleMakePremium(article._id)}
                      disabled={article.isPremium}
                      className={`px-4 py-2 rounded-lg flex items-center text-sm font-medium ${
                        article.isPremium 
                          ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                          : "bg-blue-600 text-white hover:bg-blue-700"
                      } transition-colors duration-200`}
                    >
                      <Star className="w-4 h-4 mr-1" />
                      {article.isPremium ? "Premium" : "Make Premium"}
                    </button>
                    <button
                      onClick={() => handleDeleteArticle(article._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decline Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Enter Reason for Decline</h2>
            <textarea
              value={declineReason}
              onChange={(e) => setDeclineReason(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              rows="4"
              placeholder="Please provide a reason for declining this article..."
            ></textarea>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                onClick={closeDeclineModal}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                onClick={() => handleArticleAction("decline", articleToDecline, declineReason)}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllArticles;