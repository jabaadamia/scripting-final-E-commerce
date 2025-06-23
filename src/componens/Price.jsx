import { useCart } from '../Context';

function Price({priceUSD}) {
  const { currency, currencyRates } = useCart();

  return (
    <p className="product-price product-price-detail cart-summary-value">{currency}{Number(priceUSD*currencyRates[currency]).toFixed(2)}</p>
  );
}

export default Price;