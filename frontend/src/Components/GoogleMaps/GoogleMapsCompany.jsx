import React from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';

const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

function GoogleMapsCompany({ company }) {
  console.log(company);
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: GOOGLE_API_KEY,
          language: 'es',
          region: 'arg',
        }}
        defaultCenter={company.address.location}
        defaultZoom={7}
      >
        {company && (
          <Marker
            lat={company.address.location.lat}
            lng={company.address.location.lng}
            company={company}
            style={{
              position: 'absolute',
              transform: 'translate(-50%, -50%)',
            }}
          />
        )}
      </GoogleMapReact>
    </div>
  );
}

export default GoogleMapsCompany;
