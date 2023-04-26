const Moralis = require("moralis").default;

const { EvmChain } = require("@moralisweb3/common-evm-utils");

exports.handler = async function (event, context) {
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
      body: JSON.stringify({
        // formatting the output
        address,
        nativeBalance: nativeBalance.result.balance.ether,
        tokenBalances: tokenBalances.result.map((token) => token.display()),
      }),
    };
  } catch (error) {
    // Handle errors
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
