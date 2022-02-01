import React, { useEffect } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useDispatch, useSelector } from 'react-redux';
import CompanyShopCard from '../../Components/CompanyShopCard/CompanyShopCard';
import styles from './ShopCart.module.css';
import { getCart, clearCart } from '../../redux/actions/cartActions';

export default function ShopCart() {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [cartByCommerce, setCartByCommerce] = React.useState();

  useEffect(() => {
    dispatch(getCart());
    window.scroll(0, 0);
  }, []);



  useEffect(() => {
    const byCommerce = [];
    cart.forEach((item) => {
      if (!byCommerce[item.product.company_id]) {
        byCommerce[item.product.company_id] = [item];
      } else {
        byCommerce[item.product.company_id].push(item);
      }
    });

    setCartByCommerce(byCommerce);
  }, [cart]);

  const handleClear = () => {
    dispatch(clearCart());
  };

  return (
    <div className={styles.generalDivContainer}>
      <div className={styles.generalSubDivContainer}>
        <div className={styles.divStringCart}>
          <p className={styles.StringCart}>
            Carrito{' '}
            <ShoppingCartIcon
              sx={{
                width: 20,
                height: 20,
                position: 'relative',
                top: 2,
                left: 2,
              }}
            />
          </p>
        </div>
        <div className={styles.CompanyShopCardContainer}>
          {cartByCommerce?.map((commerceCart) => (
            <CompanyShopCard cart={commerceCart} />
          ))}
        </div>
        <div className={styles.divClearButton}>
          {cart.length > 0 && (
            <button
              className={styles.clearButton}
              type="submit"
              onClick={handleClear}
            >
              Vaciar
            </button>
          )}
        </div>
        <div className={styles.emptyCart}>
          <h2>
            {cart.length <= 0 &&
              'Aun no agregaste ningun producto a tu carrito'}
          </h2>
        </div>
      </div>
    </div>
  );
}
