import React from "react";

const Header = () => {
  return (
    // Make a navbar with logo, link to dashbaord and contact page
    <nav className="navbar navbar-expand-lg navbar-light bg-blue-200 flex mb-5">
      <a className="navbar-brand" href="/">
        <img
          src="https://www.freepnglogos.com/uploads/eagle-png-logo/lakes-eagles-png-logo-14.png"
          width="150"
          height="150"
          alt=""
          loading="lazy"
          className="p-2"
        />
      </a>

      <div className="flex w-full" id="navbarNav">
        <ul className="flex w-full justify-around items-center">
          <li className="">
            <a className="hover:text-sm" href="/">
              Home
            </a>
          </li>
          <li className="">
            <a className="hover:text-sm" href="/transactions">
              Unit Price Calculator
            </a>
          </li>
          <li className="">
            <a className="hover:text-sm" href="/balances">
              Balance
            </a>
          </li>
          <li className="">
            <a className="hover:text-sm" href="/how-much-received">
              How Much Received
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
