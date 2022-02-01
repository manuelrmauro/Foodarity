import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
// import NotificationsIcon from '@mui/icons-material/Notifications';
// import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
// import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';

import { toggleAsideMenu } from '../../../redux/actions/ui';

import defaultAvatar from '../../../assets/avatar_default.png';
import fodarityLogo from '../../../assets/WEB-Logo-Combinado.png';
import { startLogout } from '../../../redux/actions/authActions';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export const Header = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const { asidemenu } = useSelector((state) => state.ui);
  const { user } = useSelector((state) => state);
  const dispatch = useDispatch();

  const toggleDrawer = () => {
    dispatch(toggleAsideMenu(!asidemenu));
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(anchorElNav);
  };
  const handleLogOut = () => {
    dispatch(startLogout());
  };

  let profilePhoto = defaultAvatar;

  if (user.photo) {
    profilePhoto = user.photo.url;
  } else if (user.socialPhoto) {
    profilePhoto = user.socialPhoto;
  } else {
    profilePhoto = defaultAvatar;
  }

  return (
    <AppBar
      position="absolute"
      open={asidemenu}
      style={{ backgroundColor: '#5b457a' }}
    >
      <Toolbar
        sx={{
          pr: '24px', // keep right padding when drawer closed
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer}
          sx={{
            marginRight: '36px',
            ...(asidemenu && { display: 'none' }),
          }}
        >
          <MenuIcon />
        </IconButton>
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
        {/* <Box sx={{ display: { xs: 'none', md: 'flex' }, marginRight: '1em' }}>
          <IconButton
            size="large"
            aria-label="show 4 new mails"
            color="inherit"
          >
            <Badge badgeContent={4} color="error">
              <MailIcon />
            </Badge>
          </IconButton>
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
          >
            <Badge badgeContent={17} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Box> */}
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Cuenta">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Foto de perfil" src={profilePhoto} />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem onClick={handleCloseNavMenu}>
              <Typography textAlign="center" onClick={handleLogOut}>
                Logout
              </Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
