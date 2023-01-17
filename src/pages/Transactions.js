import React, { useEffect, useState } from "react";
import axios from "axios";

const Transactions = () => {
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [showClearButton, setShowClearButton] = useState(false);
  const [transactionHash, setTransactionHash] = useState("");

  // *********** Get the hash of the transaction link *************

  const getHash = (event) => {
    if (event.target.name === "transactionHash") {
      const hash = event.target.value.split("/").pop();
      setTransactionHash(hash);
    }
  };

  // *********** UNIT PRICE CALCULATION *************
  const calculateUnitPrice = () => {
    if (price === "" || quantity === "") {
      return "Please enter a price and quantity";
    }
    const unitPrice = price / quantity;
    return `Unit Price : $${unitPrice.toFixed(4)}`;
  };

  // *********** HANDLE CHANGE INPUTS *************
  const handleInputChange = (event) => {
    if (event.target.name === "price") {
      setPrice(event.target.value);
    } else {
      setQuantity(event.target.value);
    }
    setShowClearButton(event.target.value !== "");
  };

  // *********** CLEAR INPUTS *************
  const clearInputs = () => {
    setPrice("");
    setQuantity("");
    setShowClearButton(false);
  };

  // *********** FETCH UNIT PRICE BY TX HASH *************

  const [txInfos, seTxInfos] = useState({});

  // Fetch balances from server
  useEffect(() => {
    const fetchTxInfos = async () => {
      const response = await axios.get(
        `http://localhost:4000/transactions?transactionHash=${transactionHash}`
      );
      seTxInfos(response.data);
    };
    fetchTxInfos();
  }, [transactionHash]);

  const getTokenQuantity = () => {
    const quantity = txInfos.response.logs[0].data;
    //convert hex to decimal
    const quantityDecimal = parseInt(quantity, 16);
    //convert decimal to token quantity
    const quantityToken = quantityDecimal / 1000000000000000000;
    return quantityToken;
  };

  const getDollarReceived = () => {
    const dollarReceived = txInfos.response.logs[2].topics[3];
    //convert hex to decimal
    const dollarReceivedDecimal = parseInt(dollarReceived, 16);
    //convert decimal to token quantity
    const dollarReceivedToken = dollarReceivedDecimal / 1000000000000000000;
    return dollarReceivedToken;
  };

  return (
    <div>
      {/* toggle div with a navbar */}

      <div className="flex flex-col w-10/12 border border-gray-200 p-4 mt-5 space-y-4 m-auto bg-blue-50 rounded-lg sm:w-1/3">
        <h1 className="m-auto text-xl font-bold">Unit Price Calculator</h1>
        <div className="flex flex-row justify-around">
          <button
            onClick={() => {
              document
                .getElementById("unitPriceTxHash")
                //add flex class to unitPriceQuantity and remove hidden
                .classList.remove("hidden");
              document
                .getElementById("unitPriceQuantity")
                .classList.add("hidden")
                .classList.remove("flex");
            }}
            className="p-2 rounded-lg bg-blue-400 w-4/12 m-auto text-white font-medium text-lg hover:bg-blue-600 transition"
          >
            By Tx Hash
          </button>
          <button
            onClick={() => {
              document
                .getElementById("unitPriceTxHash")
                .classList.add("hidden");
              document
                .getElementById("unitPriceQuantity")
                .classList.remove("hidden")
                .classList.add("flex");
            }}
            className="p-2 rounded-lg bg-blue-400 w-4/12 m-auto text-white font-medium text-lg hover:bg-blue-600 transition"
          >
            By Quantity
          </button>
        </div>
      </div>

      <div>
        {/* Unit price calculator by entering a transaction hash */}

        <div
          id="unitPriceTxHash"
          className="flex flex-col w-10/12 border border-gray-200 p-4 mt-5 space-y-4 m-auto bg-blue-50 rounded-lg sm:w-1/3"
        >
          <label>Transaction hash</label>
          <input
            type="link"
            name="transactionHash"
            onChange={getHash}
            className="p-2 rounded-lg mt-1"
          />
          <br />
          <p className="m-auto text-xl font-bold">{calculateUnitPrice()}</p>
        </div>
      </div>
      <div
        id="unitPriceQuantity"
        className="hidden flex flex-col w-10/12 border border-gray-200 p-4 mt-5 space-y-4 m-auto bg-blue-50 rounded-lg sm:w-1/3"
      >
        <label>Price: </label>
        <input
          type="number"
          name="price"
          value={price}
          onChange={handleInputChange}
          className="p-2 rounded-lg mt-1"
        />
        <br />
        <label>Quantity: </label>
        <input
          type="number"
          value={quantity}
          onChange={handleInputChange}
          className="p-2 rounded-lg mt-1"
        />
        <br />
        {showClearButton && (
          <button
            onClick={clearInputs}
            className="bg-red-400 w-4/12 rounded-lg m-auto text-white font-medium text-lg hover:bg-red-600 transition"
          >
            Clear
          </button>
        )}
        <button
          onChange={handleInputChange}
          className="p-2 rounded-lg bg-blue-400 w-8/12 m-auto text-white font-medium text-lg hover:bg-blue-600 transition"
        >
          Calculate Unit Price
        </button>
        <br />
        <p className="m-auto text-xl font-bold">{calculateUnitPrice()}</p>
      </div>
    </div>
  );
};

export default Transactions;
