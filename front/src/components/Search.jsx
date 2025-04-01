import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";


const Search = ({ placeholder, searchTerm, setSearchTerm }) => {
    const [actualSearchTerm, setActualSearchTerm] = useState("");

    const handleSearch = () => {
        const term = searchTerm.trim().toLowerCase();

        if (!term || !actualSearchTerm) {
            return;
        }

        setSearchTerm(term);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="flex items-center w-full max-w-xl bg-white rounded-[2px] shadow-sm overflow-hidden">
            <input
                type="text"
                placeholder={placeholder}
                className="w-full py-2 px-4 text-gray-700 focus:outline-none"
                value={actualSearchTerm}
                onChange={(e) => setActualSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <button
                className="px-4 border-l border-gray-300 text-gray-500 hover:text-gray-700 transition cursor-pointer"
                onClick={handleSearch}
            >
                <AiOutlineSearch size={20} />
            </button>
        </div>
    );
};

export default Search;