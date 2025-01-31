import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { FormContext } from "./FormContext";
import { baseUrl, getRequest, postRequest, postRequestFormData } from "../utils/service";

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const {loginData, setLoginData, registerData, setRegisterData} = useContext(FormContext)
    const [user, setUser] = useState(null)
    //login
    const [loginLoading, setLoginLoading] = useState(false)
    const [loginError, setLoginError] = useState(null)

    //register
    const [registerLoading, setRegisterLoading] = useState(false)
    const [registerError, setRegisterError] = useState(null)
  

    useEffect(() => {
        const userLocal = localStorage.getItem("User")
        setUser(JSON.parse(userLocal))
    }, [])

    const registerInput = useCallback((e) => {
        const { name, value, files } = e.target;
        // If the input is a file input, handle the file differently
        if (files) {
            setRegisterData((prev) => ({ ...prev, [name]: files[0] }));
        } else {
            setRegisterData((prev) => ({ ...prev, [name]: value }));
        }
    }, []);
    

    const registerFunction = useCallback(async(e) => {
        e.preventDefault();
        setRegisterLoading(true);
        setRegisterError(null);
        const {name, profilePicture, email, phoneNumber, password, retypePassword, role, description, adminCode} = registerData;
        const formDataTOSend = new FormData();

        formDataTOSend.append("name", name);
        formDataTOSend.append("profilePicture", profilePicture);
        formDataTOSend.append("email", email)
        formDataTOSend.append("phoneNumber", phoneNumber)
        formDataTOSend.append("password", password);
        formDataTOSend.append("retypePassword", retypePassword)
        formDataTOSend.append("role", role)
        formDataTOSend.append("description", description)
        formDataTOSend.append("adminCode", adminCode)



        const response = await postRequestFormData(`${baseUrl}/auth/register`, formDataTOSend);
        setRegisterLoading(false)
        if (response.error) {
            return setRegisterError(response.message)
        }

        localStorage.setItem("User", JSON.stringify(response))
        setUser(response)
    }, [registerData])


    const loginInput = useCallback((e) => {
        const {name, value} = e.target;
        setLoginData((prev) => ({ ...prev, [name]: value }));
    })

    const loginFunction = useCallback(async (e) => {
        e.preventDefault()

        setLoginLoading(true);
        setLoginError(null);
        
        

        const response = await postRequest(`${baseUrl}/auth/login`, loginData)
        setLoginLoading(false)
        if (response.error) {
            return setLoginError(response.message)
        }

        localStorage.setItem("User", JSON.stringify(response))
        setUser(response)
        
    },[loginData])

    const logOut = useCallback(() => {

        localStorage.removeItem("User")
        setUser(null)

    }, [])

    return <AuthContext.Provider value={{
        loginInput,
        loginFunction,
        loginData,
        loginLoading,
        loginError,
        registerFunction,
        registerInput,
        registerData,
        registerLoading,
        registerError,
        setUser,
        user,
        logOut
    }}>
        {children}
    </AuthContext.Provider>
}