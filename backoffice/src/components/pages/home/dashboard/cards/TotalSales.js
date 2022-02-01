// import { Icon } from '@iconify/react';
// import appleFilled from '@iconify/icons-ant-design/apple-filled';
import { FaDollarSign } from 'react-icons/fa';
// material
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
// utils
import { fShortenNumber } from '../../../../../helpers/formatNumber';

const RootStyle = styled(Card)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  borderRadius: '2em',
  backgroundImage: `linear-gradient(135deg, ${alpha(
    theme.palette.error.main,
    0
  )} 0%, ${alpha(theme.palette.error.main, 0.24)} 100%)`,
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  color: theme.palette.error.main,
  backgroundImage: `linear-gradient(135deg, ${alpha(
    theme.palette.error.main,
    0
  )} 0%, ${alpha(theme.palette.error.main, 0.24)} 100%)`,
}));

export default function TotalSales({ quantity }) {
  return (
    <RootStyle>
      <IconWrapperStyle>
        <FaDollarSign size={24} />
      </IconWrapperStyle>
      <Typography variant="h3">{fShortenNumber(quantity)}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Ventas Totales
      </Typography>
    </RootStyle>
  );
}
