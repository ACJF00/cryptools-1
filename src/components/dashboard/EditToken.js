import React, { useState } from "react";
import axios from "axios";

const EditToken = ({ token, onSave }) => {
  const [editedTokenDatas, setEditedTokenDatas] = useState({});

  const handleInputChange = (event) => {
    const { ticker, value } = event.target;
    setEditedTokenDatas({ ...editedTokenDatas, [ticker]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const editedUserData = {
      ticker: formData.get("ticker") || token.ticker,
      blockchain: formData.get("blockchain") || token.blockchain,
      to_receive: formData.get("to_receive") || token.to_receive,
    };

    try {
      const response = await axios.put(
        `http://localhost:5000/api/user/editToken/${token.id}`,
        editedUserData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setEditedTokenDatas({});
      alert("Token data updated successfully!");
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <label>
        Name:
        <input
          className="shadow appearance-none border rounded w-1/2 ml-2 my-1 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          name="ticker"
          value={editedTokenDatas.ticker}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Blockchain :
        <input
          className="shadow appearance-none border rounded w-1/2 ml-2 my-1 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          name="blockchain"
          value={editedTokenDatas.blockchain}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        To receive :
        <input
          className="shadow appearance-none border rounded w-1/2 ml-2 my-1 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          name="to_receive"
          value={editedTokenDatas.to_receive}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <button type="submit">Save</button>
    </form>
  );
};

export default EditToken;
