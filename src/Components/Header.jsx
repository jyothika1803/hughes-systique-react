import React from 'react';

const Header = ({ title }) => {
  return (
    <div className="flex justify-center mb-4">
      <h2 className="text-3xl font-semibold text-center">{title}</h2>
    </div>
  );
};

export default Header;