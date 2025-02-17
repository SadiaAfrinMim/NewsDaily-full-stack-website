import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-base-100" data-theme="light">
      {/* Hero Section */}
      <section className="relative h-96 bg-red-600/90 text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?auto=format&fit=crop&w=2070')" }}
        ></div>
        <div className="relative container mx-auto px-4 h-full flex items-center justify-center">
          <div className="text-center max-w-4xl">
            <h1 className="text-5xl font-bold mb-6 drop-shadow-md">Get instant updates on global events.</h1>
            <p className="text-xl mb-8">Delivering news with integrity since 2012</p>
            <div className="animate-bounce  mt-8">
             
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="daisy-timeline daisy-timeline-vertical">
            {[
              { year: '2012', title: 'Founded in London', content: 'Started as small independent news blog' },
              { year: '2015', title: 'First Award', content: 'Won Best Emerging News Platform' },
              { year: '2020', title: 'Global Reach', content: 'Expanded to 15 international editions' },
              { year: '2023', title: 'Innovation Leader', content: 'Pioneered AI-assisted fact checking' },
            ].map((item, index) => (
              <div key={item.year} className="daisy-timeline-item">
                <div className="daisy-timeline-marker daisy-timeline-marker-primary"></div>
                <div className="daisy-timeline-content p-6">
                  <div className="bg-white rounded-lg shadow-md p-6 hover:transform hover:-translate-y-2 transition-all duration-300">
                    <h3 className="text-2xl font-bold text-red-600 mb-2">{item.year}</h3>
                    <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
                    <p className="text-neutral-600">{item.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Guardians of Truth</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Sarah Johnson', role: 'Editor-in-Chief', img: 'https://i.pravatar.cc/300?img=1' },
              { name: 'Michael Chen', role: 'Investigative Lead', img: 'https://i.pravatar.cc/300?img=2' },
              { name: 'Emma Wilson', role: 'Fact Check Director', img: 'https://i.pravatar.cc/300?img=3' },
            ].map((member, index) => (
              <div key={member.name} className="daisy-card bg-base-100 shadow-xl group">
                <figure className="px-4 pt-4">
                  <div className="rounded-full overflow-hidden relative">
                    <img 
                      src={member.img} 
                      alt={member.name} 
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-red-600/20 transition-opacity duration-300 group-hover:opacity-0"></div>
                  </div>
                </figure>
                <div className="daisy-card-body items-center text-center">
                  <h3 className="daisy-card-title text-red-600">{member.name}</h3>
                  <p className="text-neutral-600">{member.role}</p>
                  <div className="flex gap-4 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="daisy-btn daisy-btn-circle daisy-btn-sm bg-red-600 text-white border-none">
                      <i className="fab fa-twitter"></i>
                    </button>
                    <button className="daisy-btn daisy-btn-circle daisy-btn-sm bg-red-600 text-white border-none">
                      <i className="fab fa-linkedin"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gradient-to-r from-red-600 to-maroon-800 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Core Principles</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: '✨', title: 'Integrity', text: 'Uncompromised truth in every story' },
              { icon: '⚖️', title: 'Balance', text: 'Multiple perspectives presented' },
              { icon: '🔍', title: 'Accuracy', text: 'Triple-source verification' },
              { icon: '💡', title: 'Innovation', text: 'Tech-driven journalism' },
            ].map((value) => (
              <div key={value.title} className="text-center p-6 hover:bg-white/10 rounded-xl transition-all duration-300">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-neutral-200">{value.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;