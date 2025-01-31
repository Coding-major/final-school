import { useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import TableOne from '../components/Tables/TableOne';
import TableThree from '../components/Tables/TableThree';
import TableTwo from '../components/Tables/TableTwo';

const AdminUsers = () => {
  const { getAllUsers, users, usersError, usersIsLoading} = useContext(UserContext);

  useEffect(() => {
    
    getAllUsers();
  }, [getAllUsers])

  return (
    <>
      <Breadcrumb pageName="Users" />

      <div className="flex flex-col gap-10">
        {usersIsLoading ?
        <div className="flex justify-center items-center min-h-screen">
        <div className="border-t-4 border-blue-500 border-solid w-16 h-16 rounded-full animate-spin"></div>
      </div> :
        usersError ? "error" :
        <TableOne users={users} />
      }
        
      </div>
    </>
  );
};

export default AdminUsers;
{/* <TableTwo />
        <TableThree /> */}