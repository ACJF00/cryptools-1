import React, { useState } from "react";
import axios from "axios";

function AddNewToken() {
  const [newToken, setNewToken] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Make a request to the Coingecko API to retrieve token information
    const coingeckoResponse = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${newToken.ticker}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
    );

    // Extract the logo URL and contract address from the response
    const logoUrl = coingeckoResponse.data.image.small;
    const contractAddress = coingeckoResponse.data.platforms;
    const decimals = coingeckoResponse.data.detail_platforms;

    // Add the logo URL and contract address to the newToken object
    const updatedToken = {
      ...newToken,
      logo: logoUrl,
      contract: contractAddress,
      decimals: decimals,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/addToken",
        updatedToken,
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
        <select
          name="blockchain"
          id="blockchain"
          className="form-input shadow appearance-none border rounded w-50 ml-2 my-1 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline cursor-pointer"
          onChange={handleChange}
          value={newToken.blockchain || ""}
          required
        >
          <option value="">Select a blockchain</option>
          <option value="binance-smart-chain">BSC</option>
          <option value="ethereum">Ethereum</option>
          <option value="polygon-pos">Polygon</option>
          <option value="avalanche">Avalanche</option>
        </select>
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
