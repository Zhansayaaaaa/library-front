import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faUserLock, faUserCheck } from '@fortawesome/free-solid-svg-icons';
import UserService from '../../Services/UserManagingService/UserService';
import { useNavigate } from 'react-router-dom';

const UserDetail = ({ user, userRole, onUserUpdated, onUserDeleted }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await UserService.deleteUser(user.id);
      onUserDeleted(user.id);
    } catch (error) {
      console.error(`Failed to delete user with ID ${user.id}:`, error);
    }
  };

  const handleUpdateClick = () => {
    navigate(`/update-user/${user.id}`);
  };

  const handleDeactivate = async () => {
    try {
      await UserService.deactivateUser(user.id);
      onUserUpdated(user.id, { accountNonLocked: false });
    } catch (error) {
      console.error(`Failed to deactivate user with ID ${user.id}:`, error);
    }
  };

  const handleActivate = async () => {
    try {
      await UserService.activateUser(user.id);
      onUserUpdated(user.id, { accountNonLocked: true });
    } catch (error) {
      console.error(`Failed to activate user with ID ${user.id}:`, error);
    }
  };

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-100">
      <td className="py-3 px-6 text-left">{user.firstName} {user.lastName}</td>
      <td className="py-3 px-6 text-left">{user.email}</td>
      <td className="py-3 px-6 text-center">{user.accountNonLocked ? 'Enabled' : 'Disabled'}</td>
      <td className="py-3 px-6 text-center">
        <div className="flex item-center justify-center">
            <>
              {user.accountNonLocked ? (
                <button onClick={handleDeactivate} className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded mr-2">
                  <FontAwesomeIcon icon={faUserLock} />
                </button>
              ) : (
                <button onClick={handleActivate} className="text-white bg-green-500 hover:bg-green-600 px-4 py-2 rounded mr-2">
                  <FontAwesomeIcon icon={faUserCheck} />
                </button>
              )}
              <button onClick={handleUpdateClick} className="text-blue-500 hover:text-blue-600 mr-2">
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button onClick={handleDelete} className="text-red-500 hover:text-red-600">
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
            </>
        </div>
      </td>
    </tr>
  );
};

export default UserDetail;
