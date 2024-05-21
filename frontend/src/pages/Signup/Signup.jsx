import { Link } from 'react-router-dom';
import { useState } from 'react';
import useSignup from '../../hooks/useSignup';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const { signup, isLoading } = useSignup();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(formData);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className=" p-6 rounded-lg shadow-2xl bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 ">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Sign Up <span className="text-blue-500"> OnlineShopping</span>
        </h1>

        <form
          onSubmit={handleSubmit}
          className=" flex flex-col items-center pt-10 "
        >
          <div>
            <label htmlFor="fullName" className="label p-2 ">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              id="username"
              type="text"
              placeholder="John Doe"
              name="username"
              required
              autoComplete="off"
              value={formData.username}
              className="input input-bordered  h-10 text-black font-extrabold bg-white"
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="email" className="label p-2 ">
              <span className="text-base label-text">Email</span>
            </label>
            <input
              id="email"
              type="email"
              placeholder="example@gmail.com"
              name="email"
              required
              autoComplete="off"
              value={formData.email}
              className="input input-bordered h-10 text-black font-extrabold bg-white"
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="password" className="label">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter Password"
              name="password"
              value={formData.password}
              className="input input-bordered h-10 bg-white text-black font-extrabold"
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="label">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              className=" input input-bordered h-10 bg-white text-black font-extrabold"
              onChange={handleChange}
            />
          </div>
          <Link
            to={'/login'}
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
            href="#"
          >
            Already have an account?
          </Link>
          <div>
            <button className="btn w-60 btn-sm mt-2 border border-slate-700 font-extrabold">
              {isLoading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                'Sign Up'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
