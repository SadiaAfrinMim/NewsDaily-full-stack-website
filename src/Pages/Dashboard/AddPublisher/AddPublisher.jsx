import React, { useState } from 'react';
import { Upload, Loader, PlusCircle } from 'lucide-react';

const AddPublisher = () => {
  const [publisherName, setPublisherName] = useState('');
  const [publisherLogo, setPublisherLogo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    handleImageUpload({ target: { files: [file] } });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setLoading(true);
    // Simulate upload delay
    setTimeout(() => {
      setPublisherLogo(URL.createObjectURL(file));
      setLoading(false);
    }, 1500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate submission delay
    setTimeout(() => {
      setLoading(false);
      setPublisherName('');
      setPublisherLogo(null);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-slate-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-red-100">
          <div className="p-8 border-b border-red-100 bg-gradient-to-r from-red-700 to-red-900 relative">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.1),transparent)]"></div>
            </div>
            <h1 className="text-3xl font-bold text-white relative z-10">Add New Publisher</h1>
            <p className="text-red-100 mt-2 relative z-10">Create a new publisher profile with logo</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="space-y-2">
              <label htmlFor="publisherName" className="text-lg font-semibold text-gray-700 block">
                Publisher Name
              </label>
              <input
                type="text"
                id="publisherName"
                className="w-full px-4 py-3 rounded-xl border border-red-200 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 bg-white"
                placeholder="Enter publisher name"
                value={publisherName}
                onChange={(e) => setPublisherName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-lg font-semibold text-gray-700 block">
                Publisher Logo
              </label>
              <div
                className={`relative border-2 border-dashed rounded-xl p-8 text-center ${
                  dragActive ? 'border-red-500 bg-red-50' : 'border-red-200 hover:border-red-300'
                } transition-all duration-200`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                {publisherLogo ? (
                  <div className="flex flex-col items-center">
                    <img 
                      src={publisherLogo} 
                      alt="Publisher Logo" 
                      className="w-32 h-32 object-cover rounded-xl shadow-md" 
                    />
                    <button
                      type="button"
                      onClick={() => setPublisherLogo(null)}
                      className="mt-4 text-red-600 hover:text-red-700 text-sm font-medium"
                    >
                      Remove Image
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <Upload className="w-12 h-12 text-red-400 mb-4" />
                    <p className="text-gray-600 mb-2">Drag & drop your logo here or</p>
                    <label className="cursor-pointer text-red-600 hover:text-red-700 font-medium">
                      Browse Files
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleImageUpload}
                        accept="image/*"
                      />
                    </label>
                  </div>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !publisherName || !publisherLogo}
              className={`w-full py-3 rounded-xl font-medium flex items-center justify-center space-x-2 ${
                loading || !publisherName || !publisherLogo
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800'
              } transition-all duration-200 shadow-sm hover:shadow-md`}
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <PlusCircle className="w-5 h-5" />
                  <span>Add Publisher</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPublisher;