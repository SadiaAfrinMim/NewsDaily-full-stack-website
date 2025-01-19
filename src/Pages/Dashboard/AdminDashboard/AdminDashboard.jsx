import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';
import { Link, Outlet } from 'react-router-dom';
import { Users, BookOpen, Building2, Loader2 } from 'lucide-react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { User, Briefcase, FileText } from 'lucide-react';

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    users: 0,
    publishers: 0,
    articles: 0,
    publisherStats: [],
    monthlyArticles: [],
    userActivity: []
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [articlesRes, usersRes, publishersRes] = await Promise.all([
          axiosSecure.get('/articles'),
          axiosSecure.get('/users'),
          axiosSecure.get('/publishers')
        ]);

        // Basic counts
        const users = usersRes.data;
        const publishers = publishersRes.data;
        const articles = articlesRes.data;

        // Process publisher statistics
        const publisherArticleCounts = {};
        articles.forEach(article => {
          const publisherName = article.PublisherName; // Using PublisherName from article
          if (publisherName) {
            publisherArticleCounts[publisherName] = (publisherArticleCounts[publisherName] || 0) + 1;
          }
        });

        // Prepare publisher data for PieChart
        const publisherData = [['Publisher', 'Articles']];
        Object.entries(publisherArticleCounts).forEach(([publisher, count]) => {
          publisherData.push([publisher, count]);
        });

        // Sort by the number of articles
        publisherData.sort((a, b) => b[1] - a[1]);

        // Process monthly articles data
        const monthlyData = [['Month', 'Articles']];
        const monthCounts = {};

        articles.forEach(article => {
          const date = new Date(article.createdAt);
          const monthYear = date.toLocaleString('default', { month: 'short', year: '2-digit' });
          monthCounts[monthYear] = (monthCounts[monthYear] || 0) + 1;
        });

        // Get the last 6 months of data
        Object.entries(monthCounts)
          .sort((a, b) => new Date(b[0]) - new Date(a[0]))
          .slice(0, 6)
          .reverse()
          .forEach(([month, count]) => {
            monthlyData.push([month, count]);
          });

        // Process user activity by role
        const usersByRole = {
          user: users.filter(user => user.role).length,
          admin: users.filter(user => user.role === 'admin').length,
          publisher: publishers.length
        };

        const userActivityData = [
          ['Role', 'Count'],
          ['Users', usersByRole.user],
          ['Admins', usersByRole.admin],
          ['Publishers', usersByRole.publisher]
        ];

        // Update the state with fetched data
        setStats({
          users: users.length,
          publishers: publishers.length,
          articles: articles.length,
          publisherStats: publisherData,
          monthlyArticles: monthlyData,
          userActivity: userActivityData
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [axiosSecure]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="animate-spin h-8 w-8 text-red-600" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-4">
          <h2 className="text-xl font-bold text-red-600 mb-6">Admin Dashboard</h2>
          <nav className="space-y-2">
            <Link
              to="/admin/users"
              className="flex items-center gap-2 p-2 rounded hover:bg-red-50 text-gray-700 hover:text-red-600"
            >
              <Users size={20} />
              All Users
            </Link>
            <Link
              to="/admin/articles"
              className="flex items-center gap-2 p-2 rounded hover:bg-red-50 text-gray-700 hover:text-red-600"
            >
              <BookOpen size={20} />
              All Articles
            </Link>
            <Link
              to="/admin/publishers"
              className="flex items-center gap-2 p-2 rounded hover:bg-red-50 text-gray-700 hover:text-red-600"
            >
              <Building2 size={20} />
              Add Publisher
            </Link>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
      {/* Users Section */}
      <div className="bg-white p-6 rounded-lg shadow flex items-center gap-4">
        <div className="p-4 bg-red-100 rounded-full">
          <User className="h-8 w-8 text-red-600" /> {/* User Icon */}
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-1">Users</h3>
          <p className="text-2xl font-bold text-red-600">{stats.users}</p>
        </div>
      </div>

      {/* Publishers Section */}
      <div className="bg-white p-6 rounded-lg shadow flex items-center gap-4">
        <div className="p-4 bg-red-100 rounded-full">
          <Briefcase className="h-8 w-8 text-red-600" /> {/* Briefcase Icon */}
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-1">Publishers</h3>
          <p className="text-2xl font-bold text-red-600">{stats.publishers}</p>
        </div>
      </div>

      {/* Articles Section */}
      <div className="bg-white p-6 rounded-lg shadow flex items-center gap-4">
        <div className="p-4 bg-red-100 rounded-full">
          <FileText className="h-8 w-8 text-red-600" /> {/* FileText Icon */}
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-1">Articles</h3>
          <p className="text-2xl font-bold text-red-600">{stats.articles}</p>
        </div>
      </div>
    </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Publisher Distribution Chart */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Articles by Publisher</h3>
            <Chart
              chartType="PieChart"
              data={stats.publisherStats}
              options={{
                pieHole: 0.4,
                colors: ['#EF4444', '#F87171', '#FECACA', '#FEE2E2', '#FCA5A5'],
                legend: { position: 'bottom' },
                chartArea: { width: '100%', height: '70%' },
              }}
              width="100%"
              height="300px"
            />
          </div>

          {/* Monthly Articles Chart */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Articles Published (Last 6 Months)</h3>
            <Chart
              chartType="LineChart"
              data={stats.monthlyArticles}
              options={{
                colors: ['#EF4444'],
                legend: { position: 'none' },
                chartArea: { width: '80%', height: '70%' },
                hAxis: { title: 'Month' },
                vAxis: { title: 'Number of Articles' },
              }}
              width="100%"
              height="300px"
            />
          </div>
        </div>

        {/* User Role Distribution Chart */}
        <div className="mt-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">User Role Distribution</h3>
            <Chart
              chartType="BarChart"
              data={stats.userActivity}
              options={{
                colors: ['#EF4444'],
                legend: { position: 'none' },
                chartArea: { width: '80%', height: '70%' },
                hAxis: { title: 'Number of Users' },
                vAxis: { title: 'Role' },
              }}
              width="100%"
              height="300px"
            />
          </div>
        </div>

        <div className="mt-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
