import React from 'react';
import styles from './ShopCard.module.css';
import logo from '../../assets/Mask-Group.png';

export default function ProfileCard() {
    return (
      <div className={styles.ShopCard}>
        <div className={styles.profileimg}>
        <img className={styles.imguser} src={logo} alt="user" />
        </div>
        <div className={styles.content}>
            <div className={styles.nameDiv}>
        <h3 className={styles.name}>NOMBRE</h3>
        </div>
        <div className={styles.descriptionDiv}>
        <p className={styles.description}>Descripcion del producto</p>
        </div>
        </div>
      </div>
    );
  }
  