import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import sampleProducts from './sampleProducts.json';
import './styles/ProductDetail.css';
import { useCart } from './Context';
import Price from './componens/Price';
import Navbar from './componens/Navbar';

function ProductDetail() {
  const { id } = useParams();
  const product = sampleProducts.find(p => String(p.id) === String(id));
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || '');
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const { setCartItems } = useCart();

  if (!product) return <div>Product not found</div>;

  const handleAddToCart = () => {
    if (!selectedSize) {
      return;
    }

    setCartItems(prevCartItems => {
      const existingItemIndex = prevCartItems.findIndex(
        item => item.product.id === product.id && item.size === selectedSize
      );

      if (existingItemIndex > -1) {
        const updatedCart = [...prevCartItems];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + 1,
        };
        return updatedCart;
      } else {
        return [
          ...prevCartItems,
          {
            product: product,
            size: selectedSize,
            quantity: 1,
          },
        ];
      }
    });
  };

  return (
    <div>
      <Navbar/>
      <div className="product-detail-container">
        <div className="product-detail-images">
          <div className="product-thumbnails">
            {product.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                className={`thumbnail${selectedImageIdx === idx ? ' selected' : ''}`}
                onClick={() => setSelectedImageIdx(idx)}
                style={{ border: selectedImageIdx === idx ? '2px solid #5ECE7B' : 'none' }}
              />
            ))}
          </div>
          <div className="product-main-image">
            <img src={product.images[selectedImageIdx]} alt={product.name} />
          </div>
        </div>
        <div className="product-detail-info">
          <h1 className="product-brand">{product.brand}</h1>
          <h2 className="product-name">{product.name}</h2>
          <div className="product-sizes">
            <div className="label">SIZE:</div>
            <div className="sizes-list">
              {product.sizes.map(size => (
                <button
                  key={size}
                  className={`size-btn${selectedSize === size ? ' selected' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <div className="label">PRICE:</div>
          <Price priceUSD={product.price}/>
          <button className="add-to-cart-detail" onClick={handleAddToCart}>ADD TO CART</button>
          <div className="product-description">{product.description}</div>
        </div>
      </div>
    </div>
    
  );
}

export default ProductDetail;
