import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {

  const [cartItems, setCartItems] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });

  const [currency, setCurrency] = useState(localStorage.getItem("currency") || "$");

  const [activeCategory, setActiveCategory] = useState("MAN");

  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    zip: "",
    country: "",
  });

  const [shippingMethod, setShippingMethod] = useState(null);

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiry: "",
    cvc: "",
    nameOnCard: "",
  });

  const [isMiniCartOpen, setIsMiniCartOpen] = useState(false);

  const currencyRates = {
    "$": 1,
    "€": 0.87,
    "¥": 146,
  };

  const getTotalUSD = () => {
    const rate = currencyRates[currency];
    let total = 0;
    for (let item of cartItems){
        total += item.product.price * item.quantity;
    }
    return total;
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("currency", currency);
  }, [currency]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        currency,
        setCurrency,
        activeCategory,
        setActiveCategory,
        shippingInfo,
        setShippingInfo,
        shippingMethod,
        setShippingMethod,
        paymentInfo,
        setPaymentInfo,
        isMiniCartOpen,
        setIsMiniCartOpen,
        currencyRates,
        getTotalUSD,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
