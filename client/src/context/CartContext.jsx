import { createContext, useState, useCallback, useEffect } from "react";
import { baseUrl, getRequest, postRequestFormData, postRequest, deleteRequest } from "../utils/service";

export const CartContext = createContext();

export const CartContextProvider = ({children}) => {
    const [addIsLoading, setAddIsLoading] = useState(false)
    const [addError, setAddError] = useState(null)
    const [addSuccess, setAddSuccess] = useState(null)

    const [itemsIsLoading, setItemsIsLoading] = useState(false);
    const [itemsError, setItemsError] = useState(null);
    const [items, setItems] = useState({products: [], totalPrice: 0});


    const [deleteIsLoading, setDeleteIsLoading] = useState(false);
    const [deleteError, setDeleteError] = useState(null);
    const [deleteSuccess, setDeleteSuccess] = useState(null);

    const addToCart = useCallback(async (id, quantity, price, name) => {
        setAddIsLoading(true);
        setAddError(null);
        const data = {
            productId: id,
            price,
            quantity,
            name
        }

        const response = await postRequest(`${baseUrl}/cart`, data);
        console.log(id, quantity, price, name);
        
        
        setAddIsLoading(false);
        if (response.error) {
            return setAddError(response.message);
        }
    
        setAddSuccess(response);
    }, []); // No dependencies since `baseUrl` is assumed to be stable
    
    // Function to Get All Cart Items
    const getCartItems = useCallback(async () => {
        setItemsIsLoading(true);
        setItemsError(null);
    
        const response = await getRequest(`${baseUrl}/cart`);
        console.log(response.products);
        
        setItemsIsLoading(false);
        if (response.error) {
            return setCartError(response.message);
        }
    
        setItems(response);
    }, []); // Depends on `userId` since it's used in the URL

    
    // Function to Delete a Cart Item
    const deleteCartItem = useCallback(async (id) => {
        var theID = id
        console.log(theID);
        
        setDeleteIsLoading(true);
        setDeleteError(null);
        
        
    
        const response = await deleteRequest(`${baseUrl}/cart/${id}`);
    
        setDeleteIsLoading(false);
        
        console.log(response);
        if (!response.ok) {
            return setDeleteError(response.message);
        }

        setItems(response)
        // setItems((prevItems) => prevItems.filter((item) => item._id !== id));

        // setItems((prevItems) => prevItems.filter((item) => item._id !== theID));

        // setItems((prevItems) => {
        //     console.log("Inside setItems callback...");
        //     console.log("prevItems:", prevItems);
            
        //     if (!prevItems || !prevItems.products) {
        //         console.log("prevItems is invalid or missing products");
        //         return prevItems;
        //     }
    
        //     const updatedProduct = response.products;
        //     const updateTotalPrice = response.totalPrice;
    
        //     console.log("Updated Products:", updatedProduct);
        //     console.log("Updated Total Price:", updateTotalPrice);
    
        //     return {
        //         ...prevItems,
        //         products: updatedProduct,
        //         totalPrice: updateTotalPrice, // Update total price from response
        //     };
        // });

    }, []);

    
    return <CartContext.Provider value={{
        addToCart,
        addIsLoading,
        addError,

        getCartItems,
        itemsIsLoading,
        itemsError,
        items,

        deleteCartItem,
        deleteIsLoading,
        deleteError,
        deleteSuccess
    }}>
        {children}
    </CartContext.Provider>;
}