import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Bell } from 'lucide-react';
import { CircleFlag } from 'react-circle-flags';
import userAvatar from '../assets/user.jpg';

const Topbar = () => {
  const [language, setLanguage] = useState('US');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState('');

  const handleSearch = () => {
    if (searchTerm.trim() !== '') {
      setSearchResult(`You searched for: ${searchTerm}`);
    } else {
      setSearchResult('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div>
      <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
        {/* Dashboard Title */}
        <div className="flex items-center gap-6 max-w-xl">
          <span className="text-2xl font-bold text-black">Dashboard</span>
        </div>

        {/* Search bar */}
        <div className="hidden md:flex items-center relative ml-30 w-1/2 max-w-md">
          <input
            type="text"
            placeholder="Search here..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full py-2 pl-4 pr-10 text-sm border border-gray-200 rounded-full shadow-inner focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <Search
            className="absolute right-3 text-gray-400 text-sm cursor-pointer"
            onClick={handleSearch}
          />
        </div>

        {/* Right-side icons */}
        <div className="flex items-center gap-1 ">
          <div className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer ">
            <CircleFlag countryCode={language.toLowerCase()} style={{ width: 24, height: 24 }} />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-transparent focus:outline-none cursor-pointer"
            >
              <option value="US">EN</option>
              <option value="FR">FR</option>
              <option value="DE">DE</option>
              <option value="IN">IN</option>
            </select>
          </div>
          <Bell className="text-lg text-yellow-500 cursor-pointer hover:text-yellow-600" />
          <div className="flex items-center gap-2 cursor-pointer">
            <img
              src={userAvatar}
              alt="User"
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="hidden md:block text-gray-700 text-sm font-medium">Admin</span>
          </div>
        </div>
      </header>

      {/* Output of the search */}
      <div className="p-2 text-center text-gray-700 text-sm">{searchResult}</div>
    </div>
  );
};

export default Topbar;