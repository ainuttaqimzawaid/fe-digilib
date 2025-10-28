import { useEffect, useRef, useState } from 'react';
import useCategoryStore from '../../app/store/useCategoryStore';
import CardBook from '../../components/CardProduct';
import { MdOutlineKeyboardDoubleArrowDown } from 'react-icons/md';


const ScrollCategory = ({ categories, handleCategoryClick, selectedCategory }) => {
  const scrollRef = useRef();

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onWheel = (e) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };

    el.addEventListener('wheel', onWheel, { passive: false });

    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  return (
    <div
      ref={scrollRef}
      className="overflow-x-auto flex md:gap-4 py-2 px-2 col-span-3 md:col-span-7"
      style={{ scrollBehavior: 'smooth', whiteSpace: 'nowrap', scrollbarWidth: 'none' }}
    >
      {categories?.length === 0 ? (
        <div className="text-gray-500">No categories available</div>
      ) : (
        categories.map((cat, index) => (
          <button
            key={index}
            className={`px-4 py-2 !rounded-full text-sm border ${selectedCategory?.id === cat.id ? 'bg-blue-200 border-blue-600' : 'border-gray-300'
              } hover:bg-blue-100`}
            onClick={() => handleCategoryClick(cat)}
          >
            <h4 className="text-base font-semibold">{cat.name}</h4>
          </button>
        ))
      )}
    </div>
  );
};

const Categories = () => {
  const { categories, loading, error, getAllCategories } = useCategoryStore();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [selectedAllBooks, setSelectedAllBooks] = useState([]);


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

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const handleAllBooksClick = () => {
    setSelectedBooks(selectedAllBooks);
    setSelectedCategory({ id: 'all', name: 'All Books' });
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedBooks(category.Books || []);
  };


  useEffect(() => {
    if (categories.length > 0) {
      const all = categories.flatMap(cat => cat.Books || []);
      setSelectedAllBooks(all);
    }
  }, [categories]);


  return (
    <section className="container mx-auto py-20 md:py-32 px-5 min-h-screen">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Browse by Category</h3>
      <div className={`grid ${selectedCategory === null ? 'md:grid-cols-4' : ''}  gap-4 items-center`}>
        {
          selectedCategory === null ? loading ? (Array.from({ length: 12 }).map((cat, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg shadow-md text-left h-16 animate-pulse bg-gray-200`}
            >
            </div>
          ))) : (categories.map((cat, index) => (
            <button
              key={index}
              className={`p-4 rounded-lg shadow-md text-left ${categoryColors[index % categoryColors.length]} ${selectedCategory?.id === cat.id ? 'ring-2 ring-blue-500' : ''}`}
              onClick={() => handleCategoryClick(cat)}
            >
              <h4 className="text-lg font-bold">{capitalizeFirstLetter(cat.name)}</h4>
              <p>{cat.Books?.length || 0} Buku</p>
            </button>
          )))
            :
            (<div className="grid grid-cols-4 md:grid-cols-8 gap-4 items-center">
              <button
                className="!p-2 md:!px-4 flex items-center !rounded-full hover:bg-blue-100 !border-[#744c0d] md:h-12 gap-1 w-[85px] md:w-[135px]"
                onClick={handleAllBooksClick}
              >
                <p className="text-sm md:text-lg font-bold">All Books</p>
                <MdOutlineKeyboardDoubleArrowDown className='hidden md:block' />
              </button>
              <ScrollCategory
                categories={categories}
                handleCategoryClick={handleCategoryClick}
                selectedCategory={selectedCategory}
              />
            </div>)
        }
      </div>

      {selectedCategory && (
        <div className="mt-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Books in {capitalizeFirstLetter(selectedCategory.name)}
          </h3>
          {selectedBooks.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {selectedBooks.map((book, i) => (
                <CardBook key={i} item={book} />
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
