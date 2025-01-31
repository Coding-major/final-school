import { useContext } from "react";
import { FormContext } from "../../context/FormContext";
import { ProductContext } from "../../context/ProductContext";

const InputText = () => {
    const {filters} = useContext(FormContext)
    const {handleFilterInput} = useContext(ProductContext)
    return ( 
        <div className="mx-auto flex flex-col gap-0 lg:gap-1 max-w-3xl lg:flex-row">
                    <div className="w-full relative mt-6 max-w-lg mx-auto">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                            <svg className="h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="none">
                                <path
                                    d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>

                        <input
                            name="name"
                            value={filters.name}
                            onChange={handleFilterInput}
                            className="w-full border rounded-md pl-10 pr-4 py-2 focus:border-blue-500 focus:outline-none focus:shadow-outline"
                            type="text" placeholder="Search by product name" />
                    </div>

                    <div className="w-full relative mt-6 max-w-xl mx-auto">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                            <svg className="h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="none">
                                <path
                                    d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                        <input
                            name="companyName"
                            value={filters.companyName}
                            onChange={handleFilterInput}
                            className="w-full border rounded-md pl-10 pr-4 py-2 focus:border-blue-500 focus:outline-none focus:shadow-outline"
                            type="text" placeholder="Search by company name" />
                    </div>

                    <div className="w-full relative mt-6 max-w-xl mx-auto">
                        <select
                            name="categoryName"
                            value={filters.categoryName}
                            onChange={handleFilterInput}
                            id="dropdown"
                            className="w-full border rounded-md pl-6 pr-4 py-2 focus:border-blue-500 focus:outline-none focus:shadow-outline">
                            <option value="" >Search by Category</option>
                            <option value="automotive">Automotive</option>
                            <option value="beauty">Beauty</option>
                            <option value="electronics">Electronics</option>
                            <option value="fashion">Fashion</option>
                            <option value="groceries">Groceries</option>
                            <option value="health">Health</option>
                            <option value="homes">Homes</option>
                            <option value="office">Office</option>
                            <option value="pet">Pet</option>
                            <option value="school">School</option>
                            <option value="sports">Sports</option>
                            <option value="toys">Toys</option>
                        </select>
                    </div>
                </div>
     );
}
 
export default InputText;