import React from 'react';
import CountUp from 'react-countup';
import { Users, User, Crown } from 'lucide-react';

const StatisticsPage = () => {
  const stats = {
    totalUsers: 25000,
    normalUsers: 20000,
    premiumUsers: 5000
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Growing Community</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Watch our community grow in real-time as more readers join our platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Total Users Card */}
          <div className="bg-white rounded-xl shadow-lg p-8 transform transition-all hover:scale-105">
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 p-3 rounded-full mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Total Users</h2>
              <div className="text-4xl font-bold text-blue-600">
                <CountUp
                  end={stats.totalUsers}
                  duration={2.5}
                  separator=","
                  useEasing={true}
                  useGrouping={true}
                />
              </div>
              <p className="text-gray-500 mt-2">Active members</p>
            </div>
          </div>

          {/* Normal Users Card */}
          <div className="bg-white rounded-xl shadow-lg p-8 transform transition-all hover:scale-105">
            <div className="flex flex-col items-center">
              <div className="bg-green-100 p-3 rounded-full mb-4">
                <User className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Regular Users</h2>
              <div className="text-4xl font-bold text-green-600">
                <CountUp
                  end={stats.normalUsers}
                  duration={2.5}
                  separator=","
                  useEasing={true}
                  useGrouping={true}
                />
              </div>
              <p className="text-gray-500 mt-2">Free tier members</p>
            </div>
          </div>

          {/* Premium Users Card */}
          <div className="bg-white rounded-xl shadow-lg p-8 transform transition-all hover:scale-105">
            <div className="flex flex-col items-center">
              <div className="bg-purple-100 p-3 rounded-full mb-4">
                <Crown className="w-8 h-8 text-purple-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Premium Users</h2>
              <div className="text-4xl font-bold text-purple-600">
                <CountUp
                  end={stats.premiumUsers}
                  duration={2.5}
                  separator=","
                  useEasing={true}
                  useGrouping={true}
                />
              </div>
              <p className="text-gray-500 mt-2">Subscribed members</p>
            </div>
          </div>
        </div>

        {/* Additional Statistics */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Membership Distribution
          </h2>
          <div className="flex justify-center items-center space-x-8">
            <div className="text-center">
              <div className="text-lg font-semibold text-purple-600">
                <CountUp
                  end={Math.round((stats.premiumUsers / stats.totalUsers) * 100)}
                  duration={2.5}
                  suffix="%"
                  decimals={1}
                />
              </div>
              <p className="text-gray-500">Premium Rate</p>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-blue-600">
                <CountUp
                  end={Math.round((stats.normalUsers / stats.totalUsers) * 100)}
                  duration={2.5}
                  suffix="%"
                  decimals={1}
                />
              </div>
              <p className="text-gray-500">Regular Rate</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;