/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { apiWithToken } from '../../services/api';

function Fail() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const externalReference = params.get('external_reference');
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    apiWithToken.put(`/orders/${externalReference}?fail=true`).then(() => {
      setRedirect(true);
    });
  }, [externalReference]);

  useEffect(() => {
    if (redirect) {
      alert('Hubo un error...');
      navigate('/cart');
    }
  }, [redirect]);

  return (
    <div
      style={{
        display: 'flex',
        width: '100vw',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      Redirecting...
    </div>
  );
}

export default Fail;
