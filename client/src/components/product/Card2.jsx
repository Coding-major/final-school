import { useContext, useState } from "react";
import { ProductContext } from "../../context/ProductContext";
import AboutProduct from "./AboutProduct";
import { CartContext } from "../../context/CartContext";

const Card2 = ({ products, error, isLoading, object }) => {
    const { getProductDetail, isModalOpen, setIsModalOpen } = useContext(ProductContext);

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                {/* <h1 className="">{category.category}</h1> */}

                <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 xl:gap-x-8">

                    {products.map((product, index) => (
                    
                        <div key={product._id} onClick={() => getProductDetail(product._id)} className="group">

                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                                <img
                                    alt={product.imageAlt}
                                    src="https://img.freepik.com/free-photo/elegant-smartphone-composition_23-2149437106.jpg?t=st=1734031864~exp=1734035464~hmac=229827dd5a669e263ea3ee6cf0d2d10660dc144a127e4117ec13d030afd2ab8a&w=360"
                                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                                />
                            </div>
                            <h3 className="mt-4 text-sm text-gray-700">
                                {product.name}
                            </h3>
                            <p className="mt-1 text-sm font-medium text-gray-900">
                                {product.price}
                            </p>


                        </div>
                    ))}

                </div>

                {isModalOpen && <AboutProduct onClose={() => setIsModalOpen(false)} />}

            </div>
        </div>

    );
}

export default Card2;

