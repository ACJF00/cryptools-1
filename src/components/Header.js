import React from "react";
import logo from "../images/logos/Cryptools-logos_transparent.png";

const Header = () => {
  return (
    // Make a navbar with logo, link to dashbaord and contact page
    <nav className="navbar navbar-expand-lg navbar-light bg-blue-50 flex mb-5 shadow-sm">
      <a className="navbar-brand" href="/">
        <img
          src={logo}
          width="200"
          height="200"
          alt=""
          loading="lazy"
          className=""
        />
      </a>

      <div className="flex w-full" id="navbarNav">
        <ul className="flex w-full justify-around items-center text-lg ">
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
