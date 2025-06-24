import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './styles/common.css';
import ProductList from './ProductList';
import ProductDetail from './ProductDetail';
import Cart from './Cart';
import ShippingInfo from './ShippingInfo';
import ShippingMethod from './ShippingMethod';
import Checkout from './Checkout';
import Success from './Success';
import { CartProvider } from './Context';

function App() {
  return (
    <Router>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/category/man" replace />} />
          <Route path="/category/:category" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/shipping-info" element={<ShippingInfo />} />
          <Route path="/shipping-method" element={<ShippingMethod />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/success" element={<Success />} />
        </Routes>
      </CartProvider>
    </Router>
  );
}

export default App;
