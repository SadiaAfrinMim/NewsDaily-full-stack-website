import React, { useState, useEffect } from 'react';
import { Users, User, Crown, TrendingUp } from 'lucide-react';
import CountUp from 'react-countup';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const StatisticsPage = () => {
  const axiosSecure = useAxiosSecure();
  const [stats, setStats] = useState({
    totalUsers: 0,
    normalUsers: 0,
    premiumUsers: 0
  });

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const response = await axiosSecure.get('http://localhost:9000/users');
        const users = response.data;

        const totalUsers = users.length;
        const normalUsers = users.filter(user => user.plan === 'free').length;
        const premiumUsers = users.filter(user => user.plan === 'premium').length;

        setStats({
          totalUsers,
          normalUsers,
          premiumUsers
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserStats();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-red-900 mb-4">
            Our Thriving Community
          </h1>
          <p className="text-lg text-red-700 max-w-2xl mx-auto">
            Watch our community grow as more readers discover the power of premium news
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Total Users Card */}
          <div className="card bg-gradient-to-br from-red-600 to-red-700 text-white 
            hover:shadow-2xl transform transition-all duration-300 hover:-translate-y-2">
            <div className="card-body items-center text-center">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-4">
                <Users className="w-8 h-8" />
              </div>
              <h2 className="card-title text-2xl mb-2">Total Users</h2>
              <div className="text-4xl font-bold">
                <CountUp
                  end={stats.totalUsers}
                  duration={2.5}
                  separator=","
                  useEasing={true}
                  useGrouping={true}
                />
              </div>
              <p className="text-red-200 mt-2">Active members</p>
            </div>
          </div>

          {/* Normal Users Card */}
          <div className="card bg-white border-red-600 border-x-4 hover:shadow-2xl transform transition-all duration-300 hover:-translate-y-2">
            <div className="card-body items-center text-center">
              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
                <User className="w-8 h-8 text-red-600" />
              </div>
              <h2 className="card-title text-2xl text-red-900 mb-2">Regular Users</h2>
              <div className="text-4xl font-bold text-red-600">
                <CountUp
                  end={stats.normalUsers}
                  duration={2.5}
                  separator=","
                  useEasing={true}
                  useGrouping={true}
                />
              </div>
              <p className="text-red-500 mt-2">Free tier members</p>
            </div>
          </div>

          {/* Premium Users Card */}
          <div className="card bg-gradient-to-br from-red-700 to-red-800 text-white 
            hover:shadow-2xl transform transition-all duration-300 hover:-translate-y-2">
            <div className="card-body items-center text-center">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-4">
                <Crown className="w-8 h-8" />
              </div>
              <h2 className="card-title text-2xl mb-2">Premium Users</h2>
              <div className="text-4xl font-bold">
                <CountUp
                  end={stats.premiumUsers}
                  duration={2.5}
                  separator=","
                  useEasing={true}
                  useGrouping={true}
                />
              </div>
              <p className="text-red-200 mt-2">Subscribed members</p>
            </div>
          </div>
        </div>

        {/* Distribution Stats */}
        <div className="mt-16">
          <div className="card bg-white">
            <div className="card-body">
              <h2 className="card-title text-2xl text-red-900 mb-8 justify-center">
                Membership Distribution
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Premium Rate */}
                <div className="card bg-gradient-to-br from-red-50 to-red-100">
                  <div className="card-body items-center text-center">
                    <TrendingUp className="w-8 h-8 text-red-600 mb-2" />
                    <div className="text-3xl font-bold text-red-700">
                      <CountUp
                        end={Math.round((stats.premiumUsers / stats.totalUsers) * 100)}
                        duration={2.5}
                        suffix="%"
                        decimals={1}
                      />
                    </div>
                    <p className="text-red-600">Premium Membership Rate</p>
                  </div>
                </div>

                {/* Regular Rate */}
                <div className="card bg-gradient-to-br from-red-50 to-red-100">
                  <div className="card-body items-center text-center">
                    <Users className="w-8 h-8 text-red-600 mb-2" />
                    <div className="text-3xl font-bold text-red-700">
                      <CountUp
                        end={Math.round((stats.normalUsers / stats.totalUsers) * 100)}
                        duration={2.5}
                        suffix="%"
                        decimals={1}
                      />
                    </div>
                    <p className="text-red-600">Regular Membership Rate</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;