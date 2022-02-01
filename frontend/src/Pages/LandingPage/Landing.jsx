import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// import { Link as Scroll } from 'react-scroll';
import { IconButton, Collapse } from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useInView } from 'react-intersection-observer';
// import 'animate.css'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AboutCard from '../About/AboutCard';
import AboutVision from '../About/AboutVision';
import AboutMision from '../About/AboutMision';
import AboutValores from '../About/AboutValores';
import Footer from '../../Components/Footer/Footer';
import styles from './Landing.module.css';
import './Cards.css';
import logoLanding from '../../assets/Mobil-background-landing.png';
import logo from '../../assets/Mobil-Full-Header-Logo.png';
import logo1 from '../../assets/WEB-Logo-Combinado.png';
// import useWindowPosition from '../About/hook/useWindowPosition';
// import valores from '../../assets/valores.jpg'

function goDown() {
  window.scrollTo({ top: window.innerHeight + 40, behavior: 'smooth' });
}
export default function Landing() {

  const { id } = useSelector((state) => state.auth);

  const { ref, inView } = useInView({
    threshold: 0.4,
  });
  /* eslint-disable react/jsx-props-no-spreading */
  // const checked = useWindowPosition('header');

  const [check, setCheck] = useState(false);

  useEffect(() => {
    setCheck(true);
  }, []);


  return (
    <div>
      <div className={styles.landing} id="header">
        <img className={styles.logo1} src={logo1} alt="" />
        <img className={styles.logo} src={logo} alt="" />
        <div className={styles.content}>
          <Collapse
            /* eslint-disable react/jsx-props-no-spreading */
            in={check}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...(check ? { timeout: 1000 } : {})}
            collapsedheight={50}
          >
            <div className={styles.divImgLanding}>
              <img
                className={styles.imglogolanding}
                src={logoLanding}
                alt="logo"
              />
            </div>
          </Collapse>
          <div>
            <div className={styles.btncont}>
              <Stack spacing={1} direction="row">
                {!id && (
                  <Link to="/login">
                    <Button variant="contained" size="small" type="submit">
                      Ingresar
                    </Button>
                  </Link>
                )}
                {!id && (
                  <Link to="/register">
                    <Button variant="contained" size="small" type="submit">
                      Registrarse
                    </Button>
                  </Link>
                )}
                <Link to="/home">
                  <Button variant="contained" size="small" type="submit" >
                    Continuar
                  </Button>
                </Link>
              </Stack>
            </div>
          </div>
 
            <IconButton onClick={goDown}>
              <KeyboardArrowDownIcon
                className={styles.goDown}
                sx={{ fontSize: 50, position: 'relative', bottom: 5 }}
              />
            </IconButton>
  
        </div>
      </div>
      <div className={styles.bkgAbout}>
      <div className={styles.aboutCards}>
        {/* <img src={valores} alt='fondo' className={styles.imgBkg}/> */}
        <div>
            <AboutCard />
            <img src={logoLanding} alt='logo' className={styles.imgAbout}/>
        </div>
        <div className={inView ? 'about' : 'about--zoom'}>
            <AboutValores />
        </div>
      </div>
      <div className={styles.containerAbouts} ref={ref}>
        <div className={inView ? 'about' : 'about--zoom'}>
          <AboutMision />
        </div>
        <div className={inView ? 'about' : 'about--zoom'}>
          <AboutVision />
        </div>
      </div>
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
}
