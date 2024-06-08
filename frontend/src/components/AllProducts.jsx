import {Link} from 'react-router-dom';
import useFetchAllProducts from '../hooks/useFetchAllProducts';
import Loading from './Loading';
import {useState} from 'react';
const AllProductList = () => {
  const {products, isLoading} = useFetchAllProducts();
  const [searchTerm, setSearchTerm] = useState('');
  if (isLoading) return <Loading />;
  if (!Array.isArray(products)) {
    return <div>No products available</div>;
  }
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div>
      <div className="w-full flex justify-center mt-16">
        <div className="changing p-6 rounded-lg shadow-2xl  bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full input input-bordered  h-10 text-black font-extrabold bg-white"
          />
        </div>
      </div>
      <div className="mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mr-10 ml-10">
          {filteredProducts.map((product) => (
            <Link to={`/products/${product._id}`} key={product._id}>
              <div className="col-span-1 p-4  rounded-2xl shadow-2xl cursor-pointer all-product">
                <div className="aspect-w-1 aspect-h-1 image-wrapper">
                  {product.images.length > 0 && (
                    <img
                      src={product.images[0]}
                      alt={`${product.title} 1`}
                      className="object-cover image rounded-2xl"
                    />
                  )}
                </div>
                <h2 className="text-xl font-bold pt-3">
                  {product.title}
                </h2>
                <p className="text-2xl font-bold text-green-600 mb-1 ">
                  R{product.price.toLocaleString()}
                </p>
                <span className="">({product.stock_quantity})</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllProductList;
