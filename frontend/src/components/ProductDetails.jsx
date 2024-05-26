import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`/api/seller/products/${productId}`);
        if (response.ok) {
          const productData = await response.json();
          setProduct(productData);
        } else {
          console.error('Failed to fetch product details');
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-20 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="aspect-w-1 aspect-h-1">
          {product.images.length > 0 && (
            <img
              src={product.images[0]}
              alt={`${product.title} 1`}
              className="object-cover w-full h-full rounded-lg shadow-lg"
            />
          )}
        </div>
        <div className="p-4 border rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-4">{product.title}</h2>
          <p className="text-2xl font-bold text-green-600 mb-4">
            R{product.price.toLocaleString()}
          </p>
          <p className="text-lg font-medium mb-4">
            Stock Quantity: {product.stock_quantity}
          </p>
          <div>
            <h3 className="text-xl font-semibold mb-2">Description</h3>
            <ul className="list-disc pl-5 space-y-2">
              {product.description.map((desc, index) => (
                <li key={index}>{desc}</li>
              ))}
            </ul>
          </div>
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Seller Information</h3>
            <p className="mb-1">
              <strong>Name:</strong> {product.seller.firstName}{' '}
              {product.seller.lastName}
            </p>
            <p className="mb-1">
              <strong>Company:</strong> {product.seller.companyName}
            </p>
            <p className="mb-1">
              <strong>Email:</strong> {product.seller.email}
            </p>
            <p>
              <strong>Phone Number:</strong> {product.seller.phoneNumber}
            </p>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4">
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4">
              Add to Cart
            </button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
              Add to WishList
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
