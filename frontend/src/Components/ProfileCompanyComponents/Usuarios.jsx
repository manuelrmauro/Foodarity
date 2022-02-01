import React from 'react';
import { useNavigate } from 'react-router-dom';
// import deleteLogo from '../../assets/deleteIcon';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import styles from './Usuarios.module.css';
import { apiWithToken } from '../../services/api';

const columns = [
  { id: 'nombre', label: 'NOMBRE', minWidth: 170 },
  {
    id: 'email',
    label: 'EMAIL',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'telefono',
    label: 'TELEFONO',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'rol',
    label: 'ROL',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'eliminar',
    label: '',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];

function createData(nombre, email, telefono, rol, eliminar) {
  return { nombre, email, telefono, rol, eliminar };
}

export default function Usuarios({ company }) {
  const { id } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([]);
  const [input, setInput] = React.useState('');
  const [users, setUsers] = React.useState([]);

  function handleOnChange(e) {
    setInput(e.target.value);
  }

  // async function handleDelete(id) {
  //   Swal.fire({
  //     title: '¿Estás seguro de querer eliminar el producto?',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#e63946',
  //     cancelButtonColor: 'gray',
  //     confirmButtonText: 'Continuar',
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       apiWithToken.delete(`/products/id/${id}`).then(() => {
  //         apiWithToken.get('/products/byauth').then((response) => {
  //           setProducts(response.data);
  //         });
  //       });
  //     }
  //   });
  // }

  const handleDelete = (ID) => {
    Swal.fire({
      title: '¿Estás seguro de querer eliminar este usuario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e63946',
      cancelButtonColor: 'gray',
      confirmButtonText: 'Continuar',
    }).then((result) => {
      if (result.isConfirmed) {
        apiWithToken
          .delete(`/companies/user/${ID}`)
          .then(() => {
            Swal.fire({
              icon: 'success',
              title: 'Bien!',
              text: 'Usuario eliminado con exito',
            });
            if (id !== company.ownerId) {
              navigate('/home');
            }
          })
          .then(() => {
            setInput('');
            apiWithToken.get('/companies/users').then((response) => {
              setUsers(response.data);
            });
          })
          .catch(() => {
            Swal.fire({
              icon: 'error',
              title: 'Ups...',
              text: 'Algo fallo. Intente nuevamente.',
            });
          });
      }
    });
  };

  const handleRows = () => {
    const finalRows = [];
    users.forEach((user) => {
      finalRows.push(
        createData(
          user.name,
          user.email,
          user.phone,
          user.id === company.ownerId ? 'Dueño' : 'Empleado',
          user.id !== company.ownerId &&
            (id === company.ownerId || (user.id === id && user.id)) && (
              <HighlightOffIcon
                sx={{ color: 'red' }}
                onClick={() => {
                  // eslint-disable-next-line no-alert
                  // if (window.confirm('Queres eliminar este usuario?'))
                  handleDelete(user.id);
                }}
              />
            )
        )
      );
    });
    setRows(finalRows);
  };

  React.useEffect(() => {
    apiWithToken.get('/companies/users').then((response) => {
      setUsers(response.data);
    });
  }, []);

  React.useEffect(() => {
    handleRows();
  }, [users]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // /companies/user?email=demo@demo.com

  function handleAddAcount() {
    // eslint-disable-next-line no-alert

    Swal.fire({
      title: '¿Estás seguro de querer agregar este usuario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e63946',
      cancelButtonColor: 'gray',
      confirmButtonText: 'Continuar',
    }).then((result) => {
      if (result.isConfirmed) {
        apiWithToken
          .post(`/companies/user?email=${input}`)
          .then(() => {
            setInput('');
            apiWithToken.get('/companies/users').then((response) => {
              setUsers(response.data);
            });
          })
          .then(() => {
            handleRows();
            Swal.fire({
              icon: 'success',
              title: 'Bien!',
              text: 'Usuario agregago con exito',
            });
          })
          .catch((error) => {
            Swal.fire({
              icon: 'error',
              title: 'Ups...',
              text: error.response.data.message,
            });
          });
      }
    });
  }

  return (
    <Paper className={styles.users} sx={{ width: '100%', overflow: 'hidden' }}>
      {id === company.ownerId && (
        <div className={styles.contagregar}>
          <div>
            <Typography
              variant="h4"
              gutterBottom
              component="div"
              sx={{ color: '#7ED957', marginBottom: 3 }}
            >
              Agregar nueva cuenta
            </Typography>
          </div>
          <div>
            <input
              className={styles.input}
              type="text"
              name="email"
              onChange={(e) => handleOnChange(e)}
              value={input}
            />
            <Button
              onClick={() => handleAddAcount()}
              sx={{
                backgroundColor: '#7ED957',
                '&:hover': { backgroundColor: '#7ED95790 !important' },
                marginLeft: 1,
                paddingLeft: 5,
                paddingRight: 5,
              }}
            >
              AGREGAR
            </Button>
          </div>
        </div>
      )}

      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    backgroundColor: '#7ED957',
                    color: '#3E2463',
                    fontWeight: '700',
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows &&
              rows
                /* .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) */
                .map((row, index) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      style={{
                        backgroundColor: 'white',
                        color: '#3E2463',
                        fontWeight: '700',
                      }}
                      tabIndex={-1}
                      // eslint-disable-next-line react/no-array-index-key
                      key={index}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell
                            key={column.id}
                            style={{
                              backgroundColor: 'white',
                              color: '#3E2463',
                              fontWeight: '700',
                            }}
                            align={column.align}
                          >
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
