import React, { useState } from "react";
// import withAuth from "../components/withAuth";
import axios from "axios";

const ProfileInfos = ({ userData }) => {
  const [editedUserData, setEditedUserData] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  //get user data from API

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedUserData({ ...editedUserData, [name]: value });
  };

  //edit user data
  const handleEdit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const editedUserData = {
      name: formData.get("name"),
      email: formData.get("email"),
      address: formData.get("address"),
    };

    try {
      const response = await axios.put(
        "http://localhost:5000/api/user",
        editedUserData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // setUserData(response.data);
      setEditedUserData({});
      setIsEditing(false);
      alert("User data updated successfully!");
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form
        onSubmit={handleEdit}
        className={`w-1/2 m-auto flex flex-col items-center gap-y-2 ${
          isEditing ? "block" : "hidden"
        }`}
      >
        <label className="w-full">
          Name:
          <input
            type="text"
            name="name"
            value={editedUserData.name || ""}
            placeholder={userData?.user?.name}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </label>
        <br />
        <label className="w-full">
          Email:
          <input
            type="email"
            name="email"
            value={editedUserData.email || ""}
            placeholder={userData?.user?.email}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </label>
        <br />
        <label className="w-full">
          Address:
          <input
            type="text"
            name="address"
            value={editedUserData.address || ""}
            placeholder={userData?.user?.address}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </label>
        <br />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Confirm edit
        </button>
      </form>

      <div
        className={`w-1/2 m-auto flex flex-col gap-y-2 ${
          isEditing ? "hidden" : "block"
        }`}
      >
        <span>Name:</span>
        <p className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          {userData?.user?.name}
        </p>
        <span>Email:</span>
        <p className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          {userData?.user?.email}
        </p>
        <span>Address:</span>
        <p className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          {userData?.user?.address}
        </p>
      </div>
      <button
        onClick={() => setIsEditing(!isEditing)}
        className={`flex mx-auto bg-transparent font-semibold hover:text-white py-2 px-4 border hover:border-transparent rounded mt-4 ${
          isEditing
            ? "bg-red-500 hover:bg-red-500 text-white border-red-500"
            : "bg-blue-500 hover:bg-blue-500 text-blue-700 border-blue-500"
        } `}
      >
        {isEditing ? "Cancel edit" : "Edit"}
      </button>
    </>
  );
};

export default ProfileInfos;
