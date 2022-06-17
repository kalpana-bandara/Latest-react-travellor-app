import React from "react";

const Header = () => {
  return (
    <React.Fragment>
      <div className="navbar">
        <div className="wrapper">
          <div className="nav">
            <div className="logo">
              <a href="/">
                <h2>Travel</h2>
              </a>
            </div>
            <div className="menu">
              <ul className="menu-items">
                <li>About Us</li>
                <li>Find a place</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Header;
