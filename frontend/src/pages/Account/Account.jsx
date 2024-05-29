import { useState, useEffect } from 'react';
import useUpdateAccount from '../../hooks/useUpdateAccount';
import Loading from '../../components/Loading';

const Account = () => {
  const [user, setUser] = useState({
    username: '',
    phoneNumber: '',
    currentPassword: '',
    newPassword: '',
  });

  const { updateAccount, isLoading } = useUpdateAccount();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/accounts/account');
        const data = await response.json();
        setUser((prevState) => ({
          ...prevState,
          username: data.username,
          phoneNumber: data.phoneNumber,
        }));
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateAccount(user);
  };

  if (isLoading) return <Loading />;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Update Account</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col items-center">
          <div className="changing p-6 rounded-lg shadow-2xl  bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
            <div className="p-6">
              <label className="block font-extrabold  text-gray-700">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={user.username}
                onChange={handleChange}
                className="input input-bordered h-10 w-full font-extrabold  bg-white text-black"
              />
            </div>
            <div className="p-6">
              <label className="block font-extrabold  text-gray-700">
                Phone Number
              </label>
              <input
                type="text"
                name="phoneNumber"
                value={user.phoneNumber}
                onChange={handleChange}
                className="input input-bordered h-10 w-full font-extrabold  bg-white text-black"
              />
            </div>
            <div className="p-6">
              <label className="block font-extrabold text-gray-700">
                Current Password
              </label>
              <input
                type="password"
                name="currentPassword"
                value={user.currentPassword}
                onChange={handleChange}
                className="input input-bordered h-10 w-full font-extrabold  bg-white text-black"
              />
            </div>
            <div className="p-6">
              <label className="block font-extrabold  text-gray-700">
                New Password (optional)
              </label>
              <input
                type="password"
                name="newPassword"
                value={user.newPassword}
                onChange={handleChange}
                className="input input-bordered h-10 w-full font-extrabold  bg-white text-black"
              />
            </div>
            <div className="p-6">
              <button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
                disabled={isLoading}
              >
                {isLoading ? 'Updating...' : 'Update Account'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Account;
