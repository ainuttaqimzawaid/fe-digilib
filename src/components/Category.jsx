import { useEffect, useState } from 'react';
import useCategoryStore from '../app/store/useCategoryStore';
import { config } from '../config';

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
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBooks, setSelectedBooks] = useState([]);

  useEffect(() => {
    getAllCategories();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedBooks(category.Books || []);
  };

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
          <button
            key={index}
            className={`p-4 rounded-lg shadow-md text-left ${categoryColors[index % categoryColors.length]} ${selectedCategory?.id === cat.id ? 'ring-2 ring-blue-500' : ''}`}
            onClick={() => handleCategoryClick(cat)}
          >
            <h4 className="text-lg font-bold">{capitalizeFirstLetter(cat.name)}</h4>
            <p>{cat.Books?.length || 0} Buku</p>
          </button>
        ))}
      </div>

      {selectedCategory && (
        <div className="mt-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Books in {capitalizeFirstLetter(selectedCategory.name)}
          </h3>
          {selectedBooks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {selectedBooks.map((book) => (
                <div key={book.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img
                    src={`${config.api_host}/public/images/books/${book.image_url}`}
                    alt={book.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h4 className="text-lg font-semibold mb-2">{book.title}</h4>
                    <p className="text-gray-600">by {book.author}</p>
                    <p className="text-gray-500 text-sm">Year: {book.year}</p>
                    <p className="text-yellow-500 mt-1">⭐⭐⭐⭐ 4.8</p>
                    <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md w-full">Borrow Now</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No books found in this category.</p>
          )}
        </div>
      )}
    </section>
  );
};

export default Categories;
