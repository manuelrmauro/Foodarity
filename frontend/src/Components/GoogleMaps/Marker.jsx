import React from 'react';
import { Link } from 'react-router-dom';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import styles from './Maker.module.css';

function Marker({company}) {

  window.scroll(0, 0)

  return(  
  <div >
    <Link to={`/company/${company.id}`} textDecoration="none">

  
      {company.company_type_id === 1?
       (<div className={styles.nameCommerce}>{company.name}</div>)
        : (<div className={styles.nameONG}>{company.name}</div>) }
    
    {company.company_type_id === 1 ?
    <LocationOnIcon color='primary' sx={{fontSize:35}}/> :
    <LocationOnIcon color='secondary'sx={{fontSize:35}}/> 
    }
    </Link>
  </div>
  )}

export default Marker;
