import React from 'react';

const NewsWebsite = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-neutral-100 py-16 border-b-4 border-red-600">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Story Card */}
            <div 
  className="lg:col-span-2 text-white p-8 rounded-xl shadow-xl relative overflow-hidden"
>
  {/* Background Image with Overlay */}
  <div 
    className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat  opacity-80"
    style={{ backgroundImage: "url('https://i.ibb.co.com/r6t4ZBX/photo-1553368561-5ccfe639f28b.jpg')" }}
  ></div>
  
  {/* Gradient Overlay */}
  <div className="absolute inset-0 z-20 bg-gradient-to-r from-maroon-800/90 to-red-600/90"></div>
  
  {/* Content */}
  <div className="relative z-20">
    <h1 className="text-4xl  font-bold mb-6 drop-shadow-md">
      Breaking News: Global Summit Concludes Historic Agreement
    </h1>
    <div className="flex gap-4 mt-8">
      <button className="daisy-btn daisy-btn-primary bg-white text-red-600 hover:bg-neutral-100 border-none rounded-full px-8">
        Live Updates
      </button>
      <div className="daisy-badge daisy-badge-outline gap-2 hover:bg-white/10 cursor-pointer text-white border-white/30">
        🌍 Interactive Map
      </div>
    </div>
  </div>
</div>

            {/* Secondary News Cards */}
            <div className="space-y-6 ">
              {[1, 2, 3].map((item) => (
                <div key={item} className="daisy-card bg-white shadow-md">
                  <div className="daisy-card-body p-6">
                    <div className="w-10 h-1 bg-red-600 mb-4"></div>
                    <h3 className="daisy-card-title text-neutral-800">
                      Economic Shift in Asian Markets
                    </h3>
                    <p className="text-neutral-600">
                      New trade policies create waves...
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="bg-neutral-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16 relative">
            <span className="bg-neutral-50 px-8 relative z-10 text-red-600">
              Developing Stories
            </span>
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-red-600 -z-0"></div>
          </h2>

          <div className="daisy-timeline daisy-timeline-vertical ">
            {[1, 2, 3, 4].map((item, index) => (
              <div key={item} className="daisy-timeline-item">
                <div className="daisy-timeline-marker daisy-timeline-marker-primary"></div>
                <div className="daisy-timeline-content">
                  <div className="daisy-card bg-white shadow-sm p-4">
                    <div className="daisy-card-body">
                      <h3 className="daisy-card-title text-red-600">
                        Hour {index + 1} Update
                      </h3>
                      <p>Key developments in the ongoing...</p>
                      <div className="w-full h-2 bg-red-100 mt-4 rounded-full">
                        <div 
                          className="h-full bg-red-600 rounded-full transition-all duration-300"
                          style={{ width: `${(index + 1) * 25}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default NewsWebsite;