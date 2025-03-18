import { FaRegUser } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md w-screen">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <h1 className="text-lg font-bold text-blue-600">DigiLib</h1>
        <ul className="flex space-x-6 text-gray-600">
          <li><a href="#">Home</a></li>
          <li><a href="#">Categories</a></li>
          <li><a href="#">New Arrivals</a></li>
          <li><a href="#">My Books</a></li>
        </ul>
        <input
          type="text"
          placeholder="Search books..."
          className="border px-3 py-2 rounded-md focus:outline-none"
        />
        <div><FaRegUser /></div>
      </div>
    </nav>
  );
};

export default Navbar;
