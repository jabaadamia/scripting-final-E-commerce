import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { sampleProducts } from './sampleProducts';
import './styles/ProductList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';


function ProductList() {
  const [products, setProducts] = useState([]);
  const { category } = useParams();

  const fetchProducts = async () => {
    setProducts(sampleProducts);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = category
    ? products.filter((product) => product.category.toLowerCase() === category.toLowerCase())
    : products;

  return (
    <div className="product-list">
      <div className="products-grid">
        {filteredProducts.map((product) => (
          <Link to={`/product/${product.id}`} key={product.id} className="product-card">
            <img src={product.images[0]} alt={product.name} className="product-image" />
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">${Number(product.price).toFixed(2)}</p>
            </div>
            <div className="add-to-cart"> 
              <FontAwesomeIcon icon={faCartShopping} />
            </div>

          </Link>
        ))}
      </div>
    </div>
  );
}

export default ProductList; 