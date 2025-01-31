import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import AboutUser from "../users/AboutUser";

const TableOne = ({users}) => {
  const { getOneUser, isModalOpen, setIsModalOpen } = useContext(UserContext)
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">


      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Index
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Name
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Email
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
            Phone Number
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
            Account Type
            </h5>
          </div>

        </div>

        {users.map((user, key) => (
          
          <div
            className={`grid grid-cols-3 sm:grid-cols-5 cursor-pointer ${
              key === users.length - 1
                ? ''
                : 'border-b border-stroke dark:border-strokedark'
            }`}
            key={key+1}
            onClick={()=> getOneUser(user._id)}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <div className="flex-shrink-0">
                {/* <img src={brand.logo} alt="Brand" /> */}
              </div>
              <p className="hidden text-black dark:text-white sm:block">
                {key+1}
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{user.name}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black">{user.email}</p>
            </div>
            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">{user?.phoneNumber}</p>
            </div>
            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">{user.role}</p>
            </div>
            {/* {isModalOpen && <AboutUser user={user._id} onClose={() => setIsModalOpen(false)} />} */}
          </div>
        ))}

        {isModalOpen && <AboutUser onClose={() => setIsModalOpen(false)} />}
      </div>
    </div>
  );
};

export default TableOne;
