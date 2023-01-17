// dotenv

const dotenv = require("dotenv").config();
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, "../../env") });

// Moralis

const Moralis = require("moralis").default;

const express = require("express");
const cors = require("cors");

const { EvmChain } = require("@moralisweb3/common-evm-utils");

const app = express();
const port = 4000;

// allow access to React app domain
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// API Key
const MORALIS_API_KEY =
  "IRq4EnAoMfzsXCxZSeSrHBWtEudkCd4z2WmFeammymasDoiLPPfNCTQvae8gCtkY";

// GET Balances
app.get("/balances", async (req, res) => {
  try {
    const { address } = req.query;
    // Promise.all() for receiving data async from two endpoints
    const [nativeBalance, tokenBalances] = await Promise.all([
      Moralis.EvmApi.balance.getNativeBalance({
        chain: EvmChain.ETHEREUM,
        address,
      }),
      Moralis.EvmApi.token.getWalletTokenBalances({
        chain: EvmChain.ETHEREUM,
        address,
      }),
    ]);
    res.status(200).json({
      // formatting the output
      address,
      nativeBalance: nativeBalance.result.balance.ether,
      tokenBalances: tokenBalances.result.map((token) => token.display()),
    });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500);
    res.json({ error: error.message });
  }
});

// GET Transactions
app.get("/transactions", async (req, res) => {
  try {
    const { transactionHash } = req.query;
    const response = await Moralis.EvmApi.transaction.getTransaction({
      chain: EvmChain.ETHEREUM,
      transactionHash,
    });
    res.status(200).json({
      response: response.result,
    });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500);
    res.json({ error: error.message });
  }
});

const startServer = async () => {
  await Moralis.start({
    apiKey: MORALIS_API_KEY,
  });

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};

startServer();
