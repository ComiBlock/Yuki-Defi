import { useEffect,  Fragment, useState  } from "react";
import { ethers } from "ethers";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import {
  ArrowDownIcon,
  Cog8ToothIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import Header from "../components/Header";
import { contracts } from "../utils/data";

export default function Swap() {
  const [swapping, setSwapping] = useState(false);
  const [done, setDone] = useState(false);
  const [fetchingQuote, setFetchingQuote] = useState(false);
  const [error, setError] = useState(undefined)

  const [inputToken, setInputToken] = useState(contracts[0]);
  const [outputToken, setOutputToken] = useState(inputToken.pairs[0]);
  const [inputValue, setInputValue] = useState(0);
  const [outputValue, setOutputValue] = useState(0);
  const [balance, setBalance] = useState(7);


  const handleSwap = async (e) => {
    e.preventDefault();
    if (outputValue){
      setSwapping(true);
      try {
        const result = await outputToken.swap(outputValue)
        setDone(true);
        setSwapping(false);
      } catch (error) {
        setError(error)
      }finally{
        setInputValue(0);
        setOutputValue(0);
      }
    }
  };

  const handleInputToken = async (e) => {
    setInputToken(e);
  };

  const handleOutputToken = async (e) => {
    setOutputToken(e);
  };

  const handleInputValue = async (e) => {
    const value = e.target.value;
    setInputValue(+value);
  };

  const handleOutputValue = async (e) => {
    setOutputValue(e);
  };

  useEffect(()=>{
    // Ensure MiniPay provider is available
    if (window.ethereum && window.ethereum.isMiniPay) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
    } else {
      console.error("MiniPay provider not detected");
    }

  },[])


  useEffect(() => {
    setOutputToken(inputToken.pairs[0]);
    setInputValue(0);
    setOutputValue(0);
  }, [inputToken]);

  useEffect(() => {
    setInputValue(0);
    setOutputValue(0);
  }, [outputToken]);

  useEffect(() => {
    const fetchOutputQuote = async () => {
      setFetchingQuote(true);
      const inputNumber = parseFloat(inputValue);
      if (!isNaN(inputNumber) && inputNumber > 0) {
        setOutputValue(await outputToken.getQuote(inputNumber));
      }

      setFetchingQuote(false);
      setFetchingQuote(false);
    };
    if (inputValue > 0) {
      if (inputValue !== "" && !isNaN(parseInt(inputValue))) {
        fetchOutputQuote();
      }
    }
  }, [inputValue]);

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
        <Header balance={balance.toFixed(2)} />
        <div className="px-3 sm:px-0 lg:px-8 my-auto ">
          <div className="mx-auto max-w-md py-6 rounded-2xl opacity-70 bg-zinc-900">
            <div className="inline-flex justify-between w-full thin-border-b px-6 pb-6 border-white">
              <p className="text-xl font-bold">Swap</p>
              <div className="h-9 rounded-full  bg-zinc-800 flex place-items-center p-2.5 w-fit hover:bg-zinc-700">
                <Cog8ToothIcon className="h-5 float-right flex-none" />
              </div>
            </div>
            <form onSubmit={(e) => handleSwap(e)} className="p-6 ">
              {/* INPUT */}
              <div className="grid grid-flow-col grid-cols-2 space-x-2 p-0.5 rounded-md thin-border">
                <div className="rounded-md grid grid-flow-col  space-x-2  bg-zinc-800">
                  <Listbox
                    value={inputToken}
                    onChange={(e) => handleInputToken(e)}
                  >
                    <div className="relative">
                      <Listbox.Button className="relative w-full cursor-default rounded-lg py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                        <span className="block truncate">
                          <div className="rounded-md p-2 grid grid-flow-col grid-cols-3 space-x-2 ps-1 pe-5 bg-zinc-800">
                            <div className="grid place-content-center">
                              <img
                                src={inputToken.image}
                                alt=""
                                srcSet=""
                                className="my-auto rounded-full"
                              />
                            </div>
                            <div className="col-span-2">
                              <p className="text-sm">To Token</p>
                              <p className="text-sm font-bold">
                                {inputToken.marker}
                              </p>
                            </div>
                          </div>
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                          <ChevronUpDownIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </span>
                      </Listbox.Button>
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-zinc-800 py-1 text-white shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                          {contracts.map((contract, index) => (
                            <Listbox.Option
                              key={index}
                              className={({ active }) =>
                                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                  active
                                    ? "bg-amber-100 text-[#9747ff]"
                                    : "text-white"
                                }`
                              }
                              value={contract}
                            >
                              {({ selected }) => (
                                <>
                                  <span
                                    className={`block truncate ${
                                      selected ? "font-medium" : "font-normal"
                                    }`}
                                  >
                                    {contract.marker}
                                  </span>
                                  {selected ? (
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#9747ff]">
                                      <CheckIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </Listbox>
                </div>
                <input
                  type="number"
                  name=""
                  id=""
                  className="w-full h-full bg-transparent border-0 text-end focus:ring-0 px-5"
                  value={parseFloat(inputValue)}
                  onChange={(e) => {
                    handleInputValue(e);
                  }}
                />
              </div>
              <div className="my-3 grid-cols-none">
                <div className="h-9 rounded-full  bg-zinc-800 flex place-items-center p-2.5 w-fit mx-auto hover:bg-zinc-700">
                  <ArrowDownIcon className=" object-contain h-5" />
                </div>
              </div>
              {/* OUTPUT */}
              <div className="grid grid-flow-col grid-cols-2 space-x-2 p-0.5 rounded-md thin-border">
                <div className="rounded-md grid grid-flow-col  space-x-2  bg-zinc-800">
                  <Listbox
                    value={outputToken}
                    onChange={(e) => handleOutputToken(e)}
                  >
                    <div className="relative z-0">
                      <Listbox.Button className="relative w-full cursor-default rounded-lg py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                        <span className="block truncate">
                          <div className="rounded-md p-2 grid grid-flow-col grid-cols-3 space-x-2 ps-1 pe-5 bg-zinc-800">
                            <div className="grid place-content-center">
                              <img
                                src={outputToken.image}
                                alt=""
                                srcSet=""
                                className="my-auto rounded-full"
                              />
                            </div>
                            <div className="col-span-2">
                              <p className="text-sm">To Token</p>
                              <p className="text-sm font-bold">
                                {outputToken.marker}
                              </p>
                            </div>
                          </div>
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                          <ChevronUpDownIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </span>
                      </Listbox.Button>
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-zinc-800 py-1 text-white shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                          {inputToken.pairs.map((contract, index) => (
                            <Listbox.Option
                              key={index}
                              className={({ active }) =>
                                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                  active
                                    ? "bg-amber-100 text-[#9747ff]"
                                    : "text-white"
                                }`
                              }
                              value={contract}
                            >
                              {({ selected }) => (
                                <>
                                  <span
                                    className={`block truncate ${
                                      selected ? "font-medium" : "font-normal"
                                    }`}
                                  >
                                    {contract.marker}
                                  </span>
                                  {selected ? (
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#9747ff]">
                                      <CheckIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </Listbox>
                </div>
                <input
                  type="text"
                  name="outputValue"
                  placeholder="0.00"
                  id=""
                  className="w-full h-full bg-transparent border-0 text-end focus:ring-0 px-5"
                  value={
                    fetchingQuote
                      ? "fetching quote..."
                      : parseFloat(outputValue).toFixed(2)
                  }
                  onChange={(e) => {
                    handleOutputValue(e);
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
                ) : !done? (
                  <button
                    disabled={true}
                    role="submit"
                    href="#"
                    className="rounded-md bg-[#9747ff] px-3.5 py-3 text-sm  font-semibold text-white shadow-sm w-full  focus-visible:outline focus-visible:outline-2  focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    <CheckIcon className="h-5 w-5 mx-auto" />
                  </button>
              ):(
                  <button
                    href="#"
                    disabled={true}
                    className="rounded-md bg-[#9747ff] px-3.5 py-3 text-sm  font-semibold text-white shadow-sm w-full hover:bg-[#9747ff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    <div role="status">
                      <svg
                        aria-hidden={true}
                        className="inline w-4 h-4 p-0 text-white animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
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
                      <span className="sr-only">Loading...</span>
                    </div>
                  </button>
                  ) }
              </div>

             { error?.length && <div className="mt-4">
              <p className="text-white bg-zinc-800 px-3 py-1 rounded-2xl inline-flex text-xs border border-red-600">
          <span className="text-red-600 font-bold mx-1 text-xs">
            Error:          </span>{" "}
          {error}
        </p>
              </div>}
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
