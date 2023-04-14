import React, { useState } from "react";
import axios from "axios";

function AddNewToken() {
  const [newToken, setNewToken] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/addToken",
        newToken,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setNewToken({});
      alert("Token added successfully!");
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setNewToken({
      ...newToken,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-10/12 justify-around mx-auto mt-8"
    >
      <div className="mb-4">
        <label htmlFor="ticker" className="form-label">
          Ticker
        </label>
        <input
          type="text"
          name="ticker"
          id="ticker"
          className="form-input shadow appearance-none border rounded w-50 ml-2 my-1 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={handleChange}
          value={newToken.ticker || ""}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="blockchain" className="form-label">
          Blockchain
        </label>
        <input
          type="text"
          name="blockchain"
          id="blockchain"
          className="form-input shadow appearance-none border rounded w-50 ml-2 my-1 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={handleChange}
          value={newToken.blockchain || ""}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="to_receive" className="form-label">
          Amount to Receive
        </label>
        <input
          type="number"
          name="to_receive"
          id="to_receive"
          className="form-input shadow appearance-none border rounded w-50 ml-2 my-1 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={handleChange}
          value={newToken.to_receive || ""}
          required
        />
      </div>
      <button
        type="submit"
        className="inline-block px-4 py-2 max-h-10 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
      >
        Add Token
      </button>
    </form>
  );
}

export default AddNewToken;
