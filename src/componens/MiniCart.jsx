import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../Context';
import '../styles/MiniCart.css';
import Price from './Price';

function MiniCart({ onClose }) {
  const { cartItems, setCartItems, getTotalUSD } = useCart();
  const navigate = useNavigate();

  const handleQuantityChange = (idx, changeAmount) => {
    setCartItems(prevCart => {
      const updatedCart = prevCart.map((item, i) =>
        i === idx ? { ...item, quantity: item.quantity + changeAmount } : item
      );
      return updatedCart.filter(item => item.quantity > 0);
    });
  };

  const handleSizeChange = (idx, newSize) => {
    setCartItems(prevCart => prevCart.map((item, i) =>
      i === idx ? { ...item, size: newSize } : item
    ));
  };

  const totalQty = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleViewBag = () => {
    navigate('/cart');
    onClose();
  };

  const handleCheckOut = () => {
    navigate('/shipping-info');
  }

  return (
    <div className="mini-cart-dropdown">
      <div className="mini-cart-header">
        My Bag, <span className="mini-cart-item-count">{totalQty}</span> items
      </div>

      <div className="mini-cart-list">
        {cartItems.map((item, idx) => (
          <div className="mini-cart-item" key={idx}>
            <div className="mini-cart-item-info">
              <div className="mini-cart-item-brand">{item.product.brand}</div>
              <div className="mini-cart-item-name">{item.product.name}</div>
              <div className="mini-cart-item-price"><Price priceUSD={item.product.price}/></div>
              <div className="mini-cart-item-sizes">
                <div className="mini-label">Size:</div>
                <div className="mini-sizes-list">
                  {item.product.sizes.map(size => (
                    <button
                      key={size}
                      className={`mini-size-btn${item.size === size ? ' selected' : ''}`}
                      onClick={() => handleSizeChange(idx, size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mini-cart-controls">
              <button className="mini-qty-btn" onClick={() => handleQuantityChange(idx, 1)}>+</button>
              <div className="mini-cart-qty">{item.quantity}</div>
              <button className="mini-qty-btn" onClick={() => handleQuantityChange(idx, -1)}>-</button>
            </div>

            <div className="mini-cart-image">
              <img src={item.product.images[item.imageIdx]} alt={item.product.name} />
            </div>
          </div>
        ))}
      </div>

      <div className="mini-cart-total">
        Total
        <Price priceUSD={getTotalUSD()}/>
      </div>

      <div className="mini-cart-actions">
        <button className="mini-cart-view-bag-btn" onClick={handleViewBag}>VIEW BAG</button>
        <button className="mini-cart-checkout-btn" onClick={handleCheckOut}>CHECK OUT</button>
      </div>
    </div>
  );
}

export default MiniCart; 