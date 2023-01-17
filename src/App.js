import "./index.css";
import Header from "./components/Header";
// import BuyEntryForm from "./components/BuyEntryForm";
import UnitPriceCalculator from "./components/UnitPriceCalculator";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Balances from "./pages/Balances";
import Transactions from "./pages/Transactions";
import HowMuch from "./pages/HowMuch";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" />
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
