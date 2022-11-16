import { productContants } from "../actions/constants";

const initState = {
  products: [],
  productsByPrice: {
    under2000k: [],
    under5000k: [],
    under10000k: [],
    under15000k: [],
    under20000k: [],
    under30000k: [],
    under50000k: [],
  },
  pageRequest: false,
  page: {},
  error: null,
};

export default (state = initState, action) => {
  switch (action.type) {
    case productContants.GET_PRODUCTS_BY_SLUG:
      state = {
        ...state,
        products: action.payload.products,
        productsByPrice: {
          ...action.payload.productsByPrice,
        },
      };
      break;
    case productContants.GET_PRODUCTS_PAGE_REQUEST:
      state = {
        ...state,
        pageRequest: true,
      };
      break;
    case productContants.GET_PRODUCTS_PAGE_SUCCESS:
      state = {
        ...state,
        page: action.payload.page,
        pageRequest: false,
      };
      break;
    case productContants.GET_PRODUCTS_PAGE_FAILURE:
      state = {
        ...state,
        pageRequest: false,
        error: action.payload.error,
      };
      break;
    default:
      break;
  }
  return state;
};
