import React, { useState, useEffect } from "react";
import TrendingArticles from "../TrendingArticles/TrendingArticles";
import Plans from "../Plans/Plans";
import StatisticsPage from "../../StatisticsPage/StatisticsPage";
import ExtraSections from "../../Extrasection/Extrasection";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 10000); // Show modal after 10 seconds

    return () => clearTimeout(timer); // Cleanup timer if component unmounts
  }, []);

  return (
    <div>
     

      {showModal && (
        <dialog
          id="subscription_modal"
          className="modal modal-open bg-opacity-60 backdrop-blur-md"
        >
          <div className="modal-box relative bg-red-100 border-2 border-red-600 shadow-lg">
            <button
              className="btn btn-sm btn-circle absolute right-2 top-2 bg-red-600 text-white hover:bg-red-800"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>
            <div className="text-center">
              <h3 className="font-bold text-2xl text-red-600 mb-4">
                Subscribe for Exclusive Updates!
              </h3>
              <p className="text-gray-800">
                Be the first to know about our latest news and trends. Stay
                informed with just a click.
              </p>
              <div className="mt-6 space-y-4">
                <button
                  className="btn btn-primary w-full bg-gradient-to-r from-red-500 to-red-700 hover:from-red-700 hover:to-red-500 text-white"
                  onClick={() => navigate("/subscription")}
                >
                  Subscribe Now
                </button>
                <button
                  className="btn w-full border border-red-400 bg-white hover:bg-red-100 text-red-600"
                  onClick={() => setShowModal(false)}
                >
                  Maybe Later
                </button>
              </div>
            </div>
          </div>
        </dialog>
      )}

      {/* Main Sections */}
      <TrendingArticles />
      <StatisticsPage />
      <Plans />
      <ExtraSections />
    </div>
  );
};

export default Home;
