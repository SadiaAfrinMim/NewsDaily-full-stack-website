// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Select from 'react-select';
// import axios from 'axios';
// import { 
//   Search, 
//   Crown, 
//   ChevronRight, 
//   Filter,
//   Loader2 
// } from 'lucide-react';

// // Article Card Component
// const ArticleCard = ({ article, isPremiumUser }) => {
//   const navigate = useNavigate();
//   const isPremium = article.isPremium;

//   return (
//     <div className={`relative rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105
//       ${isPremium ? 'bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200' : 'bg-white'}`}>
//       {isPremium && (
//         <div className="absolute top-4 right-4 bg-purple-600 text-white px-3 py-1 rounded-full flex items-center">
//           <Crown className="w-4 h-4 mr-1" />
//           <span className="text-sm font-medium">Premium</span>
//         </div>
//       )}
      
//       <img 
//         src={article.image} 
//         alt={article.title}
//         className="w-full h-48 object-cover"
//       />
      
//       <div className="p-6">
//         <div className="flex items-center mb-3">
//           <img 
//             src={article.publisher.logo} 
//             alt={article.publisher.name}
//             className="w-6 h-6 rounded-full mr-2"
//           />
//           <span className="text-sm text-gray-600">{article.publisher.name}</span>
//         </div>
        
//         <h3 className="text-xl font-semibold mb-3 line-clamp-2">{article.title}</h3>
        
//         <p className="text-gray-600 mb-4 line-clamp-3">{article.description}</p>
        
//         <div className="flex flex-wrap gap-2 mb-4">
//           {article.tags.map((tag, index) => (
//             <span 
//               key={index}
//               className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600"
//             >
//               {tag.label}
//             </span>
//           ))}
//         </div>
        
//         <button
//           onClick={() => navigate(`/articles/${article._id}`)}
//           disabled={isPremium && !isPremiumUser}
//           className={`flex items-center justify-center w-full py-2 px-4 rounded-lg
//             ${isPremium 
//               ? (isPremiumUser 
//                 ? 'bg-purple-600 hover:bg-purple-700 text-white' 
//                 : 'bg-gray-300 cursor-not-allowed text-gray-500')
//               : 'bg-blue-600 hover:bg-blue-700 text-white'
//             } transition-colors`}
//         >
//           Read More
//           <ChevronRight className="w-4 h-4 ml-1" />
//         </button>
//       </div>
//     </div>
//   );
// };

// // Search and Filter Component
// const SearchFilters = ({ onSearch, onFilterChange }) => {
//   const [publishers, setPublishers] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedPublisher, setSelectedPublisher] = useState(null);
//   const [selectedTags, setSelectedTags] = useState([]);

//   const tagOptions = [
//     { value: 'politics', label: 'Politics' },
//     { value: 'technology', label: 'Technology' },
//     { value: 'sports', label: 'Sports' },
//     { value: 'health', label: 'Health' },
//     { value: 'business', label: 'Business' }
//   ];

//   useEffect(() => {
//     const fetchPublishers = async () => {
//       const response = await axios.get('/api/publishers');
//       setPublishers(response.data.map(pub => ({
//         value: pub._id,
//         label: pub.name
//       })));
//     };
//     fetchPublishers();
//   }, []);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     onSearch(searchTerm);
//   };

//   const handleFilterChange = (publisher, tags) => {
//     onFilterChange({
//       publisherId: publisher?.value,
//       tags: tags.map(tag => tag.value)
//     });
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-md p-6 mb-8">
//       <form onSubmit={handleSearch} className="mb-6">
//         <div className="flex gap-4">
//           <div className="flex-1 relative">
//             <input
//               type="text"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               placeholder="Search articles by title..."
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//             <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
//           </div>
//           <button
//             type="submit"
//             className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
//           >
//             Search
//           </button>
//         </div>
//       </form>

//       <div className="flex flex-col md:flex-row gap-4">
//         <div className="flex-1">
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Filter by Publisher
//           </label>
//           <Select
//             isClearable
//             options={publishers}
//             value={selectedPublisher}
//             onChange={(selected) => {
//               setSelectedPublisher(selected);
//               handleFilterChange(selected, selectedTags);
//             }}
//             placeholder="Select publisher..."
//           />
//         </div>
//         <div className="flex-1">
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Filter by Tags
//           </label>
//           <Select
//             isMulti
//             options={tagOptions}
//             value={selectedTags}
//             onChange={(selected) => {
//               setSelectedTags(selected);
//               handleFilterChange(selectedPublisher, selected);
//             }}
//             placeholder="Select tags..."
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// // Main Articles Page
// const AllArticlesPage = () => {
//   const [articles, setArticles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isPremiumUser, setIsPremiumUser] = useState(false);

//   useEffect(() => {
//     // Check user subscription status
//     const checkSubscription = async () => {
//       try {
//         const response = await axios.get('/api/user/subscription');
//         setIsPremiumUser(response.data.isPremium);
//       } catch (error) {
//         console.error('Error checking subscription:', error);
//       }
//     };
//     checkSubscription();
//   }, []);

//   const fetchArticles = async (params = {}) => {
//     setLoading(true);
//     try {
//       const response = await axios.get('/api/articles', { params });
//       setArticles(response.data);
//     } catch (error) {
//       console.error('Error fetching articles:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSearch = (searchTerm) => {
//     fetchArticles({ title: searchTerm });
//   };

//   const handleFilter = ({ publisherId, tags }) => {
//     fetchArticles({ publisherId, tags });
//   };

//   useEffect(() => {
//     fetchArticles();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-50 py-12 px-4">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-3xl font-bold text-gray-900 mb-8">All Articles</h1>
        
//         <SearchFilters 
//           onSearch={handleSearch}
//           onFilterChange={handleFilter}
//         />

//         {loading ? (
//           <div className="flex justify-center items-center h-64">
//             <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
//           </div>
//         ) : articles.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {articles.map((article) => (
//               <ArticleCard
//                 key={article._id}
//                 article={article}
//                 isPremiumUser={isPremiumUser}
//               />
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-12">
//             <p className="text-gray-600">No articles found matching your criteria.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AllArticlesPage;