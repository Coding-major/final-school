import {createContext, useCallback, useContext, useEffect, useState} from 'react';
import {baseUrl, getRequest,deleteRequest, postRequestFormData, updateRequest} from '../utils/service';

import { FormContext } from './FormContext';
import { AuthContext } from './AuthContext';

export const UserContext = createContext();

export const UserContextProvider = ({children}) => {
    const {updateUserData} = useContext(FormContext)
    const {setUser} = useContext(AuthContext)
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [myDetails, setMyDetails] = useState(null);
    const [myDetailsError, setMyDetailsError] = useState(null);
    const [myDetailsIsLoading, setMyDetailsIsLoading] = useState(false);
    var userID = ""
    //admin users
    const [users, setUsers] = useState([]);
    const [usersIsLoading, setUsersIsLoading] = useState(false);
    const [usersError, setUsersError] = useState(null);

    //single user
    const [singleUser, setSingleUser] = useState(null)
    const [userIsLoading, setUserIsLoading] = useState(false)
    const [userError, setUserError] = useState(null);
    //delete user
    const [deleteID, setDeleteID] = useState("")
    const [deleteLoading, setDeleteLoading] = useState(false)
    const [deleteError, setDeleteError] = useState(null)

    //update user
    const [updateLoading, setUpdateLoading] = useState(false); // Loading state for updating
    const [updateError, setUpdateError] = useState(null);

    const getMyDetails = useCallback(async () => {
        setMyDetailsIsLoading(true);
        setMyDetailsError(null);

        const response = await getRequest(`${baseUrl}/users/showcurrentuser`);
        setMyDetailsIsLoading(false);

        if (response.error) {
            return setMyDetailsError(response.message);
        }

        console.log(response);
        
        setMyDetails(response);
    })

     useEffect(() => {   
        getMyDetails;
    }, []);

    const getAllUsers = useCallback(async () => {
        setUsersIsLoading(true);
        setUsersError(null);

        const response = await getRequest(`${baseUrl}/users`);
        setUsersIsLoading(false);
        console.log(response);
        if (response.error) {
            return setUsersError(response.message);
        }

        
        
        setUsers(response);
    },[])


    const getOneUser = useCallback(async (id) => {
        userID = id
        
        setDeleteID(id)
        setUserIsLoading(true)
        setUserError(null)

        const response = await getRequest(`${baseUrl}/users/${id}`);

        setUserIsLoading(false)
        if (response.error) {
            return setUserError(response.message);
        }

        setIsModalOpen(true)
        setSingleUser(response)
    },[])


    const deleteUser = useCallback(async () => {
        
        setDeleteLoading(true)
        setDeleteError(null)

        const response = await deleteRequest(`${baseUrl}/users/deleteUser/${userID}`);
        setDeleteLoading(false)
        if (response.error) {
            setDeleteError(response);
        }

        setIsModalOpen(false)
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userID));
    },[])
    
    const updateUser = useCallback(async (e) => {
        e.preventDefault()
        setUpdateLoading(true);
        setUpdateError(null);
    
        const response = await updateRequest(`${baseUrl}/users/updateuser`, updateUserData);
    
        setUpdateLoading(false);
        
        if (response.error) {
            return setUpdateError(response);
        }
    
        localStorage.setItem("User", JSON.stringify(response))
        setUser(response)
        
        // setUsers((prevUsers) => 
        //     prevUsers.map((user) => 
        //         user._id === userID ? { ...user, ...updatedData } : user
        //     )
        // );
    }, [updateUserData]);
    return <UserContext.Provider value={{
        getMyDetails,
        users,
        usersIsLoading,
        usersError,
        myDetails,
        myDetailsError,
        myDetailsIsLoading,
        getAllUsers,
        getOneUser,
        singleUser,
        userIsLoading,
        userError,
        isModalOpen,
        setIsModalOpen,
        deleteUser,
        updateUser,
        updateLoading,
        updateError
    }}>
        {children}
    </UserContext.Provider>;
}