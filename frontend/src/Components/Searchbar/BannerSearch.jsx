import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IconButton } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Typography from '@mui/material/Typography';
import estilo from './BannerSearch.module.css';
import SearchBar from './Searchbar';
import Drawer from '../Drawer/Drawer';
import OngSeccion from '../ONGSeccion/OngSeccion';
// import OngSeccionWeb from '../ONGSeccion/OngSeccionWeb';

function goDown() {
  window.scrollTo({ top: window.innerHeight - 64, behavior: 'smooth' });
}

export default function BannerSearch({ search, lote, filtrado }) {
  const allOngs = useSelector((state) => state.companies.ongs);
  const [filterOngs , setFilterOngs] = useState()

  useEffect(() => {
    setFilterOngs(allOngs.filter(ongs=> ongs.deleted === false && ongs.status === "Habilitada"))
  },[allOngs])


  return (
    <div className={estilo.body}>
      <div className={estilo.heroimage}>
        <div className={estilo.container}>
          <h1>
            <span className={estilo.titleBanner}>Ahorre, Ayude y contribuya al planeta</span>
          </h1>
          <div className={estilo.search}>
            <div className={estilo.ongAndTitleContainer}>
              <h2 className={estilo.titleOng}>¡Conoce nuestras ONGs!</h2>
              <div className={estilo.contOngs}>
                {filterOngs?.map((ong) => {
                  return <OngSeccion key={ong.id} ong={ong} />;
                })}
              </div>
              {/* <div className={estilo.ongAndTitleContainer2}>
                {allOngs.map((ong) => {
                  return <OngSeccionWeb key={ong.id} ong={ong} />;
                })}
              </div> */}
            </div>
            <SearchBar sx={{ marginTop: '0' }} search={search} lote={lote} />
            <div className={estilo.btn}>
              <Drawer filtrado={filtrado} />
            </div>
            <div className={estilo.arrowDiv}>
              <Typography
                variant="h6"
                gutterBottom
                component="div"
                sx={{
                  color: '#44b700 !important',
                  marginTop: 1,
                  textStyle: 'bold',
                  fontSize: '3vh'
                }}
              >
                PRODUCTOS
              </Typography>
              <IconButton onClick={goDown}>
                <KeyboardArrowDownIcon
                  className={estilo.goDown}
                  sx={{
                    fontSize: "6vh",
                    position: 'relative',
                    bottom: 5,
                    backgroundColor: '#7ED95790',
                    borderRadius: '100%',

                    '&:hover': { backgroundColor: '#7ED95790 !important' },
                  }}
                />
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
