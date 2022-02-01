import React from 'react';
import { Link } from 'react-router-dom';
// import Header from '../../Components/Header/Header';
import imgcomercio from '../../assets/Mask-Group.png';
import imgong from '../../assets/caridad-1.png';
import styles from './RollSelector.module.css';

export default function RollSelector() {
  return (
    <div className={styles.rollselector}>
      {/* <Link to='/'>
      <Header />
      </Link> */}
      <h1>Registrar mi</h1>
      <div className={styles.content}>
        <div className={styles.commercecontent}>
          <Link to="registerformcommerce">
            <button className={styles.btncomerce} type="submit">
              <img
                className={styles.imgcomerce}
                src={imgcomercio}
                width="74px"
                height="74"
                alt="comercio"
              />
            </button>
          </Link>

          <h3>Comercio</h3>
        </div>
        <div className={styles.ongcontent}>
          <Link to="register_form_ong">
            <button className={styles.btnong} type="submit">
              <img
                className={styles.imgong}
                src={imgong}
                width="74px"
                height="74"
                alt="ong"
              />
            </button>
          </Link>
          <h3>ONG</h3>
        </div>
      </div>
      <Link to='/home'>
      <button className={styles.btn} type="submit">
        Continuar como individuo
      </button>
      </Link>
    </div>
  );
}
