//import 'react-phone-number-input/style.css';
//import PhoneInput from 'react-phone-number-input';
import userApply from '../../hooks/useApply';
import { useState } from 'react';
import { Link } from 'react-router-dom';
const ApplyToSell = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    findUs: 'facebook',
    companyName: '',
    category: 'Sports',
    website: '',
    socialMedia: '',
    locatedIn: true,
    address: [
      {
        street: '',
        Suburb: '',
        city: '',
        province: 'Eastern Cape',
        postalCode: '',
        country: '',
      },
    ],
  });
  const { selling, isLoading } = userApply();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await selling(formData);
  };

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
          <form className="   mt-10" onSubmit={handleSubmit}>
            <div className="w-full">
              <input
                type="text"
                placeholder="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
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
                value={formData.lastName}
                onChange={handleChange}
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
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="off"
                className="w-full input input-bordered  h-10 text-black font-extrabold bg-white"
              />
            </div>
            <div className="w-full mt-16">
              <input
                type="text"
                placeholder="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                autoComplete="off"
                className="w-full input input-bordered  h-10 text-black font-extrabold bg-white"
              />
            </div>

            <div className="w-full mt-16">
              <select
                id="findUs"
                name="foundUs"
                value={formData.findUs}
                onChange={handleChange}
                className="block w-full mt-1 p-2 bg-white text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="" disabled>
                  Where did you here about SellSpot Marketplace?
                </option>
                <option value="facebook">Facebook</option>
                <option value="linkedIn">LinkedIn</option>
                <option value="tiktok">TikTok</option>
                <option value="twitter">Twitter</option>
                <option value="instagram">Instagram</option>
                <option value="friend">Friend</option>
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
                value={formData.companyName}
                onChange={handleChange}
                required
                autoComplete="off"
                className="w-full input input-bordered  h-10 text-black font-extrabold bg-white"
              />
            </div>

            <div className="w-full  mt-16">
              <select
                id="foundUs"
                value={formData.category}
                onChange={handleChange}
                className="block w-full mt-1 p-2 bg-white text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="" disabled>
                  Category
                </option>
                <option value="sport">Sport</option>
                <option value="book">Books</option>
                <option value="food">Food</option>
                <option value="electronic">Electronics</option>
                <option value="computor">Computor & laptops</option>
                <option value="fashion">Fashion</option>
                <option value="kitchen">Home & Kitchen</option>
                <option value="computorComponent">Computor components</option>
                <option value="health">Health</option>
                <option value="gaming">Gaming</option>
                <option value="liquor">Liquor</option>
              </select>
            </div>

            <div className="mt-16 w-full">
              <input
                type="text"
                placeholder="Website (optional)"
                name="website"
                value={formData.website}
                onChange={handleChange}
                autoComplete="off"
                className="w-full input input-bordered  h-10 text-black font-extrabold bg-white"
              />
            </div>
            <span className="text-xs text-gray-400 example">
              (https://example.com)
            </span>

            <div className="mt-16 w-full">
              <textarea
                className="textarea textarea-bordered h-24 w-full text-black bg-white"
                name="socialMedia"
                value={formData.socialMedia}
                onChange={handleChange}
              ></textarea>
            </div>
            <span className="text-xs text-gray-400 example">
              Add links to any of your accounts (1 per line)
            </span>

            <div className="w-full  mt-16">
              <select
                id="foundUs"
                value={formData.locatedIn}
                onChange={handleChange}
                className="block w-full mt-1 p-2 bg-white text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="" disabled>
                  Are you base in South Africa?
                </option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div className="w-full  mt-10 -mx-6 -ml-2">
              <hr className="border-t border-gray-300 " />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-center mt-12">
                Address
              </h1>

              <div className="mt-16 w-full">
                <input
                  type="text"
                  placeholder="Street"
                  name="streetAddress"
                  value={formData.address.streetAddress}
                  onChange={handleChange}
                  required
                  autoComplete="off"
                  className="w-full input input-bordered  h-10 text-black font-extrabold bg-white"
                />
              </div>

              <div className="mt-16 w-full">
                <input
                  type="text"
                  placeholder="Suburb"
                  name="Suburb"
                  value={formData.address.Suburb}
                  onChange={handleChange}
                  required
                  autoComplete="off"
                  className="w-full input input-bordered  h-10 text-black font-extrabold bg-white"
                />
              </div>

              <div className="mt-16 w-full">
                <input
                  type="text"
                  placeholder="City"
                  name="city"
                  value={formData.address.city}
                  onChange={handleChange}
                  required
                  autoComplete="off"
                  className="w-full input input-bordered  h-10 text-black font-extrabold bg-white"
                />
              </div>

              <div className="w-full  mt-16">
                <select
                  id="province"
                  value={formData.address.province}
                  onChange={handleChange}
                  className="block w-full mt-1 p-2 bg-white text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="" disabled>
                    Province
                  </option>
                  <option value="easternCape">Eastern Cape</option>
                  <option value="westernCape">Western Cape</option>
                  <option value="northenCape">Northern Cape</option>
                  <option value="freeState">Free State</option>
                  <option value="gauteng">Gauteng</option>
                  <option value="kwazuluNatal">KwaZulu-Natal</option>
                  <option value="limpopo">Limpopo</option>
                  <option value="mpumalanga">Mpumalanga</option>
                  <option value="northWest">North West</option>
                </select>
              </div>

              <div className="mt-16 w-full">
                <input
                  type="text"
                  placeholder="Postal Code"
                  name="postalCode"
                  value={formData.address.postalCode}
                  onChange={handleChange}
                  required
                  autoComplete="off"
                  className="w-full input input-bordered  h-10 text-black font-extrabold bg-white"
                />
              </div>

              <div className="mt-16 w-full">
                <input
                  type="text"
                  placeholder="Country"
                  name="country"
                  value={formData.address.country}
                  onChange={handleChange}
                  required
                  autoComplete="off"
                  className="w-full input input-bordered  h-10 text-black font-extrabold bg-white"
                />
              </div>
            </div>

            <div className="mt-16 flex justify-between ">
              <button className="w-60 btn  btn-sm mt-2 border border-slate-700 font-extrabold">
                {isLoading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  'Apply to sell'
                )}
              </button>
              <Link
                to="/"
                className="w-60 btn btn-sm mt-2 border border-slate-700 font-extrabold"
              >
                <button>Cancel</button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ApplyToSell;
