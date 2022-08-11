import React from "react";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../../config/firebase";
import "./Navbar.css";
const Navbar = ({ user }) => {
  // console.log(user);
  const history = useHistory();
  const logoutHandler = () => {
    auth.signOut();
    history.push("/login");
  };
  return (
    <>
      <div className="ftyg" style={{ padding: "0 10px" }}>
        <div className="head">
          <Link to="#" className="brand-logo">
            <h4>TODO</h4>
          </Link>
        </div>
        <ul id="nav-mobile" className="right">
          {user ? (
            <li>
              <button className="nav-button" onClick={logoutHandler}>
                <Link to="/login">
                  <span>Logout</span>
                </Link>
              </button>
            </li>
          ) : (
            <>
              <li>
                <button className="nav-button">
                  <Link to="/login">
                    {" "}
                    <span>LogIn</span>
                  </Link>
                </button>

                <button className="nav-button">
                  <Link to="/signup">
                    <span>SignUp</span>
                  </Link>
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
