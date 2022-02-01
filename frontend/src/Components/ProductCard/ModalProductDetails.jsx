/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import styles from './ProductCard.module.css';
import { addToCart } from '../../redux/actions/cartActions';
import GoogleMapsCompany from '../GoogleMaps/GoogleMapsCompany';

function ModalProductDetails({ product, open, handleClose, item }) {
  const {id: userId} = useSelector(state=> state.auth)
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [currentPath, setCurrentPath] = React.useState('');

  const ExpirationDate = product.expirationDate;
  const Date = ExpirationDate.split('-').reverse().join('/');

  const [quantity, setQuantity] = React.useState(1);

  React.useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);

  const handleAddToCart = () => {
    dispatch(addToCart(product.id, quantity));
    setQuantity(1);
    handleClose();
  };

  const handleOnChange = (e) => {
    e.preventDefault();
    setQuantity(e.target.value);
  };

  const handleCompanyClick = (event, id) => {
    navigate(`/company/${id}`, { replace: true });
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={styles.BoxGeneral}>
        <Box className={styles.boxCompany} sx={{ width: 225 }}>
         {!currentPath.startsWith('/company') && (<div className={styles.CompanyNameDiv}>
            <Typography
              id="modal-modal-description"
              className={styles.titleTypographyName}
              onClick={(e) => handleCompanyClick(e, product.company.id)}
            >
              {product.company.name}
            </Typography>
          </div>)}
          <div className={styles.divStreet} style={currentPath.startsWith('/company')? {position: 'relative', top: 5, marginBottom: 20} : {}}>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2,}}
              className={styles.titleTypographyStreet}
            >
              <LocationOnIcon sx={{ position: 'relative', bottom: 5 }} />
              {product.company.address.state.name},{' '}
              {product.company.address.city.name}
            
            </Typography>
          </div>
          <div className={styles.googleMap}>
         < GoogleMapsCompany company={product.company}/>
          </div>
          {userId && currentPath !== '/cart' && (
            <div>
              <div className={styles.cartOptionsCont}>
                <label>Cantidad:</label>
                <select
                  className={styles.cartOptions}
                  onChange={handleOnChange}
                >
                  {Array.from(Array(product.quantity), (e, i) => {
                    return (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className={styles.divFavButton}>
                <button
                  className={styles.favButton}
                  type="submit"
                  onClick={handleAddToCart}
                >
                  Añadir al carrito
                  <ShoppingCartIcon className={styles.heart} />
                </button>
              </div>
            </div>
          )}
        </Box>
        <Box sx={{ width: 330 }}>
          <div className={styles.DivPostData}>
            <div className={styles.PostImgDiv}>
              <img
                className={styles.PostImg}
                src={product.photo.url}
                alt="ProductPhoto"
              />
            </div>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2 }}
              className={styles.titleTypographyDesc}
            >
              {product.description}
            </Typography>
          </div>
          <div className={styles.expDate}>
            <p>El lote expira:</p>
            <p className={styles.date}> {Date}</p>
          </div>
          <div className={styles.category}>
            <p>Categoria: </p>
            <p className={styles.categoryName}>{product.category.name}</p>
          </div>
          <div className={styles.priceCont}>
            <label>
              ${Intl.NumberFormat('de-DE').format(product.price)},00 x
              {item ? item.quantity : quantity}
            </label>
            <h2 className={styles.price}>
              $
              {Intl.NumberFormat('de-DE').format(
                product.price * (item ? item.quantity : quantity)
              )}
              ,00
            </h2>
          </div>
        </Box>
      </Box>
    </Modal>
  );
}

export default ModalProductDetails;
