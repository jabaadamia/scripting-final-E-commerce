import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';


function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="categories bar-link">
        <NavLink
          to="/category/man"
          className={({ isActive }) =>
            isActive ? "category-link active-link" : "category-link"
          }
        >
          MAN
        </NavLink>
        <NavLink
          to="/category/woman"
          className={({ isActive }) =>
            isActive ? "category-link active-link" : "category-link"
          }
        >
          WOMAN
        </NavLink>
        <NavLink
          to="/category/kids"
          className={({ isActive }) =>
            isActive ? "category-link active-link" : "category-link"
          }
        >
          KIDS
        </NavLink>
      </div>
      <div className="bar-link">
        <div>
          <select name="currency">
            <option value="USD">$ USD</option>
            <option value="EUR">€ EUR</option>
            <option value="JPY">¥ JPY</option>
          </select>
        </div>
        <Link to="/cart" className="cart-link">
          <FontAwesomeIcon icon={faCartShopping} />
        </Link>
      </div>
    </nav>
  );
}

export default Navbar; 