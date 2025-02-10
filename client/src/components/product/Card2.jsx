// import { useContext, useState } from "react";
// import { ProductContext } from "../../context/ProductContext";
// import AboutProduct from "./AboutProduct";
// import { CartContext } from "../../context/CartContext";

// const Card2 = ({ products, error, isLoading, object }) => {
//     const { getProductDetail, isModalOpen, setIsModalOpen } = useContext(ProductContext);

//     return (
//         <div className="bg-white">
//             <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
//                 {/* <h1 className="">{category.category}</h1> */}

//                 <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 xl:gap-x-8">

//                     {products.map((product, index) => (

//                         <div key={product._id} onClick={() => getProductDetail(product._id)} className="group">

//                             <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
//                                 <img
//                                     src={
//                                         product?.mainImage
//                                             ? `http://localhost:4000/${product.mainImage}`
//                                             : "https://img.freepik.com/free-photo/elegant-smartphone-composition_23-2149437106.jpg?t=st=1734031864~exp=1734035464~hmac=229827dd5a669e263ea3ee6cf0d2d10660dc144a127e4117ec13d030afd2ab8a&w=360"
//                                     }
//                                     alt="Product"
//                                 />
//                             </div>
//                             <h3 className="mt-4 text-sm text-gray-700">
//                                 {product.name}
//                             </h3>
//                             <p className="mt-1 text-sm font-medium text-gray-900">
//                                 {product.price}
//                             </p>


//                         </div>
//                     ))}

//                 </div>

//                 {isModalOpen && <AboutProduct onClose={() => setIsModalOpen(false)} />}

//             </div>
//         </div>

//     );
// }

// export default Card2;



















import { useContext } from "react";
import { ProductContext } from "../../context/ProductContext";
import AboutProduct from "./AboutProduct";

const Card2 = ({ products }) => {
    const { getProductDetail, isModalOpen, setIsModalOpen } = useContext(ProductContext);

    return (
        <div className="bg-white py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                    {products.map((product) => (
                        <div 
                            key={product._id} 
                            onClick={() => getProductDetail(product._id)} 
                            className="group cursor-pointer rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300"
                        >
                            <div className="w-full h-48 bg-gray-200 flex justify-center items-center">
                                <img
                                    src={
                                        product?.mainImage
                                            ? `http://localhost:4000/${product.mainImage}`
                                            : "https://img.freepik.com/free-photo/elegant-smartphone-composition_23-2149437106.jpg?t=st=1734031864~exp=1734035464~hmac=229827dd5a669e263ea3ee6cf0d2d10660dc144a127e4117ec13d030afd2ab8a&w=360"
                                    }
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="text-sm font-medium text-gray-900 truncate">{product.name}</h3>
                                <p className="mt-2 text-sm font-semibold text-blue-600">${product.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
                {isModalOpen && <AboutProduct onClose={() => setIsModalOpen(false)} />}
            </div>
        </div>
    );
}

export default Card2;
