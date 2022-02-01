import React from 'react';

import styles from './ProfileUser.module.css';

import ProfileUserTemplate from '../../Components/ProfileUserComponent/ProfileUserTemplate';

export default function ProfileUser() {
  return (
    <div className={styles.profileuser}>
      <ProfileUserTemplate />
    </div>
  );
}
