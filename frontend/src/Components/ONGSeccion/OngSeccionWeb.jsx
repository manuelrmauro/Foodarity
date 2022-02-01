import * as React from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import styles from './OngSeccionWeb.module.css';
import avatarDefault from '../../assets/avatar_default.png';

export default function OngSeccion({ ong }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const ImageButton = styled(ButtonBase)(({ theme }) => ({
    position: 'relative',
    height: 200,
    margin: 1,

    [theme.breakpoints.down('sm')]: {
      width: '100% !important',
      height: 100,
      borderRadius: '5px 5px 5px 5px',
    },
    '&:hover, &.Mui-focusVisible': {
      zIndex: 1,
      '& .MuiImageBackdrop-root': {
        opacity: 0.1,
      },
      '& .MuiImageMarked-root': {
        opacity: 0,
      },
      '& .MuiTypography-root': {
        border: '4px solid currentColor',
        borderRadius: '5px 5px 5px 5px',
      },
    },
    '& .MuiTypography-root': {
      border: '2px solid currentColor',
      borderRadius: '5px 5px 5px 5px',
    },
  }));

  const Image = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    height: '100%',
    color: theme.palette.common.white,
    borderRadius: '5px 5px 5px 5px',
  }));

  const ImageBackdrop = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.2,
    transition: theme.transitions.create('opacity'),
    borderRadius: '5px 5px 5px 5px',
  }));

  return (
    <div>
      <Button
        onClick={handleOpen}
        sx={{
          backgroundColor: '#7ED957',
          '&:hover': { backgroundColor: '#7ED95790 !important' },
          marginTop: 1,
        }}
      >
        NUESTRAS ONGs
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <div>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              minWidth: 200,
              width: '100%',
              padding: '1em',
              sm: `100%`,
              zIndex: 9999,
            }}
          >
            <Link to={`/company/${ong.id}`}>
              <ImageButton
                focusRipple
                key={ong.id}
                sx={{ width: '100%', backgroundColor: 'white' }}
              >
                <img
                  src={ong.logo ? ong.logo.url : avatarDefault}
                  alt=""
                  className={styles.imgOngs}
                />
                <ImageBackdrop className="MuiImageBackdrop-root" />
                <Image>
                  {/* <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              sx={{
                backgroundColor: '#7ED95740',
                position: 'relative',
                p: 4,
                pt: 2,
                pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                borderRadius: '5px',
              }}
            >
              {ong.name}
              <ImageMarked className="MuiImageMarked-root" />
            </Typography> */}
                </Image>
              </ImageButton>
            </Link>
          </Box>
        </div>
      </Modal>
    </div>
  );
}
