import { useContext } from "react";
import { ProductContext } from "../../context/ProductContext";

const SingleProduct = () => {
  const { createdProduct } = useContext(ProductContext)
  return (
    <div className="container mx-auto p-4">
      {/* Product Name */}
      <h1 className="text-2xl md:text-4xl font-bold mb-6 text-center lg:text-left">
        {createdProduct.name}
      </h1>

      {/* Main Layout */}
      <div className="flex flex-col gap-8">
        {/* Left Section: Product Images */}
        <div className="">
          {/* Main Product Image */}
          <div className="h-80 md:h-96 lg:h-[500px] mb-4">
            <img
              src="https://img.freepik.com/free-photo/elegant-smartphone-composition_23-2149437106.jpg?t=st=1734031864~exp=1734035464~hmac=229827dd5a669e263ea3ee6cf0d2d10660dc144a127e4117ec13d030afd2ab8a&w=360"
              alt="Product"
              className="w-full h-full object-fill rounded-lg shadow-lg"
            />
          </div>

          {/* Five Smaller Images */}
          <div className="flex gap-2">
            <img
              src="https://img.freepik.com/free-photo/elegant-smartphone-composition_23-2149437106.jpg?t=st=1734031864~exp=1734035464~hmac=229827dd5a669e263ea3ee6cf0d2d10660dc144a127e4117ec13d030afd2ab8a&w=360"
              alt="Product"
              className="w-full h-20 sm:h-24 rounded-lg shadow-md"
            />
            <img
              src="https://img.freepik.com/free-photo/elegant-smartphone-composition_23-2149437106.jpg?t=st=1734031864~exp=1734035464~hmac=229827dd5a669e263ea3ee6cf0d2d10660dc144a127e4117ec13d030afd2ab8a&w=360"
              alt="Product"
              className="w-full h-20 sm:h-24 rounded-lg shadow-md"
            />
            <img
              src="https://img.freepik.com/free-photo/elegant-smartphone-composition_23-2149437106.jpg?t=st=1734031864~exp=1734035464~hmac=229827dd5a669e263ea3ee6cf0d2d10660dc144a127e4117ec13d030afd2ab8a&w=360"
              alt="Product"
              className="w-full h-20 sm:h-24 object-cover rounded-lg shadow-md"
            />
            <img
              src="https://img.freepik.com/free-photo/elegant-smartphone-composition_23-2149437106.jpg?t=st=1734031864~exp=1734035464~hmac=229827dd5a669e263ea3ee6cf0d2d10660dc144a127e4117ec13d030afd2ab8a&w=360"
              alt="Product"
              className="w-full h-20 sm:h-24 object-cover rounded-lg shadow-md"
            />
            <img
              src="https://img.freepik.com/free-photo/elegant-smartphone-composition_23-2149437106.jpg?t=st=1734031864~exp=1734035464~hmac=229827dd5a669e263ea3ee6cf0d2d10660dc144a127e4117ec13d030afd2ab8a&w=360"
              alt="Product"
              className="w-full h-20 sm:h-24 object-cover rounded-lg shadow-md"
            />
          </div>
        </div>

        {/* Right Section: Product Details */}
        <div className="flex flex-col">
          {/* Product Information */}
          <p className="text-sm md:text-lg mb-4">
            <strong>Category:</strong> {createdProduct.category}
          </p>
          <p className="text-sm md:text-lg mb-4">
            <strong>Company:</strong> {createdProduct.company}
          </p>


          <div class="p-4 bg-gray-100 rounded-md shadow-md">
            <strong>Description:</strong>
            <p class="max-w-lg text-gray-800">
              {createdProduct.description}
            </p>
          </div>


          <div className="w-96 bg-gray-100 p-4 rounded-md shadow-md">

            <p className="max-w-8"> </p>

          </div>

          {/* Reviews Section */}
          <div className="mt-4">
            <h2 className="text-lg md:text-2xl font-semibold mb-2">
              No Reviews
            </h2>
            <p>⭐ 4.5/5 (120 reviews)</p>
          </div>

          {/* Add to Cart Section */}
          <div className="mt-6 flex items-center gap-4">
            
           
          </div>

          {/* Like Button */}
          <div className="mt-4 flex items-center gap-2">
            <span className="text-sm md:text-lg">0 likes</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
