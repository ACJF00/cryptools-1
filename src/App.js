import "./index.css";
import Header from "./components/Header";
// import BuyEntryForm from "./components/BuyEntryForm";
import UnitPriceCalculator from "./components/UnitPriceCalculator";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Balances from "./pages/Balances";
import Transactions from "./pages/Transactions";
import HowMuch from "./pages/HowMuch";
import axios from "axios";
import { useEffect, useState } from "react";

const Home = () => {
  // Price of ETH and BTC is updated every 5 minutes
  const [fetchLivePrices, setFetchLivePrices] = useState([]);
  const [companiesHoldBTC, setCompaniesHoldBTC] = useState(null);
  const numberFormat = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 8,
  });

  // Fetch prices from Coingecko API
  useEffect(() => {
    const fetchPricesFunction = async () => {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum&vs_currencies=USD`
      );
      setFetchLivePrices(response.data);
    };
    fetchPricesFunction();
  }, []);

  // Fetch companies that hold BTC from Coingecko API
  useEffect(() => {
    const fetchCompaniesHoldBTCFunction = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/companies/public_treasury/bitcoin"
        );
        setCompaniesHoldBTC(Array(response.data).flat());
      } catch (error) {
        console.log(error);
      }
    };
    fetchCompaniesHoldBTCFunction();
  }, []);

  if (!companiesHoldBTC) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col w-10/12 text-center items-center space-y-8 m-auto">
      <h1 className="text-4xl text-green-500 font-bold">
        Welcome to Cryptools
      </h1>
      <p className="text-xl text-green-500 font-bold">
        Some crypto tools to make life easier
      </p>
      <div className="w-10/12 space-y-8 flex flex-wrap justify-center sm:justify-around sm:items-center">
        <div className="flex flex-col items-center w-10/12 text-center border border-gray-200 p-2 mt-5 space-y-4 bg-blue-50 rounded-lg shadow-sm sm:w-1/6 sm:h-fit sm:align-middle">
          <h2 className="text-2xl text-green-500 font-bold">Live prices</h2>
          <div>
            <h2>Bitcoin</h2>{" "}
            <p className="text-xl text-green-500 font-bold">
              {fetchLivePrices?.bitcoin?.usd} USD
            </p>
          </div>

          <div>
            <h2>Ethereum</h2>
            <p className="text-xl text-green-500 font-bold">
              {fetchLivePrices?.ethereum?.usd} USD
            </p>
          </div>
        </div>
        <div className="w-full text-xs sm:w-3/12">
          <div className="flex flex-col text-center border border-gray-200 p-3 mt-5 space-y-4 m-auto bg-blue-50 rounded-lg shadow-sm">
            <h2 className="text-2xl text-green-500 font-bold">
              Companies holding (BTC)
            </h2>
            <ol className="flex flex-col pl-6">
              {companiesHoldBTC
                ? companiesHoldBTC[0].companies?.slice(0, 10).map((company) => {
                    return (
                      <li className="list-decimal">
                        <div className="flex space-x-2">
                          <h3 className="font-medium">{company.name}</h3>{" "}
                          <p className="text-green-500">
                            {numberFormat.format(company.total_holdings)}{" "}
                            <span>₿</span>
                          </p>
                        </div>
                      </li>
                    );
                  })
                : null}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route
            exact
            path="/unit-price-calculator"
            element={<UnitPriceCalculator />}
          />
          <Route exact path="/balances" element={<Balances />} />
          <Route exact path="/transactions" element={<Transactions />} />
          <Route exact path="/how-much-received" element={<HowMuch />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
