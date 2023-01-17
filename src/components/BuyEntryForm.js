import React from "react";

const BuyEntryForm = () => {
  // Form to save a crypto buy with quantity, price and date, unit price will automatically be calculated and saved in the database with a simple calculation of price/quantity

  return (
    <div className="flex flex-col w-10/12 border border-gray-200 p-4 mt-5 space-y-4 m-auto bg-blue-50 rounded-lg sm:w-1/3">
      <div className="flex flex-col w-full">
        <label htmlFor="crypto">Crypto</label>
        <input
          type="text"
          name="ticker"
          id="ticker"
          className="p-2 rounded-lg mt-1"
        />
      </div>
      <div className="flex flex-col w-full">
        <label htmlFor="quantity">Quantity</label>
        <input
          type="number"
          name="quantity"
          id="quantity"
          className="p-2 rounded-lg mt-1"
        />
      </div>
      <div className="flex flex-col w-full">
        <label htmlFor="price">Price</label>
        <input
          type="number"
          name="price"
          id="price"
          className="p-2 rounded-lg mt-1"
        />
      </div>
      <div className="flex flex-col w-full">
        <label htmlFor="date">Date</label>
        <input
          type="date"
          name="date"
          id="date"
          className="p-2 rounded-lg mt-1"
        />
      </div>
      <div className="flex flex-col w-full">
        <label htmlFor="unitPrice">Unit Price ($)</label>
        <input
          type="number"
          name="unitPrice"
          id="unitPrice"
          className="p-2 rounded-lg mt-1"
        />
      </div>
      <div className="flex flex-col w-full">
        <button
          type="submit"
          className="p-2 rounded-lg bg-blue-400 w-4/12 m-auto text-white font-medium text-lg hover:bg-blue-600 transition"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default BuyEntryForm;
