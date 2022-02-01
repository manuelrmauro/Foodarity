/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import ModalProductDetails from '../ProductCard/ModalProductDetails';
import styles from './ProductShopCard.module.css';
import { removeInCart, addToCart } from '../../redux/actions/cartActions';

export default function ProductShopCard({ item }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false); 
  const [quantity, setQuantity] = React.useState(item.quantity);
  const dispatch = useDispatch();
  const [ablePlus, setAblePlus] = React.useState(false)
  const [ableMinus, setAbleMinus] = React.useState(false)
 
  useEffect(()=> {
    if (quantity < item.product.quantity)
    setAblePlus(true)
    if (quantity > 1)
    setAbleMinus(true)
  },[])

  useEffect(() => {
    if (quantity < item.product.quantity)
    setAblePlus(true)
    else 
    setAblePlus(false)
    if (quantity > 1)
    setAbleMinus(true)
    else
    setAbleMinus(false)
  },[quantity])

  const handleDelete = (pid) => {
    dispatch(removeInCart(pid));
  };

  const handleModifyQuantity = (pid, boolean) => {
    if (boolean) {
      dispatch(addToCart(pid, 1));
      setQuantity(quantity + 1);
    } else {
      dispatch(addToCart(pid, -1));
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className={styles.generalContainerDiv}>
      <div className={styles.subGeneralContainerDiv}>
        <div className={styles.divImg}>
          <img className={styles.img} src={item.product.photo.url} alt="" />
        </div>
        <div className={styles.lote}>
          <p>{item.product.lote}</p>
        </div>
        <div className={styles.details}>
          <button
            className={styles.buttonDetails}
            type="submit"
              onClick={handleOpen} 
          >
            Detalles
          </button>

            <ModalProductDetails
              product={item.product}
              open={open}
              handleClose={handleClose}
              item={item}
            />
        </div>
        <div className={styles.precio}>
          <p>
            <b>${Intl.NumberFormat("de-DE").format(item.product.price * item.quantity)},00</b>
          </p>
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.divInput}>
            <input
              className={styles.input}
              type="number"
              min="1"
              max={item.product.quantity}
              value={quantity}
              readOnly
            />
            <p className={styles.stock}>
              stock disponible {item.product.quantity}
            </p>
          </div>
          <div className={styles.divSumRest}>
            <button
              className={styles.sumButton}
              type="submit"
              onClick={() => {
                handleModifyQuantity(item.product_id, true);
              }}
              disabled={!ablePlus}
            >
              <AddBoxIcon />
            </button>
            <button
              className={styles.restButton}
              type="submit"
              onClick={() => {
                handleModifyQuantity(item.product_id, false);
              }}
              disabled={!ableMinus}
            >
              <IndeterminateCheckBoxIcon />
            </button>
          </div>
        </div>
        <div className={styles.icon}>
          <button
            className={styles.deleteButton}
            type="submit"
            onClick={() => {
              handleDelete(item.product_id);
            }}
          >
            <DeleteIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
