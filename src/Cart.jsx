import React from 'react';
import { useCart } from './Context';
import './styles/Cart.css';
import { useNavigate } from 'react-router-dom';
import Price from './componens/Price';
import Navbar from './componens/Navbar';

function Cart() {
  const { cartItems, setCartItems, getTotalUSD } = useCart();
  const navigate = useNavigate();

  const handleQuantityChange = (idx, changeAmount) => {
    setCartItems(prevCart => {
      const updatedCart = prevCart.map((item, i) =>
        i === idx ? { ...item, quantity: item.quantity + changeAmount } : item
      );
      return updatedCart.filter(item => item.quantity > 0); // if 0 remove from cart
    });
  };

  const handleImageNav = (idx, dir) => {
    setCartItems(prevCart => prevCart.map((item, i) => {
      if (i !== idx) return item;
      
      const len = item.product.images.length;
      let newIdx = item.imageIdx + dir;
      
      if (newIdx < 0) newIdx = len - 1;
      if (newIdx >= len) newIdx = 0;
      
      return { ...item, imageIdx: newIdx };
    }));
  };

  const handleSizeChange = (idx, newSize) => {
    setCartItems(prevCart => prevCart.map((item, i) =>
      i === idx ? { ...item, size: newSize } : item
    ));
  };

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleContinue = () => {
    navigate('/shipping-info');
  };

  return (
    <div>
        <Navbar/>
        <div className="cart-container">
          <h1 className="cart-title">CART</h1>
          <div className="cart-list">
            {cartItems.map((item, idx) => (
              <div className="cart-item" key={idx}>
                <div className="cart-item-info">
                  <div className="cart-item-brand">{item.product.brand}</div>
                  <div className="cart-item-name">{item.product.name}</div>
                  <div className="cart-item-price"><Price priceUSD={item.product.price}/></div>
                  <div className="cart-item-sizes">
                    <div className="label">SIZE:</div>
                    <div className="sizes-list">
                      {item.product.sizes.map(size => (
                        <button
                          key={size}
                          className={`size-btn${item.size === size ? ' selected' : ''}`}
                          onClick={() => handleSizeChange(idx, size)}>
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="cart-item-controls">
                  <button className="qty-btn" onClick={() => handleQuantityChange(idx, 1)}>+</button>
                  <div className="cart-item-qty">{item.quantity}</div>
                  <button className="qty-btn" onClick={() => handleQuantityChange(idx, -1)}>-</button>
                </div>
                <div className="cart-item-image-list">
                  <img
                    src={item.product.images[item.imageIdx]}
                    alt={item.product.name}
                    className="cart-item-image"
                  />
                  {item.product.images.length > 1 && (
                    <div className="carousel-nav">
                      <button onClick={() => handleImageNav(idx, -1)}>{'<'}</button>
                      <button onClick={() => handleImageNav(idx, 1)}>{'>'}</button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <div>Quantity: <span className="cart-summary-value">{totalQuantity}</span></div>
            <div>Total: <Price priceUSD={getTotalUSD()}/></div>
            <button className="cart-continue-btn" onClick={handleContinue}>CONTINUE</button>
          </div>
      </div>
    </div> 
  );
}

export default Cart;
