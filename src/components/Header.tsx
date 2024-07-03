import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const sanitizedSearchTerm = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");
    if (sanitizedSearchTerm.trim()) {
      navigate(`/?q=${encodeURIComponent(sanitizedSearchTerm)}`);
    } else {
      navigate(`/`);
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
    navigate(`/`);
  };

  return (
    <header className="bg-gray-800 p-4 text-white flex flex-col md:flex-row justify-between items-center">
      <h1 className="text-xl mb-2 md:mb-0">FOODIEDELIGHT</h1>
      <nav className="flex flex-col md:flex-row items-center w-full md:w-auto">
        <form
          onSubmit={handleSearch}
          className="flex items-center w-full md:w-auto mb-2 md:mb-0"
        >
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search restaurants..."
            className="px-2 py-1 rounded-md mr-2 text-black w-full md:w-auto"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={clearSearch}
              className="text-light-600 font-bold px-2 py-1 rounded-md"
            >
              ✕
            </button>
          )}
          <button
            type="submit"
            className="px-2 py-1 bg-blue-500 text-white rounded-md ml-2"
          >
            Search
          </button>
        </form>
        <div className="flex flex-col md:flex-row items-center w-full md:w-auto">
          <Link
            to="/"
            className="px-2 py-1 md:ml-4 bg-gray-900 rounded-md text-center w-full md:w-auto mb-2 md:mb-0"
          >
            Home
          </Link>
          <Link
            to="/add"
            className="px-2 py-1 md:ml-4 bg-gray-900 rounded-md text-center w-full md:w-auto mb-2 md:mb-0"
          >
            Add Restaurant
          </Link>
          <Link
            to="/about"
            className="px-2 py-1 md:ml-4 bg-gray-900 rounded-md text-center w-full md:w-auto"
          >
            About
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
