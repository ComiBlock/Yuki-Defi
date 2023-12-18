import {
  getQuotes,
  getCelotoCUSDQuote,
  getCUSDtoCeloQuote,
  getCelotoeXOFQuote,
  geteXOFtoCeloQuote,
  getCelotocEURQuote,
  getcEURtoCeloQuote,
  getCelotocREALQuote,
  getcREALtoCeloQuote,
  swapCelotoCUSD,
  swapCUSDtoCelo,
  swapCelotocEUR,
  swapcEURToCelo,
  swapCelotoeXOF,
  swapeXOFtoCelo,
  swapCelotocREAL,
  swapcREALtoCelo,
} from "../api/api";

const cUSD = {
  marker: "cUSD",
  image:
    "https://cdn.iconscout.com/icon/premium/png-512-thumb/celo-dollar-cusd-7151091-5795784.png?f=webp&w=256",
};

const Celo = {
  marker: "Celo",
  image:
    "https://pbs.twimg.com/profile_images/1613170131491848195/InjXBNx9_400x400.jpg",
};

const cEURO = {
  marker: "cEUR",
  image:
    "https://static.coinpaprika.com/coin/ceur-celo-euro/logo.png?rev=10657677",
};

const eXOF = {
  marker: "cXOF",
  image:
    "https://app.mento.org/_next/static/media/eXOF.96a9bf26.svg",
};

const cREAL = {
  marker: "cREAL",
  image:
    "https://assets.coingecko.com/coins/images/27205/standard/creal.png?1696526254",
};

export const contracts = [
  {
    marker: "Celo",
    image:
      "https://pbs.twimg.com/profile_images/1613170131491848195/InjXBNx9_400x400.jpg",
    pairs: [
      { ...cUSD, getQuote: getCelotoCUSDQuote, swap: swapCelotoCUSD },
      { ...cEURO, getQuote: getCelotocEURQuote, swap: swapCelotocEUR },
      { ...eXOF, getQuote: getCelotoeXOFQuote, swap: swapCelotoeXOF },
      { ...cREAL, getQuote: getCelotocREALQuote, swap: swapCelotocREAL },
    ],
  },

  {
    marker: "cUSD",
    image:
      "https://cdn.iconscout.com/icon/premium/png-512-thumb/celo-dollar-cusd-7151091-5795784.png?f=webp&w=256",
    pairs: [{ ...Celo, getQuote: getCUSDtoCeloQuote, swap: swapCUSDtoCelo }],
  },

  {
    marker: "cEUR",
    image:
      "https://static.coinpaprika.com/coin/ceur-celo-euro/logo.png?rev=10657677",
    pairs: [{ ...Celo, getQuote: getcEURtoCeloQuote, swap: swapcEURToCelo }],
  },
  {
    marker: "cXOF",
    image:
    "https://app.mento.org/_next/static/media/eXOF.96a9bf26.svg",
    pairs: [{ ...Celo, getQuote: geteXOFtoCeloQuote, swap: swapeXOFtoCelo }],
  },
  {
    marker: "cREAL",
    image:
      "https://media.licdn.com/dms/image/D4D03AQG6yj3du_8CqQ/profile-displayphoto-shrink_100_100/0/1699560835172?e=1708560000&v=beta&t=G9S3oQAtkTxrOGGn_kEFzKsINwKshmC7Y_LduSkwTmE",
    pairs: [{ ...Celo, getQuote: getcREALtoCeloQuote, swap: swapcREALtoCelo }],
  },
];
