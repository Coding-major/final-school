import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import { useContext, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import AboutProduct from '../components/product/AboutProduct';
import { ProductContext } from '../context/ProductContext';

const Cart = () => {
  const { getProductDetail, isModalOpen, setIsModalOpen } = useContext(ProductContext);
  const {
    getCartItems,
    itemsIsLoading,
    itemsError,
    items,
    deleteCartItem,
    deleteIsLoading,
    deleteError,
    deleteSuccess
  } = useContext(CartContext)
  console.log(items);
  

  useEffect(() => {
    getCartItems();
  }, [getCartItems]);

  return (
    <>
      <Breadcrumb pageName="Cart items" />

      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          {/* <h1 className="">{category.category}</h1> */}

          <div className="grid grid-cols-2 gap-x-1 gap-y-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 xl:gap-x-1">
  {itemsIsLoading ? (
    "loading"
  ) : itemsError ? (
    "error"
  ) : (
    items.products.map((product, index) => (
      <div
        key={index}
        onClick={() => getProductDetail(product.productId)}
        className="group cursor-pointer p-4 border rounded-md shadow-sm transition-transform duration-200 hover:scale-105 hover:shadow-md hover:bg-slate-100 relative"
      >
        {/* Product Name */}
        <h3 className="mt-2 text-sm text-gray-700">{product.name}</h3>

        {/* Product Price */}
        <p className="mt-1 text-sm font-medium text-gray-900">${product.price}</p>

        {/* Product Quantity */}
        <p className="mt-1 text-sm text-gray-600">Quantity: {product.quantity}</p>

        {/* Delete Button */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering onClick for product detail
            deleteCartItem(product._id); // Handle delete logic
          }}
          className="absolute top-2 right-2 p-2 text-white bg-red-600 rounded-full hover:bg-red-700 transition-colors shadow-lg"
        >
          🗑️
        </button>
      </div>
    ))
  )}
</div>

          {isModalOpen && <AboutProduct onClose={() => setIsModalOpen(false)} />}

        </div>
      </div>
    </>
  );
};

export default Cart;
