import { useEffect } from 'react';
import useCategoryStore from '../store/useCategoryStore';

const categoryColors = [
  'bg-blue-100',
  'bg-green-100',
  'bg-yellow-100',
  'bg-red-100',
  'bg-purple-100',
  'bg-pink-100',
  'bg-indigo-100',
  'bg-teal-100',
  'bg-orange-100',
  'bg-cyan-100',
];

// Function to capitalize the first letter of a string
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const Categories = () => {
  const { categories, loading, error, getAllCategories } = useCategoryStore();

  useEffect(() => {
    getAllCategories();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        {console.log('haloooooooooo')}
        <div className="text-red-500 text-center">
          <h2 className="text-2xl font-bold mb-2">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <section className="container mx-auto py-12 px-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Browse by Category</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((cat, index) => (
          <div key={index} className={`p-4 rounded-lg shadow-md ${categoryColors[index % categoryColors.length]}`}>
            <h4 className="text-lg font-bold">{capitalizeFirstLetter(cat.name)}</h4>
            <p>{cat.Books.length} Buku</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
