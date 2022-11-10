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
        under50000k: []

    }
}

export default (state = initState, action) => {
    switch (action.type) {
        case productContants.GET_PRODUCTS_BY_SLUG:
            state = {
                ...state,
                products: action.payload.products,
                productsByPrice: {
                    ...action.payload.productsByPrice
                }
            }
            break;

        default:
            break;
    }
    return state;
}