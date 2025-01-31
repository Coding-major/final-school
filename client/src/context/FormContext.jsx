import { createContext, useCallback, useEffect, useState, useContext } from "react";

export const FormContext = createContext()

export const FormContextProvider = ({ children }) => {

    const [ haveWrite, setHaveWrite ] = useState(false)
    const [filters, setFilters] = useState({
        name: '',
        companyName: '',
        categoryName: '',
    });

    const [productFormData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        category: '',
        company: '',
        freeShipping: '',
        inventory: '',
        mainImage: '',
        additionalImages: [],
      });

      const [loginData, setLoginData] = useState({
        email: "",
        password: ""
      })

      const [registerData, setRegisterData] = useState({
        name: '',
        adminCode: '',
        profilePicture: "",
        email: '',
        password: '',
        phoneNumber: "",
        retypePassword: '',
        role: '',
        description: ''
      })

      const [updateUserData, setUpdateUserData] = useState({
        name: '',
        email: '',
        password: '',
        phoneNumber: "",
        retypePassword: '',
        description: ''
      })
    

    // const handleFilterInput = useCallback((e) => {
        
    //     const {name, value} = e.target;
    //     setFilters((prev) => ({ ...prev, [name]: value }));
    // });

    const handleInputChange = useCallback((e) => {
        setHaveWrite(true)
        const { name, value, files } = e.target

        if (files) {
            if (name === "mainImage") {
                setFormData((prev) => ({...prev, mainImage: files[0]}))
            }
            if (name === "additionalImages") {
                setFormData((prev) => ({...prev, additionalImages: Array.from(files)}))
            }
        } else {
            setFormData((prev) => ({...prev, [name]: value}))
        }

    },[])

    const handleSigninChange = useCallback((e) => {
        const {name, value} = e.target;
        setRegisterData((prev) => ({...prev, [name]: value}));
    },[])


    return <FormContext.Provider value={{
        productFormData,
        handleInputChange,
        haveWrite,
        setHaveWrite,
        filters ,
        setFilters,
        loginData,
        setLoginData,
        registerData,
        setRegisterData,
        updateUserData,
        setUpdateUserData
    }}>
        {children}
    </FormContext.Provider>
}