const Hero = () => {
  return (
    <section className="w-screen relative bg-[url('/src/assets/bg-hero-image.jpg')] md:bg-cover bg-center bg-no-repeat before:content-[''] before:absolute before:inset-0 before:bg-black/40">
      <div className="bg-black/20 backdrop-blur-[2px] pt-28 md:pt-40 pb-20">
        <div className="container mx-auto flex flex-col md:flex-row items-center px-6 max-w-7xl relative z-10">
          <div className="md:w-1/2 space-y-6">
            <h1 className="!text-3xl md:!text-5xl font-bold text-white leading-tight drop-shadow-lg">
              Discover Your Next <span className="text-blue-400">Adventure</span> in Books
            </h1>
            <p className="!text-sm md:!text-lg text-gray-100 leading-relaxed drop-shadow">
              Explore our vast collection of digital books. From timeless classics to contemporary bestsellers,
              your perfect read is just a click away. Start your reading journey today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition duration-300 shadow-lg hover:shadow-xl">
                More Info
              </button>
            </div>

            <div className="flex items-center gap-8 pt-6">
              <div className="flex items-center gap-2">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span className="text-white font-medium drop-shadow">10,000+ Books</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="text-white font-medium drop-shadow">50,000+ Readers</span>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 mt-12 md:mt-0 relative hidden md:block">
            <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 shadow-2xl transform hover:scale-105 transition duration-500 border border-white/10">
              <div className="absolute -top-4 -right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg">
                <span className="text-sm font-medium">Featured</span>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100/90 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold drop-shadow">Daily Reading Challenge</h3>
                    <p className="text-gray-200 text-sm">Join 1000+ readers today</p>
                  </div>
                </div>
                <div className="h-px bg-white/10"></div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100/90 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold drop-shadow">Reading Progress</h3>
                    <p className="text-gray-200 text-sm">Track your achievements</p>
                  </div>
                </div>
                <div className="h-px bg-white/10"></div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-100/90 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold drop-shadow">Community Hub</h3>
                    <p className="text-gray-200 text-sm">Connect with readers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
