/* eslint-disable react/self-closing-comp */
import * as React from 'react';
import { useSelector } from 'react-redux';
import styles from './Pagination.module.css';

export default function Pagination({ paginado }) {
  const pageNumbers = [];
  const page = useSelector((state) => state.product.page);
  const pages = useSelector((state) => state.product.pages);

  // eslint-disable-next-line no-plusplus
  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className={styles.botoneraContent}>
      <ul className={styles.botones}>
        {pageNumbers &&
          pageNumbers.map((number) => {
            return (
              // eslint-disable-next-line react/button-has-type
              <button
                disabled={page === number}
                className={styles.btn}
                key={number}
                onClick={() => paginado(number)}
              >
                {number}
              </button>
            );
          })}
      </ul>
    </nav>
  );
}
