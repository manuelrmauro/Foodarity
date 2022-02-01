import React from 'react';
import estilos from './OngInfo.module.css';
import CarreteImg from './CarreteImg';
import InfoDonativo from './InfoDonativo';
import RegistraOng from './RegistraOng';

export default function OngInfo({info, user}) {
  return (
    <div>
      <div className={estilos.patern}>
        <div className={estilos.info}>
          <InfoDonativo nombre={info} user={user}/>
        </div>
        <div className={estilos.carrete}>
          <CarreteImg />
        </div>
      </div>
      <div>
        <div className={estilos.carrete}>
          <RegistraOng nombre={info } />
        </div>
      </div>
    </div>
  );
}
