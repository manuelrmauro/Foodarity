/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import styles from './ProductCard.module.css';
import ModalProductDetails from './ModalProductDetails';

export default function ProductCard({ product }) {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  return (
    <div className={styles.productcard}>
      <div className={styles.divImg}>
        <img src={product.photo.url} alt="food" className={styles.img} />
      </div>
      <div className={styles.content}>
        <div className={styles.nameDiv}>
          <h3 className={styles.name}>{product.lote}</h3>
        </div>
        <p className={styles.description}>
          {product.description.slice(0, 70)}...
        </p>
        <div className={styles.divInc}>
          <p className={styles.nameInc}>{product.company.name}</p>
          <p className={styles.precio}>${product.price}</p>
        </div>
        <div className={styles.btnContainer}>
          <div className={styles.btndetdiv}>
            <button
              onClick={handleOpen}
              className={styles.btndet}
              type="submit"
            >
              {' '}
              Ver detalle
            </button>
            <ModalProductDetails open={open} handleClose={handleClose} product={product}/>
          </div>
        </div>
      </div>
    </div>
  );
}
