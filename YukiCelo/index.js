import { Wallet, providers, utils } from "ethers";

import { Mento } from "@mento-protocol/mento-sdk";

async function getQuotes() {
  const provider = new providers.JsonRpcProvider(
    "https://alfajores-forno.celo-testnet.org"
  );
  const mento = await Mento.create(provider);
  const pairs = await mento.getTradeablePairs();
  console.log(pairs);
}

async function getCelotocEURQuote(amount) {

  const provider = new providers.JsonRpcProvider(
    "https://alfajores-forno.celo-testnet.org"
  );
  const mento = await Mento.create(provider);

  const celoTokenAddr = "0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9";
  const cEURTokenAddr = "0x10c892A6EC43a53E45D0B916B4b7D383B1b78C0F";
  const tokenUnits = 18;

  // how much cEUR can I get for 1 CELO?
  const amountIn = utils.parseUnits(`${amount}`, tokenUnits);
  const quoteAmountOut = await mento.getAmountOut(
    celoTokenAddr,
    cEURTokenAddr,
    amountIn
  );

  console.log(
    `~${utils.formatUnits(
      quoteAmountOut,
      tokenUnits
    )} cEUR in exchange for ${amount} CELO`
  );

}

async function getCelotoeXOFQuote(amount) {

  const provider = new providers.JsonRpcProvider(
    "https://alfajores-forno.celo-testnet.org"
  );
  const mento = await Mento.create(provider);

  const celoTokenAddr = "0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9";
  const eXOFTokenAddr = "0xB0FA15e002516d0301884059c0aaC0F0C72b019D";
  const tokenUnits = 18;

  // how much cEUR can I get for 1 CELO?
  const amountIn = utils.parseUnits(`${amount}`, tokenUnits);
  const quoteAmountOut = await mento.getAmountOut(
    celoTokenAddr,
    eXOFTokenAddr,
    amountIn
  );

  console.log(
    `~${utils.formatUnits(
      quoteAmountOut,
      tokenUnits
    )} eXOF in exchange for ${amount} CELO`
  );

}
//0xB0FA15e002516d0301884059c0aaC0F0C72b019D
async function getCelotocREALQuote(amount) {

    const provider = new providers.JsonRpcProvider(
      "https://alfajores-forno.celo-testnet.org"
    );
    const mento = await Mento.create(provider);
  
    const celoTokenAddr = "0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9";
    const cRealTokenAddr = "0xE4D517785D091D3c54818832dB6094bcc2744545";
    const tokenUnits = 18;
  
    // how much cREAL can I get for 1 CELO?
    const amountIn = utils.parseUnits(`${amount}`, tokenUnits);
    const quoteAmountOut = await mento.getAmountOut(
      celoTokenAddr,
      cRealTokenAddr,
      amountIn
    );
  
    console.log(
      `~${utils.formatUnits(
        quoteAmountOut,
        tokenUnits
      )} cReal in exchange for ${amount} CELO`
    );
  
  }

async function getCelotoCUSDQuote(amount){

  const provider = new providers.JsonRpcProvider(
    "https://alfajores-forno.celo-testnet.org"
  );
  const mento = await Mento.create(provider);

  const celoTokenAddr = "0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9";
  const cUSDTokenAddr = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1";
  const tokenUnits = 18;

  // how much cUSD can I get for 1 CELO?
  const amountIn = utils.parseUnits(`${amount}`, tokenUnits);
  const quoteAmountOut = await mento.getAmountOut(
    celoTokenAddr,
    cUSDTokenAddr,
    amountIn
  );

  console.log(
    `~${utils.formatUnits(
      quoteAmountOut,
      tokenUnits
    )} cUSD in exchange for ${amount} CELO`
  );

}

async function getCUSDtoCeloQuote(amount){

  const provider = new providers.JsonRpcProvider(
    "https://alfajores-forno.celo-testnet.org"
  );
  const mento = await Mento.create(provider);

  const celoTokenAddr = "0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9";
  const cUSDTokenAddr = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1";
  const tokenUnits = 18;

  // how much cUSD do I need to buy 1 CELO?
  const amountOut = utils.parseUnits(`$`, tokenUnits);
  const quoteAmountIn = await mento.getAmountIn(
    cUSDTokenAddr,
    celoTokenAddr,
    amountOut
  );

  console.log(
    `~${utils.formatUnits(quoteAmountIn, tokenUnits)} cUSD needed to buy ${amount} CELO`
  );
}


/*

CELO and CUSD Swaps

*/
async function swapCelotoCUSD(amount) {
  const privateKey = "0x48c2fa42791dfe31166d8d5c5272ea7b80ee3636e87d85e953bc8a860e81b4f5";

  const provider = new providers.JsonRpcProvider(
    "https://alfajores-forno.celo-testnet.org"
  );
  const signer = new Wallet(privateKey, provider);
  const mento = await Mento.create(signer);

  const celoTokenAddr = "0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9";
  const cUSDTokenAddr = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1";
  const tokenUnits = 18; // both CELO and cUSD have 18 decimal places

  const amountIn = utils.parseUnits(`${amount}`, tokenUnits);
  const quoteAmountOut = await mento.getAmountOut(
    celoTokenAddr,
    cUSDTokenAddr,
    amountIn
  );

  console.log(
    `~${utils.formatUnits(
      quoteAmountOut,
      tokenUnits
    )} cUSD in exchange for ${amount} CELO`
  );

  console.log("Increasing trading allowance...");
  const allowanceTxObj = await mento.increaseTradingAllowance(
    celoTokenAddr,
    amountIn
  );
  const allowanceTx = await signer.sendTransaction(allowanceTxObj);
  const allowanceReceipt = await allowanceTx.wait();
  console.log("tx receipt: ", allowanceReceipt);

  console.log("Swapping CELO for cUSD...");
  const expectedAmountOut = quoteAmountOut.mul(99).div(100); // allow 1% slippage from quote
  const swapTxObj = await mento.swapIn(
    celoTokenAddr,
    cUSDTokenAddr,
    amountIn,
    expectedAmountOut
  );
  const swapTx = await signer.sendTransaction(swapTxObj);
  const swapTxReceipt = await swapTx.wait();
  console.log("tx receipt: ", swapTxReceipt);
}

async function swapCUSDtoCelo(amount) {
  const privateKey = "0x48c2fa42791dfe31166d8d5c5272ea7b80ee3636e87d85e953bc8a860e81b4f5";

  const provider = new providers.JsonRpcProvider(
    "https://alfajores-forno.celo-testnet.org"
  );
  const signer = new Wallet(privateKey, provider);
  const mento = await Mento.create(signer);

  const celoTokenAddr = "0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9";
  const cUSDTokenAddr = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1";
  const tokenUnits = 18; // both CELO and cUSD have 18 decimal places

  const amountIn = utils.parseUnits(`${amount}`, tokenUnits);
  const quoteAmountOut = await mento.getAmountOut(
    cUSDTokenAddr,
    celoTokenAddr,
    amountIn
  );

  console.log(
    `~${utils.formatUnits(
      quoteAmountOut,
      tokenUnits
    )} CELO in exchange for ${amount} cUSD`
  );

  console.log("Increasing trading allowance...");
  const allowanceTxObj = await mento.increaseTradingAllowance(
    cUSDTokenAddr,
    amountIn
  );
  const allowanceTx = await signer.sendTransaction(allowanceTxObj);
  const allowanceReceipt = await allowanceTx.wait();
  console.log("tx receipt: ", allowanceReceipt);

  console.log("Swapping CELO for cUSD...");
  const expectedAmountOut = quoteAmountOut.mul(99).div(100); // allow 1% slippage from quote
  const swapTxObj = await mento.swapIn(
    cUSDTokenAddr,
    celoTokenAddr,
    amountIn,
    expectedAmountOut
  );
  const swapTx = await signer.sendTransaction(swapTxObj);
  const swapTxReceipt = await swapTx.wait();
  console.log("tx receipt: ", swapTxReceipt);
}

/*

CELO and CEUR Swaps

*/

async function swapCelotocEUR(amount) {
  const privateKey = "0x48c2fa42791dfe31166d8d5c5272ea7b80ee3636e87d85e953bc8a860e81b4f5";

  const provider = new providers.JsonRpcProvider(
    "https://alfajores-forno.celo-testnet.org"
  );
  const signer = new Wallet(privateKey, provider);
  const mento = await Mento.create(signer);

  const celoTokenAddr = "0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9";
  const cEURTokenAddr = "0x10c892A6EC43a53E45D0B916B4b7D383B1b78C0F";
  const tokenUnits = 18; // both CELO and cUSD have 18 decimal places

  const amountIn = utils.parseUnits(`${amount}`, tokenUnits);
  const quoteAmountOut = await mento.getAmountOut(
    celoTokenAddr,
    cEURTokenAddr,
    amountIn
  );

  console.log(
    `~${utils.formatUnits(
      quoteAmountOut,
      tokenUnits
    )} cEUR in exchange for ${amount} CELO`
  );

  console.log("Increasing trading allowance...");
  const allowanceTxObj = await mento.increaseTradingAllowance(
    celoTokenAddr,
    amountIn
  );
  const allowanceTx = await signer.sendTransaction(allowanceTxObj);
  const allowanceReceipt = await allowanceTx.wait();
  console.log("tx receipt: ", allowanceReceipt);

  console.log("Swapping CELO for cEUR...");
  const expectedAmountOut = quoteAmountOut.mul(99).div(100); // allow 1% slippage from quote
  const swapTxObj = await mento.swapIn(
    celoTokenAddr,
    cEURTokenAddr,
    amountIn,
    expectedAmountOut
  );
  const swapTx = await signer.sendTransaction(swapTxObj);
  const swapTxReceipt = await swapTx.wait();
  console.log("tx receipt: ", swapTxReceipt);
}

async function swapcEURToCelo(amount) {
  const privateKey = "0x48c2fa42791dfe31166d8d5c5272ea7b80ee3636e87d85e953bc8a860e81b4f5";

  const provider = new providers.JsonRpcProvider(
    "https://alfajores-forno.celo-testnet.org"
  );
  const signer = new Wallet(privateKey, provider);
  const mento = await Mento.create(signer);

  const celoTokenAddr = "0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9";
  const cEURTokenAddr = "0x10c892A6EC43a53E45D0B916B4b7D383B1b78C0F";
  const tokenUnits = 18; // both CELO and cUSD have 18 decimal places

  const amountIn = utils.parseUnits(`${amount}`, tokenUnits);
  const quoteAmountOut = await mento.getAmountOut(
    cEURTokenAddr,
    celoTokenAddr,
    amountIn
  );

  console.log(
    `~${utils.formatUnits(
      quoteAmountOut,
      tokenUnits
    )} Celo in exchange for ${amount} cEur`
  );

  console.log("Increasing trading allowance...");
  const allowanceTxObj = await mento.increaseTradingAllowance(
    cEURTokenAddr,
    amountIn
  );
  const allowanceTx = await signer.sendTransaction(allowanceTxObj);
  const allowanceReceipt = await allowanceTx.wait();
  console.log("tx receipt: ", allowanceReceipt);

  console.log("Swapping cEUR for CELO...");
  const expectedAmountOut = quoteAmountOut.mul(99).div(100); // allow 1% slippage from quote
  const swapTxObj = await mento.swapIn(
    cEURTokenAddr,
    celoTokenAddr,
    amountIn,
    expectedAmountOut
  );
  const swapTx = await signer.sendTransaction(swapTxObj);
  const swapTxReceipt = await swapTx.wait();
  console.log("tx receipt: ", swapTxReceipt);
}

/*

CELO and eXOF Swaps

*/

async function swapCelotoeXOF(amount) {
  const privateKey = "0x48c2fa42791dfe31166d8d5c5272ea7b80ee3636e87d85e953bc8a860e81b4f5";

  const provider = new providers.JsonRpcProvider(
    "https://alfajores-forno.celo-testnet.org"
  );
  const signer = new Wallet(privateKey, provider);
  const mento = await Mento.create(signer);

  const celoTokenAddr = "0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9";
  const eXOFTokenAddr = "0xB0FA15e002516d0301884059c0aaC0F0C72b019D";
  const tokenUnits = 18; // both have 18 decimal places

  const amountIn = utils.parseUnits(`${amount}`, tokenUnits);
  const quoteAmountOut = await mento.getAmountOut(
    celoTokenAddr,
    eXOFTokenAddr,
    amountIn
  );

  console.log(
    `~${utils.formatUnits(
      quoteAmountOut,
      tokenUnits
    )} eXOF in exchange for ${amount} Celo`
  );

  console.log("Increasing trading allowance...");
  const allowanceTxObj = await mento.increaseTradingAllowance(
    celoTokenAddr,
    amountIn
  );
  const allowanceTx = await signer.sendTransaction(allowanceTxObj);
  const allowanceReceipt = await allowanceTx.wait();
  console.log("tx receipt: ", allowanceReceipt);

  console.log("Swapping CELO for eXOF...");
  const expectedAmountOut = quoteAmountOut.mul(99).div(100); // allow 1% slippage from quote
  const swapTxObj = await mento.swapIn(
    celoTokenAddr,
    eXOFTokenAddr,
    amountIn,
    expectedAmountOut
  );
  const swapTx = await signer.sendTransaction(swapTxObj);
  const swapTxReceipt = await swapTx.wait();
  console.log("tx receipt: ", swapTxReceipt);
}

async function swapeXOFtoCelo(amount) {
  const privateKey = "0x48c2fa42791dfe31166d8d5c5272ea7b80ee3636e87d85e953bc8a860e81b4f5";

  const provider = new providers.JsonRpcProvider(
    "https://alfajores-forno.celo-testnet.org"
  );
  const signer = new Wallet(privateKey, provider);
  const mento = await Mento.create(signer);

  const celoTokenAddr = "0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9";
  const eXOFTokenAddr = "0xB0FA15e002516d0301884059c0aaC0F0C72b019D";
  const tokenUnits = 18; // both have 18 decimal places

  const amountIn = utils.parseUnits(`${amount}`, tokenUnits);
  const quoteAmountOut = await mento.getAmountOut(
    eXOFTokenAddr,
    celoTokenAddr,
    amountIn
  );

  console.log(
    `~${utils.formatUnits(
      quoteAmountOut,
      tokenUnits
    )} Celo in exchange for ${amount} eXOF`
  );

  console.log("Increasing trading allowance...");
  const allowanceTxObj = await mento.increaseTradingAllowance(
    eXOFTokenAddr,
    amountIn
  );
  const allowanceTx = await signer.sendTransaction(allowanceTxObj);
  const allowanceReceipt = await allowanceTx.wait();
  console.log("tx receipt: ", allowanceReceipt);

  console.log("Swapping CELO for eXOF...");
  const expectedAmountOut = quoteAmountOut.mul(99).div(100); // allow 1% slippage from quote
  const swapTxObj = await mento.swapIn(
    eXOFTokenAddr,
    celoTokenAddr,
    amountIn,
    expectedAmountOut
  );
  const swapTx = await signer.sendTransaction(swapTxObj);
  const swapTxReceipt = await swapTx.wait();
  console.log("tx receipt: ", swapTxReceipt);
}

/*

CELO and cREAL Swaps

*/

async function swapCelotocREAL(amount) {
  const privateKey = "0x48c2fa42791dfe31166d8d5c5272ea7b80ee3636e87d85e953bc8a860e81b4f5";

  const provider = new providers.JsonRpcProvider(
    "https://alfajores-forno.celo-testnet.org"
  );
  const signer = new Wallet(privateKey, provider);
  const mento = await Mento.create(signer);

  const celoTokenAddr = "0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9";
  const cREALTokenAddr = "0xE4D517785D091D3c54818832dB6094bcc2744545";
  const tokenUnits = 18; // both have 18 decimal places

  const amountIn = utils.parseUnits(`${amount}`, tokenUnits);
  const quoteAmountOut = await mento.getAmountOut(
    celoTokenAddr,
    cREALTokenAddr,
    amountIn
  );

  console.log(
    `~${utils.formatUnits(
      quoteAmountOut,
      tokenUnits
    )} cREAL in exchange for ${amount} Celo`
  );

  console.log("Increasing trading allowance...");
  const allowanceTxObj = await mento.increaseTradingAllowance(
    celoTokenAddr,
    amountIn
  );
  const allowanceTx = await signer.sendTransaction(allowanceTxObj);
  const allowanceReceipt = await allowanceTx.wait();
  console.log("tx receipt: ", allowanceReceipt);

  console.log("Swapping CELO for cREAL...");
  const expectedAmountOut = quoteAmountOut.mul(99).div(100); // allow 1% slippage from quote
  const swapTxObj = await mento.swapIn(
    celoTokenAddr,
    cREALTokenAddr,
    amountIn,
    expectedAmountOut
  );
  const swapTx = await signer.sendTransaction(swapTxObj);
  const swapTxReceipt = await swapTx.wait();
  console.log("tx receipt: ", swapTxReceipt);
}

async function swapcREALtoCelo(amount) {
  const privateKey = "0x48c2fa42791dfe31166d8d5c5272ea7b80ee3636e87d85e953bc8a860e81b4f5";

  const provider = new providers.JsonRpcProvider(
    "https://alfajores-forno.celo-testnet.org"
  );
  const signer = new Wallet(privateKey, provider);
  const mento = await Mento.create(signer);

  const celoTokenAddr = "0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9";
  const cREALTokenAddr = "0xE4D517785D091D3c54818832dB6094bcc2744545";
  const tokenUnits = 18; // both have 18 decimal places

  const amountIn = utils.parseUnits(`${amount}`, tokenUnits);
  const quoteAmountOut = await mento.getAmountOut(
    cREALTokenAddr,
    celoTokenAddr,
    amountIn
  );

  console.log(
    `~${utils.formatUnits(
      quoteAmountOut,
      tokenUnits
    )} Celo in exchange for ${amount} cREAL`
  );

  console.log("Increasing trading allowance...");
  const allowanceTxObj = await mento.increaseTradingAllowance(
    cREALTokenAddr,
    amountIn
  );
  const allowanceTx = await signer.sendTransaction(allowanceTxObj);
  const allowanceReceipt = await allowanceTx.wait();
  console.log("tx receipt: ", allowanceReceipt);

  console.log("Swapping CELO for cREAL...");
  const expectedAmountOut = quoteAmountOut.mul(99).div(100); // allow 1% slippage from quote
  const swapTxObj = await mento.swapIn(
    cREALTokenAddr,
    celoTokenAddr,
    amountIn,
    expectedAmountOut
  );
  const swapTx = await signer.sendTransaction(swapTxObj);
  const swapTxReceipt = await swapTx.wait();
  console.log("tx receipt: ", swapTxReceipt);
}



//getCelotocREALQuote(10)
getCelotocEURQuote(10)
//getCelotoCUSDQuote(10)
//getCelotoeXOFQuote(10)
