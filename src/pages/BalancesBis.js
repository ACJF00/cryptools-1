import React from "react";
import { useEffect, useState } from "react";
import moralisAPI from "../functions/moralisAPI";

const Balances = () => {
  const [balances, setBalances] = useState({});
  const [address, setAddress] = useState("");

  // Input to set address to query
  const handleChange = (e) => {
    setAddress(e.target.value);
  };

  // call getBalances() when address is set
  useEffect(() => {
    moralisAPI().then((res) => {
      setBalances(res);
    });
  }, [address]);

  console.log("balances", balances);

  // token balances for i length
  const tokenBalances = [];
  for (let i = 0; i < balances.tokenBalances?.length; i++) {
    tokenBalances.push(
      <div key={i}>
        {/* //split result with the space between the number and the token name ansd return the values in two span */}
        {/* Show the 15 first results and add a "Show more for the 15 others */}

        <span className="font-medium">
          {balances.tokenBalances[i].split(" ")[0]}{" "}
        </span>
        <span className="font-medium">
          {balances.tokenBalances[i].split(" ")[1]}
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-10/12 border border-gray-200 p-4 mt-5 space-y-4 m-auto bg-blue-50 rounded-lg sm:w-1/3">
      <input
        type="text"
        placeholder="Enter address"
        onChange={handleChange}
        className="p-2 rounded-lg mt-1"
      />
      <button className="p-2 rounded-lg bg-blue-400 w-8/12 m-auto text-white font-medium text-lg hover:bg-blue-600 transition">
        Submit
      </button>
      <br />
      <h1 className="m-auto text-xl font-bold">Balances</h1>
      <h3 className="font-medium">Wallet: {balances.address}</h3>
      <h3 className="font-medium">
        ETH Balance: {balances.nativeBalance} {address ? "ETH" : ""}
      </h3>
      {/* each result on one line */}
      <h3 className="font-medium">Token Balances:</h3>
      <div className="flex flex-col items-center">{tokenBalances}</div>
    </div>
  );
};

export default Balances;
