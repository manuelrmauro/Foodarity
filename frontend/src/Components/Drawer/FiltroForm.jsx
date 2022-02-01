/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
// import {useDispatch} from 'react-redux'
// import {getProducts} from '../../redux/actions/productActions'
import Button from '@mui/material/Button';
import { api } from '../../services/api';
import styles from './FiltroForm.module.css';

function FiltroForm({ filtrado }) {
  // const dispatch = useDispatch()
  const [categories, setCategories] = useState();

  const clearInput = {
    categoryName: 'Todas',
    categoryId: '',
    minPrice: '0',
    maxPrice: '0',
    expirationDate: 'clear',
    order: 'recents',
  };

  const [input, setInput] = useState(clearInput);

  useEffect(() => {
    if (!input.minPrice) setInput({ ...input, minPrice: '0' });
    if (!input.maxPrice) setInput({ ...input, maxPrice: '0' });
  }, [input.minPrice, input.maxPrice]);

  useEffect(() => {
    api
      .get('/products/categories')
      .then((res) => {
        return res.data;
      })
      .then((res) => {
        setCategories(res);
      });
  }, []);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    filtrado(input);
  };


  const handleClear = (e) => {
    e.preventDefault();
    const finalInput = {...clearInput, lote: ' '}
    setInput(clearInput);
    filtrado(finalInput)
  };


  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.name === 'expirationDate' && e.target.value === '') {
      setInput({ ...input, expirationDate: 'clear' });
    } else setInput({ ...input, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.divInputGeneral}>
      <form onSubmit={handleSubmit}>
        <div className={styles.OrderBy}>
          <label>Ordenar por: </label>
          <label>
            <select
              className={styles.OrderByInput}
              name="order"
              onChange={handleChange}
              value={input.order}
            >
              <option value="recents">Mas recientes</option>
              <option value="priceASC">Precio minimo</option>
              <option value="priceDESC">Precio maximo</option>
              <option value="expirationASC">Primeros en expirar</option>
              <option value="expirationDESC">Ultimos en expirar</option>
            </select>
          </label>
        </div>
        <div className={styles.filterByCategory}>
          <label>Filtrar por categoria: </label>
          <label>
            <select
              className={styles.filterByInput}
              name="categoryName"
              onChange={handleChange}
              value={input.categoryName}
            >
              <option value="Todas">Todas</option>
              {categories &&
                categories.map((category) => (
                  <option key={category.name} value={category.name}>
                    {category.name}
                  </option>
                ))}
            </select>
          </label>
        </div>
        <div>
          <div className={styles.minPrice}>
            <label>Precio Minimo:</label>
            <input
              className={styles.minPriceInput}
              type="number"
              name="minPrice"
              min="0"
              onChange={handleChange}
              value={input.minPrice}
            />
          </div>
          <div className={styles.maxPrice}>
            <label>Precio Maximo:</label>
            <input
              className={styles.maxPriceInput}
              type="number"
              name="maxPrice"
              min="0"
              onChange={handleChange}
              value={input.maxPrice}
            />
          </div>
        </div>
        <div className={styles.maxExp}>
          <label>Fecha Max. Expiración de Lote:</label>
          <input
            className={styles.maxExpInput}
            type="date"
            name="expirationDate"
            min={new Date().toLocaleDateString('en-ca')}
            onChange={handleChange}
          />
        </div>
        <div className={styles.divButtons}>
          <Button
            type="submit"
            // onClick={handleOpen}
            sx={{
              color: 'white',
              backgroundColor: '#3E2463',
              '&:hover': { backgroundColor: '#3E246390 !important' },
              marginTop: 1,
            }}
          >
            Aplicar filtros
          </Button>
          {/* <button className={styles.applyButton} type="submit">
            Aplicar filtros
          </button> */}

          <Button
            // type="submit"
            onClick={handleClear}
            sx={{
              color: 'white',
              backgroundColor: '#7ED957',
              '&:hover': { backgroundColor: '#7ED95790 !important' },
              marginTop: 1,
            }}
            >
            Reiniciar filtros
          </Button>

          {/* <button
            className={styles.resetButton}
            type="button"
            onClick={handleClear}
          >
            Reiniciar filtros
          </button>  */}
        </div>
      </form>
    </div>
  );
}

export default FiltroForm;
