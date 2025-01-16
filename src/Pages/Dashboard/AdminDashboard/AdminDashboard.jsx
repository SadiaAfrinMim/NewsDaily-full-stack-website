import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';

import { Link, Outlet } from 'react-router-dom';
import { LayoutDashboard, Users, BookOpen, Building2, Loader2 } from 'lucide-react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(true);
  const [publisherStats, setPublisherStats] = useState([]);
  const [monthlyArticles, setMonthlyArticles] = useState([]);
  const [userActivity, setUserActivity] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [articlesRes, usersRes] = await Promise.all([
          axiosSecure.get('/articles'),
          axiosSecure.get('/users/activity')
        ]);

        // Process publisher statistics
        const publisherCounts = {};
        articlesRes.data.forEach(article => {
          publisherCounts[article.publisher] = (publisherCounts[article.publisher] || 0) + 1;
        });

        const totalArticles = Object.values(publisherCounts).reduce((a, b) => a + b, 0);
        const publisherData = [['Publisher', 'Percentage']];
        Object.entries(publisherCounts).forEach(([publisher, count]) => {
          const percentage = (count / totalArticles) * 100;
          publisherData.push([publisher, percentage]);
        });
        setPublisherStats(publisherData);

        // Process monthly article counts
        const monthlyData = [['Month', 'Articles Published']];
        const last6Months = Array.from({ length: 6 }, (_, i) => {
          const date = new Date();
          date.setMonth(date.getMonth() - i);
          return date.toLocaleString('default', { month: 'short' });
        }).reverse();

        last6Months.forEach(month => {
          const count = articlesRes.data.filter(article => 
            new Date(article.createdAt).toLocaleString('default', { month: 'short' }) === month
          ).length;
          monthlyData.push([month, count]);
        });
        setMonthlyArticles(monthlyData);

        // Process user activity
        const activityData = [['Category', 'Active', 'Inactive']];
        const categories = ['Writers', 'Publishers', 'Readers'];
        categories.forEach(category => {
          const active = Math.floor(Math.random() * 50) + 30; // Simulated data
          const inactive = Math.floor(Math.random() * 20) + 10;
          activityData.push([category, active, inactive]);
        });
        setUserActivity(activityData);

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
        <Loader2 className="animate-spin h-8 w-8 text-purple-600" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-4">
          <h2 className="text-xl font-bold text-purple-600 mb-6">Admin Dashboard</h2>
          <nav className="space-y-2">
            <Link
              to="/admin/users"
              className="flex items-center gap-2 p-2 rounded hover:bg-purple-50 text-gray-700 hover:text-purple-600"
            >
              <Users size={20} />
              All Users
            </Link>
            <Link
              to="/admin/articles"
              className="flex items-center gap-2 p-2 rounded hover:bg-purple-50 text-gray-700 hover:text-purple-600"
            >
              <BookOpen size={20} />
              All Articles
            </Link>
            <Link
              to="/admin/publishers"
              className="flex items-center gap-2 p-2 rounded hover:bg-purple-50 text-gray-700 hover:text-purple-600"
            >
              <Building2 size={20} />
              Add Publisher
            </Link>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Publisher Distribution Chart */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Publisher Distribution</h3>
            <Chart
              chartType="PieChart"
              data={publisherStats}
              options={{
                pieHole: 0.4,
                colors: ['#7C3AED', '#9F7AEA', '#C4B5FD'],
                legend: { position: 'bottom' },
                chartArea: { width: '100%', height: '70%' },
              }}
              width="100%"
              height="300px"
            />
          </div>

          {/* Monthly Articles Chart */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Monthly Articles Published</h3>
            <Chart
              chartType="LineChart"
              data={monthlyArticles}
              options={{
                colors: ['#7C3AED'],
                legend: { position: 'none' },
                chartArea: { width: '80%', height: '70%' },
                hAxis: { title: 'Month' },
                vAxis: { title: 'Number of Articles' },
              }}
              width="100%"
              height="300px"
            />
          </div>

          {/* User Activity Chart */}
          <div className="bg-white p-6 rounded-lg shadow md:col-span-2">
            <h3 className="text-lg font-semibold mb-4">User Activity Distribution</h3>
            <Chart
              chartType="BarChart"
              data={userActivity}
              options={{
                colors: ['#7C3AED', '#E5E7EB'],
                legend: { position: 'top' },
                chartArea: { width: '80%', height: '70%' },
                hAxis: { title: 'Number of Users' },
                vAxis: { title: 'Category' },
                isStacked: true,
              }}
              width="100%"
              height="300px"
            />
          </div>
        </div>

        {/* Outlet for nested routes */}
        <div className="mt-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;