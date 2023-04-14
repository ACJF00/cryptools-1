import { useState, useEffect } from "react";

function Balance() {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          `/.netlify/functions/moralisAPI?address=${address}`
        );
        if (!res.ok) {
          throw new Error(`Error: ${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        setBalance(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [address]);

  return (
    <div>
      <label>
        Address:
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </label>
      <p>Native Balance: {balance.nativeBalance}</p>
      <p>Token Balances: {balance.tokenBalances}</p>
    </div>
  );
}

export default Balance;
