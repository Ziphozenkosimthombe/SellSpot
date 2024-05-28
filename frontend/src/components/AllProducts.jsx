import { Link } from 'react-router-dom';
import useFetchAllProducts from '../hooks/useFetchAllProducts';

const AllProductList = () => {
  const { products } = useFetchAllProducts();

  return (
    <div className="mt-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link to={`/products/${product._id}`} key={product._id}>
            <div className="col-span-1 p-4  rounded-2xl shadow-2xl cursor-pointer all-product">
              <div className="aspect-w-1 aspect-h-1">
                {product.images.length > 0 && (
                  <img
                    src={product.images[0]}
                    alt={`${product.title} 1`}
                    className="object-cover image rounded-l-xl pl-2.5"
                  />
                )}
              </div>
              <h2 className="text-xl font-bold pl-2.5 pt-3">{product.title}</h2>
              <p className="text-2xl font-bold text-green-600 mb-1 pl-2.5">
                R{product.price.toLocaleString()}
              </p>
              <span className="pl-2.5 ">({product.stock_quantity})</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllProductList;
