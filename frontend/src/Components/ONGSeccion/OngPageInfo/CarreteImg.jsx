import { Carousel } from 'react-carousel-minimal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ongimg1 from '../../../assets/Ong Images/ongimg1.png';
import ongimg2 from '../../../assets/Ong Images/ongimg2.png';
import ongimg3 from '../../../assets/Ong Images/ongimg3.png';
import ongimg4 from '../../../assets/Ong Images/ongimg4.png';
import ongimg5 from '../../../assets/Ong Images/ongimg5.png';
import ongimg6 from '../../../assets/Ong Images/ongimg6.png';
import ongimg7 from '../../../assets/Ong Images/ongimg7.png';
import ongimg8 from '../../../assets/Ong Images/ongimg8.png';
import ongimg9 from '../../../assets/Ong Images/ongimg9.png';
import estilos from './CarreteImg.module.css';

function CarreteImg() {
  const data = [
    {
      image: ongimg1,
      caption:
        'Nuestro compromiso con la población más vulnerable permanece vigente durante los momentos de dificultad',
    },
    {
      image: ongimg2,

      caption:
        'Todos los donativos se entregan directamente a grupos organizados que atienden a población en pobreza',
    },
    {
      image: ongimg3,
      caption:
        'Hacemos llegar paquetes alimenticios a ONGs que apoyan a los sectores de la población en riesgo',
    },
    {
      image: ongimg4,
      caption: 'Hoy más que nunca es el momento de actuar por los demás',
    },
    {
      image: ongimg5,
      caption:
        'Hemos incrementado nuestro padrón de beneficiarios en más de 40%',
    },
    {
      image: ongimg6,
      caption: 'Realizamos entregas semanales de alimentos a ONGs',
    },
    {
      image: ongimg7,
      caption:
        'Rescatamos alimento y conformamos paquetes de alimentos nutritivos y balanceados para nuestros beneficiarios',
    },
    {
      image: ongimg8,
      caption:
        'Todos trabajamos todos los días para rescatar alimento y aliviar el hambre y la inseguridad alimentaria',
    },
    {
      image: ongimg9,
      caption:
        'Nuestro compromiso con la población más vulnerable permanece vigente durante los momentos de dificultad',
    },
  ];

  const captionStyle = {
    fontSize: '1.5em',
    fontWeight: 'bold',
  };
  const slideNumberStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
  };
  return (
      <div >
    <div>
        <div className={estilos.titulo}>
          <Box
            sx={{
              width: 500,
              // maxWidth: 100,
            }}
          >
            <Typography
              variant="h5"
              gutterBottom
              component="div"
              sx={{
                color: '#7ED957',
                marginTop: 0.5,
                fontStyle: 'bold',
                textAlign: 'center',
              }}
            >
              SER HÉROES DE LA ALIMENTACIÓN ES AHORA MÁS FÁCIL
            </Typography>
          </Box>
        </div>
        <div
        // style={{
        //   padding: '0 20px',
        // }}
        >
          <Carousel
            data={data}
            time={5000}
            width="600px"
            height="600px"
            captionStyle={captionStyle}
            radius="10px"
            slideNumber
            slideNumberStyle={slideNumberStyle}
            captionPosition="bottom"
            automatic
            dots
            pauseIconColor="white"
            pauseIconSize="40px"
            slideBackgroundColor="darkgrey"
            slideImageFit="cover"
            thumbnails
            thumbnailWidth="100px"
            style={{
              textAlign: 'center',
              
              // margin: '5.8em auto',
              marginBottom:'30px'
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default CarreteImg;
