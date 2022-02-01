import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function Descipcion({ handleOnChange, input }) {
  // eslint-disable-next-line no-unused-vars
  const [value, setValue] = React.useState('Controlled');

  // eslint-disable-next-line no-unused-vars
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Box
      component="div"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '464px' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="filled-multiline-static"
        label="Descripcion"
        multiline
        rows={4}
        onChange={(e) => {
          handleOnChange(e);
        }}
        value={input.description}
        variant="filled"
        name="description"
      />
    </Box>
  );
}
