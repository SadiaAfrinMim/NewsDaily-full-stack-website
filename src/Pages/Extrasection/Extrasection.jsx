import React from 'react';
import { 
  Newspaper, 
  Globe, 
  TrendingUp, 
  Podcast, 
  BookOpen,
  Activity,
  Share2,
  BookmarkPlus,
  MessageSquare,
  Bell,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const NewsCategoriesShowcase = () => {
  const categories = [
    {
      icon: <Globe className="w-8 h-8" />,
      name: "Global News",
      description: "Breaking news from around the world",
      articles: 450,
      color: "bg-blue-500"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      name: "Business",
      description: "Market updates and economic insights",
      articles: 320,
      color: "bg-green-500"
    },
    {
      icon: <Podcast className="w-8 h-8" />,
      name: "Technology",
      description: "Latest in tech and innovation",
      articles: 280,
      color: "bg-purple-500"
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      name: "Culture",
      description: "Arts, entertainment, and lifestyle",
      articles: 190,
      color: "bg-orange-500"
    }
  ];

  return (
    <section className="max-w-7xl mx-auto py-16 px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Explore News Categories</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Dive into our comprehensive coverage across multiple categories, 
          carefully curated by expert journalists.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map((category, index) => (
          <div 
            key={index} 
            className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-105"
          >
            <div className={`${category.color} p-4 text-white flex justify-center`}>
              {category.icon}
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
              <p className="text-gray-600 mb-4">{category.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">{category.articles} articles</span>
                <button className="text-blue-600 hover:text-blue-700 font-medium">
                  Explore →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// Interactive News Experience Section
const InteractiveNewsExperience = () => {
  const features = [
    {
      icon: <Activity className="w-6 h-6" />,
      title: "Personalized News Feed",
      description: "Get news tailored to your interests using our advanced AI algorithm"
    },
    {
      icon: <Share2 className="w-6 h-6" />,
      title: "Social Sharing",
      description: "Share articles with your network and engage in meaningful discussions"
    },
  
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Community Discussions",
      description: "Join conversations about the stories that matter to you"
    },
    {
      icon: <Bell className="w-6 h-6" />,
      title: "Breaking News Alerts",
      description: "Stay informed with real-time notifications on important stories"
    }
  ];

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-red-900 mb-4">Interactive News Experience</h2>
          <p className="text-red-700 max-w-2xl mx-auto">
            Engage with news in a whole new way through our innovative features
            designed to enhance your reading experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="card bg-gradient-to-br from-red-50 to-red-100 hover:from-red-100 hover:to-red-200 
                transition-all duration-300 hover:-translate-y-2"
            >
              <div className="card-body">
                <div className="w-12 h-12 rounded-full bg-red-200 flex items-center justify-center mb-4">
                  <div className="text-red-600">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-red-900">{feature.title}</h3>
                <p className="text-red-700">{feature.description}</p>
              </div>
            </div>
          ))}


        </div>

        <div className="mt-16">
          <div className="card bg-gradient-to-r from-red-600 to-red-700 text-white max-w-2xl mx-auto">
            <div className="card-body text-center">
              <h3 className="text-2xl font-bold mb-4">Start Your Journey Today</h3>
              <p className="mb-6 text-red-100">
                Join thousands of readers who are already experiencing the future of news consumption.
              </p>
              <Link to={'/login'} className="btn btn-lg bg-white text-red-600 hover:bg-red-100 border-none 
                font-bold mx-auto">
                Get Started Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default function ExtraSections() {
  return (
    <div className="min-h-screen">
      <NewsCategoriesShowcase />
      <InteractiveNewsExperience />
    </div>
  );
}