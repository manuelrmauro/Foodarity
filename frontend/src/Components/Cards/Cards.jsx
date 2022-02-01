import React from 'react';
import styles from './Cards.module.css';
import ProductCard from '../ProductCard/ProductCard';
import productos from './product.json';

export default function Cards() {
  //   const product = JSON.parse(productos);

  return (
    <div className={styles.cont}>
      {productos.map((p) => (
        <div>
          <ProductCard image={p.photo} />
        </div>
      ))}
    </div>
  );
}
