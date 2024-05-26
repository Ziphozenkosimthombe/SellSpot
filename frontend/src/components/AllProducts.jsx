import { Link } from 'react-router-dom';
import useFetchAllProducts from '../hooks/useFetchAllProducts';

const AllProductList = () => {
  const { products } = useFetchAllProducts();

  return (
    <div className="mt-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link to={`/products/${product._id}`} key={product._id}>
            <div className="col-span-1 p-4 border rounded-lg shadow cursor-pointer">
              <div className="aspect-w-1 aspect-h-1">
                {product.images.length > 0 && (
                  <img
                    src={product.images[0]}
                    alt={`${product.title} 1`}
                    className="object-cover"
                  />
                )}
              </div>
              <h2 className="text-xl font-bold">{product.title}</h2>
              <p className="text-lg font-bold">
                R{product.price.toLocaleString()}
              </p>
              <span>({product.stock_quantity})</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllProductList;
