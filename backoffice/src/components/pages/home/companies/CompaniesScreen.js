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
import Avatar from '@mui/material/Avatar';
import CircularProgress from '@mui/material/CircularProgress';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import perfil from '../../../../assets/avatar_default.png';

import { Layout } from '../../../layout/Layout';
import { apiWithToken } from '../../../../services/api';

let time = null;

export const CompaniesScreen = () => {
  const [companies, setCompanies] = useState();
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [status, setStatus] = useState('');
  const [totalCompanies, setTotalCompanies] = useState(0);
  const [term, setTerm] = useState('');
  const [update, setUpdate] = useState(false);

  const navigate = useNavigate();

  const handleStatusChange = (e) => {
    e.preventDefault();
    setStatus(e.target.value);
  };

  useEffect(async () => {
    const response = await apiWithToken.get(
      `/admin/companies?page=${page}&size=${size}&status=${status}`
    );
    setCompanies(response.data.companies);
    setTotalCompanies(response.data.totalCompanies);
  }, [page, size, update]);

  useEffect(async () => {
    clearTimeout(time);
    if (term !== '') {
      time = setTimeout(async () => {
        setPage(0);
        const response = await apiWithToken.get(
          `/admin/companies?page=${page}&size=${size}&search=${term}&status=${status}`
        );
        setCompanies(response.data.companies);
        setTotalCompanies(response.data.totalCompanies);
      }, 1000);
    } else {
      setPage(0);
      const response = await apiWithToken.get(
        `/admin/companies?page=${page}&size=${size}&status=${status}`
      );
      setCompanies(response.data.companies);
      setTotalCompanies(response.data.totalCompanies);
    }
    return () => {
      setPage(0);
    };
  }, [term, status]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setSize(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEdit = (event, id) => {
    navigate(`/companies/${id}`, { replace: true });
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
          .delete(`/admin/companies/${id}`)
          .then(() => {
            Swal.fire({
              icon: 'success',
              title: 'Eliminado',
              text: 'La compania se elimino correctamente.',
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

  return (
    <Layout>
      <Typography variant="h4" gutterBottom component="div">
        Gestion de Comercios y ONG
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
              <InputLabel id="demo-simple-select-label">Estado</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={status}
                label="Status"
                onChange={handleStatusChange}
                sx={{ width: 200, height: 35 }}
              >
                <MenuItem value="">
                  <em>Todas</em>
                </MenuItem>
                <MenuItem value="Habilitada">Habilitadas</MenuItem>
                <MenuItem value="Deshabilitada">Deshabilitadas</MenuItem>
                <MenuItem value="Pendiente">Pendientes</MenuItem>
                <MenuItem value="Banneada">Banneadas</MenuItem>
              </Select>
              <Table mt={20}>
                <TableHead>
                  <TableRow>
                    <TableCell>Logo</TableCell>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Typo</TableCell>
                    <TableCell>Ciudad</TableCell>
                    <TableCell>status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {companies ? (
                    companies.map((company) => (
                      <TableRow key={company.id}>
                        <TableCell>
                          <Avatar
                            alt="Logo"
                            src={company.logo ? company.logo.url : perfil}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography noWrap>{company.name}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography noWrap>{company.email}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography noWrap>{company.type.type}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography noWrap>
                            {company.address.city.name}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography noWrap>{company.status}</Typography>
                        </TableCell>
                        <TableCell>
                          <Grid container>
                            <Button
                              variant="outlined"
                              color="warning"
                              dataid={company.id}
                              onClick={(e) => handleEdit(e, company.id)}
                            >
                              <EditIcon />
                            </Button>
                            <Button
                              variant="outlined"
                              style={{ marginLeft: '1em' }}
                              color="error"
                              dataid={company.id}
                              onClick={(e) => handleDelete(e, company.id)}
                            >
                              <DeleteIcon />
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
              count={totalCompanies}
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
