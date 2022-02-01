/* eslint-disable react/jsx-no-bind */
import React from 'react';

import styles from './ProfileCompany.module.css';
import ProfileTempleteCommerce from '../../Components/ProfileCompanyComponents/ProfileTempleteCommerce';

export default function ProfileCompany() {
  return (
    <div className={styles.profilecompany}>
      <ProfileTempleteCommerce />
    </div>
  );
}
