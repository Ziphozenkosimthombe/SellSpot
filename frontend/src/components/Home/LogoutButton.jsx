import { IoMdLogOut } from 'react-icons/io';
import useLogout from '../../hooks/useLogout';

const LogoutButton = () => {
  const { logout, isLoading } = useLogout();

  return (
    <div className="mt-2">
      {!isLoading ? (
        <IoMdLogOut className="w-6 h-6  cursor-pointer" onClick={logout} />
      ) : (
        <span className="loading loading-spinner"></span>
      )}
    </div>
  );
};

export default LogoutButton;
