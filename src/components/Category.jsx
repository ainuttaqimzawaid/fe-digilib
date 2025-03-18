const categories = [
  { name: "Fiction", count: "12,458 books", color: "bg-purple-100" },
  { name: "Science", count: "8,234 books", color: "bg-blue-100" },
  { name: "Business", count: "6,129 books", color: "bg-green-100" },
  { name: "History", count: "4,567 books", color: "bg-yellow-100" },
];

const Categories = () => {
  return (
    <section className="container mx-auto py-12 px-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Browse by Category</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((cat, index) => (
          <div key={index} className={`p-4 rounded-lg shadow-md ${cat.color}`}>
            <h4 className="text-lg font-bold">{cat.name}</h4>
            <p className="text-gray-600">{cat.count}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
