import React, { useEffect, useState } from "react";
import Axios from "../utils/Axios";
import toast from "react-hot-toast";
import { FaTrash, FaEdit } from "react-icons/fa";
import SummaryApi from "../common/SummaryApi";
import { IoSearchOutline } from "react-icons/io5";
import Search from "../components/Search";

const UserPage = () => {
  const [users, setUsers] = useState([]); // Store users
  const [loading, setLoading] = useState(false); // Loading state
  const [editMode, setEditMode] = useState(false); // To toggle edit form
  const [selectedUser, setSelectedUser] = useState(null); // User being edited
  const [search, setSearch] = useState("");



  const handleSearch = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.searchUsers,
        params: { search }, // Pass search query as a parameter
      });
      if (response.data.success) {
        setUsers(response.data.data); // Update user list
        if (response.data.data.length === 0) {
          toast("No users found", { icon: "🔍" });
        }
      } else {
        toast.error("Failed to fetch users");
      }
    } catch (error) {
      toast.error("An error occurred while searching");
    }
  };


  // Fetch all users from the server
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await Axios(SummaryApi.getAllUsers); // Backend API
      const {
        data: responseData
        //  search : search
      } = response;

      if (responseData.data) {
        setUsers(responseData.data);
      } else {
        toast.error("Failed to fetch users");
      }
    } catch (error) {
      toast.error("Error fetching users");
    } finally {
      setLoading(false);
    }
  };

  // Delete user
  const deleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const deletedUrl = SummaryApi.deleteUser.url.replace(':id', userId); // Use userId for replacement
      setLoading(true);

      await Axios({
        ...SummaryApi.deleteUser,
        url: deletedUrl, // Corrected dynamic URL
      });

      toast.success("User deleted successfully");
      fetchUsers(); // Refresh user list
    } catch (error) {
      toast.error("Failed to delete user");
    } finally {
      setLoading(false);
    }
  };



  // Handle form input changes for editing user
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser({ ...selectedUser, [name]: value });
  };

  // Update user details
  const updateUser = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // Replace ":id" with the actual user ID in the URL
      const updatedUrl = SummaryApi.updateUser.url.replace(':id', selectedUser._id);

      await Axios({
        ...SummaryApi.updateUser,
        url: updatedUrl, // Corrected dynamic URL
        data: selectedUser,
      });

      toast.success("User updated successfully");
      setEditMode(false);
      fetchUsers(); // Refresh user list
    } catch (error) {
      toast.error("Failed to update user");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-4">
      {/* <h2 className="text-2xl font-bold mb-4"></h2> */}
      <div className='p-2  bg-white shadow-md flex items-center justify-between gap-4'>
        <h2 className='font-semibold'>Admin Panel: User Management</h2>
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Search Users by ID</h1>

          <div className="h-full min-w-24 max-w-56 w-full ml-auto bg-blue-50 px-4 flex items-center gap-3 py-2 rounded border focus-within:border-primary-200">
            <IoSearchOutline size={25} />
            <input
              type="text"
              placeholder="Search user by ID..."
              className="h-full w-full outline-none bg-transparent"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onClick={handleSearch}


            />
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Search
            </button>


          </div>
        </div>
      </div>

      {/* User List */}
      <div className="grid gap-4">
        {loading ? (
          <p>Loading...</p>
        ) : (
          users.map((user) => (
            <div
              key={user._id}
              className="flex items-center justify-between border p-4 rounded shadow"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-full h-full" />
                  ) : (
                    <div className="flex items-center justify-center bg-gray-300 h-full">
                      {user.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-600">id: {user._id}</p>
                  <h4 className="font-bold">{user.name}</h4>
                  <p className="text-sm text-gray-600">{user.email}</p>
                  <p className="text-sm text-gray-600">{user.mobile}</p>
                  <p className="text-sm text-gray-600">{user.role}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={() => {
                    setEditMode(true);
                    setSelectedUser(user);
                  }}
                >
                  <FaEdit />
                </button>
                <button
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  onClick={() => deleteUser(user._id)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Edit User Form */}
      {editMode && selectedUser && (
        <form
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
          onSubmit={updateUser}
        >
          <div className="bg-white rounded p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Edit User</h3>

            <div className="grid gap-4">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={selectedUser.name}
                onChange={handleInputChange}
                className="p-2 border rounded"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={selectedUser.email}
                onChange={handleInputChange}
                className="p-2 border rounded"
              />
              <input
                type="text"
                name="mobile"
                placeholder="Mobile"
                value={selectedUser.mobile}
                onChange={handleInputChange}
                className="p-2 border rounded"
              />
              <input
                type="text"
                name="role"
                placeholder="Role"
                value={selectedUser.role}
                onChange={handleInputChange}
                className="p-2 border rounded"
              />

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  onClick={() => setEditMode(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  {loading ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default UserPage;
