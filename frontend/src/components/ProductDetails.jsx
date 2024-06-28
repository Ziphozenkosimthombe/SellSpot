import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import useAddCarts from '../hooks/useAddCarts';
import useAddWishList from '../hooks/useAddWishList';

import Loading from './Loading';

const ProductDetails = () => {
  const {productId} = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const {addItemToCart, cartIsLoading} = useAddCarts();
  const {addItemToWishList, wishIsLoading} = useAddWishList();

  useEffect(() => {
    let isMounted = true;
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`/api/seller/products/${productId}`);
        if (response.ok) {
          const productData = await response.json();
          if (isMounted) {
            setProduct(productData);
            setSelectedImage(productData.images[0]);
          }
        } else {
          console.error('Failed to fetch product details');
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
    return () => {
      isMounted = false;
    };
  }, [productId]);

  if (!product) {
    return <Loading />;
  }

  const handleAddToCart = () => {
    addItemToCart(product._id, 1);
  };

  const handleAddToWishList = () => {
    addItemToWishList(product._id);
  };

  return (
    <div className="cart-container flex flex-row ml-10 mr-10 gap-6">
      <div className="product-listing mt-16">
        <div className="grid grid-row gap-4">
          <div className="flex">
            <div className="p-4 rounded-2xl shadow-2xl flex   image-details-container__detailts">
              <div className="flex gap-4">
                <div className="flex flex-col gap-4 mt-2">
                  {product.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      className={`w-16 h-16 object-cover rounded-lg shadow-lg cursor-pointer ${selectedImage === image ? 'ring-2 ring-green-500' : ''}`}
                      onClick={() => setSelectedImage(image)}
                    />
                  ))}
                </div>
                <div>

                  {selectedImage && (
                    <img
                      src={selectedImage}
                      alt={`${product.title} 1`}
                      className="object-cover h-64  rounded-lg"
                    />
                  )}
                </div>
              </div>
              <div className='ml-10'>
                <h2 className="text-2xl font-bold">{product.title}</h2>
                <hr className="my-2 mt-4" />
                <span className="text-lg text-gray-500 font-bold">{product.status}</span>
                <div className='flex'>

                  <p >Sold by: <span className='text-blue-700'>{product.seller.companyName || `${product.seller.firstName} ${product.seller.lastName}`}</span> </p>
                  <li className='ml-2'><span className='text-blue-700'>Fulfilled by SellSpot</span></li>
                </div>
                <hr className="my-2 mt-4"></hr>
                <li>Eligible for next-day delivery or collection.</li>
                <li>Free Delivery Available.</li>
                <li>Hassle-Free Exchanges & Returns for 30 Days.</li>
                <li>6-Month Limited Warranty.</li>
              </div>
            </div>
          </div>
        </div>
        <div className='p-4 rounded-2xl shadow-2xl image-details-container__detailts mt-10'>
          <h1 className='text-2xl font-bold'>Descriptions</h1>
          <ul className="list-none list-inside mt-4">
            {product.description.map((desc, index) => (
              <li key={index}>{desc}</li>
            ))}
          </ul>
        </div>

        <div className='p-4 rounded-2xl shadow-2xl image-details-container__detailts mt-10'>
          <h1 className='text-2xl font-bold'>Seller Details</h1>
          <div className='mt-4'>
            <p><span className='font-bold'>Name:</span><a href='#' className='text-blue-900'> {product.seller.firstName} {product.seller.lastName}</a> </p>
            <p> <span className='font-bold'>Email:</span><a href={`mailto:${product.seller.email}`} className='text-blue-900'> {product.seller.email} </a></p>
            <p><span className='font-bold'>Phone Number:</span><a href={`tel:${product.seller.phoneNumber}`} className='text-blue-900'> {product.seller.phoneNumber}</a></p>
            <p><span className='font-bold'>Company Name:</span><a href='#' className='text-blue-900'> {product.seller.companyName} </a></p>


          </div>
        </div>
      </div>
      <div className="cart-summary flex flex-col p-4 shadow-2xl h-full rounded-2xl mt-16">
        <h1 className="text-2xl font-bold text-green-600">{product ? `R ${product.price.toLocaleString()}` : 'R 0'}</h1>

        <span className='font-bold'>Free Shipping</span>
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg mt-4"
          onClick={handleAddToCart}
          disabled={cartIsLoading}
        >
          {cartIsLoading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            'Add To Cart'
          )}

        </button>
        <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg mt-4"
          onClick={handleAddToWishList}
          disabled={wishIsLoading}
        >
          {wishIsLoading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            'Add To WishList'
          )}
        </button>
      </div>
    </div >
  );
};

export default ProductDetails;
