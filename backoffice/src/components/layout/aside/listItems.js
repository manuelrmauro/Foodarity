import React from 'react';
import { NavLink } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import StorefrontIcon from '@mui/icons-material/Storefront';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import CategoryIcon from '@mui/icons-material/Category';

export const mainListItems = (
  <div>
    <ListItemButton
      component={NavLink}
      style={({ isActive }) => {
        return {
          backgroundColor: isActive ? 'rgba(91, 69, 122,0.3)' : '',
        };
      }}
      end
      to="/"
    >
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton
      component={NavLink}
      style={({ isActive }) => {
        return {
          backgroundColor: isActive ? 'rgba(91, 69, 122,0.3)' : '',
        };
      }}
      to="/users"
    >
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Usuarios" />
    </ListItemButton>
    <ListItemButton
      component={NavLink}
      style={({ isActive }) => {
        return {
          backgroundColor: isActive ? 'rgba(91, 69, 122,0.3)' : '',
        };
      }}
      to="/companies"
    >
      <ListItemIcon>
        <StorefrontIcon />
      </ListItemIcon>
      <ListItemText primary="Comercios/ONGs  " />
    </ListItemButton>
    <ListItemButton
      component={NavLink}
      style={({ isActive }) => {
        return {
          backgroundColor: isActive ? 'rgba(91, 69, 122,0.3)' : '',
        };
      }}
      to="/categories"
    >
      <ListItemIcon>
        <CategoryIcon />
      </ListItemIcon>
      <ListItemText primary="Categorias" />
    </ListItemButton>
    <ListItemButton
      component={NavLink}
      style={({ isActive }) => {
        return {
          backgroundColor: isActive ? 'rgba(91, 69, 122,0.3)' : '',
        };
      }}
      to="/products"
    >
      <ListItemIcon>
        <FoodBankIcon />
      </ListItemIcon>
      <ListItemText primary="Productos" />
    </ListItemButton>
    <ListItemButton
      component={NavLink}
      style={({ isActive }) => {
        return {
          backgroundColor: isActive ? 'rgba(91, 69, 122,0.3)' : '',
        };
      }}
      to="/orders"
    >
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Ordenes" />
    </ListItemButton>
  </div>
);
