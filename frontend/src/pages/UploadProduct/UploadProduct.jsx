import CurrencyInput from 'react-currency-input-field';
import useUploadProduct from '../../hooks/useUploadProduct';

import { useState } from 'react';

const UploadProduct = () => {
  const [formData, setFormData] = useState({
    title: '',
    price: 0,
    description: '',
    category: '',
    images: [],
    stock_quantity: '',
  });

  const { uploadProduct, isLoading } = useUploadProduct();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'images') {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: Array.from(files),
      }));
    } else if (name === 'price') {
      const numberValue = parseFloat(value.replace(/[^\d.-]/g, ''));
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: numberValue || '',
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.images.length === 0) {
      alert('You must upload at least one image.');
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('category', formData.category);
    formDataToSend.append('stock_quantity', formData.stock_quantity);
    formData.description
      .split('\n')
      .forEach((desc) => formDataToSend.append('description', desc));
    formData.images.forEach((file) => {
      formDataToSend.append('files', file); // use 'files' to match your backend multer middleware
    });

    uploadProduct(formDataToSend);
  };

  return (
    <>
      <div className="flex justify-center mt-16">
        <div className="changing p-6 rounded-lg shadow-2xl bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
          <h1 className="text-3xl">Upload Product</h1>
          <form className="mt-8" onSubmit={handleSubmit}>
            <div className="w-full mt-8">
              <label htmlFor="title">Product Name</label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                id="title"
                type="text"
                placeholder="Product Name"
                className="w-full border-2 border-black rounded-lg p-3 bg-white text-black"
              />
            </div>

            <div className="w-full mt-8">
              <label htmlFor="price">Price</label>
              <CurrencyInput
                name="price"
                value={formData.price}
                onChange={handleChange}
                thousandsseparator=","
                decimalseparator="."
                prefix="R"
                id="price"
                placeholder="Price"
                className="w-full border-2 border-black rounded-lg p-3 bg-white text-black"
              />
            </div>

            <div className="w-full mt-8">
              <label htmlFor="Description">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                id="Description"
                placeholder="Enter each description on a new line"
                className="w-full border-2 border-black rounded-lg p-3 bg-white text-black"
              ></textarea>
            </div>

            <div className="w-full mt-8">
              <label htmlFor="stockQuantity">Stock Quantity</label>
              <input
                name="stock_quantity"
                value={formData.stock_quantity}
                onChange={handleChange}
                id="stockQuantity"
                type="number"
                placeholder="Stock Quantity"
                className="w-full border-2 border-black rounded-lg p-3 bg-white text-black"
              />
            </div>
            <div className="w-full mt-8">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="block w-full mt-1 p-2 bg-white text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="" disabled>
                  Select Category
                </option>
                <option value="sport">Sport</option>
                <option value="books">Books</option>
                <option value="food">Food</option>
                <option value="electronic">Electronic</option>
                <option value="computor">Computor & laptops</option>
                <option value="fashion">Fashion</option>
                <option value="mobile">Mobile</option>
                <option value="kitchen">Home & Kitchen</option>
                <option value="computorComponents">Computor Components</option>
                <option value="furniture">Furniture</option>
                <option value="health">Health</option>
                <option value="gaming">Gaming</option>
                <option value="liquor">Liquor</option>
              </select>
            </div>

            <div className="w-full mt-8">
              <label htmlFor="Image">Image</label>
              <input
                name="images"
                onChange={handleChange}
                id="Image"
                type="file"
                multiple
                className="w-full border-2 border-black rounded-lg p-3 bg-white"
              />
            </div>

            <div className="w-full">
              <button className="w-full p-3 rounded-lg bg-black text-white mt-8">
                {isLoading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  'Upload Products'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UploadProduct;
