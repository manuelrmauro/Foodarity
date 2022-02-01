import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import ImageListItem from '@mui/material/ImageListItem';
import imagen from '../../assets/ayuda.png';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function NestedModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

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
        CONTACTO
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <div>
            <ImageListItem sx={{ width: '100%', height: '100%' }}>
              <img src={imagen} alt="phot" loading="lazy" />
            </ImageListItem>
          </div>
          {/* <ChildModal /> */}
        </Box>
      </Modal>
    </div>
  );
}
