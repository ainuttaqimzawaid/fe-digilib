const Hero = () => {
  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto flex flex-col md:flex-row items-center px-6">
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold text-gray-800">Your Digital Library, Anytime, Anywhere</h2>
          <p className="text-gray-600 mt-4">
            Access thousands of books at your fingertips. Read, learn, and explore from the comfort of your device.
          </p>
          <div className="mt-6">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-md mr-3">Get Started</button>
            <button className="border px-6 py-2 rounded-md">Browse Books</button>
          </div>
        </div>
        <div className="md:w-1/2 mt-6 md:mt-0">
          <img src="library.jpg" alt="Library" className="rounded-lg shadow-lg w-96 h-96" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
