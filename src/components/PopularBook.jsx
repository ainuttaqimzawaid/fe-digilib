const PopularBooks = () => {
  return (
    <section className="container mx-auto py-12 px-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Popular This Week</h3>
      <div className="p-6 bg-white shadow-lg rounded-lg w-60">
        <img src="book.jpg" alt="Book Cover" className="w-full h-40 object-cover rounded-md" />
        <h4 className="mt-4 font-semibold">The Digital Age</h4>
        <p className="text-gray-600 text-sm">by Sarah Johnson</p>
        <p className="text-yellow-500 mt-1">⭐⭐⭐⭐ 4.8</p>
        <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md w-full">Borrow Now</button>
      </div>
    </section>
  );
};

export default PopularBooks;
