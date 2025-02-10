import { useContext } from "react";
import CreateProduct from "../../components/product/CreateProduct";
import { ProductContext } from "../../context/ProductContext";

import SingleProduct from "../../components/product/SingleProduct";


const ProductForm = () => {
    const { createdProduct } = useContext(ProductContext)
    return (
        <div className={createdProduct ? "flex flex-col sm:flex-row" : ""}>
            <div className="flex-1"><CreateProduct /></div>
            {createdProduct && <div className="flex-1"><SingleProduct /></div>}
        </div>


     );
}
 
export default ProductForm;

// className="flex flex-col lg:flex-row"