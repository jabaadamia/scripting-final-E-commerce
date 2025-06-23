import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './styles/common.css';
import ProductList from './ProductList';
import Navbar from './componens/Navbar';
import ProductDetail from './ProductDetail';
import Cart from './Cart';
import { CartProvider } from './Context';

function App() {
  return (
    <Router>
      <CartProvider>
        <Navbar/>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/category/:category" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          {/*<Route path="/checkout" element={<Checkout />} />*/}
        </Routes>
      </CartProvider>
    </Router>
  );
}

export default App;
