import React from 'react';
import styles from './ModalAddUser.module.css';

export default function ModalAddUser() {
  return (
    <div className={styles.modalcontent}>
      <div className={styles.content}>
        <div className={styles.inputs}>
          <h4>Nombre</h4>
          <input type="text" name="nombre" />
        </div>
        <div className={styles.inputs}>
          <h4>Mail</h4>
          <input type="text" name="mail" />
        </div>
        <div className={styles.inputs}>
          <h4>Telefono</h4>
          <input type="text" name="telefono" />
        </div>
        <div className={styles.btncontent}>
          <button type="button" className={styles.btn}>
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
}
