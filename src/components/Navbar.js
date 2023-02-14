import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  // Const that holds the style of the link active
  let activeStyle = {
    textDecoration: "underline",
  };

  return (
    <div className="navbar">
      <ul>
        <li>
          <a href="/home">HOME</a>
        </li>
        <li>
          <NavLink
            to="/starships"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            STARSHIPS
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
