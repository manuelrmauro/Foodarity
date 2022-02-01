import * as React from 'react';
// import { useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Link } from 'react-router-dom';

/**
 * Este componente es un alert para los componentes Formularios Crear Comercio y Crear ONG.
 * Puede editarse el CSS de acuerdo a la documentación de Material UI,
 * además de cambiar su mensaje de acuerdo al objetivo que se requiera.
 */
export default function AlertDialog({ display }) {
  const [open, setOpen] = React.useState(false);
  // const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault(e);
  //   dispatch(startLogin(input.email, input.password));
  // };

  return (
    <div>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
        disabled={display}
      >
        Enviar Solicitud
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Solicitud Enviada</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Su solicitud ha sido recibida con éxito. Revisaremos sus datos y
            confirmaremos dentro de las próximas 48 horas. Para dudas o
            comentarios sobre su solicitud, enviar email a help@foodarity.com
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* BOTON OK: Este botón debe agregarse 
          un handleSubmit o handleChange para que redirija los datos de registro al Backend 
          y además redirija al Home una vez haya finalizado. 
          Actualmente solo tiene un handleClose para cerrar ventana */}
          <Link to="/home">
            <Button onClose={handleClose}>OK</Button>
          </Link>
        </DialogActions>
      </Dialog>
    </div>
  );
}
