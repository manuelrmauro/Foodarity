import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Box from '@mui/material/Box';

import { mainListItems } from './listItems';
import { toggleAsideMenu } from '../../../redux/actions/ui';
import fodarityLogo from '../../../assets/WEB-header.png';

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

export const Aside = () => {
  const { asidemenu } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  const toggleDrawer = () => {
    dispatch(toggleAsideMenu(!asidemenu));
  };

  return (
    <Drawer variant="permanent" open={asidemenu}>
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          px: [1],
        }}
      >
        {/* <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1 }}
        >
          Foodarity
        </Typography> */}
        <Box
          noWrap
          sx={{
            flexGrow: 1,
            height: 40,
            overflow: 'hidden',
            position: 'relative',
          }}
          component="div"
        >
          <img
            src={fodarityLogo}
            alt="Fodarity Logo"
            style={{ width: 'auto', height: '40px' }}
          />
        </Box>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1, fontWeight: 'bold' }}
        >
          Back Office
        </Typography>
        <IconButton onClick={toggleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List>{mainListItems}</List>
    </Drawer>
  );
};
