import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const TabControls = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === '/login';

  return (
    <div className="relative flex h-12 mb-6 border border-gray-300 rounded-full overflow-hidden">

      <button
        onClick={() => navigate('/login')}
        className={`w-1/2 text-lg font-medium z-10 transition-all ${
          isLogin ? 'text-white' : 'text-black'
        }`}
      >
        Login
      </button>
      <button
        onClick={() => navigate('/signup')}
        className={`w-1/2 text-lg font-medium z-10 transition-all ${
          !isLogin ? 'text-white' : 'text-black'
        }`}
      >
        Sign Up
      </button>


      <div
        className={`absolute top-0 h-full w-1/2 rounded-full bg-gradient-to-r from-blue-700 via-cyan-600 to-cyan-200 transition-all duration-300 ${
          isLogin ? 'left-0' : 'left-1/2'
        }`}
      ></div>
    </div>
  );
};

export default TabControls;