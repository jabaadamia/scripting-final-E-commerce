import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faBagShopping } from '@fortawesome/free-solid-svg-icons';
import { useCart } from '../Context';
import MiniCart from './MiniCart';

function Navbar() {
  const { cartItems, currency, setCurrency, isMiniCartOpen, setIsMiniCartOpen } = useCart();

  let cartItemCount = 0;
  for (let i = 0; i < cartItems.length; i++) {
    cartItemCount += cartItems[i].quantity;
  }

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  const toggleMiniCart = () => {
    setIsMiniCartOpen(prev => !prev);
  };

  const closeMiniCart = () => {
    setIsMiniCartOpen(false);
  };

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
      <div className="navbar-center">
        <Link to="/">
          <FontAwesomeIcon icon={faBagShopping} className="shopping-bag-icon" />
        </Link>
      </div>
      <div className="bar-link">
        <div>
          <select name="currency" value={currency} onChange={handleCurrencyChange}>
            <option value="$">$ USD</option>
            <option value="€">€ EUR</option>
            <option value="¥">¥ JPY</option>
          </select>
        </div>
        <div className="cart-icon-container" onClick={toggleMiniCart}>
          <FontAwesomeIcon icon={faCartShopping} />
          {cartItemCount > 0 && (
            <span className="cart-item-count-circle">{cartItemCount}</span>
          )}
        </div>
        {isMiniCartOpen && <MiniCart onClose={closeMiniCart} />}
      </div>
    </nav>
  );
}

export default Navbar; 