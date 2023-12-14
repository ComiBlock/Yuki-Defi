import { useEffect, useState } from "react";
import {
  ArrowsUpDownIcon,
  Cog8ToothIcon,
  ChevronRightIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import {
  getCelotoCUSDQuote,
  getCUSDtoCeloQuote,
  swapCUSDtoCelo,
  swapCelotoCUSD,
} from "../../YukiCelo/index";

const contract = {
  tokenA: {
    marker: "Celo",
    value: 1345,
    image:
      "https://pbs.twimg.com/profile_images/1613170131491848195/InjXBNx9_400x400.jpg",
  },
  tokenB: {
    marker: "cUSD",
    value: 2000,
    image:
      "https://cdn.iconscout.com/icon/premium/png-512-thumb/celo-dollar-cusd-7151091-5795784.png?f=webp&w=256",
  },
};

export default function App() {
  const [swapping, setSwapping] = useState(false);
  const [done, setDone] = useState(false);
  const [fetchingQuote, setFetchingQuote] = useState(false);

  const [direction, setDirection] = useState(contract["AtoB"]);
  const [fromToken, setFromToken] = useState(contract["tokenA"]);
  const [toToken, setToToken] = useState(contract["tokenB"]);

  const [inputValue, setInputValue] = useState("0.00");
  const [outputValue, setOutputValue] = useState("0.00");

  const [balance, setBalance] = useState(7);

  const handleSwap = async (e, inputValue) => {
    e.preventDefault();
    console.log("handling swap...", inputValue, outputValue);
    setSwapping(true);
    console.log("setting swapping to true");
    // const result = await swapCelotoCUSD(inputValue);
    setTimeout(() => {
      setBalance(balance + 2.31);
      setSwapping(false);
      setDone(true);
    }, [2000]);
    console.log("settign swapping to false");
  };

  // useEffect(() => {
  //   getCelotoCUSDQuote(4000);
  // }, []);

  const handleSwapInputOutput = async (e) => {
    e.preventDefault();
    setFromToken((prev) =>
      prev === contract["tokenA"] ? contract["tokenB"] : contract["tokenA"]
    );
    setToToken((prev) =>
      prev === contract["tokenA"] ? contract["tokenB"] : contract["tokenA"]
    );
  };

  return (
    <div className="isolate bg-zinc-950 h-[100svh] w-[100svw] overflow-hidden flex place-items-center justify-center">
      <div
        className="absolute inset-x-0 -bottom-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden={true}
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ddff80] to-[#2cec6c] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>

      <div className="container-sm text-white">
        <header className="inline-flex justify-between absolute inset-x-0 top-0 z-50">
          <nav
            className="flex items-center justify-between p-6 lg:px-8 w-full"
            aria-label="Global"
          >
            <div className="flex lg:flex-1">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img className="h-10 w-auto" src="/images/yuki.png" alt="" />
              </a>
            </div>
            <p className="text-white bg-zinc-800 px-3 py-1 rounded-2xl inline-flex text-sm ">
              Balance:{" "}
              <span className="text-[#9747ff] font-bold ms-1"> {balance}</span>{" "}
              <img
                src="https://pbs.twimg.com/profile_images/1613170131491848195/InjXBNx9_400x400.jpg"
                alt="celo balance"
                className="rounded-full h-4 my-auto font-bold ms-1"
              />
            </p>
          </nav>
        </header>
        <div className="px-3 sm:px-0 lg:px-8 my-auto ">
          <div className="mx-auto max-w-md py-6 rounded-2xl opacity-70 bg-zinc-900">
            <div className="inline-flex justify-between w-full thin-border-b px-6 pb-6 border-white">
              <p className="text-xl font-bold">Swap</p>
              <div className="h-9 rounded-full  bg-zinc-800 flex place-items-center p-2.5 w-fit hover:bg-zinc-700">
                <Cog8ToothIcon className="h-5 float-right flex-none" />
              </div>
            </div>
            <form onSubmit={(e) => handleSwap(e, inputValue)} className="p-6 ">
              <div className="grid grid-flow-col grid-cols-2 space-x-2 p-0.5 rounded-md thin-border">
                <div className="rounded-md p-2 grid grid-flow-col grid-cols-3 space-x-2 ps-1 pe-5 bg-zinc-800">
                  <div className="grid place-content-center">
                    <img
                      src={fromToken.image}
                      alt=""
                      srcSet=""
                      className="my-auto rounded-full"
                    />
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm">From Token</p>
                    <p className="text-sm font-bold">{fromToken.marker}</p>
                  </div>
                </div>
                <input
                  type="number"
                  name=""
                  id=""
                  className="w-full h-full bg-transparent border-0 text-end focus:ring-0 px-5"
                  value={inputValue}
                  onChange={async (e) => {
                    setFetchingQuote(true);
                    setInputValue((prev) => prev * 0 + e.target.value);
                    setOutputValue(await getCelotoCUSDQuote(inputValue));
                    setFetchingQuote(false);
                  }}
                />
              </div>
              <div className="my-3 grid-cols-none">
                <div className="h-9 rounded-full  bg-zinc-800 flex place-items-center p-2.5 w-fit mx-auto hover:bg-zinc-700">
                  <button onClick={(e) => handleSwapInputOutput(e)}>
                    <ArrowsUpDownIcon className=" object-contain h-5" />
                  </button>
                </div>
              </div>
              <div className="grid grid-flow-col grid-cols-2 space-x-2 p-0.5 rounded-md thin-border">
                <div className="rounded-md p-2 grid grid-flow-col grid-cols-3 space-x-2 ps-1 pe-5 bg-zinc-800">
                  <div className="grid place-content-center">
                    <img
                      src={toToken.image}
                      alt=""
                      srcSet=""
                      className="my-auto rounded-full"
                    />
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm">To Token</p>
                    <p className="text-sm font-bold">{toToken.marker}</p>
                  </div>
                </div>
                <input
                  type="text"
                  name=""
                  id=""
                  className="w-full h-full bg-transparent border-0 text-end focus:ring-0 px-5"
                  value={fetchingQuote ? "fetching quote..." : outputValue}
                  onChange={(e) => {
                    setOutputValue(e.target.value);
                  }}
                />
              </div>

              <div className="mt-10 w-full">
                {!swapping ? (
                  <button
                    role="submit"
                    disabled={swapping}
                    href="#"
                    className="rounded-md bg-[#9747ff] px-3.5 py-3 text-sm font-semibold text-white shadow-sm w-full hover:bg-[#9747ff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Swap
                  </button>
                ) : (
                  <button
                    href="#"
                    disabled={true}
                    className="rounded-md bg-[#9747ff] px-3.5 py-3 text-sm  font-semibold text-white shadow-sm w-full hover:bg-[#9747ff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    <div role="status">
                      <svg
                        aria-hidden={true}
                        class="inline w-4 h-4 p-0 text-white animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span class="sr-only">Loading...</span>
                    </div>
                  </button>
                  // ) : (
                  //   <button
                  //     disabled={true}
                  //     role="submit"
                  //     href="#"
                  //     className="rounded-md bg-[#9747ff] px-3.5 py-3 text-sm  font-semibold text-white shadow-sm w-full  focus-visible:outline focus-visible:outline-2  focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  //   >
                  //     <CheckIcon className="h-5 w-5 mx-auto" />
                  //   </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="inline-flex absolute bottom-0 justify-start overflow-hidden w-full p-4 lg:px-8">
        <p className="text-white bg-zinc-800 px-3 py-1 rounded-2xl inline-flex text-sm">
          Built for MiniPay{" "}
          <span className="text-[#9747ff] font-bold ms-1">
            {" "}
            <img
              src="https://cdn-production-opera-website.operacdn.com/staticfiles/assets/images/logo/logo-flat.724a32ec0873.svg"
              className="h-5 w-5 my-auto ms-1"
              alt=""
              srcSet=""
            />
          </span>{" "}
          <ChevronRightIcon className="h-5 my-auto font-bold" />
        </p>
      </div>
    </div>
  );
}
