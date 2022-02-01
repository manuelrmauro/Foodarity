import React, { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function SearchBar({ search, lote }) {
  const options = lote.map((productos) => productos.lote);
  const [inputValue, setInputValue] = React.useState('');

  useEffect(() => {
    search(inputValue);
  }, [inputValue]);

  const goDown = (e) => {
    if (e.key === 'Enter' || Number.isInteger(e.target.value)) {
      window.scrollTo({ top: window.innerHeight - 64, behavior: 'smooth' });
    }
  };
  return (
    <div >
      <Autocomplete
        // value={value}
        ListboxProps={{ style: { maxHeight: '10vh' } }}
        onKeyPress={goDown}
        onChange={() => {
          search(inputValue);
          const elmnt = document.getElementById('card');
          elmnt.scrollIntoView();
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
          goDown(event);
        }}
        id="free-solo-2-demo"
        disableClearable
        freeSolo
        size="small"
        options={options || 'not found'}
        sx={{
          width: '99%',
          backgroundColor: 'white',
          textColor: 'white',
          marginTop: '2vh',
          border: '3px solid #7ED957',
          borderRadius: '5px',
        }}
        // eslint-disable-next-line react/jsx-props-no-spreading
        renderInput={(params) => (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <TextField {...params} label="Buscar productos..." />
        )}
      />
    </div>
  );
}
