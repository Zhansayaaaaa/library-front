import React, { useState, useEffect } from 'react';
import UserService from '../../Services/UserManagingService/UserService'; // Ensure the import path is correct
import UserDetail from './UserDetail'; // Ensure the import path is correct
import { jwtDecode } from 'jwt-decode'; // Correct the import statement

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState(null); // State to store user role

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const fetchedUsers = await UserService.getAllUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error('Failed to fetch users:', error);
        setError('Failed to fetch users. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchUsers();
  
   
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserRole(decodedToken.role);
    }
  }, []); 
  

  const handleUserDeleted = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  const handleUserUpdated = (userId, updatedProperties) => {
    setUsers(users.map(user => user.id === userId ? { ...user, ...updatedProperties } : user));
  };

  if (isLoading) return <div>Loading users...</div>;
  if (error) return <div>Error fetching users: {error}</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">All Users</h1>
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-center">Status</th>
                <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <UserDetail
                key={user.id}
                user={user}
                userRole={userRole} 
                onUserUpdated={handleUserUpdated}
                onUserDeleted={handleUserDeleted}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersPage;
