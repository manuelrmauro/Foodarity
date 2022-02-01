// eslint-disable-next-line import/no-duplicates
import React from 'react';
// eslint-disable-next-line import/no-duplicates
import { useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import styles from './CompanyDetail.module.css';

import RegisterCompanyFormEditable from './RegisterCompanyFormEditable';

// const [displayForm, setDisplayForm] = useState(false);

export default function CompanyDetail({ company }) {
  const [displayDetail, setDisplayDetail] = useState(true);

  function handleOnclick() {
    setDisplayDetail(false);
  }

  function handleBack() {
    setDisplayDetail(true);
  }

  return (
    <div className={styles.infocont}>
      {displayDetail ? (
        <div className={styles.companydetail}>
          <div>
            <Typography
              variant="h4"
              className={styles.companydetailFont}
              gutterBottom
              component="div"
              sx={{ color: '#7ED957', marginTop: 4 }}
            >
              Información de Cuenta
            </Typography>
          </div>
          <div>
            <Typography
              className={styles.companydetailFont1}
              variant="h6"
              gutterBottom
              component="div"
              sx={{ color: '#7ED957', marginTop: '1em' }}
            >
              Nombre comercio:
              <span
                style={{ color: '#8865b9' }}
                className={styles.companydetailFont1}
              >
                {' '}
                {company.name || 'Usuario no registrado'}{' '}
              </span>
            </Typography>
          </div>
          <Typography
            variant="h6"
            className={styles.companydetailFont1}
            gutterBottom
            component="div"
            sx={{ color: '#7ED957', marginTop: '1em' }}
          >
            Descripción:
            <span
              style={{ color: '#8865b9' }}
              className={styles.companydetailFont1}
            >
              {' '}
              {company.description || 'Usuario no registrado'}{' '}
            </span>
          </Typography>

          {/* <div className={styles.cont}>
            <h3 className={styles.titulo}>Descripcion:</h3>
            <h3 className={styles.descripcion}>{company.description}</h3>
          </div> */}
          <Typography
            className={styles.companydetailFont1}
            variant="h6"
            gutterBottom
            component="div"
            sx={{ color: '#7ED957', marginTop: '1em' }}
          >
            Email:
            <span
              style={{ color: '#8865b9' }}
              className={styles.companydetailFont1}
            >
              {' '}
              {company.email || 'email no registrado'}{' '}
            </span>
          </Typography>
          {/* <div className={styles.cont}>
            <h3 className={styles.titulo}>Email de la Empresa:</h3>
            <h3 className={styles.descripcion}>{company.email}</h3>
          </div> */}
          <Typography
            className={styles.companydetailFont1}
            variant="h6"
            gutterBottom
            component="div"
            sx={{ color: '#7ED957', marginTop: '1em' }}
          >
            Url sitio Web:
            <span
              style={{ color: '#8865b9' }}
              className={styles.companydetailFont1}
            >
              {' '}
              {company.website || 'Sitio no registrado'}{' '}
            </span>
          </Typography>

          {/* <div className={styles.cont}>
            <h3 className={styles.titulo}>Url sitio Web:</h3>
            <h3 className={styles.descripcion}>{company.website}</h3>
          </div> */}

          <Typography
            variant="h6"
            className={styles.companydetailFont1}
            gutterBottom
            component="div"
            sx={{ color: '#7ED957', marginTop: '1em' }}
          >
            Teléfono:
            <span
              style={{ color: '#8865b9' }}
              className={styles.companydetailFont1}
            >
              {' '}
              {company.phone || 'Telefono no registrado'}{' '}
            </span>
          </Typography>
          <Typography
            className={styles.companydetailFont1}
            variant="h6"
            gutterBottom
            component="div"
            sx={{ color: '#7ED957', marginTop: '1em' }}
          >
            Dirección:
            <span
              style={{ color: '#8865b9' }}
              className={styles.companydetailFont1}
            >
              {' '}
              Calle: {company.address.street}{' '}
            </span>
            <span
              style={{ color: '#8865b9' }}
              className={styles.companydetailFont1}
            >
              {' '}
              Altura: {company.address.number},{' '}
            </span>
            <span
              style={{ color: '#8865b9' }}
              className={styles.companydetailFont1}
            >
              {' '}
              Ciudad: {company.address.city.name},{' '}
            </span>
            <span
              style={{ color: '#8865b9' }}
              className={styles.companydetailFont1}
            >
              {' '}
              {company.address.state.name},{' '}
            </span>
            <span
              style={{ color: '#8865b9' }}
              className={styles.companydetailFont1}
            >
              {' '}
              Código Postal: {company.address.zipcode}.{' '}
            </span>
          </Typography>

          <Typography
            variant="h6"
            className={styles.companydetailFont1}
            gutterBottom
            component="div"
            sx={{ color: '#7ED957', marginTop: '1em' }}
          >
            Estado:
            <span
              style={{
                color: company.status === 'Habilitada' ? '#8865b9' : 'red',
              }}
              className={styles.companydetailFont1}
            >
              {company.status}
            </span>
          </Typography>

          <div className={styles.btncont}>
            <Button
              onClick={() => handleOnclick()}
              sx={{
                backgroundColor: '#7ED957',
                '&:hover': { backgroundColor: '#7ED95790 !important' },
                marginTop: 5,
                paddingLeft: 5,
                paddingRight: 5,
              }}
            >
              EDITAR DATOS
            </Button>
          </div>
        </div>
      ) : (
        // eslint-disable-next-line react/jsx-no-bind
        <RegisterCompanyFormEditable
          company={company}
          // eslint-disable-next-line react/jsx-no-bind
          handleBack={handleBack}
        />
      )}
    </div>
  );
}
