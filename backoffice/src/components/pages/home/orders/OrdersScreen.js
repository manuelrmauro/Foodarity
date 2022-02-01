import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';

import { Layout } from '../../../layout/Layout';
import { apiWithToken } from '../../../../services/api';

let time = null;

export const OrdersScreen = () => {
  const [orders, setOrders] = useState();
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [totalOrders, setTotalOrders] = useState(0);
  const [term, setTerm] = useState('');

  useEffect(async () => {
    const response = await apiWithToken.get(
      `/admin/orders?page=${page}&size=${size}`
    );
    setOrders(response.data.orders);
    setTotalOrders(response.data.totalOrders);
  }, [page, size]);

  useEffect(async () => {
    clearTimeout(time);
    if (term !== '') {
      time = setTimeout(async () => {
        setPage(0);
        const response = await apiWithToken.get(
          `/admin/orders?page=${page}&size=${size}&search=${term}`
        );
        setOrders(response.data.orders);
        setTotalOrders(response.data.totalOrders);
      }, 1000);
    } else {
      setPage(0);
      const response = await apiWithToken.get(
        `/admin/orders?page=${page}&size=${size}`
      );
      setOrders(response.data.orders);
      setTotalOrders(response.data.totalOrders);
    }
    return () => {
      setPage(0);
    };
  }, [term]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setSize(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleInputSearch = ({ target }) => {
    setTerm(target.value);
  };

  return (
    <Layout>
      <Typography variant="h4" gutterBottom component="div">
        Gestion de Ordenes
      </Typography>
      <Divider />
      <Grid container spacing={3} pt={2}>
        <Grid item xs={12}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <TableContainer>
              <TextField
                id="filled-search"
                label="Search field"
                type="search"
                variant="standard"
                style={{ backgroundColor: 'white', marginBottom: '2em' }}
                onChange={handleInputSearch}
              />
              <Table mt={20}>
                <TableHead>
                  <TableRow>
                    <TableCell>id</TableCell>
                    <TableCell>Comercio</TableCell>
                    <TableCell>Comprador</TableCell>
                    <TableCell>Producto</TableCell>
                    <TableCell>Cantidad</TableCell>
                    <TableCell>Precio xU</TableCell>
                    <TableCell>Precio</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell>Metodo de pago</TableCell>
                    <TableCell>Fecha</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders ? (
                    orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell>
                          <Typography noWrap>{order.id}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography noWrap>{order.company.name}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography noWrap>{order.buyer.name}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography noWrap>
                            {order.quantityByProduct.map((item) => (
                              <div>{item.product.lote}</div>
                            ))}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography noWrap>
                            {order.quantityByProduct.map((item) => (
                              <div>{item.quantity}</div>
                            ))}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography noWrap>
                            {order.quantityByProduct.map((item) => (
                              <div>${item.product.price}</div>
                            ))}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography noWrap>
                            {order.quantityByProduct.map((item) => (
                              <div>${item.quantity * item.product.price}</div>
                            ))}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography noWrap>
                            $
                            {order.quantityByProduct
                              .map((item) => item.quantity * item.product.price)
                              .reduce((a, b) => a + b)}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography noWrap>
                            {order.paymentMethod?.method}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography noWrap>{order.date}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography noWrap>{order.status}</Typography>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell align="center" colSpan={8} sx={{ py: 3 }}>
                        <CircularProgress />
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={totalOrders}
              rowsPerPage={size}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  );
};
