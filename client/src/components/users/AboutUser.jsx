import { useEffect, useContext } from "react";
import { UserContext } from "../../context/UserContext";

const AboutUser = ({ onClose }) => {
  const { singleUser, deleteUser } = useContext(UserContext);

  useEffect(() => {
    if (!singleUser) {
      onClose(); // Close the modal if no user data is available
    }
  }, [singleUser, onClose]);

  const handleCloseModal = (e) => {
    // Close the modal if clicked outside the modal content
    if (e.target.id === "modal-overlay") {
      onClose();
    }
  };

  if (!singleUser) return null; // Avoid rendering if no user is available

  return (
    <div
      id="modal-overlay"
      onClick={handleCloseModal}
      className="fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center z-50"
    >
      <div
        className="bg-slate-800 text-white rounded-lg shadow-lg w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%] max-h-[80vh] overflow-y-auto p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white bg-red-600 hover:bg-red-700 rounded-full px-4 py-2 font-semibold"
        >
          Close
        </button>

        {/* Modal Content */}
        <div className="flex flex-col items-center gap-6">
          {/* Profile Picture */}
          <img
            src={`http://localhost:4000${singleUser?.profilePicture}`}
            alt={singleUser.name}
            className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-gray-500"
          />

          {/* User Details */}
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">{singleUser?.name}</h1>
            <p className="text-lg text-gray-300 mb-4">{singleUser?.email}</p>
            <p className="text-sm text-gray-400 italic">
              {singleUser?.description}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
              Edit Profile
            </button>
            <button onClick={deleteUser} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition">
              Delete User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUser;
