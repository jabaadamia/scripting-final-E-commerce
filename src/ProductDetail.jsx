import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { sampleProducts } from './sampleProducts';
import './styles/ProductDetail.css';

function ProductDetail() {
  const { id } = useParams();
  const product = sampleProducts.find(p => String(p.id) === String(id));
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || '');
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);

  if (!product) return <div>Product not found</div>;

  return (
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
                onClick={() => setSelectedSize(size)}>
                {size}
              </button>
            ))}
          </div>
        </div>
        <div className="label">PRICE:</div>
        <div className="product-price-detail">${Number(product.price).toFixed(2)}</div>
        <button className="add-to-cart-detail">ADD TO CART</button>
        <div className="product-description">{product.description}</div>
      </div>
    </div>
  );
}

export default ProductDetail;
