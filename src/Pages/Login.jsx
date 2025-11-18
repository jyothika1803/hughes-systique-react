import React, { useRef } from 'react';
import Header from '../Components/Header';
import SharedButton from '../Components/SharedButton';
import TabControls from '../Components/TabControls.jsx';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { $crud } from '../factory/crudFactory.js';

const Login = () => {
  const formRef = useRef(null);
  const navigate = useNavigate();


  const handleLogin = async (e) => {
      e.preventDefault();
    try {
      const formData = new FormData(formRef.current);
      const { data: { token, user } } = await $crud.post('admin/login', formData);
      if (token) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/dashboard');
      }
    } catch (e) {
      console.error(e.message)
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-cyan-400">
      <div className="w-[430px] bg-white p-8 rounded-2xl shadow-lg">
        <Header title="Login" />
        <TabControls />

        <form className="space-y-4" onSubmit={handleLogin} ref={formRef}>
          <input
            type="email"
            placeholder="Email Address"
            required
            name='email'
            className="w-full p-3 border-b-2 border-gray-300 outline-none focus:border-cyan-500 placeholder-gray-400"
          />
          <input
            type="password"
            placeholder="Password"
            required
            name='password'
            className="w-full p-3 border-b-2 border-gray-300 outline-none focus:border-cyan-500 placeholder-gray-400"
          />
          <div className="text-right">
            <p className="text-cyan-600 hover:underline">Forget Password</p>
          </div>

          <SharedButton label="Login" />

          <p className="text-center text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-cyan-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;