import CurrencyInput from 'react-currency-input-field';

const UploadProduct = () => {
  const CustomCurrencyInput = ({ thousandsseparator, ...rest }) => {
    return <CurrencyInput {...rest} />;
  };
  return (
    <div className="flex justify-center mt-16 ">
      <div className="changing p-6 rounded-lg shadow-2xl  bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 ">
        <h1 className="text-3xl">Upload Product</h1>
        <form>
          <div className="w-full">
            <label htmlFor="name">Product Name</label>
            <input
              id="name"
              type="text"
              placeholder="Product Name"
              className="w-full border-2 border-black rounded-lg p-3 bg-white text-black"
            />
          </div>

          <div className="w-full">
            <label htmlFor="price">Price</label>
            <CurrencyInput
              thousandsseparator=","
              prefix="R"
              id="price"
              placeholder="Price"
              className="w-full border-2 border-black rounded-lg p-3 bg-white text-black"
            />
          </div>

          <div className="w-full">
            <label htmlFor="Description">Image</label>
            <textarea
              id="Description"
              className="w-full border-2 border-black rounded-lg p-3 bg-white text-black"
            ></textarea>
          </div>
          <div className="w-full">
            <label htmlFor="Image">Image</label>
            <input
              id="Image"
              type="file"
              accept="image/*"
              multiple
              className="w-full border-2 border-black rounded-lg p-3 bg-white"
            />
          </div>
          <div className="w-full">
            <button className="bg-black text-white p-3 rounded-lg">
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadProduct;
