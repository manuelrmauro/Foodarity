import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GoogleMapReact from 'google-map-react'
import Marker from './Marker'
import { getCompanies } from '../../redux/actions/CompaniesActions';
import styles from './GoogleMaps.module.css'

const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;



function GoogleMaps() {
 
  const companies = useSelector(state => state.companies.companies)
  const dispatch = useDispatch()

  const [allCompanies , setAllCompanies] = useState()


  useEffect(() => {
    dispatch(getCompanies())
  },[])

  useEffect(() => {
    setAllCompanies(companies.filter(company => company.deleted === false && company.status === "Habilitada"))
  },[companies])

    return (
    <div className={styles.container}>
      <h1 className={styles.title}>Estamos en todo el pais</h1>
      
      <div className={styles.contRef}>
          <h1 className={styles.titleRef}>Referencias</h1>
         <LocationOnIcon color='secondary'sx={{fontSize:40}}/> <p className={styles.textRefOng}>ONG</p>
          <LocationOnIcon color='primary' sx={{fontSize:40}}/><p className={styles.textRefCommers}>COMERCIOS</p>
        </div>

    <div className={styles.map}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: GOOGLE_API_KEY, language: 'es', region: 'arg'}}
          defaultCenter={{
            lat: -35.65647600357001,
            lng:-58.857827012037816,
             
          }} 
          defaultZoom={7.5}
          
        >      
        {allCompanies && allCompanies.map(company => (<Marker
        key={company.id}
        lat={company.address.location.lat}
        lng={company.address.location.lng}
        company={company}
        style={{
            position: 'absolute',
            transform: 'translate(-50%, -50%)'
          }}/>))}
        </GoogleMapReact>

    
      </div>
      
      </div>
      );
      
}


export default GoogleMaps;
