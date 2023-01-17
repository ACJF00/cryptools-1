import { useState, useEffect } from "react";
import axios from "axios";

const HowMuch = () => {
  const [tokenContract, setTokenContract] = useState("");
  const [address, setAddress] = useState("");
  const [answerAPI, setAnswerAPI] = useState([]);
  const [total, setTotal] = useState([]);
  const [decimals, setDecimals] = useState(18);

  const BSCKEY = process.env.REACT_APP_BSC_API_KEY;
  const ETHKEY = process.env.REACT_APP_ETH_API_KEY;
  const FTMKEY = process.env.REACT_APP_FTM_API_KEY;
  const MATICKEY = process.env.REACT_APP_MATIC_API_KEY;
  const AVAXKEY = process.env.REACT_APP_AVAX_API_KEY;

  console.log(AVAXKEY);

  const handleTokenContract = (event) => {
    const searchTokenContract = event.target.value;
    setTokenContract(searchTokenContract);
  };

  const handleAddress = (event) => {
    const searchAddress = event.target.value;
    setAddress(searchAddress);
  };

  const clearToken = () => {
    setTokenContract("");
    setAddress("");
    setTotal([]);
  };

  useEffect(() => {
    axios
      .all([
        axios.get(
          `https://api.bscscan.com/api?module=account&action=tokentx&contractaddress=${tokenContract}&address=${address}&page=1&offset=100&startblock=0&endblock=27025780&sort=asc&apikey=${BSCKEY}`
        ),
        axios.get(
          `https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=${tokenContract}&address=${address}&page=1&offset=100&startblock=0&endblock=27025780&sort=asc&apikey=${ETHKEY}`
        ),
        axios.get(
          `https://api.ftmscan.com/api?module=account&action=tokentx&contractaddress=${tokenContract}&address=${address}&page=1&offset=100&startblock=0&endblock=87025780&sort=asc&apikey=${FTMKEY}`
        ),
        axios.get(
          `https://api.polygonscan.com/api?module=account&action=tokentx&contractaddress=${tokenContract}&address=${address}&page=1&offset=100&startblock=0&endblock=87025780&sort=asc&apikey=${MATICKEY}`
        ),
        axios.get(
          `https://api.snowtrace.io/api?module=account&action=tokentx&contractaddress=${tokenContract}&address=${address}&page=1&offset=100&startblock=0&endblock=87025780&sort=asc&apikey=${AVAXKEY}`
        ),
      ])
      .then(
        axios.spread((...res) => {
          setAnswerAPI(res);
        })
      );
  }, [AVAXKEY, BSCKEY, ETHKEY, FTMKEY, MATICKEY, address, tokenContract]);

  useEffect(() => {
    if (answerAPI[0]?.data?.message === "OK") {
      setAnswerAPI(answerAPI[0].data.result);
    } else if (answerAPI[1]?.data?.message === "OK") {
      setAnswerAPI(answerAPI[1].data.result);
    } else if (answerAPI[2]?.data?.message === "OK") {
      setAnswerAPI(answerAPI[2].data.result);
    } else if (answerAPI[3]?.data?.message === "OK") {
      setAnswerAPI(answerAPI[3].data.result);
    } else if (answerAPI[4]?.data?.message === "OK") {
      setAnswerAPI(answerAPI[4].data.result);
    }
  }, [answerAPI]);

  useEffect(() => {
    let dataArray = [];
    for (let i = 0; i < answerAPI.length; i++) {
      let toLower = answerAPI[i]?.to?.toLowerCase();
      let addressLower = address?.toLowerCase();
      if (toLower === addressLower) {
        dataArray.push({
          ticker: answerAPI[0].tokenSymbol,
          value: Number(answerAPI[i].value),
        });
      }
    }
    setDecimals(Number(answerAPI[0]?.tokenDecimal));
    setTotal(dataArray);
  }, [address, answerAPI, decimals]);

  const totaltotal = total.reduce((a, v) => (a = a + v.value), 0);

  console.log(totaltotal);

  const FinalTotal = () => {
    if (decimals === 6) {
      return (
        <div>
          {(totaltotal / 1000000).toFixed(2).toLocaleString()} {total[0].ticker}
        </div>
      );
    } else if (decimals === 18) {
      return (
        <div>
          {(totaltotal / 1000000000000000000).toFixed(2).toLocaleString()}{" "}
          {total[0].ticker}
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col w-10/12 border border-gray-200 p-4 mt-5 space-y-4 m-auto bg-blue-50 rounded-lg sm:w-1/3">
      <div className="flex flex-col text-center space-y-2">
        <h1 className="">
          Find out how much did you receive <strong>in TOTAL </strong>on a
          particular token
        </h1>
        <span>
          This tool works for{" "}
          <span className="font-semibold">
            Ethereum, Avalanche, Polygon, Fantom and BSC
          </span>{" "}
          tokens
        </span>
        <div>
          Please use{" "}
          <a
            href="https://www.coingecko.com/"
            target="_blank"
            rel="noreferrer"
            className="text-semibold text-green-500 hover:underline hover:font-bold"
          >
            CoinGecko
          </a>{" "}
          to find the right token contract
        </div>
      </div>

      <div className="flex justify-around">
        <input
          type="text"
          placeholder="Token Contract Address"
          value={tokenContract}
          onChange={handleTokenContract}
          className="p-2 rounded-lg mt-1"
        />
        <input
          type="text"
          placeholder="ERC20 Address"
          value={address}
          onChange={handleAddress}
          className="p-2 rounded-lg mt-1"
        />
      </div>
      {totaltotal !== 0 && (
        <div className="flex flex-col items-center text-xl font-bold space-y-2">
          <div className="">
            <FinalTotal />
          </div>
          <div>{total.ticker}</div>
          <button
            className="bg-red-400 w-4/12 rounded-lg m-auto text-white font-medium text-lg hover:bg-red-600 transition"
            onClick={clearToken}
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
};

//

export default HowMuch;
