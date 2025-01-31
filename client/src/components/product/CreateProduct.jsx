import { useContext } from "react";
import { FormContext } from "../../context/FormContext";
import { ProductContext } from "../../context/ProductContext";


const CreateProduct = () => {
    const { productFormData, handleInputChange, haveWrite } = useContext(FormContext);
    const { createProduct, isLoading, error, statusCode } = useContext(ProductContext)
    return (
        <form onSubmit={createProduct}>
            <div className="flex flex-col justify-center max-w-lg mx-auto px-4 space-y-4 font-[sans-serif] text-[#333]">
                <div>
                    <input type="text"
                        name="name"
                        value={productFormData.name}
                        onChange={handleInputChange}
                        placeholder="Product Name"
                        className="px-4 py-2 text-base rounded-md bg-white border border-gray-400 w-full outline-blue-500" />
                </div>
                
                <div>
                    <textarea type="text"
                        name="description"
                        value={productFormData.description}
                        onChange={handleInputChange}
                        placeholder="Description"
                        className="px-4 py-2 text-base rounded-md bg-white border border-gray-400 w-full outline-blue-500" />
                </div>

                <div>
                    <input
                        type="number"
                        name="price"
                        value={productFormData.price}
                        onChange={handleInputChange}
                        placeholder="Price"
                        className="px-4 py-2 text-base rounded-md bg-white border border-gray-400 w-full outline-blue-500" />
                </div>
                
                <div>
                    <input 
                        type="text"
                        name="company"
                        value={productFormData.company}
                        onChange={handleInputChange}
                        placeholder="Company"
                        className="px-4 py-2 text-base rounded-md bg-white border border-gray-400 w-full outline-blue-500" />
                </div>

                <div>
                    <input
                        type="text"
                        name="category"
                        value={productFormData.category}
                        onChange={handleInputChange}
                        placeholder="Category"
                        className="px-4 py-2 text-base rounded-md bg-white border border-gray-400 w-full outline-blue-500" />
                </div>

                <div>
                    <input 
                        type="number"
                        name="inventory"
                        value={productFormData.inventory}
                        onChange={handleInputChange}
                        placeholder="how many products available"
                        className="px-4 py-2 text-base rounded-md bg-white border border-gray-400 w-full outline-blue-500" />
                </div>

                <div>
                    <input
                        type="file"
                        name="mainImage"
                        onChange={handleInputChange}
                        className="px-4 py-2 text-base rounded-md bg-white border border-gray-400 w-full outline-blue-500" />
                </div>

                <div>
                    <input
                        type="file"
                        placeholder="product image"
                        name="additionalImages"
                        onChange={handleInputChange}
                        multiple
                        className="px-4 py-2 text-base rounded-md bg-white border border-gray-400 w-full outline-blue-500" />
                </div>




                {/* <div>
                    <labe className="mb-2 text-base block">Medium Input</labe>
                    <input type='text' placeholder='Medium Input'
                    class="px-4 py-2.5 text-lg rounded-md bg-white border border-gray-400 w-full outline-blue-500" />

                    class="px-4 py-2 text-base rounded-md bg-white border border-gray-400 w-full outline-blue-500" />
                </div>
                <div>
                    <labe className="mb-2 text-sm block">Small Input</labe>
                    <input type='text' placeholder='Small Input'
                    class="px-4 py-1.5 text-sm rounded-md bg-white border border-gray-400 w-full outline-blue-500" />
                </div> */}
                {
                    statusCode === 500 ? 
                    <div className="px-6 py-3  text-white font-semibold rounded-lg shadow-md hover focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-all bg-red-500">{error}</div> 
                    : null
                }
                
                <button 
                    type="submit"
                    disabled={isLoading ? true : haveWrite ? false : statusCode === 500 ? false : true}
                    className={`px-6 py-3  text-white font-semibold rounded-lg shadow-md hover focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-all
                                ${  
                                    haveWrite
                                    ? "bg-blue-600 hover:bg-blue-700"
                                    : error
                                    ? (statusCode === 500 ? "bg-blue-600 hover:bg-blue-700": "bg-red-500 hover:bg-red-600 cursor-not-allowed")
                                    : !haveWrite || isLoading
                                    ? "loading loading-spinner bg-gray-400 cursor-not-allowed"
                                    : "bg-blue-600 hover:bg-blue-700"
                                }
                    `}
                >
                    {/* {isLoading ? "Loading..." : "Upload Product"} */}
                    {error ? (statusCode === 500 ? "Upload Product" : error) : isLoading ? "Loading..." : "Upload Product"}
                </button>

            </div>

            
        </form>
    );
}


export default CreateProduct;