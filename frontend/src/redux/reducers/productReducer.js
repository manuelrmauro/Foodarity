import types from '../types/productTypes';

const initialState = {
  products: [],
  allProductsList: [],
  totalProducts: null,
  page: null,
  pages: null,
  categories: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.agregarProducto:
      return {
        ...state,
        product: null,
      };

    case types.getProducts:
      return {
        ...state,
        products: action.payload.products,
        allProductsList: action.payload.allProducts,
        totalProducts: action.payload.totalProducts,
        page: action.payload.page,
        pages: action.payload.pages,
      };

    /*  case types.searchProducts:
      // eslint-disable-next-line no-case-declarations
      console.log(state.allProducts);
      console.log(action.payload);
      // eslint-disable-next-line no-case-declarations
      const filterProduct = state.allProducts.filter((producto) => {
        return producto.name.includes(action.payload.toLowerCase());
      });
      console.log(filterProduct);

      return {
        ...state,
        allProducts: filterProduct,
      }; */

    case types.productLoading:
      return {
        ...state,
        loading: true,
      };

    case types.getCategories:
      return {
        ...state,
        categories: action.payload,
      };

    default:
      return state;
  }
};
