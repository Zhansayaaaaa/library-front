// src/components/ProtectedLayout.js
import React from 'react';
import Navbar from './Navbar';


const ProtectedLayout = ({ children }) => {
  

  return (
    <div>
      <Navbar />
      <div>{children}</div>
    </div>
  );
};

export default ProtectedLayout;
