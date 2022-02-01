import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
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
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

import perfil from '../../../../assets/avatar_default.png';

import { Layout } from '../../../layout/Layout';
import { apiWithToken } from '../../../../services/api';

let time = null;

export const UsersScreen = () => {
  const [users, setUsers] = useState();
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [totalUsers, settotalUsers] = useState(0);
  const [term, setTerm] = useState('');
  const [update, setUpdate] = useState(false);
  const { id: idLogin } = useSelector((state) => state.auth);

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
      `/admin/users?page=${page}&size=${size}`
    );
    setUsers(response.data.users);
    settotalUsers(response.data.totalUsers);
  }, [page, size, update]);

  useEffect(async () => {
    clearTimeout(time);
    if (term !== '') {
      time = setTimeout(async () => {
        setPage(0);
        const response = await apiWithToken.get(
          `/admin/users?page=${page}&size=${size}&search=${term}`
        );
        setUsers(response.data.users);
        settotalUsers(response.data.totalUsers);
      }, 1000);
    } else {
      setPage(0);
      const response = await apiWithToken.get(
        `/admin/users?page=${page}&size=${size}`
      );
      setUsers(response.data.users);
      settotalUsers(response.data.totalUsers);
    }
    return () => {
      setPage(0);
    };
  }, [term]);

  const handleEdit = (event, id) => {
    navigate(`/users/update/${id}`, { replace: true });
  };

  const handleDelete = (event, id) => {
    if (id !== idLogin) {
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
            .delete(`/admin/users/${id}`)
            .then(() => {
              Swal.fire({
                icon: 'success',
                title: 'Eliminado',
                text: 'Usuario eliminado correctamente.',
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
    } else {
      Swal.fire({
        icon: 'error',
        title: 'No puedes completar esta accion',
        text: 'No te puedes eliminar a ti mismo',
      });
    }
  };

  const handleInputSearch = ({ target }) => {
    setTerm(target.value);
  };

  const handleAddUser = () => {
    navigate(`/users/add`, { replace: true });
  };

  return (
    <Layout>
      <Grid>
        <Typography variant="h4" gutterBottom component="div">
          Gestion de Usuarios
        </Typography>
      </Grid>
      <Divider />
      <Grid mt={2}>
        <Button variant="outlined" onClick={handleAddUser}>
          Agregar Usuario
        </Button>
      </Grid>
      <Grid container spacing={3} pt={2}>
        <Grid item xs={12} lg={12}>
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
                    <TableCell>Nombre</TableCell>
                    <TableCell>email</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users ? (
                    users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={2}
                          >
                            <Avatar
                              alt="Remy Sharp"
                              src={user.photo ? user.photo.url : perfil}
                            />
                            <Typography noWrap>{user.name}</Typography>
                          </Stack>
                        </TableCell>
                        <TableCell>
                          <Typography noWrap>{user.email}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography noWrap>{user.role.role}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography noWrap>
                            {user.status ? 'Activo' : 'Inactivo'}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Grid container>
                            <Button
                              variant="outlined"
                              color="warning"
                              dataid={user.id}
                              onClick={(e) => handleEdit(e, user.id)}
                            >
                              <EditIcon />
                            </Button>
                            <Button
                              variant="outlined"
                              style={{ marginLeft: '1em' }}
                              color="error"
                              dataid={user.id}
                              onClick={(e) => handleDelete(e, user.id)}
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
              count={totalUsers}
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
