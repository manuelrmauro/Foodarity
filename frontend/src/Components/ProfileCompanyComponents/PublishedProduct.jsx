import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
// import deleteLogo from '../../assets/deleteIcon';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography';
import TablePagination from '@mui/material/TablePagination';
import Swal from 'sweetalert2';
import TableRow from '@mui/material/TableRow';
import { apiWithToken } from '../../services/api';
import styles from './PublishedProduct.module.css';

const columns = [
  { id: 'lote', label: 'LOTE', minWidth: 170 },
  {
    id: 'estado',
    label: 'ESTADO',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },

  {
    id: 'cantidad',
    label: 'CANTIDAD',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'precio',
    label: 'PRECIO PUBLICADO (ARS)',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'fecha',
    label: 'FECHA PUBLICACION',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'eliminar',

    minWidth: 170,
    align: 'right',
  },
];

// eslint-disable-next-line no-unused-vars
export default function PublishedProduct() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [products, setProducts] = React.useState([]);
  const [rows, setRows] = React.useState([]);

  function createData(lote, estado, cantidad, precio, fecha, eliminar) {
    // const density = population / size;
    return { lote, estado, cantidad, precio, fecha, eliminar };
  }

  async function handleDelete(id) {
    Swal.fire({
      title: '¿Estás seguro de querer eliminar el producto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e63946',
      cancelButtonColor: 'gray',
      confirmButtonText: 'Continuar',
    }).then((result) => {
      if (result.isConfirmed) {
        apiWithToken.delete(`/products/id/${id}`).then(() => {
          apiWithToken.get('/products/byauth').then((response) => {
            setProducts(response.data);
          });
        });
      }
    });
  }

  React.useEffect(() => {
    apiWithToken.get('/products/byauth').then((response) => {
      setProducts(response.data);
    });
  }, []);

  React.useEffect(() => {
    const finalRows = products.map((producto) => {
      return createData(
        producto.lote,
        producto.status,
        producto.quantity,
        producto.price,
        producto.publicationDate,
        // eslint-disable-next-line no-alert
        producto.status === 'published' && (
          <HighlightOffIcon
            sx={{ color: 'red' }}
            onClick={() => {
              // eslint-disable-next-line no-alert

              handleDelete(producto.id);
            }}
          />
        )
        // <button type="button">eliminar</button>
      );
    });
    setRows(finalRows);
  }, [products]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper
      className={styles.content}
      sx={{ width: '100%', overflow: 'hidden' }}
    >
      <Typography
        variant="h4"
        gutterBottom
        component="div"
        sx={{ color: '#7ED957', marginBottom: 3 }}
      >
        Productos Publicados
      </Typography>
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
                  className={styles.titulos}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  // eslint-disable-next-line react/no-array-index-key
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
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
