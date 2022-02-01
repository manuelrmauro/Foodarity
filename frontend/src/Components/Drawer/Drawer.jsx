import * as React from 'react';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
// import MenuIcon from '@mui/icons-material/Tune';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CategoryIcon from '@mui/icons-material/Category';
import ArrowBackIosTwoToneIcon from '@mui/icons-material/ArrowBackIosTwoTone';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
// import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
// import MailIcon from '@mui/icons-material/Mail';

export default function Drawer({ filtrado }) {
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{
        width: anchor === 'right' || anchor === 'bottom' ? 'auto' : 100,
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem>
          <CategoryIcon
            color="primary"
            sx={{ width: '1em', mr: '1em', hover: 'false' }}
          />
          <p style={{ color: '#3E2463' }}>TODAS LAS CATEGORIAS</p>
          <ArrowBackIosTwoToneIcon
            color="secondary"
            cursor="pointer"
            sx={{ width: '1em', hover: 'true' }}
          />
        </ListItem>
      </List>
      <Divider />
      <List color="primary">
        <ListItem
          button
          key="Todas"
          onClick={() => filtrado({ categoryName: 'Todas' })}
        >
          <ListItemIcon>
            <LocalDiningIcon color="secondary" />
          </ListItemIcon>
          <ListItemText primary="Todas" />
        </ListItem>
        {[
          'Almacén',
          'Restorant/Rotiseria',
          'Frutas y verduras',
          'Panificados',
          'Postres',
          'Comida rápida',
          'Vegetarianos',
          'Veganos',
          'Otros',
        ].map((text) => (
          <ListItem
            button
            key={text}
            onClick={() => filtrado({ categoryName: text })}
          >
            <ListItemIcon>
              <LocalDiningIcon color="secondary" />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
{/*       <Divider />
      <List color="primary">
        {['Acerca de Foodarity', 'Contacto', 'Políticas de Uso'].map(
          (text2, index1) => (
            <ListItem button key={text2} onClick={() => filtrado(text2)}>
              <ListItemIcon>
                {index1 % 2 === 0 ? (
                  <DoubleArrowIcon color="primary" />
                ) : (
                  <MailIcon color="primary" />
                )}
              </ListItemIcon>
              <ListItemText primary={text2} />
            </ListItem>
          )
        )}
      </List> */}
    </Box>
  );

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button
            onClick={toggleDrawer(anchor, true)}
            sx={{
              backgroundColor: '#7ED957',
              '&:hover': { backgroundColor: '#7ED95790 !important' },
              marginTop: 2,
            }}
          >
            FILTRAR PRODUCTOS
          </Button>
          <SwipeableDrawer
            sx={{ backgroundColor: 'secondary', zIndex: 10002 }}
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
