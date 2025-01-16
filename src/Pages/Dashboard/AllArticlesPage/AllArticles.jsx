import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AllArticles = () => {
  const axiosSecure = useAxiosSecure();
  const [articles, setArticles] = useState([]);
  const [declineReason, setDeclineReason] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [articleToDecline, setArticleToDecline] = useState(null);

  // Fetch articles
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

  // Handle status updates
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
                status:
                  action === "approve"
                    ? "Approved"
                    : action === "decline"
                    ? "Declined"
                    : article.status,
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

  // Open Decline Modal
  const openDeclineModal = (articleId) => {
    setArticleToDecline(articleId);
    setIsModalOpen(true);
  };

  // Close Decline Modal
  const closeDeclineModal = () => {
    setIsModalOpen(false);
    setDeclineReason("");
  };

  // Handle article deletion
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

  // Handle make premium
  const handleMakePremium = async (articleId) => {
    try {
      await axiosSecure.patch(`/articles/${articleId}/premium`);
      const updatedArticles = articles.map((article) =>
        article._id === articleId ? { ...article, isPremium: true } : article
      );
      setArticles(updatedArticles);
      toast.success("Article set as premium successfully");
    } catch (error) {
      console.error("Failed to set article as premium:", error);
      toast.error("Failed to set article as premium");
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">All Articles</h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Posted Date</th>
              <th>Status</th>
              <th>Publisher</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr key={article._id}>
                <td>
                  <div className="font-bold">{article.title}</div>
                  <div className="text-sm opacity-50">{article.description}</div>
                  <div className="text-xs opacity-50">
                    Tags: {article.tags.join(", ")}
                  </div>
                </td>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={article.authorImage || "/placeholder.svg"}
                          alt={article.name}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{article.name}</div>
                      <div className="text-sm opacity-50">{article.email}</div>
                    </div>
                  </div>
                </td>
                <td>{new Date(article.createdAt).toLocaleDateString()}</td>
                <td>
                  <span
                    className={`badge ${
                      article.status === "Approved"
                        ? "badge-success"
                        : article.status === "Declined"
                        ? "badge-error"
                        : "badge-warning"
                    }`}
                  >
                    {article.status}
                  </span>
                  {article.previousStatus && (
                    <div className="text-xs opacity-50">
                      Previous: {article.previousStatus}
                    </div>
                  )}
                </td>
                <td>{article.publisher}</td>
                <td>
                  <div className="flex flex-col space-y-2">
                    {article.status === "pending" && (
                      <>
                        <button
                          className="btn btn-xs btn-success"
                          onClick={() => handleArticleAction("approve", article._id)}
                        >
                          Approve
                        </button>
                        <button
                          className="btn btn-xs btn-warning"
                          onClick={() => openDeclineModal(article._id)}
                        >
                          Decline
                        </button>
                      </>
                    )}
                    <button
                      className="btn btn-xs btn-error"
                      onClick={() => handleDeleteArticle(article._id)}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-xs btn-primary"
                      onClick={() => handleMakePremium(article._id)}
                      disabled={article.isPremium}
                    >
                      {article.isPremium ? "Premium" : "Make Premium"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Decline Modal */}
      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h2 className="text-xl font-semibold">Enter Reason for Decline</h2>
            <textarea
              value={declineReason}
              onChange={(e) => setDeclineReason(e.target.value)}
              className="textarea textarea-bordered w-full mt-4"
              rows="4"
            ></textarea>
            <div className="modal-action mt-4">
              <button
                className="btn btn-primary mr-2"
                onClick={() =>
                  handleArticleAction("decline", articleToDecline, declineReason)
                }
              >
                Submit
              </button>
              <button className="btn btn-secondary" onClick={closeDeclineModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllArticles;
