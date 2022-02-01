import React, {useEffect} from 'react';
import MenuItem from '@mui/material/MenuItem';
import {useSelector, useDispatch} from 'react-redux'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Divider from '@mui/material/Divider';
import { getCart, removeInCart} from '../../redux/actions/cartActions'
import styles from './CartMenu.module.css'

function CartMenu() {

  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart.cart)

  useEffect(() => {
    dispatch(getCart())
  }, [])

  const handleRemove = (id) => {
    dispatch(removeInCart(id))
  }


  return (
    <span>
      {cart?.map(item => {
        return <div className={styles.cartItemContainer}>
        <span className={styles.quantity}>{item.quantity}</span>
        <span className={styles.name}>{item.product.lote}</span>
          <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="vista-mobile"
              aria-haspopup="true"
              color="error"
              onClick={() => {handleRemove(item.product_id)}}
            >
              <DeleteIcon/>
            </IconButton>
          </div>
      })}
      {!cart.length && <div  className={styles.empty}>
      CARRITO VACIO
      </div>}
      {cart.length > 0 && <div  className={styles.btnToCart} >
      <Divider/>
        <Link to='/cart' className={styles.myCartCont}>
      <MenuItem className={styles.myCart}>
        <p className={styles.p}>Mi Carrito</p>
          <IconButton
          className={styles.icon}
            size="large"
            aria-label="show 17 new notifications"
            color="secondary"
            >
                <ShoppingCartIcon />
          </IconButton>
        </MenuItem>
            </Link>
      </div>}
      
    </span>
  );
}

export default CartMenu;
