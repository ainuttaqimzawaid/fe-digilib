import { useState } from "react";
import { useNavigate } from "react-router-dom";


const SearchInput = ({ isScrolled, inputRef }) => {
    const Navigate = useNavigate();
    const [query, setQuery] = useState("");

    // ====== Submit Search ======
    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim() !== "") {
            Navigate(`/search?q=${encodeURIComponent(query)}`);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* {console.log(isScrolled)} */}
            <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search books..."
                className={`px-3 py-2 rounded-full border transition-colors ${isScrolled
                    ? "text-gray-200 placeholder-gray-500 bg-transparent border-gray-500"
                    : "text-white placeholder-white/70 bg-white/20 border-white/30"
                    }`}
            />
        </form>
    );
};

export default SearchInput;
