import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import styles from './Terminos.module.css'

export default function Terminos() {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <span>
      <button
      type='button'
        onClick={handleClickOpen('paper')}
        className={styles.terms}
       /*  variant="outlined"
        backgroundColor="primary"
        color="primary"
        fontStyle="bold"
        sx={{
          backgroundColor: 'primary',
          height: '2.51em',
          fontSize: '.75em',
          margin: '.5em 2em 2em',
          hover: false,
        }} */
      >
        TERMINOS Y CONDICIONES
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Condiciones de Uso</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            {[...new Array(1)]
              .map(
                () => `Este contrato describe los términos y condiciones generales (los "Términos y Condiciones Generales") aplicables al uso de los servicios ofrecidos por Foodarity. ("los Servicios") dentro del sitio web. Cualquier persona que desee acceder y/o usar el sitio o los servicios podrá hacerlo sujetándose a los Términos y Condiciones Generales, junto con todas las demás políticas y principios que rigen Foodarity.

CUALQUIER PERSONA QUE NO ACEPTE ESTOS TÉRMINOS Y CONDICIONES GENERALES, LOS CUALES TIENEN UN CARÁCTER OBLIGATORIO Y VINCULANTE, DEBERÁ ABSTENERSE DE UTILIZAR EL SITIO Y/O LOS SERVICIOS.

El Usuario debe leer, entender y aceptar todas las condiciones establecidas en los Términos y Condiciones Generales y en las Políticas de Privacidad así como en los demás documentos incorporados a los mismos por referencia, previo a su inscripción como Usuario de Foodarity.

01 - Capacidad
Los Servicios sólo están disponibles para personas que tengan capacidad legal para contratar. No podrán utilizar los servicios las personas que no tengan esa capacidad, los menores de edad o Usuarios de Foodarity que hayan sido suspendidos temporalmente o inhabilitados definitivamente. Si estás inscribiendo un Usuario como Comercio u ONG, debes tener capacidad para contratar a nombre de tal entidad y de obligar a la misma en los términos de este Acuerdo.

02 - Inscripción
Es obligatorio completar el formulario de inscripción en todos sus campos con datos válidos para poder utilizar los servicios que brinda Foodarity. El futuro Usuario deberá completarlo con su información personal de manera exacta, precisa y verdadera ("Datos Personales") y asume el compromiso de actualizar los Datos Personales conforme resulte necesario. Foodarity podrá utilizar diversos medios para identificar a sus Usuarios, pero Foodarity NO se responsabiliza por la certeza de los Datos Personales provistos por sus Usuarios. Los Usuarios garantizan y responden, en cualquier caso, de la veracidad, exactitud, vigencia y autenticidad de los Datos Personales ingresados.


Foodarity se reserva el derecho de solicitar algún comprobante y/o dato adicional a efectos de corroborar los Datos Personales, así como de suspender temporal o definitivamente a aquellos Usuarios cuyos datos no hayan podido ser confirmados. En estos casos de inhabilitación, se dará de baja todos los artículos publicados, así como las ofertas realizadas, sin que ello genere algún derecho a resarcimiento.
Por lo tanto, el usuario declara de manera expresa que:
Los usuarios declaran y garantizan, a su vez, que ni ellos ni sus subsidiarias y/o afiliadas ofrecerán o realizarán publicaciones de productos cuya fecha de caducidad sea inferior a una semana (7 días), y bajo ningún concepto publicarán algún producto en malas condiciones. 
Al adherir a estos Términos y Condiciones, los Usuarios vendedores se comprometen a cumplir con la normatividad fiscal vigente, así como evitar cualquier maniobra que pudiera importar el lavado de activos proveniente de los delitos de evasión tributaria, contrabando o cualquier otro delito previsto en la legislación que implique una defraudación fiscal. 

03 - Modificaciones del Acuerdo
Foodarity podrá modificar los Términos y Condiciones Generales en cualquier momento haciendo públicos en el Sitio los términos modificados. Todos los términos modificados entrarán en vigor a los 15 (quince) días de su publicación Todo usuario que no esté de acuerdo con las modificaciones efectuadas por Foodarity Libre podrá solicitar la baja de la cuenta.

El uso del sitio y/o sus servicios implica la aceptación de estos Términos y Condiciones generales de uso de Foodarity.

04 - Listado de Bienes
Foodarity no será responsable por la retención de dinero o cualquier clase de activo de valor al momento de realizar una compra. Cualquier transacción en la plataforma es exclusiva responsabilidad de los usuarios (comprador y vendedor), así como cualquier producto, entrega o medio de pago que utilicen.

05 - Privacidad de la Información
Para utilizar los Servicios ofrecidos por Foodarity, los Usuarios deberán facilitar determinados datos de carácter personal. Su información personal se procesa y almacena en que mantienen altos estándares de seguridad y protección tanto física como tecnológica.

06 - Obligaciones de los Usuarios
6.1 Obligaciones del Comprador. Durante el plazo fijado por el Usuario Vendedor, los Usuarios interesados realizarán ofertas de compra para los bienes y ofertas de contratación para los servicios. La oferta de venta concluye una vez que vence el plazo de la publicación del producto o se acaban las cantidades estipuladas por el Vendedor, y la oferta de contratación del servicio culmina con el vencimiento del plazo de la publicación.

El Comprador está obligado a intentar comunicarse con el vendedor y completar la operación si ha realizado una oferta por un artículo publicado, independientemente de la categoría o sección, salvo que la operación esté prohibida por la ley o los Términos y Condiciones Generales y demás políticas de Foodarity, en cuyo caso no estará obligado a concretar la operación.

6.2. Obligaciones del Vendedor. El Usuario Vendedor debe tener capacidad legal para vender el bien objeto de su oferta. Asimismo, debe cumplir con todas las obligaciones regulatorias pertinentes y contar con los registros, habilitaciones, permisos y/o autorizaciones exigidos por la normativa aplicable para la venta de los bienes y servicios ofrecidos. El usuario vendedor deberá cumplir con la normatividad vigente en materia de protección al consumidor, tales como, entregar información veraz, clara y suficiente, indicar el precio por unidad de medida en los productos que le sea aplicable, evitar publicidad engañosa en promociones, ofertas o descuentos que le otorgue al usuario comprador y cualquier otra obligación derivada de su publicación.

Dado que Foodarity es un punto de encuentro entre comprador y vendedor y no participa de las operaciones que se realizan entre ellos, el Vendedor será responsable por todas las obligaciones y cargas impositivas que correspondan por la venta de sus artículos, sin que pudiera imputársele a Foodarity algún tipo de responsabilidad por incumplimientos en tal sentido.
`
              )
              .join('\n')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </span>
  );
}
