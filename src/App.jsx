import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import SignIn from './components/auth/Signin'; // Ensure this path is correct
import Books from './pages/BookManaging/Books';
import AddBook from './pages/BookManaging/AddBook';
import UpdateBook from './pages/BookManaging/UpdateBook';
import UsersPage from './pages/UserManaging/UsersPage';
import ProtectedRoute from './components/ProtectedRoute';
import ProtectedLayout from './components/ProtectedLayout';
import './index.css';
import AddUserPage from './pages/UserManaging/AddUserPage';
import UpdateUserPage from './pages/UserManaging/UpdateUserPage';
import Register from './pages/UserManaging/Register';

const App = () => {
  const handleSignIn = (token, refreshToken) => {
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);
    // Optional: Add logic here to redirect the user after sign-in
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<SignIn onSignIn={handleSignIn} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={
          <ProtectedRoute>
            <ProtectedLayout>
              <Books />
            </ProtectedLayout>
          </ProtectedRoute>
        } />
        <Route path="/add-book" element={
  <ProtectedRoute >
    <ProtectedLayout>
      <AddBook />
    </ProtectedLayout>
  </ProtectedRoute>
} />
        <Route path="/update-book/:bookId" element={
          <ProtectedRoute>
            <ProtectedLayout>
              <UpdateBook />
            </ProtectedLayout>
          </ProtectedRoute>
        } />
        <Route path="/users" element={
  <ProtectedRoute>
    <ProtectedLayout>
      <UsersPage />
    </ProtectedLayout>
  </ProtectedRoute>
} />
        <Route path="/add-user" element={
          <ProtectedRoute>
            <ProtectedLayout>
              <AddUserPage />
            </ProtectedLayout>
          </ProtectedRoute>
        } />
        <Route path="/update-user/:userId" element={
          <ProtectedRoute >
            <ProtectedLayout>
              <UpdateUserPage />
            </ProtectedLayout>
          </ProtectedRoute>
        } />
        
      </Routes>
    </BrowserRouter>
  );
};

export default App;
