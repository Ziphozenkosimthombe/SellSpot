import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { useState } from 'react';
const ApplyToSell = () => {
  const [value, setValue] = useState();
  const [findUs, setFindUs] = useState('');
  const [category, setCategory] = useState('');
  const [located, setLocated] = useState('');
  const handleChange = (event) => {
    setFindUs(event.target.findUs);
    setCategory(event.target.category);
    setLocated(event.target.located);
  };
  console.log(value);
  return (
    <>
      <h1 className="text-4xl font-extrabold text-center">
        Apply to sell on SellSpot Marketplace
      </h1>
      <h5 className="text-center">
        Becoming a SellSpot Marketplace seller is easy and fast.
      </h5>
      <h5 className="text-center">
        Simply complete the form below and you will be able to sell you products
        on the application
      </h5>
      <div className="flex justify-center mt-16 ">
        <div className="changing p-6 rounded-lg shadow-2xl  bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 ">
          <h1 className="text-xl font-extrabold text-center">
            How can we get in touch?
          </h1>
          <form className="   mt-10">
            <div className="w-full">
              <input
                type="text"
                placeholder="firstName"
                name="firstName"
                required
                autoComplete="off"
                className="w-full input input-bordered  h-10 text-black font-extrabold bg-white"
              />
            </div>

            <div className="mt-16 w-full">
              <input
                type="text"
                placeholder="lastName"
                name="lastName"
                required
                autoComplete="off"
                className="w-full input input-bordered  h-10 text-black font-extrabold bg-white"
              />
            </div>

            <div className="mt-16 w-full">
              <input
                id="email"
                type="email"
                placeholder="example@gmail.com"
                name="email"
                required
                autoComplete="off"
                className="w-full input input-bordered  h-10 text-black font-extrabold bg-white"
              />
            </div>
            <div className="w-full mt-16">
              <PhoneInput
                placeholder="Enter phone number"
                value={value}
                onChange={setValue}
                className="w-full input input-bordered  h-10 text-black font-extrabold bg-white"
              />
            </div>

            <div className="w-full mt-16">
              <select
                id="foundUs"
                value={findUs}
                onChange={handleChange}
                className="block w-full mt-1 p-2 bg-white text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="" disabled>
                  Where did you here about SellSpot Marketplace?
                </option>
                <option value="google">Google</option>
                <option value="social_media">Social Media</option>
                <option value="friend">Friend</option>
                <option value="advertisement">Advertisement</option>
              </select>
            </div>
            <div className="w-full  mt-10 -mx-6 -ml-2">
              <hr className="border-t border-gray-300 " />
            </div>

            <h1 className="text-xl font-extrabold text-center mt-12">
              Tell us about your business
            </h1>

            <div className="mt-16 w-full">
              <input
                type="text"
                placeholder="company Name"
                name="companyName"
                required
                autoComplete="off"
                className="w-full input input-bordered  h-10 text-black font-extrabold bg-white"
              />
            </div>

            <div className="w-full  mt-16">
              <select
                id="foundUs"
                value={category}
                onChange={handleChange}
                className="block w-full mt-1 p-2 bg-white text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="" disabled>
                  Category
                </option>
                <option value="google">Sport</option>
                <option value="social_media">Books</option>
                <option value="friend">Food</option>
                <option value="advertisement">Electronics</option>
                <option value="advertisement">Computor & laptops</option>
                <option value="advertisement">Fashion</option>
                <option value="advertisement">Home & Kitchen</option>
                <option value="advertisement">Computor components</option>
                <option value="advertisement">Health</option>
                <option value="advertisement">Gaming</option>
                <option value="advertisement">Liquor</option>
              </select>
            </div>

            <div className="mt-16 w-full">
              <input
                type="text"
                placeholder="Website (optional)"
                name="website"
                required
                autoComplete="off"
                className="w-full input input-bordered  h-10 text-black font-extrabold bg-white"
              />
            </div>
            <span className="text-xs text-gray-400 example">
              (https://example.com)
            </span>

            <div className="mt-16 w-full">
              <textarea className="textarea textarea-bordered h-24 w-full text-black bg-white"></textarea>
            </div>
            <span className="text-xs text-gray-400 example">
              Add links to any of your accounts (1 per line)
            </span>

            <div className="w-full  mt-16">
              <select
                id="foundUs"
                value={located}
                onChange={handleChange}
                className="block w-full mt-1 p-2 bg-white text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="" disabled>
                  Are you base in South Africa?
                </option>
                <option value="google">Yes</option>
                <option value="social_media">No</option>
              </select>
            </div>

            <div className="mt-16">
              <button className="btn w-60 btn-sm mt-2 border border-slate-700 font-extrabold">
                Appl to Sell
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ApplyToSell;
