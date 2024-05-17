import { Link } from 'react-router-dom';
import { useState } from 'react';
import useLogin from '../../hooks/useLogin';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { login, isLoading } = useLogin();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className=" p-6 rounded-lg shadow-2xl bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Sign In <span className="text-blue-500"> OnlineShopping</span>
        </h1>

        <form
          onSubmit={handleSubmit}
          className=" flex flex-col items-center pt-10"
        >
          <div>
            <label htmlFor="email" className="label p-2 ">
              <span className="text-base label-text">Email</span>
            </label>
            <input
              name="email"
              value={formData.email}
              id="email"
              type="email"
              required
              autoComplete="off"
              placeholder="example@gmail.com"
              onChange={handleChange}
              className="input input-bordered h-10"
            />
          </div>

          <div>
            <label htmlFor="password" className="label">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              name="password"
              value={formData.password}
              id="password"
              type="password"
              required
              placeholder="Enter Password"
              onChange={handleChange}
              className="input input-bordered h-10"
            />
          </div>

          <Link
            to={'/signup'}
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
            href="#"
          >
            Already have an account?
          </Link>
          <div>
            <button className="btn w-60 btn-sm mt-2 border border-slate-700">
              {isLoading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                'Login'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
