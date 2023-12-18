import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

export default function SelectBox(contracts, selected) {
  return (
    <div className="rounded-md grid grid-flow-col  space-x-2  bg-zinc-800">
      {/* <DropDown></DropDown> */}
      <Listbox value={selected} onChange={(e) => handleListChange(e)}>
        <div className="relative">
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
                  <p className="text-sm font-bold">{outputToken.marker}</p>
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
              {contracts.map((contract, index) => (
                <Listbox.Option
                  key={index}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-amber-100 text-[#9747ff]" : "text-white"
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
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
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
  );
}
