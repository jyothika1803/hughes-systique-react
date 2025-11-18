import React, { useState } from 'react';
import Login from './Login.jsx';
import SignUp from './SignUp.jsx';

const Auth = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);

  return (
    <div>
      {isLoginMode ? (
        <Login setIsLoginMode={setIsLoginMode} />
      ) : (
        <SignUp setIsLoginMode={setIsLoginMode} />
      )}
    </div>
  );
};

export default Auth;