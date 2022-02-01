// import { Icon } from '@iconify/react';
// import appleFilled from '@iconify/icons-ant-design/apple-filled';
import { FaUsers } from 'react-icons/fa';
// material
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
// utils
import { fShortenNumber } from '../../../../../helpers/formatNumber';

const RootStyle = styled(Card)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  borderRadius: '2em',
  background: `linear-gradient(135deg, ${alpha(
    theme.palette.primary.dark,
    0
  )} 0%, ${alpha(theme.palette.primary.dark, 0.24)} 100%)`,
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
  color: theme.palette.primary.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(
    theme.palette.primary.dark,
    0
  )} 0%, ${alpha(theme.palette.primary.dark, 0.24)} 100%)`,
}));

export default function TotalUsers({ quantity }) {
  return (
    <RootStyle>
      <IconWrapperStyle>
        <FaUsers size={24} />
      </IconWrapperStyle>
      <Typography variant="h3">{fShortenNumber(quantity)}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Usuarios Totales Registrados
      </Typography>
    </RootStyle>
  );
}
