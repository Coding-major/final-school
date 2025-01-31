import { createContext, useCallback, useEffect, useState, useContext } from "react";
import { FormContext } from "./FormContext";
import { baseUrl, getRequest, postRequestFormData } from "../utils/service";

export const ProductContext = createContext()

export const ProductContextProvider = ({ children }) => {
    const { productFormData, setHaveWrite, filters, setFilters } = useContext(FormContext);
    const [isModalOpen, setIsModalOpen] = useState(false);

    //created product
    const [createdProduct, setCreatedProduct] = useState(null)
    const [createdProductIsLoading, setCreatedProductIsLoading] = useState(false)
    const [createdProductError, setCreatedProductError] = useState(null)

    //filtered products //search
    const [filteredProducts, setFilteredProducts] = useState([])
    const [filteredisLoading, setFilteredIsLoading] = useState(false)
    const [filteredProductsError, setFilteredProductsError] = useState(null)

    //products
    const [products, setProducts] = useState([]);
    const [productsIsLoading, setProductsIsLoading] = useState(false);
    const [productsError, setProductsError] = useState(null);
    const [moreProductsIsLoading, setMoreProductsIsLoading] = useState(false);
    const [moreProductsError, setMoreProductsError] = useState(null);

    //product detail
    const [product, setProduct] = useState(null);
    const [productIsLoading, setProductIsLoading] = useState(false);
    const [productError, setProductError] = useState(null);
    //product id
    const [productId, setProductId] = useState(null);

    //my products
    const [myProducts, setMyProducts] = useState()
    const [myProductsIsLoading, setMyProductsIsLoading] = useState(false)
    const [myProductsError, setMyProductsError] = useState(null);

   
    const [statusCode, setStatusCode] = useState(null)


    const fetchFilteredProducts = async (updatedFilters) => {
        setFilteredIsLoading(true)
        setFilteredProductsError(null);
        const { name, companyName, categoryName } = updatedFilters;
        if (!name && !companyName && !categoryName) {
            return setFilteredProducts([])

        }
        
        const query = new URLSearchParams({
          name: name,
          company: companyName,
          category: categoryName,
        });
    
       
        const response = await getRequest(`${baseUrl}/products/filteredProducts?${query.toString()}`);
        setFilteredIsLoading(false)
        if (response.error) {
            return setFilteredProductsError(response.message)
        }
        
        setFilteredProducts(response)
        
      };

    const handleFilterInput = useCallback((e) => {
        
        const {name, value} = e.target;
        const updatedFilters = { ...filters, [name]: value };
        setFilters(updatedFilters);

        fetchFilteredProducts(updatedFilters)
        // fetchProducts(updatedFilters);
        // setFilters((prev) => ({ ...prev, [name]: value }));

    });

    //   useEffect(() => {
    //     fetchFilteredProducts();
    //   }, [filters]);
    
    const getProducts = async (category) => {
        
        const limit = 6
        setProductsIsLoading(true)
        setProductsError(null);

        const page = 0
        const response = await getRequest(`${baseUrl}/products?category=${category}&page=${page}&limit=${limit}`);

        
        setProductsIsLoading(false)
        if (response.error) {
            return setProductsError(response.message)
        }
        setProducts(response)
    }

    const getMoreProducts = async (category, index) => {
        
        const limit = 4
        setMoreProductsIsLoading(true)
        setMoreProductsError(null);

        const page = products[index]?.products.length
        const response = await getRequest(`${baseUrl}/products?category=${category}&page=${page}&limit=${limit}`);

        
        setMoreProductsIsLoading(false)
        if (response.error) {
            return setMoreProductsError(response.message)
        }
        
        const nextPage = page + response.page
        
        if ( response.products.length >= 1 ) {
            setProducts((prevState) => {
                return prevState.map((entry) => {                   
                    // Check if the category matches
                    if (entry.category === category) {
                    return {
                        ...entry,
                        products: [...entry.products, ...response.products], // Append new products
                        page: nextPage, // Update the page
                    };
                    }
                    return entry; // Return the original entry if no match
                });
            });     
        }
    }

    useEffect(() => {
        const category = "start"
        getProducts(category);
    }, []);


    const getProductDetail = async (id) => {
        setProductId(id)
        console.log(id);
        
        
        
        setProductIsLoading(true)
        setProductError(null);

        const response = await getRequest(`${baseUrl}/products/${id}`);

        setProductIsLoading(false)
        if (response.error) {
            return setProductError(response.message)
        }
        
        setIsModalOpen(true)
        setProduct(response)
    }

    const createProduct = useCallback( async (e) => {
        e.preventDefault()
        setCreatedProductIsLoading(true)
        setCreatedProductError(null);
        setHaveWrite(false)
        setStatusCode(null)

        const { name, description, price, company, category, inventory, mainImage, additionalImages } = productFormData;
        const formDataToSend = new FormData();
        formDataToSend.append('name', name);
        formDataToSend.append('company', company);
        formDataToSend.append('description', description);
        formDataToSend.append('inventory', inventory);
        formDataToSend.append('price', price);
        formDataToSend.append('category', category);
        formDataToSend.append('mainImage', mainImage);
        additionalImages.forEach((file) => {
            formDataToSend.append('additionalImages', file);
        });

        
        const response = await postRequestFormData(`${baseUrl}/products`, formDataToSend); 
        
        if (response.error) {
            
            if (response.status === 500) {
                setStatusCode(response.status);
            }
        
            setCreatedProductError(response.message); // Set error if response has an error
        } else {
            setCreatedProduct(response); // Set the product data if no error
        }
        
        setCreatedProductIsLoading(false); 
        
            
        
    }, [productFormData])

    const getMyProducts = useCallback(async() => {
        setMyProductsIsLoading(true)
        setMyProductsError(null)

        const response = await getRequest(`${baseUrl}/users/myproducts`);
        setMyProductsIsLoading(false)

        if (response.error) {
            return setMyProductsError(response.message)
        }

        setMyProducts(response)
    }, [])

    return <ProductContext.Provider value={{
        filteredProducts,
        filteredisLoading,
        filteredProductsError,
        products,
        productsIsLoading,
        productsError,
        product,
        productIsLoading,
        productError,
        createProduct,
        productId,
        createdProduct,
        createdProductIsLoading,
        createdProductError,
        getMoreProducts,
        moreProductsIsLoading,
        moreProductsError,
        statusCode,
        getProducts,
        getProductDetail,
        isModalOpen,
        setIsModalOpen,
        handleFilterInput
    }}>
        {children}
    </ProductContext.Provider>
}