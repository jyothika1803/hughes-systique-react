import React from 'react';
import Header from '../Components/Header.jsx';
import SharedButton from '../Components/SharedButton.jsx';
import TabControls from '../Components/TabControls.jsx';
import { Link } from 'react-router-dom';

const SignUp = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-cyan-400">
      <div className="w-[430px] bg-white p-8 rounded-2xl shadow-lg">
        <Header title="Sign Up" />
        <TabControls/>

        <form className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            required
            className="w-full p-3 border-b-2 border-gray-300 outline-none focus:border-cyan-500 placeholder-gray-400"
          />
          <input
            type="email"
            placeholder="Email Address"
            required
            className="w-full p-3 border-b-2 border-gray-300 outline-none focus:border-cyan-500 placeholder-gray-400"
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="w-full p-3 border-b-2 border-gray-300 outline-none focus:border-cyan-500 placeholder-gray-400"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            required
            className="w-full p-3 border-b-2 border-gray-300 outline-none focus:border-cyan-500 placeholder-gray-400"
          />

          <SharedButton label="Sign Up" />

          <p className="text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-cyan-600 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;