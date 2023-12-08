import { useState } from "react";
import {
  ArrowsUpDownIcon,
  Cog8ToothIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

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
  const [connected, setConnected] = useState(false);

  const [fromToken, setFromToken] = useState(contract["tokenA"]);
  const [toToken, setToToken] = useState(contract["tokenB"]);

  const [inputValue, setInputValue] = useState("0.00");
  const [outputValue, setOutputValue] = useState("0.00");

  const [balance, setBalance] = useState(6000);

  const handleSwap = async () => {
    e.preventDefault();
    console.log("swap handled");
  };

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
        aria-hidden="true"
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
              {/* <CurrencyDollarIcon className="h-5 my-auto font-bold ms-1" /> */}
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
            <form onSubmit={handleSwap} className="p-6 ">
              <div className="grid grid-flow-col grid-cols-2 space-x-2 p-0.5 rounded-md thin-border">
                <div className="rounded-md p-2 grid grid-flow-col grid-cols-3 space-x-2 ps-1 pe-5 bg-zinc-800">
                  <div className="grid place-content-center">
                    <img
                      src={fromToken.image}
                      alt=""
                      srcset=""
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
                  onChange={(e) => {
                    setInputValue(e.target.value);
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
                      srcset=""
                      className="my-auto rounded-full"
                    />
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm">To Token</p>
                    <p className="text-sm font-bold">{toToken.marker}</p>
                  </div>
                </div>
                <input
                  type="number"
                  name=""
                  id=""
                  className="w-full h-full bg-transparent border-0 text-end focus:ring-0 px-5"
                  value={outputValue}
                  onChange={(e) => {
                    setOutputValue(e.target.value);
                  }}
                />
              </div>

              <div className="mt-10 w-full">
                <button
                  href="#"
                  className="rounded-md bg-[#9747ff] px-3.5 py-3 text-sm font-semibold text-white shadow-sm w-full hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Swap
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="inline-flex absolute bottom-0 justify-start overflow-hidden w-full p-4 lg:px-8">
        <p className="text-white bg-zinc-800 px-3 py-1 rounded-2xl inline-flex text-sm">
          Powerd by <span className="text-[#9747ff] font-bold ms-1"> Yuki</span>{" "}
          <ChevronRightIcon className="h-5 my-auto font-bold" />
        </p>
      </div>
    </div>
  );
}
