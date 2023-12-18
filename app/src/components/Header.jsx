const Header = ({ balance }) => {
  return (
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
  );
};

export default Header;
