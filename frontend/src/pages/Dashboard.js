import React from "react";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="dashboard">
      <h1>Welocome to Incubation Management</h1>
      <ul>
        <li>
          <Link className="link" to="/register">
            <FaUser /> Register
          </Link>
        </li>
        <li>
          <Link className="link" to="/login">
            <FaSignInAlt /> Login
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Dashboard;
