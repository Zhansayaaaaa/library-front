import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; // Ensure jwt-decode is installed and imported

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    let userRole = '';

    if (token) {
        const decodedToken = jwtDecode(token);
        userRole = decodedToken.role; 
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        navigate('/signin');
    };

    return (
      <nav className="bg-blue-500 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
          <div className="text-lg font-semibold">NARHOZ UNIVERSITY LIBRARY</div>
          <ul className="flex space-x-4">
              <li>
                  <Link to="/" className="hover:text-blue-200 transition duration-150 ease-in-out">Home</Link>
              </li>
              
                  <li>
                      <Link to="/add-book" className="hover:text-blue-200 transition duration-150 ease-in-out">Add Book</Link>
                  </li>
            
                  <li>
                      <Link to="/users" className="hover:text-blue-200 transition duration-150 ease-in-out">Users</Link>
                  </li>
                  <li>
                      <Link to="/add-user" className="hover:text-blue-200 transition duration-150 ease-in-out">Add User</Link>
                  </li>
              <li>
                  <button onClick={handleLogout}>Logout</button>
              </li>
          </ul>
      </div>
  </nav>
);
};

export default Navbar;