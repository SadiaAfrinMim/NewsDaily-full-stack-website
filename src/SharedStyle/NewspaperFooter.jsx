import React from 'react';
import { 
  Newspaper, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Rss,
  Clock,
  TrendingUp,
  Globe,
  Award
} from 'lucide-react';

const NewspaperFooter = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-gray-300">
      {/* Breaking News Ticker */}
      <div className="bg-red-600 text-white py-2 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap flex items-center">
          <span className="mx-4 flex items-center">
            <Clock className="w-4 h-4 mr-2" /> Breaking News
          </span>
          <span className="mx-4">🔴 Global Markets Update</span>
          <span className="mx-4">🔴 Technology Breakthrough</span>
          <span className="mx-4">🔴 Climate Summit Results</span>
        </div>
      </div>

      <div className=" px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Newspaper className="w-8 h-8 text-white" />
              <h3 className="text-2xl font-bold text-white">NewsDaily</h3>
            </div>
            <p className="text-sm">
              Your trusted source for breaking news, in-depth analysis, and 
              comprehensive coverage of events from around the globe. Delivering 
              truth and accuracy since 1990.
            </p>
            <div className="flex space-x-4">
              <Award className="w-6 h-6 text-yellow-500" />
              <span className="text-sm">Pulitzer Prize Winner 2023</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-4">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <a href="/top-stories" className="hover:text-white flex items-center">
                <TrendingUp className="w-4 h-4 mr-2" />
                Top Stories
              </a>
              <a href="/world" className="hover:text-white flex items-center">
                <Globe className="w-4 h-4 mr-2" />
                World
              </a>
              <a href="/politics" className="hover:text-white">Politics</a>
              <a href="/business" className="hover:text-white">Business</a>
              <a href="/technology" className="hover:text-white">Technology</a>
              <a href="/sports" className="hover:text-white">Sports</a>
              <a href="/entertainment" className="hover:text-white">Entertainment</a>
              <a href="/health" className="hover:text-white">Health</a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold mb-4">Contact Us</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4" />
                <span>123 News Street, City, Country</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4" />
                <span>news@newsdaily.com</span>
              </div>
              {/* Live News Counter */}
              <div className="bg-gray-800 p-3 rounded-lg mt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">24/7</div>
                  <div className="text-xs">Live News Coverage</div>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter & Social */}
          <div>
            <h4 className="text-white font-bold mb-4">Stay Connected</h4>
            <div className="space-y-4">
              <div>
                <p className="text-sm mb-2">Subscribe to our newsletter</p>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="px-4 py-2 rounded-l-md w-full text-gray-900 text-sm"
                  />
                  <button className="bg-red-600 text-white px-4 py-2 rounded-r-md hover:bg-red-700">
                    Join
                  </button>
                </div>
              </div>
              <div>
                <p className="text-sm mb-2">Follow us on social media</p>
                <div className="flex space-x-4">
                  <Facebook className="w-5 h-5 hover:text-blue-500 cursor-pointer" />
                  <Twitter className="w-5 h-5 hover:text-blue-400 cursor-pointer" />
                  <Instagram className="w-5 h-5 hover:text-pink-500 cursor-pointer" />
                  <Youtube className="w-5 h-5 hover:text-red-500 cursor-pointer" />
                  <Rss className="w-5 h-5 hover:text-orange-500 cursor-pointer" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm">
              © {currentYear} NewsDaily. All rights reserved.
            </div>
            <div className="flex space-x-4 text-sm mt-4 md:mt-0">
              <a href="/terms" className="hover:text-white">Terms of Service</a>
              <a href="/privacy" className="hover:text-white">Privacy Policy</a>
              <a href="/accessibility" className="hover:text-white">Accessibility</a>
            </div>
          </div>
        </div>
      </div>

      {/* Press Credentials */}
      <div className="bg-black py-3 text-center text-xs">
        <span className="text-gray-500">
          Member of the Press Council | International News Media Association
        </span>
      </div>
    </footer>
  );
};

export default NewspaperFooter;