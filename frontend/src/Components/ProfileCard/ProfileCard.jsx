import React from 'react';
import styles from './ProfileCard.module.css';
import logo from '../../assets/user-6.png';

export default function ProfileCard() {
  return (
    <div className={styles.profilecard}>
      <div className={styles.profileimg}>
      <img className={styles.imguser} src={logo} alt="user" />
      </div>
      <div className={styles.content}>
        <h2 className={styles.nombre}>Nombre</h2>
        <button className={styles.btn} type="submit">
          Opciones de Perfil
        </button>
      </div>
    </div>
  );
}
