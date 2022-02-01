import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
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
import DeleteIcon from '@mui/icons-material/Delete';
import CircularProgress from '@mui/material/CircularProgress';

import { Layout } from '../../../layout/Layout';
import { apiWithToken } from '../../../../services/api';

let time = null;

export const CategoriesScreen = () => {
  const [categories, setCategories] = useState();
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [totalCategories, settotalCategories] = useState(0);
  const [term, setTerm] = useState('');
  const [update, setUpdate] = useState(false);

  const navigate = useNavigate();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setSize(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(async () => {
    const response = await apiWithToken.get(
      `/admin/categories?page=${page}&size=${size}`
    );
    setCategories(response.data.categories);
    settotalCategories(response.data.totalCategories);
  }, [page, size, update]);

  useEffect(async () => {
    clearTimeout(time);
    if (term !== '') {
      time = setTimeout(async () => {
        setPage(0);
        const response = await apiWithToken.get(
          `/admin/categories?page=${page}&size=${size}&search=${term}`
        );
        setCategories(response.data.categories);
        settotalCategories(response.data.totalCategories);
      }, 1000);
    } else {
      setPage(0);
      const response = await apiWithToken.get(
        `/admin/categories?page=${page}&size=${size}`
      );
      setCategories(response.data.categories);
      settotalCategories(response.data.totalCategories);
    }
    return () => {
      setPage(0);
    };
  }, [term]);

  const handleEdit = (event, id) => {
    navigate(`/categories/update/${id}`, { replace: true });
  };

  const handleDelete = (event, id) => {
    Swal.fire({
      title: 'Esta seguro?',
      text: 'Quizas no se puedan revertir estos cambios!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        // TODO: Elminar companias y cosas que dependan del usuario
        apiWithToken
          .delete(`/admin/category/${id}`)
          .then(() => {
            Swal.fire({
              icon: 'success',
              title: 'Eliminada',
              text: 'Categoria eliminada correctamente.',
            });
            setUpdate(!update);
          })
          .catch(() => {
            Swal.fire({
              icon: 'error',
              title: 'No se pudo eliminar!',
              text: 'consulte al administrador.',
            });
          });
      }
    });
  };

  const handleInputSearch = ({ target }) => {
    setTerm(target.value);
  };

  const handleAddCategory = () => {
    navigate(`/categories/add`, { replace: true });
  };

  return (
    <Layout>
      <Grid>
        <Typography variant="h4" gutterBottom component="div">
          Gestion de Categorias
        </Typography>
      </Grid>
      <Divider />
      <Grid mt={2}>
        <Button variant="outlined" onClick={handleAddCategory}>
          Agregar Categoria
        </Button>
      </Grid>
      <Grid container spacing={3} pt={2}>
        <Grid item xs={12} lg={6}>
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
                    <TableCell>Id</TableCell>
                    <TableCell>Categoria</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {categories ? (
                    categories.map((category) => (
                      <TableRow key={category.id}>
                        <TableCell>
                          <Typography noWrap>{category.id}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography noWrap>{category.name}</Typography>
                        </TableCell>
                        <TableCell>
                          <Grid container>
                            <Button
                              variant="outlined"
                              color="warning"
                              dataid={category.id}
                              onClick={(e) => handleEdit(e, category.id)}
                            >
                              <EditIcon />
                            </Button>
                            <Button
                              variant="outlined"
                              style={{ marginLeft: '1em' }}
                              color="error"
                              dataid={category.id}
                              onClick={(e) => handleDelete(e, category.id)}
                            >
                              <DeleteIcon />
                            </Button>
                          </Grid>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell align="center" colSpan={5} sx={{ py: 3 }}>
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
              count={totalCategories}
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
