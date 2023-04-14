import React, { useState, useEffect } from "react";
import axios from "axios";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import EditToken from "./EditToken";
import AddNewToken from "./AddNewToken";

const ProfileReceived = (userData) => {
  const [tableItems, setTableItems] = useState([]);
  const [selectedToken, setSelectedToken] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [lastUpdateDate, setLastUpdateDate] = useState(null);

  //Get tokens datas from coingecko API and add them to tableItems
  const getTokensData = async () => {
    const response = await axios.get("http://localhost:5000/api/user", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const tokens = response.data.user.monitoredToken;
    const tokensData = [];
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${token.ticker}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
      );
      const tokenData = {
        id: token._id,
        ticker: token.ticker,
        blockchain: token.blockchain,
        to_receive: parseFloat(token.to_receive.toString().replace(",", ".")),
        received: token.received,
        logo: response.data.image.small,
        contractAddresses: response.data.platforms,
        receivedAmount: token.receivedAmount,
      };
      tokensData.push(tokenData);
    }
    setTableItems(tokensData);
  };

  const BSCKEY = process.env.REACT_APP_BSC_API_KEY;
  // const ETHKEY = process.env.REACT_APP_ETH_API_KEY;
  // const FTMKEY = process.env.REACT_APP_FTM_API_KEY;
  // const MATICKEY = process.env.REACT_APP_MATIC_API_KEY;
  // const AVAXKEY = process.env.REACT_APP_AVAX_API_KEY;s

  //call getTokensData function when component is mounted
  useEffect(() => {
    getTokensData();
  }, []);

  function handleClick() {
    const address = `${userData.userData.user.address}`;
    const contractAddresses = tableItems.map(
      (item) => item.contractAddresses["binance-smart-chain"]
    );
    const addressLowerCase = address.toLowerCase();
    axios
      .all(
        contractAddresses.map((contractAddress) =>
          axios.get(
            `https://api.bscscan.com/api?module=account&action=tokentx&contractaddress=${contractAddress}&address=${address}&page=1&offset=100&startblock=0&endblock=27025780&sort=asc&apikey=${BSCKEY}`
          )
        )
      )
      .then(
        axios.spread((...responses) => {
          console.log("responses", responses);
          responses.forEach((response, index) => {
            const token = tableItems[index];
            let receivedAmount = 0;
            for (let i = 0; i < response.data.result.length; i++) {
              const transaction = response.data.result[i];
              const transactionToLowerCase = transaction.to.toLowerCase();
              if (transactionToLowerCase === addressLowerCase) {
                const contractAddress = transaction.contractAddress;
                const amount = transaction.value / 1000000000000000000;
                if (
                  contractAddress ===
                  token.contractAddresses["binance-smart-chain"]
                ) {
                  receivedAmount += amount;
                }
              }
            }
            token.receivedAmount = receivedAmount;
          });
          setTableItems([...tableItems]);
          setLastUpdateDate(new Date());
          tableItems.forEach((item) => {
            updateReceivedAmount(item.id, item.receivedAmount);
          });
        })
      )
      .catch((error) => {
        console.log(error);
      });
  }

  const handleEditClick = (token) => {
    setSelectedToken(token);
    setShowEditModal(!showEditModal);
  };

  const updateReceivedAmount = (tokenId, receivedAmount) => {
    axios
      .put(
        `http://localhost:5000/api/user/editToken/${tokenId}`,
        { receivedAmount },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="max-w-screen-xl mx-auto px-4 md:px-8 mb-10">
        <div className="items-start justify-between md:flex">
          <div className="max-w-lg">
            <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
              Received amount
            </h3>
            <p className="text-gray-600 mt-2">
              Monitor your investments and see how much you have received
              already
            </p>
          </div>
          <div>
            <button
              onClick={handleClick}
              className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
            >
              Get Received Amounts
            </button>
            {lastUpdateDate && (
              <p className="text-xs pt-2">
                Last updated on: {lastUpdateDate.toLocaleString()}
              </p>
            )}
          </div>
        </div>
        <div className="mt-3 md:mt-8">
          <button
            className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
            onClick={() => setShowAddModal(!showAddModal)}
          >
            {showAddModal ? "Close" : "Add new token"}
          </button>
          {showAddModal && <AddNewToken />}
        </div>
        <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
          <table className="w-full table-auto text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b">
              <tr>
                <th className="py-3 px-6">Ticker</th>
                <th className="py-3 px-6">Blockchain</th>
                <th className="py-3 px-6">Nb to receive</th>
                <th className="py-3 px-6">Received</th>
                <th className="py-3 px-6">%</th>
                <th className="py-3 px-6"></th>
              </tr>
            </thead>
            <tbody className="text-gray-600 divide-y">
              {tableItems.map((item, idx) => (
                <tr key={idx}>
                  <td className="flex items-center gap-x-3 py-3 px-6 whitespace-nowrap align-baseline">
                    <img
                      src={item.logo}
                      className="w-10 h-10 rounded-full"
                      alt="logo"
                    />
                    <div>
                      <span className="block text-gray-700 text-sm font-medium">
                        {item.ticker}
                      </span>
                      <span className="block text-gray-700 text-xs">
                        {item.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.blockchain}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.to_receive.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.receivedAmount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div style={{ width: 50, height: 50 }}>
                      <CircularProgressbar
                        className="text-center"
                        styles={buildStyles({
                          pathColor: "rgb(22 163 74)",
                          textColor: "rgb(22 163 74)",
                          trailColor: "white",
                          backgroundColor: "rgb(22 163 74)",
                        })}
                        value={Number(
                          (item.receivedAmount / item.to_receive) * 100
                        )}
                        text={`${Number(
                          (item.receivedAmount / item.to_receive) * 100
                        ).toFixed(2)}%`}
                      />
                    </div>
                  </td>
                  <td className="text-right px-6 whitespace-nowrap">
                    <button onClick={() => handleEditClick(item)}>
                      {showEditModal ? "Close" : "Edit"}
                    </button>
                    {showEditModal && (
                      <EditToken
                        token={selectedToken}
                        onClose={() => setShowEditModal(false)}
                      />
                    )}

                    <button
                      href="www.google.com"
                      className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProfileReceived;
