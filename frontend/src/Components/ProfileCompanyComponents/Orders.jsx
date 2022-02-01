import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import styles from './Orders.module.css';

const columns = [
  { id: 'comprador', label: 'COMPRADOR', minWidth: 170 },
  { id: 'pago', label: 'PAGO', minWidth: 170 },
  { id: 'lote', label: 'LOTE', minWidth: 170 },
  {
    id: 'vendidos',
    label: 'VENDIDOS',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },

  {
    id: 'total',
    label: 'TOTAL',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'precio',
    label: 'PRECIO UNITARIO',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'status',
    label: 'ESTADO',
    minWidth: 170,
    align: 'right',
  },

  {
    id: 'fecha',
    label: 'FECHA COMPRA',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];

export default function Orders({ orders }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);


  function createData(
    comprador,
    pago,
    lote,
    vendidos,
    precio,
    total,
    status,

    fecha
  ) {
    // const density = population / size;
    return {
      comprador,
      pago,
      lote,
      vendidos,
      precio,
      total,
      status,
      fecha,
    };
  }

  const rows = orders.map((order) => {
    return createData(
      order.buyer.name,
      order.paymentMethod.method,
      order.quantityByProduct.map((item) => <div>{item.product.lote}</div>),
      order.quantityByProduct.map((item) => <div>{item.quantity}</div>),
      order.quantityByProduct.map((item) => <div>{item.product.price}</div>),
      order.quantityByProduct.map((item) => (
        <div>{item.quantity * item.product.price}</div>
      )),
      order.status,
      order.date
    );
  });

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={styles.orders} sx={{ width: '100%', overflow: 'hidden' }}>
      <Typography
          variant="h4"
          gutterBottom
          component="div"
          sx={{ color: '#7ED957', marginBottom: 3}}
        >
          Ventas realizadas
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
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows &&
              rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
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
