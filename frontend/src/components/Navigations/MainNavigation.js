import React from 'react';
import { NavLink } from 'react-router-dom';

import './MainNavigation.css';
import AuthContext from '../../context/auth-context';

const MainNavigation = props => (
  <AuthContext.Consumer>
    {context => {
      console.log(context)
      return (
        <header className="main-navigation">
          <div className="main-navigation__logo">
            <h1>Find Event</h1>
          </div>
          <nav className="main-navigation__items">
            <ul>
              {!context.token && (
                <li>
                  <NavLink to="/auth">authentication</NavLink>
                </li>
              )}
              <li>
                <NavLink to="/events">events</NavLink>
              </li>
              {context.token && (
                <React.Fragment>
                <li>
                  <NavLink to="/bookings">bookings</NavLink>
                </li>
                <li>
                  <button onClick={context.logout}>Logout</button>  
                </li>
                </React.Fragment>
              )}
            </ul>
          </nav>
        </header>
      );
    }}
  </AuthContext.Consumer>
);

export default MainNavigation;
