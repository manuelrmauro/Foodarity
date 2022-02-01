import React from 'react';
import {Link} from 'react-router-dom';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import ProductShopCard from '../ProductShopCard/ProductShopCard';
import styles from './CompanyShopCard.module.css';



export default function CompanyShopCard({cart}) {

  const getTotalPrice = () => {
    let total = 0
    cart.forEach(item => {
      total += item.product.price * item.quantity
    })
    return Intl.NumberFormat("de-DE").format(total)
  }

  return (
    <div className={styles.generalDiv}>
      <div className={styles.productShopCardDiv}>
        <div className={styles.titleCompanyDiv}>
          {cart[0].product.company.logo && <img className={styles.companyPhoto}src={cart[0].product.company.logo?.url} alt="" />}
          <Link to={`/company/${cart[0].product.company_id}`}><p className={styles.titleCompany}>{cart[0].product.company.name}</p></Link>
        </div>
      </div>
      {cart?.map(item => <ProductShopCard item={item}/>)}
      
      <div className={styles.TotalDiv}>
          <p className={styles.total}>
              Total ${getTotalPrice()},00
          </p>
      </div>
      <div className={styles.buttonContainer}>
        <Link to={`/order/${cart[0].product.company_id}`}><button className={styles.buyButton} type="submit">
          Comprar{' '}
          <ShoppingCartCheckoutIcon
            sx={{ widht: 15, height: 15, position: 'relative', left: 2 }}
          />
        </button>
        </Link>
       
      </div>
    </div>
  );
}
