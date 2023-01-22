const dotenv = require("dotenv").config();
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, "../../env") });

const Moralis = require("moralis").default;
const { EvmChain } = require("@moralisweb3/common-evm-utils");

const cors = require("cors");

const MORALIS_API_KEY =
  "IRq4EnAoMfzsXCxZSeSrHBWtEudkCd4z2WmFeammymasDoiLPPfNCTQvae8gCtkY";

exports.handler = async (event, context) => {
  await Moralis.start({
    apiKey: MORALIS_API_KEY,
  });
  if (event.httpMethod === "GET") {
    if (event.path === "/balances") {
      try {
        const { address } = event.queryStringParameters;
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
        return {
          statusCode: 200,
          headers: cors.headers,
          body: JSON.stringify({
            address,
            nativeBalance: nativeBalance.result.balance.ether,
            tokenBalances: tokenBalances.result.map((token) => token.display()),
          }),
        };
      } catch (error) {
        console.error(error);
        return {
          statusCode: 500,
          headers: cors.headers,
          body: JSON.stringify({ error: error.message }),
        };
      }
    }
  }
};
