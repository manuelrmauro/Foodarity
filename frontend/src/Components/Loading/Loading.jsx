import React from 'react';
import logo from '../../assets/Loading3.gif';
import styles from './Loading.module.css';

export default function Loading() {
  return (
    <div className={styles.loading}>
      <img src={logo} alt="loading" width="400" />
    </div>
  );
}
