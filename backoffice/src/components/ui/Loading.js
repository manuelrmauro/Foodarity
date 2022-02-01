import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export const Loading = () => {
  return (
    <Backdrop
      sx={{
        color: '#fff',
        zIndex: 999,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      }}
      open
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};
