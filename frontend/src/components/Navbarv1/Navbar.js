import { React, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useLocalState } from '../../util/useLocalStorage';
import './Navbar.css';

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [jwt, setJwt] = useLocalState("", "jwt");

    useEffect(() => {
        if(jwt) {
            setIsLoggedIn(true)
        }else{
            setIsLoggedIn(false) 
        }},[jwt])

    const handleLogout = () => {
            setJwt("");
            setIsLoggedIn(false);
          };


    return(
        <nav className="navbar">
        <ul>
          {!isLoggedIn && (
            <>
              <li>
                <NavLink to="/login" activeClassName="active-link">
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink to="/register" activeClassName="active-link">
                  Register
                </NavLink>
              </li>
              <li>
                <NavLink to="/homepage" activeClassName="active-link">
                  Homepage
                </NavLink>
              </li>
            </>
          )}
          {isLoggedIn && (
            <>
              <li>
                <NavLink to="/logout" activeClassName="active-link" onClick={handleLogout}>
                  Logout
                </NavLink>
              </li>
              <li>
                <NavLink to="/homepage" activeClassName="active-link">
                  Homepage
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard" activeClassName="active-link">
                  Dashboard
                </NavLink>
              </li>
            </>
        )}
        </ul>
      </nav>
    );
  }

export default Navbar;