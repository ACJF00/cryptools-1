import { React, useState } from "react";
import logo from "../images/logos/Cryptools-logos_transparent.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  console.log("isOpen", isOpen);
  return (
    // Make a navbar with logo, link to dashbaord and contact page
    <nav className="bg-blue-50 flex mb-5 shadow-sm justify-between sm:items-center">
      <a className="" href="/">
        <img
          src={logo}
          alt=""
          loading="lazy"
          className="h-[100px] w-[100px] pl-2 sm:h-[200px] sm:w-[200px]"
        />
      </a>

      <button
        className="text-[#5166a7] pr-2 z-10 sm:hidden"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <svg className="fill-current h-[55px] w-[55px]" viewBox="0 0 20 20">
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
        </svg>
        Menu
      </button>

      <div
        className={`w-full absolute sm:flex sm:justify-end sm:pr-4 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <ul className="relative top-[5em] left-[10em] sm:top-0 sm:left-0 rounded-lg shadow-xl shadow-slate-300 bg-white w-1/2 p-3 justify-around items-center text-lg sm:flex">
          <li className="">
            <a className="hover:text-green-600" href="/">
              Home
            </a>
          </li>
          <li className="">
            <a className="hover:text-green-600" href="/transactions">
              Unit Price Calculator
            </a>
          </li>
          <li className="">
            <a className="hover:text-green-600" href="/balances">
              Balance
            </a>
          </li>
          <li className="">
            <a className="hover:text-green-600" href="/how-much-received">
              How Much Received
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
