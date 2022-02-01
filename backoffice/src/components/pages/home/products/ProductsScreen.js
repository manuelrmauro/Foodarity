import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';
import Avatar from '@mui/material/Avatar';
import CircularProgress from '@mui/material/CircularProgress';

import perfil from '../../../../assets/avatar_default.png';

import { Layout } from '../../../layout/Layout';
import { apiWithToken } from '../../../../services/api';

let time = null;

export const ProductsScreen = () => {
  const [products, setProducts] = useState();
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [totalProducts, setTotalProducts] = useState(0);
  const [term, setTerm] = useState('');

  const navigate = useNavigate();

  useEffect(async () => {
    const response = await apiWithToken.get(
      `/admin/products?page=${page}&size=${size}`
    );
    setProducts(response.data.products);
    setTotalProducts(response.data.totalProducts);
  }, [page, size]);

  useEffect(async () => {
    clearTimeout(time);
    if (term !== '') {
      time = setTimeout(async () => {
        setPage(0);
        const response = await apiWithToken.get(
          `/admin/products?page=${page}&size=${size}&search=${term}`
        );
        setProducts(response.data.products);
        setTotalProducts(response.data.totalProducts);
      }, 1000);
    } else {
      setPage(0);
      const response = await apiWithToken.get(
        `/admin/products?page=${page}&size=${size}`
      );
      setProducts(response.data.products);
      setTotalProducts(response.data.totalProducts);
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

  const handleEdit = (event, id) => {
    navigate(`/products/update/${id}`, { replace: true });
  };

  const handleInputSearch = ({ target }) => {
    setTerm(target.value);
  };

  return (
    <Layout>
      <Typography variant="h4" gutterBottom component="div">
        Gestion de Productos
      </Typography>
      <Divider />
      {/* <Grid mt={2}>
        <Button variant="outlined">Agregar Producto</Button>
      </Grid> */}
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
                    <TableCell>Foto</TableCell>
                    <TableCell>Lote</TableCell>
                    <TableCell>Categoria</TableCell>
                    <TableCell>Empresa</TableCell>
                    <TableCell>Fecha Publicacion</TableCell>
                    <TableCell>Fecha Vencimiento</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products ? (
                    products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <Typography noWrap>{product.id}</Typography>
                        </TableCell>
                        <TableCell>
                          <Avatar
                            alt="Logo"
                            src={product.photo ? product.photo.url : perfil}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography noWrap>{product.lote}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography noWrap>
                            {product.category.name}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography noWrap>{product.company.name}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography noWrap>
                            {product.publicationDate}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography noWrap>
                            {product.expirationDate}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography noWrap>{product.status}</Typography>
                        </TableCell>
                        <TableCell>
                          <Grid container>
                            <Button
                              variant="outlined"
                              color="warning"
                              dataid={product.id}
                              onClick={(e) => handleEdit(e, product.id)}
                            >
                              <EditIcon />
                            </Button>
                          </Grid>
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
              count={totalProducts}
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
