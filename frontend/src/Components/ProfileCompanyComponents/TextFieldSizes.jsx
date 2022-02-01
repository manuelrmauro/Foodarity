/* eslint-disable prefer-arrow-callback */
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import FilledInput from '@mui/material/FilledInput';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';

export function NuevoLote({ handleOnChange, input }) {
  return (
    <Box
      component="div"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        label="Nombre Nuevo Lote"
        id="filled-size-normal"
        name="lote"
        value={input.lote}
        variant="filled"
        onChange={(e) => {
          handleOnChange(e);
        }}
      />
    </Box>
  );
}

export function Cantidad({ handleOnChange, input, ValidateQuantity }) {
  return (
    <Box
      component="div"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        label="Cantidad"
        type="number"
        name="quantity"
        id="filled-size-normal"
        // defaultValue=""
        value={input.quantity}
        variant="filled"
        onChange={(e) => {
          handleOnChange(e);
          ValidateQuantity(e);
        }}
      />
    </Box>
  );
}

export function Amount({ handleOnChange, input, validatePrice }) {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '224px' }}>
      <div>
        <FormControl fullWidth sx={{ m: 1 }} variant="filled">
          <InputLabel htmlFor="filled-adornment-amount">
            Precio Unitario ARS{' '}
          </InputLabel>
          <FilledInput
            id="filled-adornment-amount"
            value={input.price}
            name="price"
            onChange={(e) => {
              handleOnChange(e);
              validatePrice(e);
            }}
            step="0.1"
            variant="standard"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
        </FormControl>
      </div>
    </Box>
  );
}

export function Fecha({ handleOnChange, input }) {
  return (
    <Box
      component="div"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        inputProps={{ min: new Date().toLocaleDateString('en-ca') }}
        label="Fecha Expiracion"
        id="filled-size-normal"
        variant="filled"
        type="date"
        name="expirationDate"
        value={input.expirationDate}
        onChange={(e) => {
          handleOnChange(e);
        }}
      />
    </Box>
  );
}

export function Categoria({ input, categories, handleOnChange }) {
  return (
    <div>
      <FormControl variant="filled" sx={{ m: 1, minWidth: '25ch' }}>
        <InputLabel id="demo-simple-select-filled-label">Categoría</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          sx={{ width: 464 }}
          name="category"
          value={input.category}
          label="Categoria"
          onChange={handleOnChange}
        >
          {categories.map((el) => (
            <MenuItem key={el.id} value={el.id}>
              {el.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
