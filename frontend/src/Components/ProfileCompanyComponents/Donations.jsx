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
import styles from './PublishedProduct.module.css';

export default function Donations({ donations, typeId }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };



  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const columns = [
    { id: 'lote', label: 'LOTE', minWidth: 170 },
    { id: 'ong', label: typeId === 1 ? 'ONG' : 'COMERCIO', minWidth: 100 },
    {
      id: 'cantidad',
      label: 'CANTIDAD',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'category',
      label: 'CATEGORIA',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toFixed(2),
    },
  ];

  function createData(lote, ong, cantidad, category) {
    return { lote, ong, cantidad, category };
  }

  const rows = donations.map((donation) => {
    return createData(
      donation.lote,
      typeId === 1 ? donation.ong.name : donation.company.name,
      donation.quantity,
      donation.category.name
    );
  });

  return (
    <Paper
      className={styles.content}
      sx={{ width: '100%', overflow: 'hidden' }}
    >
      {typeId === 1 ? (
        <Typography
          variant="h4"
          gutterBottom
          component="div"
          sx={{ color: '#7ED957', marginBottom: 3 }}
        >
          Donaciones Realizadas
        </Typography>
      ) : (
        <Typography
          variant="h4"
          gutterBottom
          component="div"
          sx={{ color: '#7ED957', marginBottom: 3 }}
        >
          Donaciones Obtenidas
        </Typography>
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
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row,index) => {
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
