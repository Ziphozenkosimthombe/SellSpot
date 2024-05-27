import { useState } from 'react';
import useFetchProducts from '../hooks/useFetchProduct';

const ProductList = ({ trigger }) => {
  const { products, isLoading, error } = useFetchProducts(trigger);
  const [expandedProductId, setExpandedProductId] = useState(null);

  const toggleReadMore = (productId) => {
    setExpandedProductId(expandedProductId === productId ? null : productId);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const productList = Array.isArray(products) ? products : [];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {productList.map((product) => (
          <div key={product._id} className="p-4 border rounded-lg shadow">
            {product.images.length > 0 && (
              <img
                src={product.images[0]}
                alt={`${product.title} 1`}
                className="w-50 h-50 object-cover"
              />
            )}
            <h2 className="text-xl font-bold">{product.title}</h2>
            <ul className="list-none list-inside">
              {product.description.map((desc, index) => (
                <li key={index}>{desc}</li>
              ))}
            </ul>
            <p>Price: R{product.price}</p>
            <p>Category: {product.category}</p>
            <p>Stock Quantity: {product.stock_quantity}</p>

            {expandedProductId === product._id ? (
              <div>
                <p>Seller First Name: {product.seller.firstName}</p>
                <p>Seller Last Name: {product.seller.lastName}</p>
                <p>Seller Company Name: {product.seller.companyName}</p>
                <p>Seller Phone Number: {product.seller.phoneNumber}</p>
                <button
                  onClick={() => toggleReadMore(product._id)}
                  className="mt-2 text-blue-500"
                >
                  Read Less
                </button>
              </div>
            ) : (
              <button
                onClick={() => toggleReadMore(product._id)}
                className="mt-2 text-blue-500"
              >
                Read More
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
