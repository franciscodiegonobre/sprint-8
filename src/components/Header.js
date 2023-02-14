import React from "react";
import logo from "../img/starwars_logo.jpg";

export default function Header() {
  function handleLogout() {
    localStorage.removeItem("isAuthenticated");
    window.location.pathname = "/";
  }

  return (
    <div className="header">
      <div className="header--leftspace"></div>
      <img src={logo} className="header--logo" />

      <a href="#" className="header--logout" onClick={handleLogout}>
        LOGOUT
      </a>
    </div>
  );
}
