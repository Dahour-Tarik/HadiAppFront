import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

function NavBarBox() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink exact to="/" className="nav-logo">
            HadiApp
            <i className="fas fa-code"></i>
          </NavLink>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                exact
                to="/boxFile"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Box
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/History"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                History
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/recherche"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Recherche
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/Profil"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Profil
              </NavLink>
            </li>
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBarBox;