/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
// import Paper from '@mui/material/Paper';

import { Layout } from '../../../layout/Layout';
import TotalUsers from './cards/TotalUsers';
import TotalCompanies from './cards/TotalCompanies';
import TotalOrders from './cards/TotalOrders';
import { apiWithToken } from '../../../../services/api';
import ChartUserByRegister from './cards/ChartUserByRegister';
import ChartCompanyByType from './cards/ChartCompanyByType';
import ChartOrderByPayMethod from './cards/ChartOrderByPayMethod';
import { finishLoading, startLoading } from '../../../../redux/actions/ui';
import TotalSales from './cards/TotalSales';

export const DashboardScreen = () => {
  const dispatch = useDispatch();
  const [totalUsers, setTotalUsers] = useState(null);
  const [totalCompanies, setTotalCompanies] = useState(null);
  const [totalOrders, setTotalOrders] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);
  const [usersByRegisterMethod, setUsersByRegisterMethod] = useState(null);
  const [companiesByType, setCompaniesByType] = useState(null);
  const [ordersBypaymenthod, setOrdersBypaymenthod] = useState(null);

  useEffect(async () => {
    dispatch(startLoading());
    const response = await apiWithToken.get(`/admin/dashboard`);
    setTotalUsers(response.data.totalUsers);
    setTotalCompanies(response.data.totalCompanies);
    setTotalOrders(response.data.totalOrders);
    setUsersByRegisterMethod(response.data.usersByRegisterMethod);
    setCompaniesByType(response.data.companiesByType);
    setOrdersBypaymenthod(response.data.ordersBypaymenthod);
    const responseTotal = await apiWithToken.get(`/admin/orders/total`);
    setTotalAmount(responseTotal.data);
    dispatch(finishLoading());
  }, []);

  const userRegistered = {};
  const companyTypeCant = {};
  const orderByMethodCant = {};

  if (usersByRegisterMethod) {
    usersByRegisterMethod.forEach((element) => {
      if (element.register_method === 'direct') {
        userRegistered.direct = element.cant;
      } else {
        userRegistered.google = element.cant;
      }
    });
  }

  if (companiesByType) {
    companiesByType.forEach((element) => {
      if (element.company_type_id === 1) {
        companyTypeCant.commmerce = element.cant;
      } else {
        companyTypeCant.ong = element.cant;
      }
    });
  }

  if (ordersBypaymenthod) {
    ordersBypaymenthod.forEach((element) => {
      if (element.payment_method_id === 1) {
        orderByMethodCant.direct = element.cant;
      } else {
        orderByMethodCant.mercadoPago = element.cant;
      }
    });
  }

  return (
    <Layout>
      <Typography variant="h4" gutterBottom component="div">
        Dashboard Screen
      </Typography>
      <Divider />
      <Grid container spacing={3} mt={2}>
        {totalUsers && (
          <Grid item xs={12} sm={6} md={3}>
            <TotalUsers quantity={totalUsers} />
          </Grid>
        )}
        {totalCompanies && (
          <Grid item xs={12} sm={6} md={3}>
            <TotalCompanies quantity={totalCompanies} />
          </Grid>
        )}
        {totalOrders && totalOrders > 0 && (
          <Grid item xs={12} sm={6} md={3}>
            <TotalOrders quantity={totalOrders} />
          </Grid>
        )}
        {totalAmount && totalAmount > 0 && (
          <Grid item xs={12} sm={6} md={3}>
            <TotalSales quantity={totalAmount} />
          </Grid>
        )}
      </Grid>
      <Grid container spacing={3} mt={2}>
        {usersByRegisterMethod && (
          <Grid item xs={12} md={6} lg={4}>
            <ChartUserByRegister
              directo={userRegistered.direct}
              google={userRegistered.google}
            />
          </Grid>
        )}
        {companiesByType && (
          <Grid item xs={12} md={6} lg={4}>
            <ChartCompanyByType
              ong={companyTypeCant.ong}
              commerce={companyTypeCant.commmerce}
            />
          </Grid>
        )}
        {ordersBypaymenthod && (
          <Grid item xs={12} md={6} lg={4}>
            <ChartOrderByPayMethod
              directo={orderByMethodCant.direct}
              mercadopago={orderByMethodCant.mercadoPago}
            />
          </Grid>
        )}
      </Grid>
    </Layout>
  );
};
